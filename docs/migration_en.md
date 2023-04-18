# Migration

## Migrate to v6.0.0

With the v6.0.0 release of the library, Cypress has been upgraded from v8.6.0 to Cypress v12.9.0.
This results in adjustments to the configuration and project structure, which are described below:

#### package.json
The `package.json` now contains the new Cypress Cucumber plugin and now has the following dependencies:
```json
{
  "dependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^16.0.0",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.0",
    "@cloudogu/dogu-integration-test-library": "6.0.0",
    "cypress": "^12.9.0",
    "@bahmutov/cy-api": "^2.2.4"
  }
}
```

#### Configuration
The configuration of Cypress can be found in the file `cypress.config.js`.
The old configuration file `cypress.json` can be deleted after migration.
The plugin configuration `cypress/e2e/plugins/index.js` is no longer needed and is in `cypress.config.js`.

The data from the two old configuration files can be transferred to the new `cypress.config.js`.
It will look like this:

```javascript
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
   e2e: {
      baseUrl: 'https://192.168.56.2',
      env: {
         "DoguName": "redmine",
         "MaxLoginRetries": 3,
         "AdminUsername": "ces-admin",
         "AdminPassword": "ecosystem2016",
         "AdminGroup": "CesAdministrators"
      },
      videoCompression: false,
      specPattern: ["cypress/e2e/**/*.feature"],
      setupNodeEvents(on, config) {
         config = doguTestLibrary.configure(config)
         
         return config
      },
   },
})
```

#### Project structure
* The directory `cypress/integration/` must be renamed to `cypress/e2e/`.
* The old configuration file `cypress.json` must be deleted.
* The old plugin configuration `cypress/e2e/plugins/index.js` must be deleted.
* The Cypress "support" file must be renamed from `cypress/support/index.js` to `cypress/support/e2e.js`.


#### New version of the Cypress Cucumber plugin
In the new version of the Cypress-Cucumber plugin the name of the plugin has also changed, so `import` or `require` statements have to be adjusted:

##### Old
```javascript
const { After} = require("cypress-cucumber-preprocessor/steps");
```

##### New
```javascript
const { After} = require("@badeball/cypress-cucumber-preprocessor");
```

These adjustments have to be done mainly in the step definitions directory `cypress/support/step_definitions`.

Translated with www.DeepL.com/Translator (free version)