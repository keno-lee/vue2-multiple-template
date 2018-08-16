/**
 * 工程化工具函数库
 * @module build/utils
 */
'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')

exports.assetsPath = function(_path) {
  const config = require('../config')
  const assetsSubDirectory = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/**
 * 根据指定路径获取入口文件
 */
exports.getEntry = function(globPath) {
  var entries = {},
    basename,
    tmp,
    pathname
  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-3)
    pathname = tmp.splice(0, 1) + '/' + basename // 正确输出js和html的路径
    entries[tmp[0]] = entry
  })
  return entries
}

/**
 * 判断一个对象是否空对象
 */
exports.isEmptyObject = function(obj) {
  for (var key in obj) {
    return false
  }
  return true
}

/**
 * 获取 node 命令行参数
 * @param {String} name 参数名
 * @returns {String} 参数值
 * @example
 * node build/build.js --module=index --deploy
 * var module = getParam('--module')
 * // module = 'index'
 * var deploy = getParam('--deploy')
 * // deploy = ''
 */
exports.getParam = function(name) {
  if (!name) return ''
  var reg = new RegExp('\\S*' + name + '=?(\\S*)')
  var s0 = process.argv.join(';').replace(/\s/g, ';')
  var s1 = s0.replace(reg, '$1')
  if (s0.length == s1.length) return ''
  else return s1.split(';')[0] || ''
}
