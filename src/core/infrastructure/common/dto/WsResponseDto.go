package dto

type WsResponseDto struct {
	Header struct {
		Id string `json:"id"`
	} `json:"header"`

	Body interface{} `json:"body"`
}
