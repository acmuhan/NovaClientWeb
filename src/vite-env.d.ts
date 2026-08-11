/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PC_DOWNLOAD_MODE: string;
  readonly VITE_PC_DOWNLOAD_URL: string;
  readonly VITE_ANDROID_DOWNLOAD_MODE: string;
  readonly VITE_ANDROID_DOWNLOAD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
