package handler

import (
	"encoding/json"
	"fmt"
	"log"

	handler "gitee.com/ispace/core/handler/file"
	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/itf"
	"github.com/gorilla/websocket"
)

type WsHandler struct {
	conn   *websocket.Conn
	writeC chan []byte
	readC  chan []byte
	doneC  chan struct{}
}

func NewWsHandler(conn *websocket.Conn) WsHandler {
	wsh := WsHandler{}
	wsh.conn = conn
	wsh.writeC = make(chan []byte)
	wsh.readC = make(chan []byte)
	wsh.doneC = make(chan struct{})
	return wsh
}

func (wh *WsHandler) SetConn(conn *websocket.Conn) {
	wh.conn = conn
}

func (wh *WsHandler) Run() {

	// step 1: read
	go func() {
		defer close(wh.doneC)
		for {
			_, message, err := wh.conn.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				return
			}
			log.Printf("recv: %s", message)
			wh.readC <- message
		}
	}()

	// step 2: write
	go func() {
		for {
			select {
			case <-wh.doneC:
				return
			case message := <-wh.writeC:
				err := wh.conn.WriteMessage(websocket.TextMessage, message)
				if err != nil {
					log.Println("write:", err)
				}
			}
		}
	}()

	// step 3: exec
	go func() {
		for {

			// step init:
			var result dto.WsResponseDto

			// step 1: get data
			var msg []byte
			select {
			case <-wh.doneC:
				return
			case msg = <-wh.readC:
			}

			// step 2: 获取信息
			var wsRequest dto.WsRequestDto
			err2 := json.Unmarshal(msg, &wsRequest)
			if err2 != nil {
				result.Header.Id = ""
				result.Header.Stat = 1
				result.Body = fmt.Sprintf("Error unmarshalling message.erro:%s.info:%s", err2, msg)
				continue
			}

			// step 3: get h
			hBuilder := route[wsRequest.Header.Handler]
			if hBuilder == nil {
				result.Header.Id = wsRequest.Header.Id
				result.Header.Stat = 1
				result.Body = fmt.Sprintf("not find the handler:%s", wsRequest.Header.Handler)
				continue
			}
			handler := hBuilder()
			handler.Init(wsRequest)
			result = handler.Execute()

			// step 4: 发送信息

			wsRepBytes, err := json.Marshal(result)
			if err != nil {
				result.Header.Stat = 3
				result.Body = fmt.Sprintf("Error marshalling result:%s", err)
				continue
			}
			wh.writeC <- wsRepBytes
		}
	}()

	// step 4: end
	<-wh.doneC
}

type wshRoute map[string]func() itf.BaseHandler

var route = wshRoute{
	"file/create": func() itf.BaseHandler { return &handler.FileCreateHandler{} },
}
