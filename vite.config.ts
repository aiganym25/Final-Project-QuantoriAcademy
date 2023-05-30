import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components/*"),
      service: path.resolve(__dirname, "./src/service"),
      interfaces: path.resolve(__dirname, "./src/interfaces"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      assets: path.resolve(__dirname, "./src/assets"),
      context: path.resolve(__dirname, "./src/context"),
      pages: path.resolve(__dirname, "./src/pages"),
      config: path.resolve(__dirname, "./src/config/*"),
    },
  },
  plugins: [react()],
});
