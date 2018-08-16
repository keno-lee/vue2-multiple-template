/**
 * 生产环境 node 运行环境
 * @module config/prod_env
 */
'use strict'
module.exports = {
  NODE_ENV: '"' + process.env.NODE_ENV + '"' || '"production"'
}
