import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";
import codeCoverage from "@cypress/code-coverage/task";

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
      codeCoverage(on, config);

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
    viewportWidth: 1650,
    viewportHeight: 900
  }
});
