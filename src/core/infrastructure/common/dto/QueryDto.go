package dto

type QueryDto struct {
	// 页码
	Page int `json:"page" form:"page"`
	// 页容量
	Size int `json:"size" form:"size"`
	// 名称
	Name string `json:"name" form:"name"`

	Path string `json:"path" form:"path"`
}
