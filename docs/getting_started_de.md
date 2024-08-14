# Getting Started

## Voraussetzung

Damit die library erfolgreich eingebunden werden kann wird die Basisstruktur von Cypress vorausgesetzt. Diese sieht
folgendermaßen aus:

```
integrationTests
├── cypress
│ ├── fixtures
│ │ └── *
│ ├── e2e
│ │ └── *.feature
│ └── support
│ ├── step_definitions
│ │ └── *.js
│ ├── commands
│ │ └── *.js
│ └── index.js
├── cypress.json
├── package.json
└── yarn.lock
```

## Einbinden der Library

**1) Abhängigkeit hinzufügen**

Die Library als Abhängigkeit in der package.json hinzufügen:

```json
{
   "dependencies": {
      "cypress": "12.9.0",
      "@badeball/cypress-cucumber-preprocessor": "^16.0.0",
      "@bahmutov/cypress-esbuild-preprocessor": "^2.2.0",
      "@cloudogu/dogu-integration-test-library": "6.0.0"
   },
   "scripts": {
      "updateTests": "mkdir -p cypress/e2e/dogu_integration_test_lib && cp -r node_modules/@cloudogu/dogu-integration-test-library/lib/integration/* cypress/e2e/dogu_integration_test_lib"
   }
}
```

**2) Library in Cypress Projekt einbinden**

Die Library muss bei Ausführung von Cypress konfiguriert werden. Dafür muss die Datei `cypress.config.js`
folgendermaßen erweitert werden:

```javascript
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
   // setupNodeEvents can be defined in either
   // the e2e or component configuration
   e2e: {
      setupNodeEvents(on, config) {
         config = doguTestLibrary.configure(config)
         
         return config
      },
   },
})
```

**3) Registrieren der Library-Befehle**

Alle Befehle der Library müssen im Projekt registriert werden. Dafür muss die Datei `cypress/support/e2e.js`
folgendermaßen erweitert werden:

```javascript
// Loads all commands from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerCommands()

// local commands
import './commands/my_project_commands'
```

**4) Registrieren der Library-Schritt-Definitionen**

Alle Schritt-Definitionen der Library müssen im Projekt registriert werden. Dafür sollte eine
Datei `dogu_integration_test_library_steps.js` im Ordner `cypress/support/step_definitions` angelegt werden. Die Datei
muss folgendes enthalten:

```javascript
// Loads all steps from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerSteps()
```

**5) Anpassen der Cypress konfiguration**

Damit die Library nun auch sinnvoll mit dem Cypress Projekt arbeiten kann, müssen folgenden Einstellung in
der `cypress.config.js` erstellt werden:

1) Es muss die base-URL auf das Hostsystem angepasst werden. Dafür muss das Feld `baseUrl` auf die Host-FQDN angepasst
   werden (z.B. `https://local.cloudogu.com`)
2) Weitere Konfigurationen müssen als Umgebungsvariablen in der `cypress.config.js` gesetzt werden:

- `DoguName` - Bestimmt den Namen des jetzigen Dogus und wir beim Routing benutzt.
- `MaxLoginRetries` - Bestimmt die Anzahl der Loginversuche, bevor ein Test fehlschlägt.
- `AdminUsername` - Der Benutzername des CES-Admins.
- `AdminPassword` - Das Passwort des CES-Admins.
- `AdminGroup` - Die Benutzergruppe für CES-Administratoren.

Eine Beispiel-`cypress.config.js` sieht folgendermaßen aus:

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
         "AdminPassword": "ecosystem2016!",
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

**6) Integrieren der globalen Tests in das Dogus**

Aktualisiere die Tests des Dogus, indem du `yarn updateTestFiles` aufrufst. Diese werden aus der Library in das
Dogu-Projekt kopiert. Diese sollen in das Repository gepusht werden. Damit dieser funktionieren müssen noch
Dogu-spezifische Kommandos und Schritte implementiert werden.

Es müssen die folgenden Commands für jedes Dogu implementiert werden:

**Command 1**

```javascript
/**
 * Deletes a user from the dogu via an API call.
 * @param {String} username - The username of the user.
 * @param {boolean} exitOnFail - Determines whether the test should fail when the request did not succeed. Default: false
 */
const deleteUserFromDoguViaAPI = (username, exitOnFail = false) => {
    // Implement here 
}
Cypress.Commands.add("deleteUserFromDoguViaAPI", deleteUserFromDoguViaAPI)
```

Es müssen die folgenden Steps für jedes Dogu implementiert werden:

**Step 1**

```javascript
 When(/the user clicks the dogu logout button/, function () {
    //Ausgangssituation: Dogu Startseite -> Starte den Logoutprozess des Dogus via UI
});
```

**Step 2**

```javascript
 Then(/the user has administrator privileges in the dogu/, function () {
    //Bestimme, dass der derzeitige User Adminrechte im Dogu
});
```

**Step 3**

```javascript
 Then(/the user has no administrator privileges in the dogu/, function () {
    //Bestimme, dass der derzeitige User kein Adminrechte im Dogu
});
```

**7) Test-User Fixture anlegen**

Es muss im Ordner `cypress/fixtures` eine Fixture mit dem Namen `testuser_data.json` angelegt werden. Diese enthält folgende Informationen:

```json
{
  "username": "testuser",
  "password": "testuserpassword",
  "givenname": "test",
  "surname": "test",
  "displayName": "test",
  "mail": "test@cloudogu.com"
}
```
