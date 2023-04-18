# Migration

## Auf v6.0.0 migrieren

Mit der Version v6.0.0 der library wurde Cypress von v8.6.0 auf Cypress v12.9.0 aktualisiert.
Dadurch ergeben sich Anpassungen an der Konfiguration und der Projektstruktur, die im Folgenden beschrieben werden:

#### package.json
Die `package.json` enthält jetzt das neue Cypress-Cucumber-Plugin und hat jetzt die folgenden Abhängigkeiten:
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

#### Konfiguration
Die Konfiguration von Cypress ist in der Datei `cypress.config.js` zu finden.
Die alte Konfigurations-Datei `cypress.json` kann nach der Migration gelöscht werden.
Die Plugin-Konfiguration `cypress/e2e/plugins/index.js` wird nicht länger benötigt und ist in der `cypress.config.js`.

Die Daten aus den beiden alten Konfigurations-Datein können in die neue `cypress.config.js` übertragen werden.
Die sieht dann beispielsweise wie folgt aus:#

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


#### Projektstruktur
 * Das Verzeichnis `cypress/integration/` muss in `cypress/e2e/` umbenannt werden.
 * Die alte Konfigurations-Datei `cypress.json` muss gelöscht werden.
 * Die alte Plugin-Konfiguration `cypress/e2e/plugins/index.js` muss gelöscht werden.
 * Die Cypress "support"-Datei muss von `cypress/support/index.js` in `cypress/support/e2e.js` umbenannt werden


#### Neue Version des Cypress-Cucumber-Plugins
In der neuen Version des Cypress-Cucumber-Plugins hat sich auch der name des Plugins geändert, so dass `import`- oder `require`-statements angepasst werden müssen:

##### Alt
```javascript
const { After} = require("cypress-cucumber-preprocessor/steps");
```

##### Neu
```javascript
const { After} = require("@badeball/cypress-cucumber-preprocessor");
```

Diese Anpassungen müssen vor allem im Verzeichnis der Step-Definitions `cypress/support/step_definitions` durchgeführt werden.