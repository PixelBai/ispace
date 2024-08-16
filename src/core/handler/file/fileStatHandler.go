package file

import (
	"encoding/json"
	"fmt"
	"os"
	fp "path/filepath"
	"syscall"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
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
	filePath = fp.Join(gv.BasePath, filePath)
	// step core:
	fileInfo, err := os.Stat(filePath)
	if err != nil {
		return fileInfoDto, err
	}

	// 将os.FileInfo转换为*syscall.Stat_t以访问inode号
	// 注意：这种转换依赖于内部实现，并且不是跨平台的
	// 在Linux上通常有效，但在其他操作系统上可能不起作用
	var stat syscall.Stat_t
	if err := syscall.Stat(filePath, &stat); err != nil {
		return fileInfoDto, err
	}

	fileInfoDto.Id = stat.Ino
	fileInfoDto.Name = fileInfo.Name()
	fileInfoDto.Size = fileInfo.Size()
	fileInfoDto.Mode = fileInfo.Mode()
	fileInfoDto.ModTime = fileInfo.ModTime()
	fileInfoDto.IsDir = fileInfo.IsDir()
	fileInfoDto.Sys = fileInfo.Sys()
	return fileInfoDto, nil
}
