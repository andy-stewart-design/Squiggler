import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/lib/components"),
      "@utils": path.resolve(__dirname, "./src/lib/utils"),
    },
  },
  plugins: [svelte()],
  server: {
    host: true,
  },
});
