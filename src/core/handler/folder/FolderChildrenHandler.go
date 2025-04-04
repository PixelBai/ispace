package folder

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"syscall"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
)

type FolderChildrenHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FolderChildrenHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FolderChildrenHandler) Execute() dto.WsResponseDto {

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

	params := dto.QueryDto{}
	err = json.Unmarshal(bodyBytes, &params)
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error unmarshalling message:%s", err)
		return result
	}

	// step 2:
	cdr, err := h.children(params)
	if err != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error CreateFile message:%s", err)
		return result
	}

	// step end:
	result.Header.Stat = 200
	result.Body = cdr
	return result
}

// 查询
func (fh *FolderChildrenHandler) children(query dto.QueryDto) ([]dto.FileInfoBaseDto, error) {

	children := []dto.FileInfoBaseDto{}
	dir, err := os.Open(fmt.Sprintf("%s/%s", gv.BasePath, query.Path))
	if err != nil {
		return children, err
	}
	defer dir.Close()

	files, err := dir.Readdir(-1)
	if err != nil {
		return children, err
	}

	// 分页处理
	if query.Page > 0 && query.Size > 0 {
		start := (query.Page - 1) * query.Size
		end := query.Page * query.Size
		if start > len(files) {
			return children, nil
		}

		if end > len(files) {
			end = len(files)
		}
		files = files[start:end]
	}

	for _, file := range files {

		// 过滤文件
		if query.Name != "" && !strings.Contains(file.Name(), query.Name) {
			continue
		}

		child := dto.FileInfoBaseDto{}

		itemPath := fmt.Sprintf("%s/%s/%s", gv.BasePath, query.Path, file.Name())
		// 将os.FileInfo转换为*syscall.Stat_t以访问inode号
		// 注意：这种转换依赖于内部实现，并且不是跨平台的
		// 在Linux上通常有效，但在其他操作系统上可能不起作用
		var stat syscall.Stat_t
		if err := syscall.Stat(itemPath, &stat); err != nil {
			continue
		}

		child.Id = stat.Ino
		child.Name = file.Name()
		child.Size = file.Size()
		child.Mode = file.Mode()
		child.ModTime = file.ModTime()
		child.IsDir = file.IsDir()
		child.Sys = file.Sys()
		children = append(children, child)
	}

	return children, nil
}
