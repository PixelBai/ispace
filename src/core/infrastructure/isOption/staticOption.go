package isoption

import (
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func StaticOption(host *gin.Engine) {
	host.Use(static.Serve("/front/", static.LocalFile("./front", true)))
}
