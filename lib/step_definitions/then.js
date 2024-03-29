const {
    Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const env = require('../environment_variables.js')

module.exports.register = function () {
    Then(/^the user is logged in to the dogu$/, function () {
        cy.url().should('contain', Cypress.config().baseUrl + "/" + env.GetDoguName())
    });

    Then(/^the user is redirected to the CAS login page$/, function () {
        cy.url().should('contain', Cypress.config().baseUrl + "/cas/login")
    });

    Then(/^the user is redirected to the CAS logout page$/, function () {
        cy.url().should('contain', Cypress.config().baseUrl + "/cas/logout")
    });

    Then(/^the user is logged out of the dogu$/, function () {
        // Verify logout by visiting dogu => should redirect to loginpage
        cy.visit("/" + env.GetDoguName(), {failOnStatusCode: false})
        cy.url().should('contain', Cypress.config().baseUrl + "/cas/login")
    });

    Then(/^the login page informs the user about invalid credentials$/, function () {
        cy.get('div[data-testid="login-error-msg"]').should('be.visible')

    });
}