#!/bin/bash

# Desc: Nginx 服务初始化脚本
# 检查 Nginx 进程是否存在
pgrep nginx

# 如果进程存在但 PID 文件丢失，强制重新生成
sudo pkill -9 nginx       # 终止所有 Nginx 进程
sudo rm -f /run/nginx.pid # 删除无效的 PID 文件
sudo service nginx start  # 使用 SysVinit 启动 Nginx