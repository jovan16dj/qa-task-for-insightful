import LoginPage from '@pages/LoginPage';
import { routes } from '@routes';

describe('Login Form Tests', () => {
  it('should login successfully with valid credentials', () => {
    LoginPage.visit();
    LoginPage.fillUsername(Cypress.env('username'));
    LoginPage.fillPassword(Cypress.env('password'));
    LoginPage.submit();

    cy.url().should('include', routes.dashboard);
  });

  it('should show error on invalid credentials', () => {
    LoginPage.visit();
    LoginPage.fillUsername('invalidUser');
    LoginPage.fillPassword('invalidPass');
    LoginPage.submit();

    LoginPage.getErrorMessageElement()
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('should show required fields on no input', () => {
    LoginPage.visit();
    LoginPage.submit();

    LoginPage.getRequiredFieldErrorElements()
      .should('be.visible')
      .and('contain.text', 'Required');
  });
});
