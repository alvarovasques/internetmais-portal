import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const PROJECT_ROOT = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client", "src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
    },
  },
  root: path.resolve(PROJECT_ROOT, "client"),
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist", "public"),
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
});
