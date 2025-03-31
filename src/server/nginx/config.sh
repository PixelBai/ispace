#!/bin/bash

# 复制新的配置文件到 Nginx 配置目录
sudo cp /root/code/ispace/src/server/nginx/config/nginx.conf /etc/nginx/nginx.conf
if [ $? -ne 0 ]; then
    echo "Failed to copy nginx.conf"
    exit 1
fi

# 测试 Nginx 配置:
sudo nginx -t
if [ $? -ne 0 ]; then
    echo "Nginx configuration test failed"
    exit 1
fi

# 热重载 Nginx
sudo nginx -s reload
if [ $? -eq 0 ]; then
    echo "Nginx reloaded successfully"
    exit 0
else
    echo "Failed to reload Nginx"
    exit 1
fi
