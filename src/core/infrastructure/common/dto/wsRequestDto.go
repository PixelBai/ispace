package dto

type WsRequestDto struct {
	Header struct {
		RequestId  string `json:"requestId"`
		Controller string `json:"controller"`
		Method     string `json:"method"`
		Token      string `json:"token"`
		UserName   string `json:"userName"`
		// Add more fields as needed
		Additional map[string]interface{} `json:"-"`
	} `json:"header"`

	Body struct {
		// Add more fields as needed
		Additional map[string]interface{} `json:"-"`
	} `json:"body"`
}
