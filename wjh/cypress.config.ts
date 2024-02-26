import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  e2e: {
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "cypress.reporter-config.json"
    },
    baseUrl: "http://localhost:3000",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      on("file:preprocessor", vitePreprocessor());
      require("@cypress/code-coverage/task")(on, config);

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
    viewportWidth: 1650,
    viewportHeight: 900
  }
});
