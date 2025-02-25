```

██╗   ██╗██╗   ██╗███████╗██████╗
██║   ██║██║   ██║██╔════╝╚════██╗
██║   ██║██║   ██║█████╗   █████╔╝
╚██╗ ██╔╝██║   ██║██╔══╝   ╚═══██╗
 ╚████╔╝ ╚██████╔╝███████╗██████╔╝
  ╚═══╝   ╚═════╝ ╚══════╝╚═════╝


```

## 简介

Vue Template。使用`vite`，基于 `vue3 + TypeScript + vue-router + vuex + elementPlus` 开发。支持多语言和暗黑模式。

## 产品名

Vue Template

## 使用技术

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Es6+](http://es6.ruanyifeng.com/) - es6
- [Vite](https://www.pipipi.net/vite/) - vite
- [Vue3](https://staging-cn.vuejs.org/guide/introduction.html) - Vue
- [Vue-Router](https://router.vuejs.org/zh/) - Vue Router
- [Vuex](https://next.vuex.vuejs.org/zh/index.html) - vuex
- [Element-Plus](https://element-plus.org/zh-CN/) - ui
- [vue-i18n](https://kazupon.github.io/vue-i18n/zh/introduction.html#%E8%B5%9E%E5%8A%A9%E5%95%86) Language

## 安装

```
pnpm
```

## 启动服务

```
pnpm dev
```

## 编译并发布

```
pnpm deploy
```

## iconiFy

http://icon-sets.iconify.design/mdi/

## declaration (.d.ts) file
[env.d.ts](src/env.d.ts)

## hooks

[dict](src/Hooks/dict.ts)

## 图片上传 API

[picgo](https://www.picgo.net/)
[cdnjson](https://cdnjson.com/)

## 请求拦截器 & 响应拦截器

[api](src/api/index.ts)

## 路由鉴权

[navigationGuards](src/navigationGuards.ts)

## Docker
- [Dockerfile](./Dockerfile)
- [.dockerignore](./.dockerignore)
- [nginx.conf.template](./nginx.conf.template)
- [build.sh](./build.sh)
- [docker-compose.yml](./docker-compose.yml)

## Actions
#### 生成无密码的密钥对
```bash
# 本地生成新密钥对（注意 -N 后是空字符串）
ssh-keygen -t rsa -b 4096 -C "jyoketsu@gmail.com" -f ./github-actions-key -N ""
```
将新生成的 `github-actions-key` (无密码私钥) 内容存入 `SSH_PRIVATE_KEY`  
将 `github-actions-key.pub` (公钥) 内容添加到服务器的 `/root/.ssh/authorized_keys`  

#### 服务器的 SSH 配置
```bash
vi /etc/ssh/sshd_config
```
确保以下配置正确
```bash
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

#### 获取目标服务器的 SSH 主机密钥
```bash
ssh-keyscan 47.102.193.24
```
将输出的内容复制到 GitHub Secrets 中的  `SSH_KNOWN_HOSTS`。

#### 配置 Workflows
- [main.yml](./.github/workflows/main.yml)

#### todo：Https
 Workspace 服务是通过docker-compose部署的，其中前端frontend是通过nginx镜像构建的镜像，那么，怎么让这个服务启用https呢，怎么安装Let's Encrypt证书？