import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@atomx-fast/core': new URL('../../core/src', import.meta.url).pathname,
      '@atomx/vue': new URL('../../vue/src', import.meta.url).pathname,
    },
  },
});
