const { defineConfig } = require("cypress");
const webpackConfig = require("./config/webpack/test");

module.exports = defineConfig({
  viewportHeight: 700,
  viewportWidth: 1200,
  defaultCommandTimeout: 10000,
  experimentalModifyObstructiveThirdPartyCode: true,
  experimentalStudio: true,
  component: {
    experimentalSingleTabRunMode: true,
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig
    }
  },

  e2e: {
    baseUrl: "http://localhost:8080",
    experimentalOriginDependencies: true,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("@cypress/code-coverage/task")(on, config);
      return config;
    }
  }
});
