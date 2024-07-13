import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react'
    })
  ],
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@apis', replacement: '/src/apis' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@store', replacement: '/src/store' },
      { find: '@utils', replacement: '/src/utils' }
    ]
  }
});
