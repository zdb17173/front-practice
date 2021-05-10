var path = require('path');

module.exports = {
    //打包文件存放的绝对路径，html、css、js都会按这个路径打包
    path: path.join(__dirname, '../../static/bundle'),
    //网站运行时的访问路径，不设置的话，打包出的html中的默认引用的路径会是相对路径
    publicPath: '/bundle',
    //打包后的文件名
    filename: 'js/[name].js'
}