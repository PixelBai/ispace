package isoption

import (
	"fmt"
	"net/http"

	"gitee.com/ispace/core/handler"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WsOption(host *gin.Engine) {
	ws_host := host.Group("/ws")
	ws_host.GET("/default", func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			fmt.Println("Error upgrading connection:", err)
			return
		}
		defer conn.Close()

		wsh := handler.NewWsHandler(conn)
		wsh.Run()

	})

}
