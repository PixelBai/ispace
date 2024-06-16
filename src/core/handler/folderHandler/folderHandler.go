package folderhandler

import (
	"os"
	"path/filepath"

	"gitee.com/ispace/core/infrastructure/common/dto"
)

// 身份控制器-类
type FolderHandler struct {
	Wsr dto.WsRequestDto
}

// 新增
func (fh *FolderHandler) Create(folderPath string, name string) dto.ResultDto {
	result := dto.ResultDto{}

	newFolderPath := filepath.Join(folderPath, name)
	err := os.Mkdir(newFolderPath, 0755)
	if err != nil {
		result.Success = false
		result.Message = err.Error()
		return result
	}

	result.Success = true
	result.Message = "Folder created successfully"
	return result
}

// 重命名
func (fh *FolderHandler) Rename(folderPath string, oldName string, newName string) dto.ResultDto {
	result := dto.ResultDto{}

	oldPath := filepath.Join(folderPath, oldName)
	newPath := filepath.Join(folderPath, newName)
	err := os.Rename(oldPath, newPath)
	if err != nil {
		result.Success = false
		result.Message = err.Error()
		return result
	}

	result.Success = true
	result.Message = "Folder renamed successfully"
	return result
}

// 删除
func (fh *FolderHandler) Remove(folderPath string) dto.ResultDto {
	result := dto.ResultDto{}

	err := os.RemoveAll(folderPath)
	if err != nil {
		result.Success = false
		result.Message = err.Error()
		return result
	}

	result.Success = true
	result.Message = "Folder removed successfully"
	return result
}

// 查询
func (fh *FolderHandler) Stat(folderPath string) dto.ResultDto {
	result := dto.ResultDto{}

	info, err := os.Stat(folderPath)
	if err != nil {
		result.Success = false
		result.Message = err.Error()
		return result
	}

	result.Success = true
	result.Message = "Folder status retrieved successfully"
	result.Data = info
	return result
}

// 查询
func (fh *FolderHandler) Children(folderPath string) dto.ResultDto {
	result := dto.ResultDto{}

	dir, err := os.Open(folderPath)
	if err != nil {
		result.Success = false
		result.Message = err.Error()
		return result
	}
	defer dir.Close()

	files, err := dir.Readdir(-1)
	if err != nil {
		result.Success = false
		result.Message = err.Error()
		return result
	}

	var children []dto.FileInfoBaseDto
	for _, file := range files {
		child := dto.FileInfoBaseDto{}

		child.Name = file.Name()
		child.Size = file.Size()
		child.Mode = file.Mode()
		child.ModTime = file.ModTime()
		child.IsDir = file.IsDir()
		child.Sys = file.Sys()
		children = append(children, child)
	}

	result.Success = true
	result.Message = "Folder children retrieved successfully"
	result.Data = children
	return result
}
