var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var glob = require('glob');


/* 定义一个数组，module.exports中的plugins项可以直接使用这个数组 */
var plugins = [];


/* commonsPlugin，把公共部分提取出来 */
var commonsPluginVendor = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/[name].js',
    minChunks: function (module) {
        var isNpmPlugin = (module.context.indexOf('node_modules') !== -1);
        var isVendorPlugin = (module.context.indexOf('vendor') !== -1);
        return module.context && (isNpmPlugin || isVendorPlugin);
    }
});
plugins.push(commonsPluginVendor);

var commonsPluginManifest = new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest'
});
plugins.push(commonsPluginManifest);


/* ExtractTextPlugin，打出单独的css包 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
plugins.push(new ExtractTextPlugin('css/[name].css'));


/* HtmlWebpackPlugin，打包html */
// var HtmlWebpackPlugin = require('html-webpack-plugin');
//
// var templates = {};
// var templatePattern = path.resolve(__dirname, '../../react_sources/templates/**/**.ftl.ejs');
// glob.sync(templatePattern).forEach(function (template) {
//     var key = template.substring(template.lastIndexOf('templates') + 10);
//     var fullpath = path.resolve(__dirname, template);
//     key && (templates[key] = fullpath);
// });
//
// for(var chunkname in templates){
//     //这里使用webpack的HtmlWebpackPlugin插件
//     //conf为该插件的配置项
//     //将每个文件的conf循环插入plugins，可以实现多页面打包
//     // var viewFilename = chunkname;
//     var viewFilename = chunkname.substring(0, chunkname.lastIndexOf('.ejs'));
//     var viewPath = path.resolve(__dirname, '../../templates/' + viewFilename);
//     var entryKey = chunkname.substring(0, chunkname.lastIndexOf('.ftl.ejs')).replace(/\//g, '.');
//     var entryFilename = chunkname.replace('.ftl.ejs', '.js');
//     var entryPath = path.resolve(__dirname, '../../react_sources/entries/' + entryFilename);
//     var relatedChunks = fs.existsSync(entryPath) ? ['manifest', 'vendor', entryKey] : [];
//     var conf = {
//         filename: viewPath,  //打包后的html存放路径，也是从distPath开始
//         template: templates[chunkname], //文件模板，就是打包前的html文件
//         // ftl: templates[chunkname],
//         inject: true, //可以对head和body做修改
//         chunks : relatedChunks, //设置该页面引用的文件，只有符合条件的才会被引用
//         // minify: { //压缩HTML
//         //     removeComments: true,
//         //     collapseWhitespace: false
//         // },
//         hash: false, //版本号，打出来的html中对css和js的引用自带版本号
//     }
//     //把每个conf循环插入plugins
//     plugins.push(new HtmlWebpackPlugin(conf));
// }


/* DefinePlugin */
var definePlugin = new webpack.DefinePlugin({
    'process.env': {
        'ENV': JSON.stringify('production') // development - production
    }
});
plugins.push(definePlugin);


/* Automatically loaded modules when identifier is used as free variable in a module */
plugins.push(new webpack.ProvidePlugin({
    'React': 'react',
    'ReactDOM': 'react-dom',
    'PropTypes': 'prop-types',
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
    'toastr': 'bootstrap-toastr',
    'CodeMirror': 'jquery.codemirror',
    'Config': 'Config',
    '_': 'lodash',
    'dateformat': 'dateformat',
}));


/* 添加对js和css的压缩 */
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    except: ['$', 'require']    //排除关键字，不然会把这些都压缩替换
});
plugins.push(uglifyJsPlugin);


module.exports = plugins