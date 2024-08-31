package folder

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
)

type FolderRenameHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FolderRenameHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FolderRenameHandler) Execute() dto.WsResponseDto {

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
	err = h.rename(params["folderPath"], params["oldName"], params["newName"])
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error RenameFolder message:%s", err)
		return result
	}
	// step end:
	result.Header.Stat = 200
	return result
}

// 重命名
func (fh *FolderRenameHandler) rename(folderPath string, oldName string, newName string) error {
	oldPath := filepath.Join(gv.BasePath, folderPath, oldName)
	newPath := filepath.Join(gv.BasePath, folderPath, newName)

	// step check:
	_, err := os.Stat(oldPath)
	if os.IsNotExist(err) {
		return err
	}

	err = os.Rename(oldPath, newPath)
	if err != nil {
		return err
	}
	return nil
}
