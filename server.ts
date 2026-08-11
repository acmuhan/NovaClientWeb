import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 静态托管前端打包目录
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * 防盗链检查：生产环境下校验 Referer 是否来自本站。
 * 返回 true 表示通过，false 表示已向客户端发送 403 响应。
 */
function checkReferer(req: express.Request, res: express.Response): boolean {
  if (process.env.NODE_ENV !== 'production') return true;

  const referer = req.headers.referer;
  const host = req.headers.host;

  if (!referer) {
    res.status(403).send('Forbidden: No referer header provided.');
    return false;
  }

  try {
    const refererUrl = new URL(referer);
    const hostName = host ? host.split(':')[0] : '';
    const refererHost = refererUrl.hostname;

    if (refererHost !== hostName && !refererHost.endsWith('.' + hostName)) {
      res.status(403).send('Forbidden: Hotlinking is prohibited.');
      return false;
    }
  } catch {
    res.status(403).send('Forbidden: Invalid referer format.');
    return false;
  }

  return true;
}

/**
 * 在指定目录中查找修改时间最新的文件（排除隐藏文件和 readme.md）。
 * @param dir 绝对路径目录
 */
function findNewestInDir(dir: string): string | null {
  if (!fs.existsSync(dir)) return null;

  const candidates = fs.readdirSync(dir).filter(
    (f) => !f.startsWith('.') && f.toLowerCase() !== 'readme.md'
  );

  if (candidates.length === 0) return null;

  // 按文件修改时间降序排序，取最新的一个
  const newest = candidates
    .map((f) => ({ name: f, mtime: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)[0];

  return path.join(dir, newest.name);
}

// ─── PC 下载 ──────────────────────────────────────────────────────────────────
// file 模式：从 VITE_PC_DOWNLOAD_DIR 目录（默认 data/pc）提供最新文件
// link 模式：302 重定向至 VITE_PC_DOWNLOAD_URL
app.get('/api/download', (req, res) => {
  if (!checkReferer(req, res)) return;

  const mode = process.env.VITE_PC_DOWNLOAD_MODE || 'file';
  const externalUrl = process.env.VITE_PC_DOWNLOAD_URL;

  if (mode === 'link') {
    if (!externalUrl) return void res.status(500).send('PC download URL not configured.');
    return void res.redirect(externalUrl);
  }

  const dir = path.join(__dirname, process.env.VITE_PC_DOWNLOAD_DIR || 'data/pc');
  const filePath = findNewestInDir(dir);
  if (!filePath) return void res.status(404).send(`No PC installation package found in ${dir}.`);

  res.download(filePath, path.basename(filePath), (err) => {
    if (err) {
      console.error('PC file download failed:', err);
      if (!res.headersSent) res.status(500).send('Error occurred while downloading file.');
    }
  });
});

// ─── Android 下载 ─────────────────────────────────────────────────────────────
// file 模式：从 VITE_ANDROID_DOWNLOAD_DIR 目录（默认 data/android）提供最新文件
// link 模式：302 重定向至 VITE_ANDROID_DOWNLOAD_URL
app.get('/api/download/android', (req, res) => {
  if (!checkReferer(req, res)) return;

  const mode = process.env.VITE_ANDROID_DOWNLOAD_MODE || 'link';
  const externalUrl = process.env.VITE_ANDROID_DOWNLOAD_URL;

  if (mode === 'link') {
    if (!externalUrl) return void res.status(500).send('Android download URL not configured.');
    return void res.redirect(externalUrl);
  }

  const dir = path.join(__dirname, process.env.VITE_ANDROID_DOWNLOAD_DIR || 'data/android');
  const filePath = findNewestInDir(dir);
  if (!filePath) return void res.status(404).send(`No Android package found in ${dir}.`);

  res.download(filePath, path.basename(filePath), (err) => {
    if (err) {
      console.error('Android file download failed:', err);
      if (!res.headersSent) res.status(500).send('Error occurred while downloading file.');
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
