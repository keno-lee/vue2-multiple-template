#!/bin/sh

# 发布代码 shell 脚本

# node build 参数
buildParam=''

# shell 参数数组
args=($*)

# shell 参数数组长度
n=$#

# shell 参数数组下标
i=0

# node build 参数匹配正则表达式
reg="^--cdn=[0-9]+$"
regmodule="^--module=.+$"

# 循环查找 shell 参数数组，获取 node build 参数
while(($i<$n))
do
  if [[ ${args[$i]} =~ $reg ]]
  then
    buildParam=${args[$i]}
  fi
  let i++
done

# shell 参数数组下标
i=0

# 循环查找 shell 参数数组，获取 node build 参数
while(($i<$n))
do
  if [[ ${args[$i]} =~ $regmodule ]]
  then
    buildParam=$buildParam' '${args[$i]}
  fi
  let i++
done

# 获取最新代码
git pull

# 构建代码
echo node ./build/release.js $buildParam
node ./build/release.js $buildParam

# 添加更改
# git add .
