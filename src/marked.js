
import marked from 'marked';
import 'highlight.js/styles/dracula.css'

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/htmlbars';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('json', json);
hljs.registerLanguage('json', java);
hljs.registerLanguage('bash', bash);

$(function () {

    var str = "\n" +
        "\n" +
        "[文档](https://www.webpackjs.com/guides/getting-started/)\n" +
        "\n" +
        "webpack 用于编译 JavaScript 模块。\n" +
        "一旦完成安装，你就可以通过 webpack \n" +
        "的 CLI 或 API 与其配合交互。\n" +
        "如果你还不熟悉 webpack，请阅读核心概念\n" +
        "和打包器对比，了解为什么你要使用 webpack，\n" +
        "而不是社区中的其他工具。\n" +
        "\n" +
        "# begin\n" +
        "\n" +
        "## webpack安装\n" +
        "\n" +
        "```bash\n" +
        "npm install webpack webpack-cli\n" +
        "```\n" +
        "\n" +
        "## helloworld\n" +
        "\n" +
        "dist/index.html\n" +
        "```html\n" +
        "<!doctype html>\n" +
        "<html>\n" +
        "<head>\n" +
        "    <title>起步</title>\n" +
        "</head>\n" +
        "<body>\n" +
        "<script src=\"main.js\"></script>\n" +
        "</body>\n" +
        "</html>\n" +
        "```\n" +
        "\n" +
        "src/index.js\n" +
        "```javascript\n" +
        "import _ from 'lodash'\n" +
        "\n" +
        "function component() {\n" +
        "    var element = document.createElement('div');\n" +
        "\n" +
        "    // Lodash, now imported by this script\n" +
        "    element.innerHTML = _.join(['Hello', 'webpack'], ' ');\n" +
        "\n" +
        "    return element;\n" +
        "}\n" +
        "\n" +
        "document.body.appendChild(component());\n" +
        "```\n" +
        "\n" +
        "编译`npx webpack`\n" +
        "\n" +
        "\n" +
        "访问index.html，可以看到'Hello webpack'。\n" +
        "\n" +
        "\n" +
        "## 使用配置文件\n" +
        "\n" +
        "在webpack4中，可以无需使用任何配置，但是在实际\n" +
        "项目中由于过于复杂的命令行命令不如直接在配置文件\n" +
        "中编写。因此，webpack仍然支持webpack.config.js\n" +
        "\n" +
        "创建一个webpack.config.js\n" +
        "\n" +
        "```javascript\n" +
        "const path = require('path');\n" +
        "\n" +
        "module.exports = {\n" +
        "  entry: './src/index.js',\n" +
        "  output: {\n" +
        "    filename: 'bundle.js',\n" +
        "    path: path.resolve(__dirname, 'dist')\n" +
        "  }\n" +
        "};\n" +
        "```\n" +
        "\n" +
        "重新进行打包`npx webpack --webpack.config.js`\n" +
        "每次都输入命令很麻烦，可以在package.json中的scripts中增加配置\n" +
        "就可以通过npm run build来进行编译了\n" +
        "```json\n" +
        "{\n" +
        "  \"scripts\": {\n" +
        "    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",\n" +
        "    \"build\": \"webpack\"\n" +
        "  }\n" +
        "}\n" +
        "```\n" +
        "\n" +
        "\n" +
        "# develop\n" +
        "\n" +
        "## source map\n" +
        "\n" +
        "开发过程中，由于webpack打包成一个js文件难以调试\n" +
        "可以在webpack.config.js中增加以下代码，便于调试。\n" +
        "```javascript\n" +
        "module.exports = {\n" +
        "    devtool: 'inline-source-map'\n" +
        "}\n" +
        "```\n" +
        "\n" +
        "## watch\n" +
        "\n" +
        "修改代码后自动build，在package.json中增加以下代码\n" +
        "就可以使用npm run watch来进行持续监听。\n" +
        "```json\n" +
        "{\n" +
        "  \"scripts\": {\n" +
        "    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",\n" +
        "    \"build\": \"webpack\",\n" +
        "    \"watch\": \"webpack --watch\"\n" +
        "  }\n" +
        "}\n" +
        "```\n" +
        "\n" +
        "## webpack-dev-server\n" +
        "\n" +
        "`webpack-dev-server` 为你提供了一个简单的 web 服务器，\n" +
        "并且能够实时重新加载(live reloading)。\n" +
        "首先进行安装 `npm install --save-dev webpack-dev-server`\n" +
        "\n" +
        "修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：\n" +
        "\n" +
        "webpack.config.js\n" +
        "\n" +
        "```javascript\n" +
        "module.exports = {\n" +
        "    entry: {\n" +
        "      app: './src/index.js',\n" +
        "      print: './src/print.js'\n" +
        "    },\n" +
        "    devtool: 'inline-source-map',//debug找到源代码\n" +
        "       devServer: {//开发服务\n" +
        "         contentBase: './dist'\n" +
        "    },\n" +
        "    plugins: [\n" +
        "      new CleanWebpackPlugin(['dist']),\n" +
        "      new HtmlWebpackPlugin({\n" +
        "        title: 'Development'\n" +
        "      })\n" +
        "    ],\n" +
        "    output: {\n" +
        "      filename: '[name].bundle.js',\n" +
        "      path: path.resolve(__dirname, 'dist')\n" +
        "    }\n" +
        "};\n" +
        "```\n" +
        "\n" +
        "package.json\n" +
        "\n" +
        "```json\n" +
        " {\n" +
        "    \"name\": \"development\",\n" +
        "    \"version\": \"1.0.0\",\n" +
        "    \"description\": \"\",\n" +
        "    \"main\": \"webpack.config.js\",\n" +
        "    \"scripts\": {\n" +
        "      \"start\": \"webpack-dev-server --open\"\n" +
        "    }\n" +
        "}\n" +
        "```\n" +
        "\n" +
        "使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“安全写入”功能，\n" +
        "可能会影响重新编译。\n" +
        "\n" +
        "要在一些常见的编辑器中禁用此功能，\n" +
        "请查看以下列表：\n" +
        "\n" +
        "- Sublime Text 3 - 在用户首选项(user preferences)中添加 atomic_save: \"false\"。\n" +
        "- IntelliJ - 在首选项(preferences)中使用搜索，查找到 \"safe write\" 并且禁用它。\n" +
        "- Vim - 在设置(settings)中增加 :set backupcopy=yes。\n" +
        "- WebStorm - 在 Preferences > Appearance & Behavior > System Settings 中取消选中 Use \"safe write\"。\n" +
        "\n" +
        "\n" +
        "## module\n" +
        "\n" +
        "开发代码时，区分模块十分重要\n" +
        "\n" +
        "多模块引用相同依赖时会报错：\n" +
        "`Conflict: Multiple chunks emit assets to the same filename bundle.js (chunks 0 and 1)`\n" +
        "\n" +
        "解决重复块：\n" +
        "```javascript\n" +
        "module.exports = {\n" +
        "    entry: {\n" +
        "        \"main\": \"./src/index.js\",\n" +
        "        \"module1\": \"./src/module1.js\"\n" +
        "    },\n" +
        "    output: {\n" +
        "        //输出进行调整，最终输出:\n" +
        "        //main.bundle.js  module1.bundle.js common.bundle.js\n" +
        "        filename: '[name].bundle.js',\n" +
        "        chunkFilename: '[name].bundle.js',\n" +
        "        path: path.resolve(__dirname, 'dist')\n" +
        "    },\n" +
        "    devtool: 'inline-source-map',//开发定位何处报错\n" +
        "    devServer: {\n" +
        "        contentBase: './dist'\n" +
        "    },\n" +
        "    plugins: [\n" +
        "\n" +
        "    ],\n" +
        "    optimization: {\n" +
        "        splitChunks: {\n" +
        "            cacheGroups: {\n" +
        "                commons: {\n" +
        "                    name: \"commons\",\n" +
        "                    chunks: \"initial\",\n" +
        "                    minChunks: 2\n" +
        "                }\n" +
        "            }\n" +
        "        }\n" +
        "    },\n" +
        "};\n" +
        "```\n" +
        "\n" +
        "html依赖修改,引用三个js文件\n" +
        "```html\n" +
        "<script src=\"commons.bundle.js\"></script>\n" +
        "<script src=\"main.bundle.js\"></script>\n" +
        "<script src=\"module1.bundle.js\"></script>\n" +
        "```";

    hljs.initHighlightingOnLoad();
    var myMarked = require('marked');
    myMarked.setOptions({
        renderer: new myMarked.Renderer(),
        highlight: function(code) {
            var s =  hljs.highlightAuto(code).value;
            console.log(s);
            return s;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    document.getElementById('content').innerHTML = myMarked(str);
});
