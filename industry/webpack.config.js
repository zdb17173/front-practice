const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
var fs = require('fs');
const glob = require('glob');

const webpackConfig = {
    devServer: {
        historyApiFallback: true
    },
    devtool: 'eval-source-map',//开发工具，用于debug源码使用，正式环境需要注掉
    entry: require('./webpackconfig/entry.js'),//扫描entries目录下所有js文件 也可以使用下面的固定写法
    // entry: {
    //     "index" : "./src/entries/index.js",
    //     "aa" : "./src/entries/aa.js"
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        // alias: {
        //     components: path.resolve(__dirname, './src/components'),
        //     context: path.resolve(__dirname, './src/context'),
        //     pages: path.resolve(__dirname, './src/pages')
        // }
    },
    module: {
        rules: [
            {
                test: /\.(js|tsx?)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', "@babel/typescript"],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                            ]
                        }

                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']],
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']],
                            },

                        }
                    },
                    // 'less-loader',
                    { 
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/[name].css'}),
        // new HtmlWebPackPlugin({
        //     template: 'public/index.html',
        //     filename: 'index.html',
        //     inject: true,
        //     chunks: ['index']
        // }),
        // new HtmlWebPackPlugin({
        //     template: 'public/aa.html',
        //     filename: 'aa.html',
        //     inject: true,
        //     chunks: ['aa']
        // })
    ]
};


//扫描public下的html，antd.html自动注入entries/antd.js。
//用于独立页面入口，例如login、home、aboutus等独立页面功能
const templates = {};
const templatePattern = path.resolve(__dirname, './src/page/*.html');

console.log("templatePattern" + templatePattern);

glob.sync(templatePattern).forEach(function (template) {
  const key = template.substring(template.lastIndexOf('page') + 5);

  console.log("key[" + key + "]");
  const fullPath = path.resolve(__dirname, template);
  key && (templates[key] = fullPath);
});
for (let chunkName in templates) {
  const entryKey = chunkName.substring(0, chunkName.lastIndexOf('.'));//index.html -> index


  const entryPath = path.resolve(__dirname, "./src/entries/" + entryKey + ".js");
  const relatedChunks =  fs.existsSync(entryPath) ? [entryKey] : [];

    console.log("relatedChunks:" + relatedChunks);

  const conf = {
      template: templates[chunkName],
      filename: chunkName,
      inject: true,
      chunks: relatedChunks,
      hash: false,
      minify: false
  }
  webpackConfig.plugins.push(new HtmlWebPackPlugin(conf));
}


module.exports = webpackConfig;