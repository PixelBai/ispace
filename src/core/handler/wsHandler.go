package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"reflect"
	"strings"

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
			// step 1: get data
			var msg []byte
			select {
			case <-wh.doneC:
				return
			case message := <-wh.readC:
				msg = message
				err := wh.conn.WriteMessage(websocket.TextMessage, message)
				if err != nil {
					log.Println("write:", err)
				}
			}

			// step 2: 获取信息
			var wsRequest dto.WsRequestDto
			err2 := json.Unmarshal(msg, &wsRequest)
			if err2 != nil {
				fmt.Println("Error unmarshalling message:", err2)
				continue
			}

			// step 3: get h
			var result dto.ResultDto
			handler, err := handlerFactory(wsRequest.Header.Handler)
			if err != nil {
				fmt.Println("Error creating handler:", err)
				continue
			}
			handler.SetWsr(wsRequest)

			bodyBytes, err := json.Marshal(wsRequest.Body)
			if err != nil {
				fmt.Println("Error marshalling message:", err)
				continue
			}

			params := map[string]interface{}{}
			err = json.Unmarshal(bodyBytes, &params)
			if err != nil {
				fmt.Println("Error unmarshalling message:", err)
				continue
			}

			result, err = callMethod(handler, wsRequest.Header.Method, params)
			if err != nil {
				fmt.Println("Error calling method:", err)
				continue
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
			wh.writeC <- wsRepBytes
		}
	}()

	// step 4: end
	<-wh.doneC
}

// 处理器工厂函数
func handlerFactory(handlerType string) (itf.Handler, error) {
	switch handlerType {
	case "file":
		return fileHandler.NewHandler(), nil
	default:
		return nil, fmt.Errorf("unsupported handler type: %s", handlerType)
	}
}

func callMethod(handler itf.Handler, methodName string, params map[string]interface{}) (dto.ResultDto, error) {
	var result dto.ResultDto

	handlerValue := reflect.ValueOf(handler)
	method := handlerValue.MethodByName(methodName)
	if !method.IsValid() {
		return result, fmt.Errorf("method not found: %s", methodName)
	}

	methodType := method.Type()
	numIn := methodType.NumIn()
	args := make([]reflect.Value, numIn)

	for i := 0; i < numIn; i++ {
		paramType := methodType.In(i)
		a := paramType.Field(i)
		fmt.Print(a)
		paramName := strings.ToLower(paramType.Name())
		paramValue, ok := params[i]
		if !ok {
			return result, fmt.Errorf("missing parameter: %s", paramName)
		}
		args[i] = reflect.ValueOf(paramValue).Convert(paramType)
	}

	results := method.Call(args)
	if len(results) != 1 {
		return result, fmt.Errorf("unexpected number of return values")
	}

	resultValue := results[0]
	if !resultValue.CanInterface() {
		return result, fmt.Errorf("cannot interface result value")
	}

	result, ok := resultValue.Interface().(dto.ResultDto)
	if !ok {
		return result, fmt.Errorf("unexpected return type")
	}

	return result, nil
}
