/**
 * 可自定义配置
 * @module config/custom
 * @author bigfact
 */

module.exports = {
  // 资源访问地址数组，可添加 cdn 地址
  publicPaths: ['/', './'],
  // 模块入口查找目录
  moduleBasePath: './src/module/',
  // 列表模块名字，列表模块用于开发时列举展示当前正在开发的模块并提供访问入口
  listModuleName: 'list'
}
