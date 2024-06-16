package itf

import "gitee.com/ispace/core/infrastructure/common/dto"

// 定义处理器接口
type Handler interface {
	SetWsr(wsr dto.WsRequestDto)
}
