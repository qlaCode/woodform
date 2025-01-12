import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@sanity/image-url"],
    },
  },
  optimizeDeps: {
    include: ["@sanity/image-url"],
  },
});
