package folder

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"syscall"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
)

type FolderStatHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FolderStatHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FolderStatHandler) Execute() dto.WsResponseDto {

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
	stat, err2 := h.stat(params["folderPath"])
	if err2 != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error stat folder message:%s", err2)
		return result
	}
	// step end:
	result.Header.Stat = 200
	result.Body = stat
	return result
}

// 查询
func (fh *FolderStatHandler) stat(folderPath string) (dto.FolderInfoDto, error) {
	folderInfo := dto.FolderInfoDto{}

	path := filepath.Join(gv.BasePath, folderPath)

	info, err := os.Stat(path)
	if err != nil {
		return folderInfo, err
	}

	// 将os.FileInfo转换为*syscall.Stat_t以访问inode号
	// 注意：这种转换依赖于内部实现，并且不是跨平台的
	// 在Linux上通常有效，但在其他操作系统上可能不起作用
	var stat syscall.Stat_t
	if err := syscall.Stat(path, &stat); err != nil {
		return folderInfo, err
	}

	folderInfo.Id = stat.Ino
	folderInfo.Name = info.Name()
	folderInfo.Size = info.Size()
	folderInfo.Mode = info.Mode()
	folderInfo.ModTime = info.ModTime()
	folderInfo.IsDir = info.IsDir()
	folderInfo.Sys = info.Sys()
	return folderInfo, err
}
