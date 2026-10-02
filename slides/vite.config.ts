import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

export default defineConfig({
  publicDir: fileURLToPath(new URL("../assets", import.meta.url)),
  build: {
    emptyOutDir: true,
  },
});
