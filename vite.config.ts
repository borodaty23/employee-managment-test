import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/shared/styles/variables.scss"; @import "@/shared/styles/mixins.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
