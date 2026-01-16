
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Use type assertion on process to access cwd() and resolve the "Property 'cwd' does not exist on type 'Process'" error
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: 'terser', // O 'esbuild' para velocidad
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'genai-vendor': ['@google/genai']
          }
        }
      }
    },
    // Definimos process.env para compatibilidad con librerías que lo requieran
    // y para cumplir con la integración de Gemini API solicitada
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    server: {
      port: 3000,
      host: true
    }
  };
});
