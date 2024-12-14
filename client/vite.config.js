import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: [
      '@mui/x-date-pickers',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
});

