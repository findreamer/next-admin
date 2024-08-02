#!/bin/bash

# 定义项目根目录，这里假设脚本位于项目根目录下
PROJECT_ROOT=$(pwd)

# 定义需要运行npm run dev的两个目录
SERVER_DIR="server"
WEB_DIR="web"

# 进入server目录并运行npm run dev
echo "进入$SERVER_DIR目录，开始运行npm run dev..."
cd "$PROJECT_ROOT/$SERVER_DIR" || exit
npm run start:dev &

# 返回到项目根目录
cd "$PROJECT_ROOT" || exit

# 进入web目录并运行npm run dev
echo "进入$WEB_DIR目录，开始运行npm run dev..."
cd "$PROJECT_ROOT/$WEB_DIR" || exit
npm run dev &
