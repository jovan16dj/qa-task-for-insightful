import BasePage from '@basepages/BasePage';
import { routes } from '@routes';

class PIMPage extends BasePage {
  visit() {
    super.visit(routes.pim);
  }

  goToAddEmployee() {
    cy.contains('h6', 'PIM').should('be.visible');
    cy.contains('Add Employee').click();
  }

  fillEmployeeName(firstName, lastName) {
    cy.get('input[name="firstName"]').clear().type(firstName);
    cy.get('input[name="lastName"]').clear().type(lastName);
  }

  submitAddEmployee() {
    cy.get('button[type="submit"]').contains('Save').click();
    cy.url().should('include', '/pim/viewPersonalDetails');
  }

  fillUniqueEmployeeId() {
    const timestamp = Date.now().toString();
    const shortId = timestamp.slice(-5);
    cy.contains('label', 'Employee Id')
      .parents('.oxd-input-group')
      .find('input')
      .clear()
      .type(shortId);
  }
}

export default new PIMPage();
