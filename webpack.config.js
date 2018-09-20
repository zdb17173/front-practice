const path = require('path');
const webpack = require('webpack');

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