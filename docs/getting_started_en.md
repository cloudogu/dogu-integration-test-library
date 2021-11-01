# Getting Started

## Prerequisite

In order to successfully integrate the library, the basic structure of Cypress is required. This looks like this:

```
integrationTests
├── cypress
│ ├── fixtures
│ │ └── *
│ ├── integration
│ │ └── *.feature
│ ├── plugins
│ │ └── index.js
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

**1) Add dependency**.

Add the library as a dependency in package.json:

```json
{
   "dependencies": {
      "cypress": "7.1.0",
      "cypress-cucumber-preprocessor": "4.1.0",
      "@cloudogu/dogu-integration-test-library": "0.1.1-development"
   },
   "scripts": {
      "updateTests": "mkdir -p cypress/integration/dogu_integration_test_lib && cp -r node_modules/@cloudogu/dogu-integration-test-library/lib/integration/* cypress/integration/dogu_integration_test_lib"
   }
}
```

**2) Include library in Cypress project**.

The library must be configured when running Cypress. For this, the file `cypress/plugins/index.js` must be extended as
follows:

```javascript
import 'cypress-fill-command'
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    config = doguTestLibrary.configure(config)
    return config
}
```

**3) Registering the library commands**.

All commands of the library must be registered in the project. For this, the file `cypress/suppoert/index.js` must be
extended as follows:

```javascript
// Loads all commands from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerCommands()

// local commands
import './commands/my_project_commands'
```

**4) Registering the library step definitions**.

All library step definitions must be registered in the project. For this purpose a
file `dogu_integration_test_library_steps.js` should be created in the folder `cypress/support/step-definitions`. The
file must contain the following:

```javascript
// Loads all steps from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerSteps()
```

**5) Adjusting the Cypress configuration**

To make the library work with the Cypress project the following settings have to be made in the `cypress.json`:

1) The base-URL must be adapted to the host system. Therefore the field `baseUrl` must be adapted to the host FQDN (
   e.g. `https://local.cloudogu.com`).
2) Further configurations must be set as environment variables in `cypress.json`:

- `DoguName` - Determines the name of the current dogu and will be used in routing.
- `MaxLoginRetries` - Determines the number of login attempts before a test fails.
- `AdminUsername` - The username of the CES admin.
- `AdminPassword` - The password of the CES admin.
- `AdminGroup` - The user group for CES administrators.

A sample `cypress.json` looks like this:

```json
{
  "baseUrl": "https://192.168.56.2",
  "env": {
    "DoguName": "redmine",
    "MaxLoginRetries": 3,
    "AdminUsername": "ces-admin",
    "AdminPassword": "ecosystem2016",
    "AdminGroup": "CesAdministrators"
  }
}
```

**6) Integrate the global tests into the Dogus**.

Update the tests of the Dogus by calling `yarn updateTestFiles`. These will be copied from the library into the Dogu
project. These should be pushed into the repository. For this to work you still need Dogu specific commands and steps
have to be implemented.

The following commands must be implemented for each dogu:

**Command 1**

```javascript
/**
 * Deletes a user from the dogu via an API call.
 * @param {string} username - The username of the user.
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
 When(/^the user clicks the dogu logout button$/, function () {
    //Originating situation: Dogu start page -> Start the logout process of the dogu via UI
});
```

**Step 2

```javascript
 Then(/^the user has administrator privileges in the dogu$/, function () {
    //Determine that the current user has admin privileges in the dogu
});
```

**Step 3

```javascript
 Then(/^the user has no administrator privileges in the dogu$/, function () {
    //Determine that the current user has no administrator privileges in the dogu
});
```

Translated with www.DeepL.com/Translator (free version)