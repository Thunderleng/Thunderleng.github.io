#!/usr/bin/env sh
###
 # @Date: 2022-10-28 14:40:58
 # @LastEditors:  thunder thunderleng@gmail.com
 # @LastEditTime: 2023-04-20 19:51:15
 # @FilePath: \NotesThunder\deploy.sh
### 

# 忽略错误
set -e

# 构建
yarn  docs:build

# 进入待发布的目录
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push -f git@github.com:ThunderLeng/ThunderLeng.github.io.git master

# cd -