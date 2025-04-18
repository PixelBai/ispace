package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
)

type FileRenameHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FileRenameHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FileRenameHandler) Execute() dto.WsResponseDto {

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
		result.Body = fmt.Sprintf("Error RenameFile message:%s", err)
		return result
	}
	// step end:
	result.Header.Stat = 200
	return result
}

func (ic *FileRenameHandler) rename(folderPath string, oldName string, newName string) error {
	// step init:
	oldFilePath := filepath.Join(gv.BasePath, folderPath, oldName)
	newFilePath := filepath.Join(gv.BasePath, folderPath, newName)

	// step check:
	_, err := os.Stat(oldFilePath)
	if os.IsNotExist(err) {
		return err
	}

	// Create the new file
	err2 := os.Rename(oldFilePath, newFilePath)
	if err2 != nil {
		return err
	}

	return err
}
