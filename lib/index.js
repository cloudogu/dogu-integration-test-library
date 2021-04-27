const env = require('./environment_variables.js')
const fs = require('fs')

module.exports.configure = (config) => {
    let rawdata = fs.readFileSync(config.configFile);
    let userConfig = JSON.parse(rawdata);

    if (!userConfig.env) {
        userConfig.env = Object.create(null)
        config.env = Object.create(null)
    }

    // Set dogu name
    if (!userConfig.env.DoguName) {
        console.log("Set dogu name to default: " + env.Default_DoguName)
        config.env.DoguName = env.Default_DoguName
    } else {
        console.log("Set dogu name from config: " + userConfig.env.DoguName)
        config.env.DoguName = userConfig.env.DoguName
    }

    // Set max retries for login
    if (!userConfig.env.MaxLoginRetries) {
        console.log("Set MaxLoginRetries to default: " + env.Default_MaxLoginRetries)
        config.env.MaxLoginRetries = env.Default_MaxLoginRetries
    } else {
        console.log("Set MaxLoginRetries from config: " + userConfig.env.MaxLoginRetries)
        config.env.MaxLoginRetries = userConfig.env.MaxLoginRetries
    }

    // Set the username for the admin
    if (!userConfig.env.AdminUsername) {
        console.log("Set admin username to default: " + env.Default_AdminUsername)
        config.env.AdminUsername = env.Default_AdminUsername
    } else {
        console.log("Set admin username from config: " + userConfig.env.AdminUsername)
        config.env.AdminUsername = userConfig.env.AdminUsername
    }

    // Set the password for the admin
    if (!userConfig.env.AdminPassword) {
        console.log("Set admin group to default: " + env.Default_AdminGroup)
        config.env.AdminPassword = env.Default_AdminPassword
    } else {
        console.log("Set admin group from config: " + userConfig.env.AdminPassword)
        config.env.AdminPassword = userConfig.env.AdminPassword
    }

    // Set the group for the admin
    if (!userConfig.env.AdminGroup) {
        console.log("Set admin group to default: " + env.Default_AdminGroup)
        config.env.AdminGroup = env.Default_AdminGroup
    } else {
        console.log("Set admin group from config: " + userConfig.env.AdminGroup)
        config.env.AdminGroup = userConfig.env.AdminGroup
    }

    return config
}

// Import custom commands
const commands_misc = require('./commands/misc')
const commands_usermgt = require('./commands/usermgt_api')
const commands_redmine = require('./commands/redmine_api')
module.exports.registerCommands = function () {
    console.log("Register commands from dogu integration test library...")
    commands_misc.register()
    commands_usermgt.register()
    commands_redmine.register()
}

// Import custom steps
const steps_cas_browser = require('./step_definitions/cas_browser')
module.exports.registerSteps = function () {
    console.log("Register steps from dogu integration test library...")
    steps_cas_browser.register()
}