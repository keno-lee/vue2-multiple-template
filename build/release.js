/**
 * 构建多个模块
 * @module build/release
 * @author bigfact
 * @example
 * node ./build/release.js --module=模块名0,模块名1,模块名2,...
 */

// 导入相关工具
const shelljs = require('shelljs')
const chalk = require('chalk')
const readline = require('readline')
const moduleConfig = require('../config/module')

// 构建版本号
const version = require('../package.json').version

// 模块名数组
var modulesArr = moduleConfig.moduleNames
let modules = modulesArr.join(',')

// 命令行输入值获取
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 构建模块确认
rl.question('确认构建这些模块 ' + modules + ' (Y/n): ', answer => {
  rl.close()

  if (answer !== 'Y') {
    process.exit(1)
  }

  // 循环构建模块
  for (let i in modulesArr) {
    let buildCommand = 'NODE_ENV=production node ./build/build.js --module=' + modulesArr[i] + ' --cdn=0' + ' --index=' + i + ' --version=' + version
    console.log('\n' + chalk.cyanBright(buildCommand) + '\n')
    if (shelljs.exec(buildCommand).code !== 0) {
      process.exit(1)
    }
  }

  console.log('\n' + chalk.greenBright('模块 ' + modules + ' 构建完毕！') + '\n')
})
