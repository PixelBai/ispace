package folder

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
)

type FolderCreateHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FolderCreateHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FolderCreateHandler) Execute() dto.WsResponseDto {

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
	err = h.create(params["folderPath"], params["name"])
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error CreateFile message:%s", err)
		return result
	}
	// step end:
	result.Header.Stat = 200
	return result
}

// 新增
func (fh *FolderCreateHandler) create(folderPath string, name string) error {
	newFolderPath := filepath.Join(gv.BasePath, folderPath, name)
	err := os.Mkdir(newFolderPath, 0755)
	if err != nil {
		return err
	}

	return nil
}
