/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "../store";
import i18n from "./i18n";
import vueQuery from "./vue-query";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app
    .use(vuetify)
    .use(pinia)
    .use(i18n)
    .use(vueQuery.VueQueryPlugin, vueQuery.vueQueryPluginOptions);
}
