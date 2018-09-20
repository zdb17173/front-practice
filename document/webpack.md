

[文档](https://www.webpackjs.com/guides/getting-started/)

webpack 用于编译 JavaScript 模块。
一旦完成安装，你就可以通过 webpack 
的 CLI 或 API 与其配合交互。
如果你还不熟悉 webpack，请阅读核心概念
和打包器对比，了解为什么你要使用 webpack，
而不是社区中的其他工具。

# begin

## webpack安装

```
npm install webpack webpack-cli
```

## helloworld

dist/index.html
```html
<!doctype html>
<html>
<head>
    <title>起步</title>
</head>
<body>
<script src="main.js"></script>
</body>
</html>
```

src/index.js
```javascript
import _ from 'lodash'

function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());
```

编译`npx webpack`


访问index.html，可以看到'Hello webpack'。


## 使用配置文件

在webpack4中，可以无需使用任何配置，但是在实际
项目中由于过于复杂的命令行命令不如直接在配置文件
中编写。因此，webpack仍然支持webpack.config.js

创建一个webpack.config.js

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

重新进行打包`npx webpack --webpack.config.js`
每次都输入命令很麻烦，可以在package.json中的scripts中增加配置
就可以通过npm run build来进行编译了
```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  }
}
```


# develop

## source map

开发过程中，由于webpack打包成一个js文件难以调试
可以在webpack.config.js中增加以下代码，便于调试。
```javascript
module.exports = {
    devtool: 'inline-source-map'
}
```

## watch

修改代码后自动build，在package.json中增加以下代码
就可以使用npm run watch来进行持续监听。
```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch"
  }
}
```

## webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web 服务器，
并且能够实时重新加载(live reloading)。
首先进行安装 `npm install --save-dev webpack-dev-server`

修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：

webpack.config.js

```javascript
module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',//debug找到源代码
       devServer: {//开发服务
         contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
};
```

package.json

```json
 {
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
      "start": "webpack-dev-server --open"
    }
}
```

使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“安全写入”功能，
可能会影响重新编译。

要在一些常见的编辑器中禁用此功能，
请查看以下列表：

- Sublime Text 3 - 在用户首选项(user preferences)中添加 atomic_save: "false"。
- IntelliJ - 在首选项(preferences)中使用搜索，查找到 "safe write" 并且禁用它。
- Vim - 在设置(settings)中增加 :set backupcopy=yes。
- WebStorm - 在 Preferences > Appearance & Behavior > System Settings 中取消选中 Use "safe write"。


## module

开发代码时，区分模块十分重要

多模块引用相同依赖时会报错：
`Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks 0 and 1)`

解决重复块：
```javascript
module.exports = {
    entry: {
        "main": "./src/index.js",
        "module1": "./src/module1.js"
    },
    output: {
        //输出进行调整，最终输出:
        //main.bundle.js  module1.bundle.js common.bundle.js
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',//开发定位何处报错
    devServer: {
        contentBase: './dist'
    },
    plugins: [

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
};
```

html依赖修改,引用三个js文件
```html
<script src="commons.bundle.js"></script>
<script src="main.bundle.js"></script>
<script src="module1.bundle.js"></script>
```



