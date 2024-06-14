package dto

type WsRequestDto struct {
	Header struct {
		Id      string `json:"id"`
		Handler string `json:"handler"`
		Token   string `json:"token"`
	} `json:"header"`

	Body any `json:"body"`
}
