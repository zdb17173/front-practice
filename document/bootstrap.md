
# bootsrtap

## npm安装各种包

npm install css-loader style-loader url url-loader file file-loader 

npm install precss autoprefixer node-sass postcss-loader sass-loader

npm install bootstrap

npm install popper.js


## 配置静态资源解析

bootstrap会使用到css，scss，jpg，woff等资源，配置对应loader

webpack.config.js
```javascript

module.exports = {
    entry: {
        "main": "./src/index.js",
        "module1": "./src/module1.js"
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/, use:['style-loader', 'css-loader']},
            { test:/\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit:50000,   //小于50K的 都打包
                            name:"[hash:8].[name].[ext]",
                            // publicPath:"img/",	//替换CSS引用的图片路径 可以替换成爱拍云上的路径
                            // outputPath:"../img/"		//生成之后存放的路径
                        }
                    }
                ]},
            { test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader', // inject CSS to page
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]}
        ]
    },
    devtool: 'inline-source-map',//开发定位何处报错
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery'
        }),
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



