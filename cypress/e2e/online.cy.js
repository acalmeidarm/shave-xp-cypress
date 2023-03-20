/// <reference types="cypress" />
describe('app', () => {
  it('deve estar online', () => {
    cy.visit('http://localhost:3000')
  })
})