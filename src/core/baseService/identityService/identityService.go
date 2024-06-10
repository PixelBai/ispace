package identityservice

import (
	"errors"
	"time"

	identitydbbase "gitee.com/ispace/core/base/identityDbBase"
	"gitee.com/ispace/core/infrastructure/common/dto"
	sonwflakeUtil "gitee.com/ispace/core/infrastructure/common/util"
)

type IdentityService struct {
	db identitydbbase.IdentityDb
}

// 添加
func Create() IdentityService {

	// step 1: 构建对象
	var identityService = IdentityService{}
	// step 2: 初始化参数
	identityService.db = identitydbbase.AutoCreate()
	// step end: 对指针类型加方法和对象
	return identityService
}

// 添加身份信息
func (identityService *IdentityService) AddIdentity(name string, desc string) (dto.IdentityDto, error) {

	// step init：
	identityDto := dto.IdentityDto{}

	// step 1： 构建id
	id, errId := sonwflakeUtil.GetId()
	if errId != nil {
		return identityDto, errors.New("获取身份Id失败，--" + errId.Error())
	}
	identityDto.Id = id
	// step 2： 构建编号
	code, errCode := sonwflakeUtil.GetCode()
	if errCode != nil {
		return identityDto, errors.New("获取身份编号失败，--" + errCode.Error())
	}
	identityDto.Code = code
	// step 3: 构建完整身份信息
	identityDto.CreateTime = time.Now()
	identityDto.UpdateTime = identityDto.CreateTime
	identityDto.Name = name
	identityDto.Desc = desc
	// step 4： 调用db入库
	result := identityService.db.AddOne(identityDto)
	if !result {
		return identityDto, errors.New("添加用户信息入库失败")
	}
	return identityDto, nil
}

// 查找身份信息
func (identityService *IdentityService) FindIdentity(id int64) (dto.IdentityDto, error) {

	// step 1： 从db库中查询
	identityDto, err := identityService.db.FindOneById(id)

	// step 4： 调用db入库
	return identityDto, err
}
