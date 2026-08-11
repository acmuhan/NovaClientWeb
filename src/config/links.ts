import type { LucideIcon } from 'lucide-react';
import { Monitor, Smartphone, Users, Send, Hash } from 'lucide-react';

export interface LinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * 根据下载模式和外部链接生成最终的下载 href。
 * - mode=file 时：使用本地 Express 接口（apiPath）
 * - mode=link 且 externalUrl 非空时：直接使用外部链接
 */
function buildDownloadHref(
  mode: string | undefined,
  externalUrl: string | undefined,
  apiPath: string
): string {
  if (mode === 'link' && externalUrl) {
    return externalUrl;
  }
  return apiPath;
}

export const links: LinkItem[] = [
  {
    label: 'Download PC',
    href: buildDownloadHref(
      import.meta.env.VITE_PC_DOWNLOAD_MODE,
      import.meta.env.VITE_PC_DOWNLOAD_URL,
      '/api/download'
    ),
    icon: Monitor,
  },
  {
    label: 'Download Android',
    href: buildDownloadHref(
      import.meta.env.VITE_ANDROID_DOWNLOAD_MODE,
      import.meta.env.VITE_ANDROID_DOWNLOAD_URL,
      '/api/download/android'
    ),
    icon: Smartphone,
  },
  {
    label: '跳转QQ',
    href: 'https://qun.qq.com/universal-share/share?ac=1&authKey=ExqZLD4MMf%2FgYPxqfDjd9n%2BKlKnZHlLWcv4mhSrFHbemzZcyBqrrr6TENZ6g3vjq&busi_data=eyJncm91cENvZGUiOiIxMDg1NjMzNzc1IiwidG9rZW4iOiIyMFV2dDJRbEFXWTZkOEZrSGpmUmwxUjgyZkV2blNDUi85djgvRFQzQVZHK2xZZkVDQUlPTE05eElMbVA1M0d6IiwidWluIjoiMTc5NzUxNjkyOSJ9&data=ElHIUDER8qdZh6g8_A-BYJiD41gqkzw1W2ogzJ2mFrvjzZsrvKAPJcTDCfh1m65xxBLQihKDOjOT2eJbndE7zA&svctype=4&tempid=h5_group_info',
    icon: Users,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/tangyuan1338',
    icon: Send,
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/3rTbSZg9aw',
    icon: Hash,
  },
];
