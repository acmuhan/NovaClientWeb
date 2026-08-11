# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

```bash
# 开发
npm run dev          # 启动 Vite 开发服务器（端口 3000，绑定 0.0.0.0）

# 构建
npm run build        # 构建前端（vite build）+ 打包后端（esbuild → server.cjs）
npm run build:server # 单独打包 Express 后端

# 质量检查
npm run lint         # TypeScript 类型检查（tsc --noEmit，无 ESLint）

# 生产运行
npm run start        # node server.cjs（生产环境）
npm run preview      # 预览 Vite 打包产物

# 清理
npm run clean        # 删除 dist/、server.js、server.cjs
```

> 没有测试框架，`npm run lint` 是唯一的代码检查入口。

## 架构概览

这是 **NovaClient 产品落地页**，前端极简单页应用 + Express 静态文件服务器的组合。

### 前端（React 19 + Vite 6 + Tailwind CSS v4）

`src/App.tsx` 是唯一的页面，控制两个核心状态机：

1. **启动屏流程**：页面加载 → `SplashScreen`（Logo 脉冲动画，1.5 秒）→ `AnimatePresence` 切换到主内容（stagger 子元素入场）
2. **MD3 动态主题**：`ThemeSwitcher` FAB 按钮循环切换 4 个主题，每个主题在 `src/config/themes.ts` 中定义一组 CSS 变量，通过 `document.documentElement.style.setProperty` 注入到根元素

所有动画使用 **Framer Motion**（`motion/react` v12），所有图标来自 **lucide-react**。

### 后端（Express 4，`server.ts`）

- 提供 `dist/` 目录的静态文件服务
- 暴露 `/api/download` 接口，供前端下载按钮调用
- 构建产物为 `server.cjs`（通过 esbuild 打包，CommonJS 格式）

### 主题系统

`src/config/themes.ts` 定义 4 个 MD3 主题（Crimson/Sage/Ocean/Mint），每个主题是一组 CSS 变量键值对。`Logo.tsx` 使用这些 CSS 变量实现颜色自适应。

### 路径别名

`@` 指向项目根目录（在 `vite.config.ts` 中配置）。

### 环境变量

- `DISABLE_HMR=true`：禁用 Vite 热更新
- 后端使用 `dotenv` 加载 `.env`（如需配置下载文件路径等）
