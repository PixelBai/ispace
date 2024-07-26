package file

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	fp "path/filepath"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
)

type FileDownloadHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FileDownloadHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FileDownloadHandler) Execute() dto.WsResponseDto {

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
	content, err2 := h.content(params["filePath"])
	if err2 != nil {
		result.Header.Stat = 2
		result.Body = fmt.Sprintf("Error StatFile message:%s", err2)
		return result
	}
	// step end:
	result.Header.Stat = 200
	result.Body = content
	return result
}

func (ic *FileDownloadHandler) content(filePath string) (string, error) {
	// step core:
	// 打开文件
	file, err := os.Open(fp.Join(gv.BasePath, filePath))
	if err != nil {
		fmt.Println("打开文件失败:", err)
		return "", err
	}
	defer file.Close()

	// 使用io.ReadAll读取文件内容
	content, err := io.ReadAll(file)
	if err != nil {
		fmt.Println("读取文件失败:", err)
		return "", err
	}

	return string(content), nil
}
