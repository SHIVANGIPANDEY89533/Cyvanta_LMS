import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': {
        target: 'https://cyvanta-lms-backend.onrender.com',
        changeOrigin: true
      }
    }
  }
});