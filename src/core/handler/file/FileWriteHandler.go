package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
	statuscode "gitee.com/ispace/core/infrastructure/common/statusCode"
)

type FileWriteHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FileWriteHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FileWriteHandler) Execute() dto.WsResponseDto {

	// step init:
	result := dto.WsResponseDto{}
	result.Header.Id = h.request.Header.Id

	// step 1: params
	bodyBytes, err := json.Marshal(h.request.Body)
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error marshalling message:%s", err)
		return result
	}

	params := map[string]string{}
	err = json.Unmarshal(bodyBytes, &params)
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error unmarshalling message:%s", err)
		return result
	}

	// step 2:
	code := 0
	code, err = h.write(params["filePath"], params["content"])
	if err != nil {
		result.Header.Stat = code
		result.Body = fmt.Sprintf("Error WriteFile message:%s", err)
		return result
	}
	// step end:
	result.Header.Stat = 200
	return result
}

func (ic *FileWriteHandler) write(filePath string, content string) (int, error) {

	filePath = filepath.Join(gv.BasePath, filePath)

	// check: 文件是否存在
	_, err := os.Stat(filePath)
	if err != nil {
		return statuscode.FileNotFound, err
	}

	// write: 写入文件
	file, err := os.OpenFile(filePath, os.O_WRONLY, 0)
	if err != nil {
		return statuscode.InternalError, err
	}
	defer file.Close()

	_, err = file.WriteString(content)
	if err != nil {
		return statuscode.InternalError, err
	}

	return 200, nil

}
