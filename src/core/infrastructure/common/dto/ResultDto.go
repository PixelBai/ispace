package dto

// 结果dto
type ResultDto struct {
	Code    int    `json:"code"`
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message"`
}

// Error implements error.
func (r ResultDto) Error() string {
	panic("unimplemented")
}
