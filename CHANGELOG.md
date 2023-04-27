# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Handling of environment variables from the cypress config

## v6.0.0 - 2023-04-18
### Changed
#### Breaking Change
Cypress Version 12.9.0 or higher is now required
- Make the library compatible with cypress 12

## v5.0.0 - 2022-04-21
### Changed
#### Breaking Change
CAS Version 6.5.2-1 is now required
- Make login compatible with CAS version 6.5.2.

## v4.0.0 - 2022-04-13
### Changed
#### Breaking Change
The signature of the `usermgtCreateUser` method has changed. The parameter `pwdReset` has been added.
- When creating a new user, it is now possible to specify that the user must change their password the next time they 
  log in (#22)

## v3.0.3 - 2022-04-13
### Changed
- Changed the way the library checks if a wrong password is submitted. Now the Element itself is checked prior to a check for a specific string.

## v3.0.2 - 2022-04-12
### Fixed
- Fix the selection of the checkbox that is used to hide the warp-menu tipps (#18)

## v3.0.1 - 2022-04-01
### Fixed
- Remove unused functions (#16)

## v3.0.0 - 2021-11-30
### Changed
#### Breaking Change
CAS Version 6.3.3-9 is now required
- use cas testkeys to select html elements (#14)

## v2.0.0 - 2021-11-08
This release includes breaking changes!
### Changed
- Adapt three When functions to make them behave according to their description  (#12)
  - "the user types in correct login credentials" will type correct test user credentials into the CAS login text boxes
  - "the user types in wrong login credentials" will type wrong credentials into the CAS login text boxes
  - "the user clicks the login button" will press the login button on the CAS login page

### Added
- Create new functions to rebuild original behavior of the changed functions
  - "the test user logs in with correct credentials" replaces "the user types in correct login credentials" and "the user clicks the login button"
  - "the user logs in with wrong credentials" replaces "the user types in wrong login credentials" and "the user clicks the login button"
- Add Given function to turn off warp menu hint

## v1.0.0
### Changed
**Breaking Change:** Remove `cy.fill` with a global option that removes the keystroke delay. The new keystroke delay is set to `0` when using this library. The value can be overridden by executing the following command: 
```javascript
Cypress.Keyboard.defaults({
    keystrokeDelay: 500,
})
```

## v0.5.0
### Changed
* improve test times by replacing `cy.type` with `cy.fill` from the library `cypress-fill-command` (#9)

## v0.4.0
### Fixed
* support for the new cas version 6.3.3-7

## v0.3.0
### Added
* support to provide default groups when creating users

### Changed
* skipping CAS authentication if a valid CAS session is present

## v0.2.2
### Fixed
* broken tests for cas 6 [#4]

## v0.2.1

### Added
* added failOnStatusCode option to prevent tests failure with 403 responses before 302

## v0.2.0

### Added
* initial structure for the library
* support for cas commands (login/logout)
* support for usermgt api commands
* support for redmine api commands
