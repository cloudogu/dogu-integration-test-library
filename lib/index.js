const env = require('./environment_variables.js')

module.exports.configure = (config) => {

    // Set dogu name
    if (!config.env.DoguName) {
        console.log("Set dogu name to default: " + env.Default_DoguName)
        config.env.DoguName = env.Default_DoguName
    }

    // Set max retries for login
    if (!config.env.MaxLoginRetries) {
        console.log("Set MaxLoginRetries to default: " + env.Default_MaxLoginRetries)
        config.env.MaxLoginRetries = env.Default_MaxLoginRetries
    }

    // Set the username for the admin
    if (!config.env.AdminUsername) {
        console.log("Set admin username to default: " + env.Default_AdminUsername)
        config.env.AdminUsername = env.Default_AdminUsername
    }

    // Set the password for the admin
    if (!config.env.AdminPassword) {
        console.log("Set admin password to default: " + env.Default_AdminPassword)
        config.env.AdminPassword = env.Default_AdminPassword
    }

    // Set the group for the admin
    if (!config.env.AdminGroup) {
        console.log("Set admin group to default: " + env.Default_AdminGroup)
        config.env.AdminGroup = env.Default_AdminGroup
    }

    return config
}

// Import custom commands
const commands_misc = require('./commands/misc')
const commands_usermgt = require('./commands/usermgt_api')
const commands_redmine = require('./commands/redmine_api')
const commands_portainer = require('./commands/portainer_api')
module.exports.registerCommands = function () {
    Cypress.Keyboard.defaults({
        keystrokeDelay: 0,
    })

    console.log("Register commands from dogu integration test library...")
    commands_misc.register()
    commands_usermgt.register()
    commands_redmine.register()
    commands_portainer.register()
}

// Import custom steps
const steps_before = require('./step_definitions/before')
const steps_after = require('./step_definitions/after')
const steps_given = require('./step_definitions/given')
const steps_when = require('./step_definitions/when')
const steps_then = require('./step_definitions/then')
module.exports.registerSteps = function () {
    console.log("Register steps from dogu integration test library...")
    steps_before.register()
    steps_after.register()
    steps_given.register()
    steps_when.register()
    steps_then.register()
}