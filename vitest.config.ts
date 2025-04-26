import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./vitest-setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    globals: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  plugins: [
    react(),
    {
      name: "load-svg",
      enforce: "pre",
      transform(_, id) {
        if (id.endsWith(".svg")) {
          return "export default () => {}"
        }
      },
    },
  ],
})
