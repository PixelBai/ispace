package handler

import (
	"encoding/json"
	"fmt"

	"gitee.com/ispace/core/handler/fileHandler"
	"gitee.com/ispace/core/infrastructure/common/dto"
	"github.com/gorilla/websocket"
)

type WsHandler struct {
	conn *websocket.Conn
}

func (wh *WsHandler) SetConn(conn *websocket.Conn) {
	wh.conn = conn
}

func (wh *WsHandler) Execute() {
	for {

		// step 1: 接收信息
		_, msg, err := wh.conn.ReadMessage()
		if err != nil {
			fmt.Println("Error reading message:", err)
			break
		}
		fmt.Printf("Received message: %s\n", msg)

		// step 2: 获取信息
		var wsRequest dto.WsRequestDto
		err2 := json.Unmarshal(msg, &wsRequest)
		if err2 != nil {
			fmt.Println("Error unmarshalling message:", err)
			continue
		}

		// step 3:
		var result dto.ResultDto
		switch wsRequest.Header.Handler {
		case "file/create":
			fileH := fileHandler.New()
			fileH.SetWsr(wsRequest)
			body := map[string]string{}
			bodyBytes, err1 := json.Marshal(wsRequest.Body)
			if err1 != nil {
				fmt.Println("Error marshalling message:", err)
				continue
			}
			err3 := json.Unmarshal(bodyBytes, &body)
			if err3 != nil {
				fmt.Println("Error unmarshalling message:", err)
				continue
			}
			result = fileH.Create(body["name"], body["dirPath"])

		default:
			fmt.Println("Unsupported handle:", wsRequest.Header.Handler)
		}

		// step 4: 发送信息
		var wsRep dto.WsResponseDto
		wsRep.Header.Id = wsRequest.Header.Id
		wsRep.Body = result

		wsRepBytes, err := json.Marshal(wsRep)
		if err != nil {
			fmt.Println("Error marshalling result:", err)
			continue
		}
		err = wh.conn.WriteMessage(websocket.TextMessage, wsRepBytes)
		if err != nil {
			fmt.Println("Error writing message:", err)
			break
		}
	}
}
