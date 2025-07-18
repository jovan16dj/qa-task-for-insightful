import BasePage from '@basepages/BasePage';
import { routes } from '@routes';

class LoginPage extends BasePage {
  visit() {
    super.visit(routes.login);
  }

  fillUsername(username) {
    this.typeText('input[name="username"]', username);
  }

  fillPassword(password) {
    this.typeText('input[name="password"]', password);
  }

  submit() {
    this.clickElement('button[type="submit"]');
  }

  getErrorMessageElement() {
    return cy.get('.oxd-alert-content-text');
  }

  getRequiredFieldErrorElements() {
    return cy.get('input[name="username"], input[name="password"]')
             .parents('.oxd-input-group')
             .find('.oxd-input-field-error-message');
  }

  getLogoutIcon() {
    return cy.get('.oxd-userdropdown-icon');
  }

  getCurrentUrl() {
    return cy.url();
  }
}

export default new LoginPage();
