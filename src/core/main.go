package main

import (
	"fmt"
	"mime"

	"github.com/gin-gonic/gin"

	isoption "gitee.com/ispace/core/infrastructure/isOption"
)

func main() {

	fmt.Printf("ispace start")
	host := gin.Default()
	err := mime.AddExtensionType(".js", "application/javascript")
	if err != nil {
		fmt.Println("mime.AddExtensionType:", err)
		return
	}

	// section 终结点
	// setp 1: 静态目录
	host.With(isoption.StaticOption)
	// section api
	host.With(isoption.ApiOption)
	// section ws:
	host.With(isoption.WsOption)

	// section 配置信息
	ip := "0.0.0.0"
	port := "8101"
	// step end： 服务启动
	address := fmt.Sprintf("%s:%s", ip, port)
	host.Run(address)
}
