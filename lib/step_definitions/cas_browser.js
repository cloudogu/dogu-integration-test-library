const {
    Given,
    When,
    Then
} = require("cypress-cucumber-preprocessor/steps");
const env = require('../environment_variables.js')

let temp_user
let temp_password

module.exports.register = function () {
    //
    //
    // Given
    //
    //
    Given(/^the admin is logged in to the CES$/, function () {
        cy.loginAdmin()
    });

    Given(/^the current user is logged out of the CES$/, function () {
        cy.logout()
    });

    //
    //
    // When
    //
    //

    When(/^the user opens the dogu start page$/, function () {
        cy.visit("/" + env.GetDoguName())
    });

    When(/^the user types in wrong login credentials$/, function () {
        temp_user = "RaNd0mUSR_?123"
        temp_password = "RaNd0mPWöäü_?123"
    });

    When(/^the user types in correct login credentials$/, function () {
        console.log(env.GetAdminUsername())
        temp_user = env.GetAdminUsername();
        temp_password = env.GetAdminPassword();
    });

    When(/^the user presses the login button$/, function () {
        cy.login(temp_user, temp_password)
    });

    When(/^the user opens the CAS logout page$/, function () {
        cy.logout()
    });

    //
    //
    // Then
    //
    //

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
        cy.visit("/" + env.GetDoguName())
        cy.url().should('contain', Cypress.config().baseUrl + "/cas/login")
    });

    Then(/^the login page informs the user about invalid credentials$/, function () {
        cy.get('div[id="msg"]').contains("Invalid credentials.")
    });
}