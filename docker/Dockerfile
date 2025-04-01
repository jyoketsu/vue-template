# 使用更小的基础镜像
ARG NODE_VERSION=node:22.14-alpine

# 第一阶段：构建依赖项
FROM ${NODE_VERSION} AS dependency-base

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install && \
	npm cache clean --force # 清理构建缓存

# 第二阶段：构建应用程序
FROM dependency-base AS production-base

# 把宿主机当前目录所有内容，复制到容器的 /app 目录
COPY . .

ARG VITE_AMAP_WEB_KEY
ENV VITE_AMAP_WEB_KEY=${VITE_AMAP_WEB_KEY}

# 构建项目
RUN npm run build

# 第三阶段：使用 Nginx 镜像
# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:1.21.6-alpine

# 设置工作目录
WORKDIR /etc/nginx

# 安装 envsubst 工具，用于替换 Nginx 配置文件中的环境变量
RUN apk --no-cache add gettext

# 复制 nginx.conf 模板文件到容器
COPY docker/nginx.conf.template /etc/nginx/nginx.conf.template

# 设置环境变量
# ARG 是 Dockerfile 中的一个指令，用于定义在构建阶段可以传递给构建过程的变量，在构建 Docker 镜像时，你可以使用 --build-arg 选项来传递这个参数
ARG VITE_PIC_GO_KEY
ENV VITE_PIC_GO_KEY=${VITE_PIC_GO_KEY}

# 输出环境变量以进行调试
RUN echo "VITE_PIC_GO_KEY=${VITE_PIC_GO_KEY}"
RUN echo "VITE_AMAP_WEB_KEY=${VITE_AMAP_WEB_KEY}"

# 使用 envsubst 替换 nginx.conf 中的环境变量
RUN envsubst '${VITE_PIC_GO_KEY}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# 复制构建输出到 Nginx 的 html 目录
COPY --from=production-base /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]