class LoginPage {
    submit(email = null, password = null) {
        cy.visit('/')

        cy.get('input[placeholder$="email"]').as('email')
        cy.get('input[placeholder*="senha"]').as('password')

        if (email) {
            cy.get('@email').type(email)

        }
        if (password) {
            cy.get('@password').type(password)

        }
        cy.contains('button', 'Entrar').click()
    }

    noticeShouldBe(message) {

        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }

    alertShouldBe(message) {
        cy.get('.alert-error')
            .should('be.visible')
            .should('have.text', message)
    }

    requiredFields(emailMessage, passwordMessage) {
        cy.contains('.alert-error', emailMessage)
            .should('be.visible')

        cy.contains('.alert-error', passwordMessage)
            .should('be.visible')
    }



}

export default new LoginPage()