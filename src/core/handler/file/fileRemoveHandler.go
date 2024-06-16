package file

import (
	"encoding/json"
	"fmt"
	"os"

	"gitee.com/ispace/core/infrastructure/common/dto"
)

type FileRemoveHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FileRemoveHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FileRemoveHandler) Execute() dto.WsResponseDto {

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
	err = h.remove(params["dirPath"], params["name"])
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error RemoveFile message:%s", err)
		return result
	}
	// step end:
	result.Header.Stat = 200
	return result
}

func (ic *FileRemoveHandler) remove(dirPath string, name string) error {
	// step init:
	filePath := fmt.Sprintf("%s/%s", dirPath, name)

	// step check:
	_, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		return err
	}

	// Create the new file
	err2 := os.Remove(filePath)
	if err2 != nil {
		return err2
	}

	return nil
}
