/**
 * webpack 开发环境配置
 * @module build/webpack_dev_conf
 */
'use strict'

const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const packageJson = require('../package.json')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    /**
     * @todo 自动打开页面无效问题排查，已经使用 opn 实现该功能
     */
    open: config.dev.autoOpenBrowser,
    openPage: config.dev.autoOpenPage,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    inline: true,
    before(app) {
      // /**
      //  * @todo 输出模块访问列表
      //  */
      // app.get('/ls', function(req, res) {
      //   res.json({ custom: 'response' })
      // })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

// 根据多模块模板路径配置多个 HtmlWebpackPlugin
var pages = config.module.templates
for (let modulename in pages) {
  var conf = {
    filename: modulename + '/index.html',
    template: pages[modulename], // 模板路径
    chunks: [modulename, 'vendor', 'manifest'], // 每个html引用的js模块
    inject: true // js插入位置
  }
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}

// add port to devServer config
let port = config.dev.port
devWebpackConfig.devServer.port = port

// Add FriendlyErrorsPlugin
devWebpackConfig.plugins.push(
  new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`, `Your project document address is http://${devWebpackConfig.devServer.host}:${port}/.jsdoc/${packageJson.name}/${packageJson.version}/`]
    },
    onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
  })
)

module.exports = devWebpackConfig
