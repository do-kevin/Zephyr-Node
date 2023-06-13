import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), million.vite()],
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
