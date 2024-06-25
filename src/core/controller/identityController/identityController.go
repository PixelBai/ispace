package identityController

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"

	"gitee.com/ispace/core/infrastructure/common/dto"
	"gitee.com/ispace/core/infrastructure/common/util"
)

var secret_key = uuid.New().String()

// 身份控制器-类
type IdentityController struct {
}

func New() IdentityController {
	ic := IdentityController{}
	return ic
}

// 接口名称：登录
// 请求：账号、密码
// 响应：token
func (ic *IdentityController) GetToken(name string, password string) dto.ResultDto[string] {
	// step init:
	var result dto.ResultDto[string]

	// step 1: 获取数据
	file, err := os.Open("/etc/shadow")
	if err != nil {
		result.Code = 10002
		result.Success = false
		result.Message = "Failed to open /etc/shadow file."
		return result
	}
	defer file.Close()

	// step 2: 校验账号密码
	scanner := bufio.NewScanner(file)
	is_ok := false
	for scanner.Scan() {
		line := scanner.Text()
		fields := strings.Split(line, ":")

		// step 2.2: 获取 name 对应记录
		if fields[0] == name {

			err := util.PamAuthenticate(name, password)
			if err != nil {
				result.Code = 10004
				result.Success = false
				result.Message = "Error password" + err.Error()
				return result
			} else {
				is_ok = true
			}
		}
	}

	if err := scanner.Err(); err != nil {
		result.Code = 10002
		result.Success = false
		result.Message = "Error reading /etc/shadow file."
		return result
	}

	// step 3: 未找到用户
	if !is_ok {
		result.Code = 10001
		result.Success = false
		result.Message = "User not found."
		return result
	}

	// step 4：生成jwt token，封装name，有效期一个小时
	// Generate JWT token
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = name
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString([]byte(secret_key))
	if err != nil {
		result.Code = 10005
		result.Success = false
		result.Message = "Failed to generate JWT token."
		return result
	}
	// step 5：end
	result.Code = 200
	result.Success = true
	result.Message = "成功"
	result.Data = tokenString
	return result
}

// 接口名称： 验证
// 请求：token
// 相应：无
func (ic *IdentityController) Verify(token string) dto.ResultDto[any] {

	// step init:
	result := dto.ResultDto[any]{}
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret_key), nil
	})

	if err != nil {
		result.Code = 10006
		result.Success = false
		result.Message = "Failed to parse JWT token."
		return result
	}

	// step 2: Check if token is valid
	if !parsedToken.Valid {
		result.Code = 10007
		result.Success = false
		result.Message = "Invalid token."
		return result
	}

	// step 3: Token is valid
	result.Code = 200
	result.Success = true
	result.Message = "Token is valid."
	return result
}
