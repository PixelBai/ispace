# Makefile for ispace project
.Phony: all install build nginx_config core_run desktop_install hyperlink_install resource_manager_install text_editor_install DriveEngin_install windows_install front_install core_install front_build DriveEngin_build desktop_build hyperlink_build resource_manager_build text_editor_build windows_build

all: install build nginx_config core_run
	@echo "all done"

core_run:
	cd /code/ispace/src/core && go run .

install: desktop_install hyperlink_install resource_manager_install text_editor_install DriveEngin_install windows_install front_install core_install
	@echo "install done"

build: front_build DriveEngin_build desktop_build hyperlink_build resource_manager_build text_editor_build windows_build
	@echo "build done"

nginx_config: /code/ispace/src/server/nginx/init.sh /code/ispace/src/server/nginx/config.sh
	@echo "nginx config"
	sh /code/ispace/src/server/nginx/init.sh
	sh /code/ispace/src/server/nginx/config.sh

## step 1：环境安装
desktop_install:
	cd /code/ispace/src/app/desktop/front/desktop && npm install

hyperlink_install:
	cd /code/ispace/src/app/hyperlink/front/hyperlink && npm install

resource_manager_install:
	cd /code/ispace/src/app/resource-manager/front/resource-manager && npm install

text_editor_install:
	cd /code/ispace/src/app/text-editor/front/text-editor && npm install

DriveEngin_install:
	cd /code/ispace/src/cmnComp/DriveEngin && npm install

windows_install:
	cd /code/ispace/src/cmnComp/windows && npm install

front_install:
	cd /code/ispace/src/core/front && npm install

core_install:
	cd /code/ispace/src/core && go clean -modcache && go mod tidy

## step 2：编译构建
front_build:
	cd /code/ispace/src/core/front && npm run build && npm link

DriveEngin_build:
	cd /code/ispace/src/cmnComp/DriveEngin && npm run build && npm link

desktop_build:
	cd /code/ispace/src/app/desktop/front/desktop && npm run link && npm run build

hyperlink_build:
	cd /code/ispace/src/app/hyperlink/front/hyperlink && npm run link && npm run build

resource_manager_build:
	cd /code/ispace/src/app/resource-manager/front/resource-manager && npm run link && npm run build

text_editor_build:
	cd /code/ispace/src/app/text-editor/front/text-editor && npm run link && npm run build

windows_build:
	cd /code/ispace/src/cmnComp/windows && npm run build
 
 