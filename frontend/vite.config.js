import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@componentsAdmin': path.resolve(__dirname, 'src/components/admin'),
        '@providers': path.resolve(__dirname, 'src/providers')
      },
    },
    server: {
      // port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV)
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js', // bisa ubah sesuai path kamu
      maxConcurrency: 1,
    }
  };
});
