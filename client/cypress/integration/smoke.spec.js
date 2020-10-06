/// <reference types="Cypress" />

beforeEach(() => {
  cy.login()
})

describe("Accounts test", () => {
  it("Creating a product", () => {
    cy.visit("/product");
    expect(cy.contains('h1', 'Jeyasudha Construction & Blue Metals')).to.exist
    cy.contains("Particulars").next().type("Cement")
    cy.contains("Government Price").next().type("199")
    cy.contains("Billing Price").next().type("199")
    cy.contains("CGST percentage").next().clear().type("5")
    cy.contains("SGST percentage").next().clear().type("10")
    cy.contains('button', 'Update').click()
  });
});