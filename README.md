# NovaClient 官方展示与安全下载平台

这是一个采用现代化 **Material Design 3 (MD3)** 视觉设计规范的官方客户端展示及下载单页平台，采用前后端全栈集成设计。

---

## 🌟 核心特性

- **模块化 React 19 架构**：核心交互组件（Logo、启动屏、色彩切换 FAB、圆角 Tonal 按钮）高度封装解耦，代码清晰易维护。
- **MD3 动态色彩切换**：内置 Crimson、Sage、Ocean 和 Mint 四套主题色。支持用户一键自由切换，背景及文字色彩带平滑渐变微动交互。
- **极速流畅动效**：基于 Framer Motion 实现平滑的 staggerChildren 级联动画，搭配精心调校的 Spring 弹簧物理缓动。
- **安全防盗链分发**：支持生产环境下检验来源 `Referer`。阻断其他站点的外链盗链请求，保护服务器带宽。
- **路径隐藏式直接下载**：安装包文件物理隔离存放在私密的 `data` 目录中。前端请求通用 `/api/download` API 进行安全附件流管道下发，浏览器本地直接唤起保存，绝不暴露或跳转文件真实静态物理 URL，防爬虫抓取。

---

## 📁 目录结构说明

```text
├── data/                  # [私密] 存放待分发的客户端安装包目录（后端安全读取，不可外网直链）
├── public/                # [公开] 静态资源文件夹
│   └── favicon.svg        # 网站矢量图标
├── src/
│   ├── components/        # 核心 UI 组件库
│   │   ├── LinkButton.tsx     # MD3 圆角高亮按钮，带悬浮上移阴影动效
│   │   ├── Logo.tsx           # 项目官方 SVG 矢量 Logo 组件
│   │   ├── SplashScreen.tsx   # 缩放晃动的启动屏预加载组件
│   │   └── ThemeSwitcher.tsx  # 色彩方案切换 FAB 按钮
│   ├── config/            # 静态数据与配置定义
│   │   ├── links.ts           # 外部链接（下载、QQ、Telegram、Discord）
│   │   └── themes.ts          # MD3 主题色色盘定义
│   ├── App.tsx            # 单页核心整合入口
│   ├── main.tsx           # React 客户端挂载入口
│   └── index.css          # 全局 Tailwind v4 与自定义 Google Fonts 样式定义
├── server.ts              # Express 服务端入口（静态托管、防盗链、隐藏物理路径分发）
├── index.html             # Vite 网页渲染入口
├── vite.config.ts         # Vite 构建配置
└── tsconfig.json          # TypeScript 类型配置
```

---

## 🚀 快速上手指南

### 1. 准备安装包
将需要供用户下载的最新的官方客户端安装包放置到项目根目录下的 **`data`** 文件夹内即可。*(系统会自动识别该目录下除 README 外的第一个文件并下发给用户)*

### 2. 开发模式 (调试前端)
如果您只需要对网页界面、样式及交互效果进行微调，请在控制台输入：
```bash
npm run dev
```
前端开发服务器将启动在 `http://localhost:3000`，支持热重载 (HMR)。

### 3. 类型校验
在部署或提交前，可以使用以下命令运行严格的 TypeScript 类型校验：
```bash
npm run lint
```

### 4. 打包构建
在部署前，运行打包脚本：
```bash
npm run build
```
这会同时编译两部分：
1. **前端网页**：使用 Vite 构建并将优化的静态资产输出至 `dist/` 目录。
2. **后端服务**：使用 esbuild 极速将 TypeScript 写的 `server.ts` 连带依赖全量压缩打包为单文件 `server.js`。

### 5. 生产环境运行 (激活防盗链)
运行以下命令启动服务：
```bash
# Windows (PowerShell)
$env:NODE_ENV="production"; node server.js

# Linux / macOS / Bash
NODE_ENV=production node server.js
```
启动后，全栈服务器将托管在 `3000` 端口上（可通过 `PORT` 环境变量修改），此时所有的安全防盗链验证和安全下载逻辑都将完全生效。
