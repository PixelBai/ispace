## nginx 

## 加载
sh config.sh

**step 1: 安装
sudo apt update
# 查看当前可用的版本
sudo apt-cache show nginx
sudo apt install -y nginx=1.18.0-6ubuntu14.4

**step 2: 验证
# 使用curl命令访问服务
curl http://127.0.0.1

**step 3： 控制

systemctl status nginx

sudo systemctl stop nginx

sudo systemctl start nginx
sudo systemctl restart nginx

**step 4： 文件存放目录
var/log/nginx	nginx运行日志的目录
/var/www/html	web项目目录
/usr/sbin/nginx	服务文件
/etc/nginx	配置文件目录

**step 5：卸载
sudo apt purge nginx
sudo rm -rf /var/log/nginx /var/www/html /etc/nginx
sudo apt autoremove

**step 6: init或者修复 
# 检查 Nginx 进程是否存在
pgrep nginx

# 如果进程存在但 PID 文件丢失，强制重新生成
sudo pkill -9 nginx       # 终止所有 Nginx 进程
sudo rm -f /run/nginx.pid # 删除无效的 PID 文件
sudo service nginx start  # 使用 SysVinit 启动 Nginx