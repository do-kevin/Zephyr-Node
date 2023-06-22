import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import million from "million/compiler";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), million.vite()],
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:3001",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // remember to add '/api' to requests
      },
    },
  },
});
