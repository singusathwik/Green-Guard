// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the backend server
      '/register': 'http://localhost:5000',
      '/login': 'http://localhost:5000',
      '/api': 'http://localhost:5000',
      // Add more endpoints if needed
      '/conservations': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
    },
  },
});
