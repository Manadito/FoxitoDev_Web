import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  assetsInclude: ["**/*.glb"], // Don't forget to add this. This ensures Vite treats '.glb' files as static assets and avoid parsing it as if it were a js module
});
