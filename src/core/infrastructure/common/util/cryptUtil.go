package util

import (
	"fmt"

	"github.com/msteinert/pam"
)

func PamAuthenticate(username, password string) error {
	t, err := pam.StartFunc("login", username, func(s pam.Style, msg string) (string, error) {
		switch s {
		case pam.PromptEchoOff:
			return password, nil
		case pam.PromptEchoOn:
			return password, nil
		case pam.ErrorMsg, pam.TextInfo:
			fmt.Println(msg)
			return "", nil
		}
		return "", fmt.Errorf("unrecognized PAM message style: %d", s)
	})
	if err != nil {
		return err
	}

	if err = t.Authenticate(0); err != nil {
		return err
	}
	return nil
}
