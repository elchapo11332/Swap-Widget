import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
      protocolImports: true,
    }),
    react(),
    tailwindcss(),
  ],
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: ["buffer", "events"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: false,
      allow: ["../.."],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
