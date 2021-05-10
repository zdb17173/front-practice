var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules: [
        {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, '../../react_sources/entries'),
                path.resolve(__dirname, '../../react_sources/modules')
            ],
            loader: 'babel-loader',
            query: {
                presets: ['env', 'react', 'stage-0'],
                'plugins': [
                    ["import",{"libraryName":"antd","style":true}],
                    ["babel-plugin-transform-runtime"]
                ],
                cacheDirectory: false
            }
        },

        {
            test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
            use: [
                {
                    loader: 'expose-loader',
                    query: 'jQuery'
                },
                {
                    loader: 'expose-loader',
                    query: '$'
                }
            ]
        },

        {
            test: require.resolve(path.resolve(__dirname, '../../static/vendor/jwplayer/jwplayer.js')),
            use: [
                {
                    loader: 'expose-loader',
                    query: 'jwplayer'
                }
            ]
        },

        {
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },

        {
            test: /\.styl$/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!stylus-loader'
            })
        },

        {
            test: /\.less$/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!less-loader'
            })
        },

        {
            test: /\.(gif|png|jpg)\??.*$/,
            use: 'url-loader?limit=1024&name=/images/[hash].[ext]',
        },

        {
            test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
            use: 'url-loader?limit=1024&name=/fonts/[name].[ext]'
        }
    ]
}