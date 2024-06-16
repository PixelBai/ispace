package file

import (
	"encoding/json"
	"fmt"
	"os"

	"gitee.com/ispace/core/infrastructure/common/dto"
)

type FileStatHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FileStatHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FileStatHandler) Execute() dto.WsResponseDto {

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
	fileInfo, err2 := h.stat(params["filePath"])
	if err2 != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error StatFile message:%s", err2)
		return result
	}
	// step end:
	result.Header.Stat = 200
	result.Body = fileInfo
	return result
}

func (ic *FileStatHandler) stat(filePath string) (dto.FileInfoDto, error) {
	// step init:
	fileInfoDto := dto.FileInfoDto{}
	// step core:
	fileInfo, err := os.Stat(filePath)
	if err != nil {
		return fileInfoDto, err
	}

	fileInfoDto.Name = fileInfo.Name()
	fileInfoDto.Size = fileInfo.Size()
	fileInfoDto.Mode = fileInfo.Mode()
	fileInfoDto.ModTime = fileInfo.ModTime()
	fileInfoDto.IsDir = fileInfo.IsDir()
	fileInfoDto.Sys = fileInfo.Sys()
	return fileInfoDto, nil
}
