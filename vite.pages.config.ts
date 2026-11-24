// Gera a versão estática do Safepark para o GitHub Pages (pasta dist-pages/).
// BASE_PATH é o caminho do repositório, por exemplo "/safepark/"; o workflow preenche sozinho.
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL("./pages", import.meta.url)),
  base: process.env["BASE_PATH"] ?? "/",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    outDir: fileURLToPath(new URL("./dist-pages", import.meta.url)),
    emptyOutDir: true,
  },
});
