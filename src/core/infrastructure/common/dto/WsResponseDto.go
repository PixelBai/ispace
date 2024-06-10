package dto

type WsResponseDto struct {
	Header struct {
		RequestId string `json:"requestId"`
		// Add more fields as needed
		Additional map[string]interface{} `json:"-"`
	} `json:"header"`

	Body struct {
		// Add more fields as needed
		Additional map[string]interface{} `json:"-"`
	} `json:"body"`
}
