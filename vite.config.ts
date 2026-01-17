import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Explicitamente importamos process de node:process para asegurar tipos correctos de Node.js
import process from 'node:process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        },
        format: {
          comments: false,
        },
        mangle: {
          toplevel: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'genai-vendor': ['@google/genai']
          }
        }
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.SUPABASE_URL': JSON.stringify(env.SUPABASE_URL || ''),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(env.SUPABASE_ANON_KEY || '')
    },
    server: {
      port: 3000,
      host: true
    }
  };
});