package FileHandler

import (
	"fmt"
	"os"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/itf"
)

func (ic *FileHandler) SetWsr(wsr dto.WsRequestDto) {
	ic.Wsr = wsr
}

// 身份控制器-类
type FileHandler struct {
	Wsr dto.WsRequestDto
}

func New() FileHandler {
	fwc := FileHandler{}
	return fwc
}

func NewHandler() itf.Handler {
	return &FileHandler{}

}

// 接口名称：新增文件
// 请求： 文件名
// 响应：token
func (ic *FileHandler) Create(dirPath string, name string) dto.ResultDto {
	// step init:
	var result dto.ResultDto

	// Create the new file
	filePath := fmt.Sprintf("%s/%s", dirPath, name)
	file, err := os.Create(filePath)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("Error creating file: %v", err)
		return result
	}
	defer file.Close()

	result.Success = true
	result.Message = "File created successfully"
	return result
}

func (ic *FileHandler) Rename(dirPath string, oldName string, newName string) dto.ResultDto {
	// step init:
	var result dto.ResultDto

	oldFilePath := fmt.Sprintf("%s/%s", dirPath, oldName)
	newFilePath := fmt.Sprintf("%s/%s", dirPath, newName)

	// step check:
	_, err := os.Stat(newFilePath)
	if os.IsNotExist(err) {
		result.Success = false
		result.Message = fmt.Sprintf("Error Remove file: %v", err)
		return result
	}

	// Create the new file
	err2 := os.Rename(oldFilePath, newFilePath)
	if err2 != nil {
		result.Success = false
		result.Message = fmt.Sprintf("Error Rename file: %v", err)
		return result
	}

	result.Success = true
	result.Message = "File Rename successfully"
	return result
}

func (ic *FileHandler) Remove(dirPath string, oldName string) dto.ResultDto {
	// step init:
	var result dto.ResultDto
	filePath := fmt.Sprintf("%s/%s", dirPath, oldName)

	// step check:
	_, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		result.Success = false
		result.Message = fmt.Sprintf("Error Remove file: %v", err)
		return result
	}

	// Create the new file
	err2 := os.Remove(filePath)
	if err2 != nil {
		result.Success = false
		result.Message = fmt.Sprintf("Error Remove file: %v", err)
		return result
	}

	result.Success = true
	result.Message = "File Remove successfully"
	return result
}

func (ic *FileHandler) Stat(filePath string) dto.ResultDto {
	// step init:
	var result dto.ResultDto

	// step core:
	fileInfo, err := os.Stat(filePath)
	if err != nil {
		result.Success = false
		result.Message = fmt.Sprintf("Error reading file properties: %v", err)
		return result
	}

	fileInfoDto := dto.FileInfoDto{}

	fileInfoDto.Name = fileInfo.Name()
	fileInfoDto.Size = fileInfo.Size()
	fileInfoDto.Mode = fileInfo.Mode()
	fileInfoDto.ModTime = fileInfo.ModTime()
	fileInfoDto.IsDir = fileInfo.IsDir()
	fileInfoDto.Sys = fileInfo.Sys()

	result.Success = true
	result.Message = "File Remove successfully"
	result.Data = fileInfoDto
	return result
}
