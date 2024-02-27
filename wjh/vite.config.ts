// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import eslintPlugin from "vite-plugin-eslint";
import istanbul from "vite-plugin-istanbul";

// Utilities
import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath, URL } from "node:url";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import browserslistToEsbuild from "browserslist-to-esbuild";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true
    }),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/locales/**"
      )
    }),
    eslintPlugin(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "**/__tests__/**"],
      extension: [".js", ".ts", ".vue"],
      requireEnv: true,
      forceBuildInstrument: true
    })
  ],
  define: { "process.env": {} },
  base: "/",
  build: {
    target: browserslistToEsbuild(),
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"]
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "^(/api|/actuator).*": {
        target: "http://localhost:8080",
        changeOrigin: true
      }
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 3000
  }
});

