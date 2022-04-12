# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
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
