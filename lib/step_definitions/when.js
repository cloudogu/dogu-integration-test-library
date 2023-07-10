const {
    When,
} = require("@badeball/cypress-cucumber-preprocessor");
const env = require('../environment_variables.js')

let temp_user
let temp_password

module.exports.register = function () {
    When(/^the user opens the dogu start page$/, function () {
        cy.visit("/" + env.GetDoguName(), {failOnStatusCode: false})
    });

    When(/^the user clicks the login button$/, function () {
        cy.get('div[data-testid=login-form-login-button-container]').children('button[type="submit"]').click()
    });

    When(/^the test user logs in with correct credentials$/, function () {
        cy.fixture("testuser_data").then(function (testUser) {
            temp_user = testUser.username
            temp_password = testUser.password
            cy.login(temp_user, temp_password)
        })
    });

    When(/^the user logs in with wrong credentials$/, function () {
        cy.fixture("testuser_data").then(function () {
            temp_user = "RaNd0mUSR_?123"
            temp_password = "RaNd0mPWöäü_?123"
            cy.login(temp_user, temp_password)
        })
    });

    When(/^the user logs out by visiting the cas logout page$/, function () {
        cy.logout()
    });

    When(/^the user logs into the CES$/, function () {
        cy.fixture("testuser_data").then(function (testUser) {
            cy.login(testUser.username, testUser.password)
        })
    });

    When(/^the user is added as a member to the CES admin group$/, function () {
        cy.fixture("testuser_data").then(function (testUser) {
            cy.promoteAccountToAdmin(testUser.username)
        })
    });

    When(/^the user is removed as a member from the CES admin group$/, function () {
        cy.fixture("testuser_data").then(function (testUser) {
            cy.demoteAccountToDefault(testUser.username)
        })
    });
}