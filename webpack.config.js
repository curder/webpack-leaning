let webpack = require('webpack');
let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css提取到单独的文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 将css文件压缩体积

const inProduction = process.env.NODE_ENV === 'production';

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
            { test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/, loader: 'file-loader', options: {name: 'images/[name].[hash].[ext]'} },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),  
        
    ],

    optimization: {
        minimize: inProduction
    }
}


if(inProduction) {
    module.exports.plugins.push(

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
              autoprefixer: true,
            },
            canPrint: true
        })

    );
}