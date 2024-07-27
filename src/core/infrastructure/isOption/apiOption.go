package isoption

import (
	"net/http"
	"time"

	"gitee.com/ispace/core/controller/identityController"
	"gitee.com/ispace/core/infrastructure/common/dto"
	"github.com/gin-gonic/gin"
)

func ApiOption(host *gin.Engine) {
	api_host := host.Group("/api")
	// step 1:
	api_host.POST("/GetToken", func(c *gin.Context) {
		identityController := identityController.New()
		// step 1.2： 获取请求信息
		var request struct {
			Name     string `json:"name"`
			Password string `json:"password"`
		}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(200, identityController.GetToken(request.Name, request.Password))
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

	// step 2：
	api_host.GET("/DateTime", func(c *gin.Context) {
		result := dto.ResultDto[time.Time]{}
		result.Code = 200
		result.Data = time.Now()
		result.Success = true
		result.Message = "success"
		c.JSON(200, result)
	})
}
