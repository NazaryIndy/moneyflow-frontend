import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import circleDependency from 'vite-plugin-circular-dependency';
import visualizer from 'rollup-plugin-visualizer';

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
    visualizer({
      open: true,
      gzipSize: true,
      filename: 'dist/stats.html',
      // template: 'network',
      // exclude: { file: '**/node_modules/**' },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react-dom')) return 'react';

          if (id.includes('/react/') || id.includes('\\react\\')) return 'react';

          if (id.includes('react-router')) return 'router';

          if (id.includes('@tanstack')) return 'tanstack';

          if (id.includes('recharts')) return 'charts';

          if (id.includes('xlsx')) return 'xlsx';

          if (id.includes('papaparse')) return 'papaparse';

          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod'))
            return 'forms';

          if (id.includes('@radix-ui') || id.includes('vaul')) return 'radix';

          if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n';

          return 'vendor';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
