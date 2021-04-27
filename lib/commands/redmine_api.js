const env = require('../environment_variables.js')
// ***********************************************
// api commands for redmine
// ***********************************************

/**
 * Retrieves the user json of the user via a basic authentication. Both user and password need to exist for a successful request.
 * A failed request is not tolerated and fails the test.
 * @param {String} username - The username of the user.
 * @param {String} password  - The password of the user.
 * @returns a promise for the request
 */
const redmineGetCurrentUserJsonWithBasic = (username, password) => {
    return cy.request({
        method: "GET",
        url: Cypress.config().baseUrl + "/redmine/users/current.json",
        auth: {
            'user': username,
            'pass': password
        },
        failOnStatusCode: false
    })
}

/**
 * Retrieves the user json of the user via an api key authentication. The api key needs to exist for a successful request.
 * A failed request is not tolerated and fails the test.
 * @param {String} apiKey - The api key of the user.
 * @returns a promise for the request
 */
const redmineGetCurrentUserJsonWithKey = (apiKey) => {
    return cy.request({
        method: "GET",
        url: Cypress.config().baseUrl + "/redmine/users/current.json",
        headers: {
            'X-Redmine-API-Key': apiKey,
        },
        failOnStatusCode: false
    })
}

/**
 * Retrieves the users.json via api request.
 * @param {String} apiKey - The api key of the user used for authorization.
 * @return the response of the request
 */
const redmineGetUsersJson = (apiKey) => {
    return cy.request({
        method: "GET",
        url: Cypress.config().baseUrl + "/redmine/users.json",
        headers: {
            'X-Redmine-API-Key': apiKey,
        },
        failOnStatusCode: false
    })
}

/**
 * Deletes a user from redmine.
 * @param {String} username - The username of the user.
 * @param {boolean} exitOnFail - Determines whether the test should fail when the request did not succeed. Default: false
 */
const redmineDeleteUser = (username, exitOnFail = false) => {
    cy.redmineGetCurrentUserJsonWithBasic(env.GetAdminUsername(), env.GetAdminPassword()).then((responseApiKey) => {
        expect(responseApiKey.status).to.eq(200)
        cy.redmineGetUsersJson(responseApiKey.body.user.api_key).then((response) => {
            expect(response.status).to.eq(200)
            const users = response.body.users;
            for (let i in users) {
                if (users[i].login === username) {
                    return cy.request({
                        method: "DELETE",
                        url: Cypress.config().baseUrl + "/redmine/users/" + users[i].id + ".json",
                        auth: {
                            'user': env.GetAdminUsername(),
                            'pass': env.GetAdminPassword()
                        },
                        failOnStatusCode: exitOnFail
                    })
                }
            }
        })
    })
}

module.exports.register = function () {
    // /users/current.json
    Cypress.Commands.add("redmineGetCurrentUserJsonWithBasic", redmineGetCurrentUserJsonWithBasic)
    Cypress.Commands.add("redmineGetCurrentUserJsonWithKey", redmineGetCurrentUserJsonWithKey)
    // /users.json
    Cypress.Commands.add("redmineGetUsersJson", redmineGetUsersJson)
    // /users/id.json
    Cypress.Commands.add("redmineDeleteUser", redmineDeleteUser)
}
