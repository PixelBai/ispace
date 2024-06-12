package filewscontroller

import (
	"fmt"
	"os"

	"gitee.com/ispace/core/infrastructure/common/dto"
)

// 身份控制器-类
type FileWsController struct {
}

func New() FileWsController {
	fwc := FileWsController{}
	return fwc
}

// 接口名称：新增文件
// 请求： 文件名
// 响应：token
func (ic *FileWsController) Create(name string, dirPath string) dto.ResultDto {
	// step init:
	var result dto.ResultDto

	// Create the new file
	filePath := fmt.Sprintf("%s/%s", dirPath, name)
	file, err := os.Create(filePath)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("Error creating file: %v", err)
		return result
	}
	defer file.Close()

	result.Success = true
	result.Message = "File created successfully"
	return result
}
