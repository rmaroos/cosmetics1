import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dedicated Standalone Vite configuration for Kardamon Admin Portal
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
});
