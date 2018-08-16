/**
 * 开发服务器启动
 * @module build/dev-server
 */
'use strict'

const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.dev.conf')
const opn = require('opn')
const config = require('../config')

// init webpack dev server config
var devServerOptions = Object.assign({}, webpackConfig.devServer, {
  stats: {
    colors: true
  }
})

// enable Hot Module Replacement (HMR)
// https://webpack.js.org/guides/hot-module-replacement/
WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions)

// create compiler
const compiler = Webpack(webpackConfig)

// create server
const server = new WebpackDevServer(compiler, devServerOptions)

// startup server
server.listen(devServerOptions.port, devServerOptions.host, () => {
  // server is ready
  let modules = config.module.moduleNames.join(',')
  opn(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}/${config.custom.listModuleName}/?modules=${modules}`)
})
