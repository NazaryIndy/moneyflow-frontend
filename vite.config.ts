import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import circleDependency from 'vite-plugin-circular-dependency';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    circleDependency({
      exclude: /node_modules/, // Ignore external libraries
      include: /src/, // Limit scan to source code
      failOnError: true, // Stop the build if cycles are detected
      allowAsyncCycles: false, // Disallow cycles even in async imports
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
