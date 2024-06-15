package folderhandler

import "gitee.com/ispace/core/infrastructure/common/dto"

// 身份控制器-类
type FolderHandler struct {
	Wsr dto.WsRequestDto
}

// 新增
func (fh *FolderHandler) Create(name string, folderPath string) dto.ResultDto {

	// step init:
	result := dto.ResultDto{}

	// step core:

	// step end:
	return result
}

// 重命名
func (fh *FolderHandler) Rename(folderPath string, name string) dto.ResultDto {

	// step init:
	result := dto.ResultDto{}

	// step core:

	// step end:
	return result
}

// 删除
func (fh *FolderHandler) Remove(folderPath string) dto.ResultDto {

	// step init:
	result := dto.ResultDto{}

	// step core:

	// step end:
	return result
}

// *查询
func (fh *FolderHandler) Search(folderPath string) dto.ResultDto {

	// step init:
	result := dto.ResultDto{}

	// step core:

	// step end:
	return result
}
