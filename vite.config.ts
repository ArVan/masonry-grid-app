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
});
