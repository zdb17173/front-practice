


## 概要
npm: Nodejs下的包管理器。

webpack: 它主要的用途是通过CommonJS的语法把所有浏览器端需要发布的静态资源做相应的准备，比如资源的合并和打包。

vue-cli: 用户生成Vue工程模板。（帮你快速开始一个vue的项目，也就是给你一套vue的结构，包含基础的依赖库，只需要 npm install就可以安装）

## 安装

[nodejs官网](https://nodejs.org/en/)

下载
node-v8.9.3-x64.msi

custom-setup时候要选择ADD to PATH，自动加入环境变量，省的设置了


echo %PATH%可以查看是否添加

```
npm list -global
```

检测安装成功
```
node -v
npm -v

```

设置淘宝镜像
```
#设置淘宝镜像
npm config set registry=http://registry.npm.taobao.org

#测试
npm config get registry

#检测
npm info vue
```


配置
```
#手动指定缓存及包路径
npm config set prefix "C:\dev\soft\nodejs\node_global"
npm config set cache "C:\dev\soft\nodejs\node_cache"

#查看所有配置
npm config list

#直接编辑查看配置文件
C:\Users\Administrator\.npmrc
```

## 创建一个工程

进入一个目录，执行npm init -y
会在目录下生成package.json，所有前端依赖的js包都在文件中进行配置





## 安装vue

```
npm install vue -g
```