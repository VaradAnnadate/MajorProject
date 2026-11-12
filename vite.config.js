import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const classroomPort = env.CLASSROOM_PORT || '8787';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': { target: `http://127.0.0.1:${classroomPort}`, changeOrigin: true },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lenis')) {
              return 'motion-chunk';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons-chunk';
            }
            if (id.includes('node_modules/three')) {
              return 'three-chunk';
            }
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
              return 'vendor-chunk';
            }
          }
        },
      }
    },
  };
});

