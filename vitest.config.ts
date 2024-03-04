import { configDefaults, defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath } from "node:url";
import path from "path";

// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    })
  ],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/*"],
    root: fileURLToPath(new URL("./", import.meta.url)),
    deps: {
      inline: ["vuetify"]
    },
    setupFiles: "vitest.setup.ts",
    coverage: {
      provider: "v8",
      reporter: [["text"], ["html"], ["lcovonly"]]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});

