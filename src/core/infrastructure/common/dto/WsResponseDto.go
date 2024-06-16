package dto

type WsResponseDto struct {
	Header struct {
		Id   string `json:"id"`
		Stat int    `json:"stat"`
	} `json:"header"`

	Body interface{} `json:"body"`
}
