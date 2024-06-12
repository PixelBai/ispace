# 使用 Ubuntu 22.04 作为基础镜像
FROM ubuntu

# 设置环境变量
ENV DEBIAN_FRONTEND=noninteractive

# 安装必要的软件包
RUN apt-get update && \
    apt-get install -y wget git ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app
# 复制项目文件
COPY . .
 
# 安装 Go 语言
RUN tar -C /usr/local -xzf source/go1.22.4.linux-amd64.tar.gz && \
    rm source/go1.22.4.linux-amd64.tar.gz 

# 设置 Go 环境变量
ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOPROXY=https://goproxy.io,direct
 

# 下载依赖
RUN go mod download
 
# 安装 Delve 调试器
RUN go install github.com/go-delve/delve/cmd/dlv@latest

# 编译 Go 应用程序
RUN go build -o main .

# 设置容器启动时执行的命令
CMD ["dlv", "debug", "--headless", "--listen=:2345", "--api-version=2", "--accept-multiclient", "./main"]
