package dto

// 结果dto
type ResultDto[T any] struct {
	Code    int    `json:"code"`
	Success bool   `json:"success"`
	Data    T      `json:"data"`
	Message string `json:"message"`
}

// Error implements error.
func (r ResultDto[T]) Error() string {
	panic("unimplemented")
}
