import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import viteJsconfigPaths from 'vite-jsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ command, mode }) => ({
  build: {
    minify: mode === 'production' ? 'terser' : false,
    outDir: 'build',
    sourcemap: command === 'serve' ? 'inline' : false,
    chunkSizeWarningLimit: 2000,
  },
  plugins: [
    react(),
    viteJsconfigPaths(),
    svgrPlugin(),
    viteCompression({
      // algorithm: 'brotliCompress',
      algorithm: 'gzip',
    })
  ],
  server: {
    open: true,
    port: 8000,
  },
}))