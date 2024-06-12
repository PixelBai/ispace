package identitydbbase

import (
	"gitee.com/ispace/core/infrastructure/common/dto"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type IdentityDb struct {
	ConnStr string   `连接字符串`
	Db      *gorm.DB `数据库对象`
}

// 添加对象
func AutoCreate() IdentityDb {
	var identityDb = IdentityDb{}

	identityDb.Config("alei:1qaz@WSX@tcp(dreampeople.top:3306)/identityapp?charset=utf8mb4&parseTime=True")
	identityDb.Conn()

	return identityDb
}

// 配置数据库
func (identityDb *IdentityDb) Config(connectionStr string) *IdentityDb {
	identityDb.ConnStr = connectionStr
	return identityDb
}

// 连接数据库
func (identityDb *IdentityDb) Conn() (*IdentityDb, error) {
	db, err := gorm.Open(mysql.Open(identityDb.ConnStr), &gorm.Config{})
	if err != nil {
		return identityDb, err
	}
	identityDb.Db = db
	return identityDb, nil
}

// 添加身份信息
func (identityDb *IdentityDb) AddOne(identity dto.IdentityDto) bool {

	// step 1： sql
	var sql string = "INSERT INTO `identityapp`.`identity` (`id`, `create_time`, `update_time`, `code`, `name`, `desc`) VALUES (?, ?,?,?, ?, ?);"
	// step 2： 添加
	return identityDb.Db.Exec(sql, identity.Id, identity.CreateTime, identity.UpdateTime, identity.Code, identity.Name, identity.Desc).RowsAffected > 0
}

// 查找用户身份
func (identityDb *IdentityDb) FindOneById(id int64) (dto.IdentityDto, error) {
	// step init:
	var identityDto dto.IdentityDto

	// step 1: sql
	var sql string = "select `id` as Id, `create_time`, `update_time`, `code`, `name`, `desc` from identity where id = ?;"

	// step 2: 查询
	identityDb.Db.Debug().Raw(sql, id).Take(&identityDto)

	// step end：
	return identityDto, nil
}
