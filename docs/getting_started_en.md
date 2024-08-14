# Getting Started

## Prerequisite

For the library to be successfully integrated, the basic structure of Cypress is required. This looks
as follows:

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

## Include the library

**1) Add dependency**

Add the library as a dependency in package.json:

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

**2) Include library in Cypress project**

The library must be configured when Cypress is executed. For this the file `cypress.config.js` must be extended
must be extended as follows:

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

**3) Registering the library commands**

All library commands must be registered in the project. For this purpose the file `cypress/support/e2e.js` must be
must be extended as follows:

```javascript
// Loads all commands from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerCommands()

// local commands
import './commands/my_project_commands'
```


**4) Registering the library step definitions**

All library step definitions must be registered in the project. For this purpose a
file `dogu_integration_test_library_steps.js` should be created in the folder `cypress/support/step_definitions`. The file
must contain the following:

```javascript
// Loads all steps from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerSteps()
```

**5) Adjusting the Cypress configuration**

In order to make the library work with the Cypress project the following settings have to be made in the
the `cypress.config.js` must be created:

1) The base-URL must be adapted to the host system. For this the field `baseUrl` must be adapted to the host FQDN
   (e.g. `https://local.cloudogu.com`)
2) Further configurations must be set as environment variables in `cypress.config.js`:

- `DoguName` - Determines the name of the current dogu and will be used in routing.
- `MaxLoginRetries` - Determines the number of login attempts before a test fails.
- `AdminUsername` - The username of the CES admin.
- `AdminPassword` - The password of the CES admin.
- `AdminGroup` - The user group for CES administrators.

A sample `cypress.config.js` looks like this:

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

**6) Integrate the global tests into the Dogus**

Update the tests of the Dogus by calling `yarn updateTestFiles`. These will be copied from the library into the
Dogu project. These should be pushed into the repository. For this to work you still need
Dogu specific commands and steps have to be implemented.

The following commands have to be implemented for each dogu:

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

The following steps must be implemented for each dogu:

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

**7) Create test user fixture**

A fixture named `testuser_data.json` must be created in the `cypress/fixtures` folder. It contains the following information:

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
