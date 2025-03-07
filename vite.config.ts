import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/@shared'),
      '@sdk': path.resolve(__dirname, './src/sdk'),
    },
  },
});
