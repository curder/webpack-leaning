## 零配置Webpack编译

使用 `npm init -y` 初始化仓库，得到 `package.json` 文件，内容如下：

```
{
  "name": "webpack-learning",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "doc": "docs"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### 安装webpack

```
npm install webpack webpack-cli --save-dev
```

### 编写测试文件

一般情况下，我们要打包的源代码都放在`src`目录下，例如 `src/index.js`的内容如下：

```
alert('src/index.js');
```

编译后的目标文件放在 `dist`目录下，也将其命名为 `index.js`

通过命令行提供配置，执行命令获得编译文件

```
./node_modules/.bin/webpack --mode=development src/index.js -o dist/index.js
```

> `--mode` 使用开发模式编译代码，[更多配置查看这里](https://webpack.js.org/configuration/mode/)
> `-o` 参数是指定目标文件输出的路径和文件名

### `--watch` 参数辅助开发

在开发过程中经常需要修改源代码然后查看效果，此时需要使用 `--watch` 参数来监听文件变化后自动编译。

```
./node_modules/.bin/webpack --mode=development src/index.js -o dist/index.js --watch
```

当然，也可以通过在命令行中配置"scripts"脚本来简化在终端执行的命令。

```
"scripts": {
  "watch": "./node_modules/.bin/webpack --mode=development src/index.js -o dist/index.js --watch",
  "build": "./node_modules/.bin/webpack --mode=production src/index.js -o dist/index.js"
},
```

## 编写webpack配置文件

webpack默认的配置文件放在项目的根目录下，与`package.json`文件保持一致，文件名`webpack.config.js`

```
let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry: './src/index.js', // 入口文件

    output: {
        path: path.resolve(__dirname, './dist'), // 目标文件路径
        filename: 'index.js', // 目标文件名
    }
}
```

此刻我们就可以通过下面的命令来分别编译开发环境和线上环境的代码。

```
# 开发环境
./node_modules/.bin/webpack --mode=development

# 线上环境
./node_modules/.bin/webpack --mode=production
```


## webpack处理css的打包编译

### css-loader

使用webpack，处理css文件时，需要安装 `css-loader` 并编写对应的规则。

```
npm install css-loader --save-dev
```

并在 webpack.config.js 中提供如下规则：

```
module: {
  rules: [
    {
        test: /\.css$/,
        use: 'css-loader'
    }
  ]
}
```

通过上面的配置告诉webpack，当遇到`.css`后缀的配置文件，就使用 `css-loader` 拓展来处理。

在`src`命令下编写我们的样式文件`index.css`

```
body {
  background: #dbbfbf;
}
```

使用命令`npm run watch`编译后并没有发现页面并未应用我们编写的css样式。这是因为`css-loader`将css打包到了JS文件中并没有应用到页面上，这里可以通过安装`style-loader`将其应用。


### style-loader
```
npm install style-loader --save-dev
```

更新webpack.config.js配置文件，应用style-loader规则。

```
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

再次编译并刷新页面就看到编写的css已经应用到页面了。

## 使用[babel-loader](https://babeljs.io/setup)处理不兼容的js语法

```
npm install --save-dev babel-loader @babel/core
```

并添加如下webpack配置规则

```
rules: [
  { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
]
```

通过上面的配置并不能直接将es2015的代码转换成低版本浏览器支持的代码。

### 安装 [@babel/preset-env](https://www.babeljs.cn/docs/babel-preset-env)

```
npm install --save-dev @babel/preset-env
```

添加babel配置文件 `.babelrc`

```
{
  "presets": ["@babel/preset-env"]
}
```

[更多配置可以参考这里](https://www.cnblogs.com/chyingp/p/understanding-babel-preset-env.html)


## sass-loader 编译sass文件

安装`sass-loader` 和 `node-sass`

```
npm install --save-dev sass-loader node-sass
```

配置webpack配置

```
module: {
  rules: [
    { test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
  ]
}
```

## 提取css到单独的文件

使用到webpack提供的[webpack-contrib/mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)


```
npm install --save-dev mini-css-extract-plugin
```

并通过修改webpack配置达到提取css样式到独立文件的目的。

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module: {
    rules: [
        { test: /\.s[ac]ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ]
},

plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),  
],
```
具体插件的使用可以[参考这里](https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file)


虽然完成上面的配置后可以提取出正确的样式，但是却不能通过环境变量NODE_ENV来控制生成的样式文件是否压缩，这对生产环境是不利的。

### optimize-css-assets-webpack-plugin 压缩css文件

[具体查看 NMFR/optimize-css-assets-webpack-plugin 的github地址](https://github.com/NMFR/optimize-css-assets-webpack-plugin#example)

```
npm install --save-dev optimize-css-assets-webpack-plugin
```

## file-loader 加载图片资源

```
npm install --save-dev file-loader
```

修改`webpack.config.js`中对应图片loader处理的配置

```
module: {
  rules: [
    // ...
    { test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/, loader: 'file-loader', options: {name: 'images/[name].[hash].[ext]'} },
  ]
}
```

## purgecss-webpack-plugin 优化未使用的css

```
npm install --save-dev purgecss-webpack-plugin
```

修改对应plugins中的配置

```
new PurgecssPlugin({
    paths: glob.sync(path.join(__dirname, 'index.html')),
}),
```

> 需要注意的是上面的路径据实际情况而定