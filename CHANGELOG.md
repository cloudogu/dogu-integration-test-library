# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
* improve test times by replacing `cy.type` with `cy.fill` from the library `cypress-fill-command` #9

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
