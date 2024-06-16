package file

import (
	"encoding/json"
	"fmt"
	"os"

	"gitee.com/ispace/core/infrastructure/common/dto"
)

type FileCreateHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FileCreateHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FileCreateHandler) Execute() dto.WsResponseDto {

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
	err = h.create(params["dirPath"], params["name"])
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error CreateFile message:%s", err)
		return result
	}
	// step end:
	result.Header.Stat = 200
	return result
}

func (ic *FileCreateHandler) create(dirPath string, name string) error {
	filePath := fmt.Sprintf("%s/%s", dirPath, name)
	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()
	return nil
}
