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
    "@cloudogu/dogu-integration-test-library": "0.1.1-development"
  }
}
```

**2) Include library in Cypress project**.

The library must be configured when running Cypress. For this, the file `cypress/plugins/index.js` must be extended as follows:
```javascript
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

All commands of the library must be registered in the project. For this, the file `cypress/suppoert/index.js` must be extended as follows:
```javascript
// Loads all commands from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerCommands()

// local commands
import './commands/my_project_commands'
```

**4) Registering the library step definitions**.

All library step definitions must be registered in the project. For this purpose a file `dogu_integration_test_library_steps.js` should be created in the folder `cypress/support/step-definitions`. The file must contain the following:
```javascript
// Loads all steps from the dogu integration library into this project
const doguTestLibrary = require('@cloudogu/dogu-integration-test-library')
doguTestLibrary.registerSteps()
```

**5) Adjusting the Cypress configuration**

To make the library work with the Cypress project the following settings have to be made in the `cypress.json`:

1) The base-URL must be adapted to the host system.
   Therefore the field `baseUrl` must be adapted to the host FQDN (e.g. `https://local.cloudogu.com`).
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
    "AdminUsername":  "ces-admin",
    "AdminPassword":  "ecosystem2016",
    "AdminGroup":  "CesAdministrators"
  }
}
```

Now all commands and step definitions should be available in the Cypress project.

Translated with www.DeepL.com/Translator (free version)