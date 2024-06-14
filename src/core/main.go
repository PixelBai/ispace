package main

import (
	"encoding/json"
	"fmt"
	"mime"
	"net/http"

	"gitee.com/ispace/core/controller/identityController"
	"gitee.com/ispace/core/handler/fileHandler"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	"gitee.com/ispace/core/infrastructure/common/dto"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {

	fmt.Printf("ispace start")
	host := gin.Default()

	// section 终结点
	// setp 1: 静态目录
	_ = mime.AddExtensionType(".js", "application/javascript")
	host.Use(static.Serve("/front/", static.LocalFile("./front", true)))

	// section api
	api_host := host.Group("/api")
	// step 1:
	api_host.POST("/GetToken", func(c *gin.Context) {
		identityController := identityController.New()
		// step 1.2： 获取请求信息
		name := c.PostForm("name")
		password := c.PostForm("password")
		c.JSON(200, identityController.GetToken(name, password))
	})

	// step 2：
	api_host.GET("/VerifyToken", func(c *gin.Context) {
		identityController := identityController.New()
		// step 2.1： 获取请求信息
		token, e2 := c.GetQuery("token")
		// step 3：校验
		if !e2 {
			c.JSON(200, gin.H{"message": "参数不正确，请重试"})
			return
		}
		c.JSON(200, identityController.Verify(token))
	})

	// section ws:
	ws_host := host.Group("/ws")
	ws_host.GET("/default", func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			fmt.Println("Error upgrading connection:", err)
			return
		}
		defer conn.Close()

		for {
			_, msg, err := conn.ReadMessage()
			if err != nil {
				fmt.Println("Error reading message:", err)
				break
			}
			fmt.Printf("Received message: %s\n", msg)

			// step 1: 获取信息 将msg，映射到WsRequestDto中
			// step 1: 获取信息
			// You can map the received message (msg) to a WsRequestDto struct here.
			var wsRequest dto.WsRequestDto
			err2 := json.Unmarshal(msg, &wsRequest)
			if err2 != nil {
				fmt.Println("Error unmarshalling message:", err)
				continue
			}
			// step 2: 根据WsRequestDto header中的controller名称和方法
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

			var wsRep dto.WsResponseDto
			wsRep.Header.Id = wsRequest.Header.Id
			wsRep.Body = result

			wsRepBytes, err := json.Marshal(wsRep)
			if err != nil {
				fmt.Println("Error marshalling result:", err)
				continue
			}
			err = conn.WriteMessage(websocket.TextMessage, wsRepBytes)
			if err != nil {
				fmt.Println("Error writing message:", err)
				break
			}
		}

	})

	// section 配置信息
	ip := "0.0.0.0"
	port := "8101"
	// step end： 服务启动
	//服务器要监听的主机地址和端口号
	address := fmt.Sprintf("%s:%s", ip, port)
	host.Run(address)
}
