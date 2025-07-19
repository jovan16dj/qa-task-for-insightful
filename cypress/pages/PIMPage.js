import BasePage from '@basepages/BasePage'
import { routes } from '@routes'

class PIMPage extends BasePage {
  visit() {
    super.visit(routes.pim)
  }

  goToAddEmployee() {
    cy.contains('h6', 'PIM').should('be.visible')
    cy.contains('Add Employee').click()
  }

  fillEmployeeName(firstName, lastName) {
    cy.get('input[name="firstName"]').clear().type(firstName)
    cy.get('input[name="lastName"]').clear().type(lastName)
  }

  fillUniqueEmployeeId() {
    const shortId = Date.now().toString().slice(-5)
    cy.contains('label', 'Employee Id')
      .parents('.oxd-input-group')
      .find('input')
      .clear()
      .type(shortId)
    return shortId
  }

  submitAddEmployee() {
    cy.get('button[type="submit"]').contains('Save').click()
    cy.url().should('include', '/pim/viewPersonalDetails')
  }

  deleteEmployeeById(id) {
    super.visit(routes.pim)
    cy.contains('label', 'Employee Id')
      .parents('.oxd-input-group')
      .find('input')
      .clear()
      .type(id)
    cy.get('button[type="submit"]').click()
    cy.contains('.oxd-table-card', id)
      .find('i.bi-trash')            
      .parents('button')             
      .click()
    cy.get('button.oxd-button--label-danger').click()
  }
}

export default new PIMPage()
