/**
 * 应用模块配置
 * @module config/module
 * @author bigfact
 */
'use strict'

const utils = require('../build/utils')
const path = require('path')
const getParam = utils.getParam
const customConfig = require('./custom')

// 根据命令行参数获取多模块打包各模块的入口 index.html 和 main.js 文件
let moduleBasePath = customConfig.moduleBasePath
let templates = {}
let entrys = {}
let moduleNames = (getParam('--module') + '').split(',')
if (moduleNames.length > 0 && moduleNames[0]) {
  // 开发模式检查列表模块是否存在
  process.env.NODE_ENV === 'development' && moduleNames.indexOf(customConfig.listModuleName) < 0 && moduleNames.push(customConfig.listModuleName)
  // 循环遍历 moduleNames ，查找相应模块名
  for (let i = 0; i < moduleNames.length; i++) {
    let nameTmp = moduleNames[i]
    if (!nameTmp) continue
    let templateTmp = utils.getEntry(moduleBasePath + (nameTmp ? nameTmp + '/' : '') + '**/index.html')
    let entryTmp = utils.getEntry(moduleBasePath + (nameTmp ? nameTmp + '/' : '') + '**/main.js')
    if (!templateTmp[nameTmp] || !entryTmp[nameTmp]) {
      console.log('\n不存在模块 ' + nameTmp + ' ，或者模块不在 ' + moduleBasePath + ' 目录中！\n')
      continue
    }
    templates[nameTmp] = templateTmp[nameTmp]
    entrys[nameTmp] = entryTmp[nameTmp]
  }
} else {
  // 获得全部模块
  templates = utils.getEntry(moduleBasePath + '**/index.html')
  entrys = utils.getEntry(moduleBasePath + '**/main.js')
}

// console.log(entrys)

// 判断入口
if (utils.isEmptyObject(entrys)) {
  throw new Error('没有找到可使用的模块，请检查模块名，调整后重试！')
}

// 重新计算 moduleNames
moduleNames = []
for (let key in entrys) {
  moduleNames.push(key)
}

// 获取需要构建的模块名
let buildModuleName = moduleNames[0]
// 获取 static 序号，发布代码时，静态资源链接自动带上 static 前缀，可以是 cdn 地址域名
let staticIndex = Number(getParam('--cdn')) || 0
// static path 数组
let staticPaths = customConfig.publicPaths
// 构建时的默认静态资源路径
let assetsPublicPath = (staticPaths[staticIndex] || staticPaths[0]) + (buildModuleName ? buildModuleName + '/' : '')

// 导出配置信息
module.exports = {
  // 入口基础路径
  basePath: moduleBasePath,
  // 模板路径
  templates: templates,
  // webpack 入口
  entrys: entrys,
  // 模块名数组
  moduleNames: moduleNames,
  // 构建时的默认静态资源路径
  assetsPublicPath: assetsPublicPath,
  // 单次构建的模块名
  buildModuleName: buildModuleName
}
