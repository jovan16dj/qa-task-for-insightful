import BasePage from '@basepages/BasePage';
import { routes } from '@routes';

class UserManagementPage extends BasePage {
  visit() {
    super.visit(routes.adminUsers);
  }

  getAddUserButton() {
    return cy.get('button:contains("Add")');
  }

  clickAddUser() {
    this.getAddUserButton().click();
  }

  fillUsername(username) {
    cy.contains('label', 'Username')
      .parents('.oxd-input-group')
      .find('input')
      .clear()
      .type(username);
  }

  selectUserRole(role) {
    cy.get('.oxd-form-row')
      .contains('User Role')
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();

    cy.contains('.oxd-select-option', role).click();
  }

  fillEmployeeName(name) {
    cy.get('input[placeholder="Type for hints..."]').clear().type(name);
    cy.wait(500);
    cy.get('.oxd-autocomplete-dropdown > *').contains(name).click();
  }

  selectStatus(status) {
    cy.contains('label', 'Status')
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();

    cy.contains('.oxd-select-option', status).click();
  }

  fillPassword(password) {
    cy.contains('label', 'Password')
      .parents('.oxd-input-group')
      .find('input')
      .clear()
      .type(password);
  }

  fillConfirmPassword(password) {
    cy.contains('label', 'Confirm Password')
      .parents('.oxd-input-group')
      .find('input')
      .clear()
      .type(password);
  }

  submitAddUser() {
    cy.get('button[type="submit"]').contains('Save').click();
  }

  typeSearchUsername(username) {
    return cy.contains('label', 'Username')
      .parents('.oxd-input-group')
      .find('input')
      .clear()
      .type(username);
  }

  clickSearchButton() {
    return cy.get('button[type="submit"]').contains('Search').click();
  }

  getUserRow(username) {
    return cy.contains('.oxd-table-card', username);
  }

  clickEditUser(username) {
    this.getUserRow(username)
      .find('i.bi-pencil-fill')
      .parent('button')
      .click();
  }

  clickDeleteUser(username) {
    this.getUserRow(username)
      .find('i.bi-trash')
      .parent('button')
      .click();
  }

  confirmDelete() {
    cy.get('button').contains('Yes, Delete').click();
  }
}

export default new UserManagementPage();
