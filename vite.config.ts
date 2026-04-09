import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  base: '/',
  root: 'src',
  envDir: '../',
  server: {
    fs: { strict: false },
    open: '/pages/landing/index.html',
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        landing: path.resolve(__dirname, 'src/pages/landing/index.html'),
        animal: path.resolve(__dirname, 'src/pages/animal/zoos.html'),
        contact: path.resolve(__dirname, 'src/pages/contact/contact.html'),
        map: path.resolve(__dirname, 'src/pages/map/map.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./styles/main.scss";`,
      },
    },
  },
});
