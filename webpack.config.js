let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: './src/index.js', // 入口文件

    output: {
        path: path.resolve(__dirname, './dist'), // 目标文件路径
        filename: 'index.js', // 目标文件名
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}