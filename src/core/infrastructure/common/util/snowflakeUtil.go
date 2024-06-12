package util

import (
	"errors"

	"github.com/bwmarrin/snowflake"
)

// 获取唯一Id
func GetId() (int64, error) {
	// step init:
	node, err := snowflake.NewNode(1)
	if err != nil {
		return 0, errors.New("初始化雪花算法节点失败" + err.Error())
	}

	// step 1: 获取数据
	return node.Generate().Int64(), nil
}

// 获取唯一编号
func GetCode() (string, error) {
	// step init:
	node, err := snowflake.NewNode(1)
	if err != nil {
		return "", errors.New("初始化雪花算法节点失败" + err.Error())
	}

	// step 1: 获取数据
	return "n" + node.Generate().String(), nil
}
