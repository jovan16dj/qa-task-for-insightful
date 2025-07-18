export default class BasePage {
  visit(path) {
    cy.visit(path);
  }

  assertUrlContains(fragment) {
    cy.url()
      .should('include', fragment);
  }

  assertTitle(expectedTitle) {
    cy.title()
      .should('eq', expectedTitle);
  }

  clickElement(selector) {
    cy.get(selector)
      .click();
  }

  typeText(selector, text) {
  cy.get(selector)
    .should('exist')
    .should('be.visible')
    .clear()
    .type(text);
}

}
