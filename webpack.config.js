let webpack = require('webpack');
let path = require('path');

module.exports = {
    
    mode: process.env.NODE_ENV,

    entry: './src/index.js', // 入口文件

    output: {
        path: path.resolve(__dirname, './dist'), // 目标文件路径
        filename: 'index.js', // 目标文件名
    },

    module: {
        rules: [
            { test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    optimization: {
        minimize: true
    }
}
