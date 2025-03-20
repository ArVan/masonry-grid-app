import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/masonry-grid-app/",
  plugins: [react()],
  server: {
    allowedHosts: ["localhost", "127.0.0.1", "arvan.github.io"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router-dom")) return "react-router";
            if (id.includes("zustand")) return "zustand";
            if (id.includes("styled-components")) return "styled-components";
            return "vendor";
          }
        },
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), // Optimizes styled-components for production
  },
});
