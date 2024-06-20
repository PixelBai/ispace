package itf

import "gitee.com/ispace/core/infrastructure/common/dto"

// 定义处理器接口
type BaseHandler interface {
	Init(dto.WsRequestDto)
	Execute() dto.WsResponseDto
}
