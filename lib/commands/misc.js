const env = require('../environment_variables.js')

/**
 * Logs a given user into the CES.
 * @param {String} username - The username of the user.
 * @param {String} password - The password for the user.
 * @param {number} retryCount - The current apptempt for a successful login. If this number exceeds the max retry count
 * then the test fails.
 */
const login = (username, password, retryCount = 0) => {
    cy.visit("/" + env.GetDoguName())
    cy.clickWarpMenuCheckboxIfPossible()

    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.get('button[name="submit"]').click()

    cy.url().then(function (url) {
        if (url.includes("cas/login") && retryCount < env.GetMaxRetryCount()) {
            ++retryCount
            cy.login(username, password, retryCount)
        }
    })
}


/**
 * Logs the defined admin user into the ces. The data for the admin user can be defined in the cypress.json.
 */
const loginAdmin = () => {
    cy.visit("/" + env.GetDoguName())
    cy.clickWarpMenuCheckboxIfPossible()
    cy.login(env.GetAdminUsername(), env.GetAdminPassword());
}

/**
 * Log the current user out of the cas via back-channel logout.
 */
const logout = () => {
    cy.visit("/cas/logout")
}

/**
 * Handles the warp menu tooltip by clicking the 'do not show again' checkbox on the first time.
 */
const clickWarpMenuCheckboxIfPossible = () => {
    cy.get('div[id="warp-menu-container"]').then(function (container) {
        let warpContainer = container.children(".warp-menu-column-tooltip")
        if (warpContainer.length === 1) {
            cy.get('input[type="checkbox"]').click(true)
        }
    })
}

/**
 * Returns whether the given user has administrative privileges in the CES.
 * @param {String} username - The username of the user to check.
 */
const isCesAdmin = (username) => {
    cy.usermgtGetUser(username).then(function (response) {
        for (var element of response.memberOf) {
            if (element === env.GetAdminGroup()) {
                return true
            }
        }
        return false
    })
}

/**
 * Promotes an account to a ces admin account. If the given account is already admin it does nothing.
 * @param {String} username - The username of the user to promote.
 */
const promoteAccountToAdmin = (username) => {
    cy.isCesAdmin(username).then(function (isAdmin) {
        if (!isAdmin) {
            cy.usermgtAddMemberToGroup(env.GetAdminGroup(), username)
        }
    })
}

/**
 * Demotes an account to a ces default account. If the given account is already a default account it does nothing.
 * @param {String} username - The username of the user to demote.
 */
const demoteAccountToDefault = (username) => {
    cy.isCesAdmin(username).then(function (isAdmin) {
        if (isAdmin) {
            cy.usermgtRemoveMemberFromGroup(env.GetAdminGroup(), username)
        }
    })
}

module.exports.register = function () {
    Cypress.Commands.add("clickWarpMenuCheckboxIfPossible", clickWarpMenuCheckboxIfPossible)
    Cypress.Commands.add("demoteAccountToDefault", demoteAccountToDefault)
    Cypress.Commands.add("isCesAdmin", isCesAdmin)
    Cypress.Commands.add("login", login)
    Cypress.Commands.add("loginAdmin", loginAdmin)
    Cypress.Commands.add("logout", logout)
    Cypress.Commands.add("promoteAccountToAdmin", promoteAccountToAdmin)
}