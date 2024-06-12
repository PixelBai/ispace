package dto

import "time"

// 身份Dto
type IdentityDto struct {
	Id         int64     `json:"id,string" gorm:"column:id;"`
	CreateTime time.Time `json:"createTime" gorm:"column:create_time;"`
	UpdateTime time.Time `json:"updateTime" gorm:"column:update_time;"`
	Code       string    `json:"code" gorm:"column:code;"`
	Name       string    `json:"name" gorm:"column:name;"`
	Desc       string    `json:"desc" gorm:"column:desc;"`
}
