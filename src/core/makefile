
server: 
	sudo -E $(GOPATH)/bin/dlv debug --headless --listen=:2345 --api-version=2 --accept-multiclient ./main.go

opensu:
	sudo code --no-sandbox --user-data-dir=/share/config/.vscode . 

autofix:
	go mod tidy
 