# vue2-multiple-page-template

vue2 多页面应用模板，该项目为 vue2 多页面应用的模板，可复制该项目，自定义自己的多页应用项目

## 名词解释

* 应用模块
  * `./config/custom.js` 配置项 `moduleBasePath` 所指定目录下的每个文件夹分别为一个应用模块，应用模块可以是 vue2 单页面应用，也可以不是，应用模块应该且必须只包含一个 index.html 和一个 main.js 文件
  * 示例：./src/module 目录下的 index 和 list 应用模块
* 多页应用
  * 单个项目多个静态文件(index.html)目录
  * 根据不同目录名访问到不同的应用

## 开始

```
$ # 克隆源代码库并重新初始化 git 仓库
$ git clone git@git.kuainiujinke.com:frontend/vue2-multiple-page-template.git ${custom-project-name}
$ cd ${custom-project-name}/
$ rm -rf .git/
$ git init
$ git remote add origin ${new-remote-url}

$ # 安装依赖
$ npm install

$ # 自选模块开发(推荐)
$ ./develop.sh --module=module0,module1,module2,...

$ # 全量模块开发
$ ./develop.sh
```

## 目录结构

```
|____.babelrc
|____.editorconfig
|____.eslintignore
|____.eslintrc.js
|____.gitignore
|____.postcssrc.js
|____.prettierrc.js
|____build
|____config
|____jsdoc
|____develop.sh
|____release.sh
|____dist
|____package.json
|____package-lock.json
|____README.md
|____src
| |____assets
| |____components
| |____module
|____static
|____node_modules
```

## 构建

```
$ # 自选模块构建(推荐)
$ ./release.sh --module=module0,module1,module2,...

$ # 全量模块构建
$ ./release.sh
```

## todo

* 使用 vue-cli 自动根据本项目生成新项目，或者自己编写一个简易的自动生成工具

## 参考

* [yaoyao1987 的 vue 多页面配置](https://github.com/yaoyao1987/vue-cli-multipage)
* [vue-router2.0](http://gold.xitu.io/entry/57fcd8088ac2470058cadd6e)
* [luchanan 的 vue 多页面配置](https://github.com/luchanan/vue2.0-multi-page)
