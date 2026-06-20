# Public Data Directory

此目录用于存放需要被前端页面直接下载的公开安装包文件。
存放在此处的安装包在执行打包（`npm run build`）后会被自动复制到 `dist/data/` 目录中，从而可以通过浏览器路径直接访问下载（例如 `/data/your-installer.exe`）。
