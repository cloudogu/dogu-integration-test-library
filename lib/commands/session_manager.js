let sessionStorage = new Map();

/**
 * Saves all cookies from the current session into a storage with the given session id. These session can be restored
 * by calling the function  {@link restoreSession} with the same session id.
 *
 * @param {String} sessionID - The identifier required to restore the session.
 */
const saveCurrentSession = (sessionID) => {
    let currentSession = []
    cy.getCookies().then((cookies) => {
        for (const i in cookies) {
            console.log(cookies[i])
            currentSession.push(cookies[i])
        }
    }).then(function () {
        sessionStorage.set(sessionID, currentSession)
    })
}

/**
 * Restores all cookies from the session saved in the storage with the given session id. Sessions can be restored
 * by calling the function  {@link saveCurrentSession} with the same session id.
 *
 * @param {String} sessionID - The identifier required to restore the session.
 */
const restoreSession = (sessionID) => {
    if (!sessionStorage.has(sessionID)) {
        return
    }

    let session = sessionStorage.get(sessionID)
    for (const cookie in session) {
        cy.setCookie(session[cookie].name, session[cookie].value)
    }
}

/**
 * Checks whether the session store contains a session with the given id.
 *
 * @param {String} sessionID - The identifier of the session.
 */
const hasSession = (sessionID) => {
    let isPresent = sessionStorage.has(sessionID)
    return cy.wrap(isPresent);
}

module.exports.register = function () {
    Cypress.Commands.add("saveCurrentSession", saveCurrentSession)
    Cypress.Commands.add("restoreSession", restoreSession)
    Cypress.Commands.add("hasSession", hasSession)
}