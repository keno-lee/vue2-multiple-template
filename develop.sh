#!/bin/sh

# 开发脚本

# 生成文档
npm run doc

# 运行 webpack 开发服务器
node build/dev-server.js
