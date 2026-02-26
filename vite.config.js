import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: `${process.cwd()}/index.html`,
        categories: `${process.cwd()}/categories/index.html`,
        categoriesAsian: `${process.cwd()}/categories/asian/index.html`,
        categoriesBlack: `${process.cwd()}/categories/black/index.html`,
        categoriesLatina: `${process.cwd()}/categories/latina/index.html`,
        categoriesWhite: `${process.cwd()}/categories/white/index.html`,
        categoriesMixed: `${process.cwd()}/categories/mixed/index.html`,
        popular: `${process.cwd()}/popular/index.html`,
        search: `${process.cwd()}/search/index.html`,
        legal2257: `${process.cwd()}/2257/index.html`,
      },
    },
  },
});
