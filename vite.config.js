import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        card: "card/index.html",
        tileStyleLibrary: "tile-style-library/index.html",
      },
    },
  },
});
