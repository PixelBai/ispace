package isoption

import (
	"gitee.com/ispace/core/controller/identityController"
	"github.com/gin-gonic/gin"
)

func ApiOption(host *gin.Engine) {
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
}
