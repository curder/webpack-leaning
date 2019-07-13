let webpack = require('webpack');
let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    
    mode: process.env.NODE_ENV,

    entry: {
        index: [
            './src/index.js',
            './src/assets/css/index.css',
            './src/assets/sass/index.scss',
        ]
    }, // 入口文件

    output: {
        path: path.resolve(__dirname, './dist'), // 目标文件路径
        filename: '[name].js', // 目标文件名
    },

    module: {
        rules: [
            { test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),  
    ],

    optimization: {
        minimize: true
    }
}
