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

