/// <reference types="cypress" />
describe('app', () => {
  it('deve estar online', () => {
    cy.visit('/')
  })
})