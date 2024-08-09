import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Предоставляем глобальные стили
        additionalData: `@import "@/shared/styles/variables.scss"; @import "@/shared/styles/mixins.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Определяем alias для упрощения путей импорта
    },
  },
});
