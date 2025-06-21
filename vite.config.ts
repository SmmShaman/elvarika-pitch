// File: vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Вказуємо Vite, де знаходиться корінь нашого фронтенд-додатку
  root: "client",
  plugins: [react()],
  server: {
    // Обов'язкові налаштування для роботи в Replit
    host: "0.0.0.0",
    hmr: {
      clientPort: 443,
    },
  },
});
