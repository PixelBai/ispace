package file

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	fp "path/filepath"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/gv"
	statuscode "gitee.com/ispace/core/infrastructure/common/statusCode"
)

type FileContentHandler struct {
	request dto.WsRequestDto
}

// Init 方法实现
func (h *FileContentHandler) Init(request dto.WsRequestDto) {
	h.request = request
}

// Execute 方法实现
func (h *FileContentHandler) Execute() dto.WsResponseDto {

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
		result.Header.Stat = statuscode.FileNotFound
		result.Body = fmt.Sprintf("Error unmarshalling message:%s", err)
		return result
	}

	// step 2:
	content, code, err2 := h.content(params["filePath"])
	if err2 != nil {
		result.Header.Stat = code
		result.Body = fmt.Sprintf("Error StatFile message:%s", err2)
		return result
	}

	// step end:
	result.Header.Stat = 200
	result.Body = content
	return result
}

func (ic *FileContentHandler) content(filePath string) (string, int, error) {
	// step core:

	// 判断文件是否存在
	if _, err := os.Stat(fp.Join(gv.BasePath, filePath)); os.IsNotExist(err) {
		fmt.Println("文件不存在:", err)
		return "", statuscode.FileNotFound, err
	}

	// 打开文件
	file, err := os.Open(fp.Join(gv.BasePath, filePath))
	if err != nil {
		fmt.Println("打开文件失败:", err)
		return "", -2, err
	}
	defer file.Close()

	// 使用io.ReadAll读取文件内容
	content, err := io.ReadAll(file)
	if err != nil {
		fmt.Println("读取文件失败:", err)
		return "", -3, err
	}

	return string(content), 0, nil
}
