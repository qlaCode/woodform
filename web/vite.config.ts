import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point to the root node_modules for Sanity packages
      "@sanity/client": path.resolve(
        __dirname,
        "../node_modules/@sanity/client"
      ),
      "@sanity/image-url": path.resolve(
        __dirname,
        "../node_modules/@sanity/image-url"
      ),
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
});
