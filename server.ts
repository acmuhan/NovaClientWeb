import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 静态托管前端打包目录
app.use(express.static(path.join(__dirname, 'dist')));

// 带有防盗链和下载路径隐藏的下载 API
app.get('/api/download', (req, res) => {
  const referer = req.headers.referer;
  const host = req.headers.host;

  // 1. 防盗链逻辑
  // 生产环境下进行 referer 来源域名验证，非本站域名请求予以拦截（403）
  if (process.env.NODE_ENV === 'production') {
    if (!referer) {
      return res.status(403).send('Forbidden: No referer header provided.');
    }

    try {
      const refererUrl = new URL(referer);
      const hostName = host ? host.split(':')[0] : '';
      const refererHost = refererUrl.hostname;

      // 允许主域名及子域名访问，防止跨域盗链
      if (refererHost !== hostName && !refererHost.endsWith('.' + hostName)) {
        return res.status(403).send('Forbidden: Hotlinking is prohibited.');
      }
    } catch (error) {
      return res.status(403).send('Forbidden: Invalid referer format.');
    }
  }

  // 2. 隐藏真实物理路径
  // 下载包存放在服务器本地的 data 目录中（此目录不配置 express.static）
  const dataDir = path.join(__dirname, 'data');

  if (!fs.existsSync(dataDir)) {
    return res.status(404).send('Data directory not found.');
  }

  // 获取 data 文件夹下排除 README.md 后可供下载的安装包文件
  const files = fs.readdirSync(dataDir).filter(
    (file) => file.toLowerCase() !== 'readme.md' && !file.startsWith('.')
  );

  if (files.length === 0) {
    return res.status(404).send('No installation packages found in data directory.');
  }

  // 默认下载目录中的第一个包文件
  const fileName = files[0];
  const filePath = path.join(dataDir, fileName);

  // 3. 以流形式向前端输出附件，强行唤起浏览器下载，不暴露或跳转文件物理路径
  res.download(filePath, fileName, (error) => {
    if (error) {
      console.error('File download failed:', error);
      if (!res.headersSent) {
        res.status(500).send('Error occurred while downloading file.');
      }
    }
  });
});

// 所有前端路由重定向至 index.html (SPA 支持)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[NovaClient Server] Server is running on port ${PORT}`);
});
