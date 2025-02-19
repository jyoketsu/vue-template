#!/bin/bash

# 定义变量
APP_NAME="vue3-template" # 应用镜像名称
VERSION="latest"         # 应用镜像版本

# 读取 .env 文件中的环境变量
export $(grep -v '^#' .env | xargs)

# 构建 Docker 镜像
echo "Building Docker image..."
docker build --build-arg VITE_PIC_GO_KEY=${VITE_PIC_GO_KEY} -t ${APP_NAME}:${VERSION} .

# 清理本地构建的镜像（可选）
# echo "Cleaning up local Docker images..."
# docker rmi ${APP_NAME}:${VERSION}

echo "Build completed."

# 运行 Docker 容器
# echo "Running Docker container..."
# docker run -d -p 5173:80 --name ${APP_NAME} ${APP_NAME}:${VERSION}
# echo "run completed."
