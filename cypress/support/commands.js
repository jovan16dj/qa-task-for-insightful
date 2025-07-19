Cypress.Commands.add('loginViaUI', () => {
  cy.visit('/web/index.php/auth/login');

  cy.get('input[name="username"]')
    .should('be.visible')
    .clear()
    .type(Cypress.env('username'));

  cy.get('input[name="password"]')
    .should('be.visible')
    .clear()
    .type(Cypress.env('password'));

  cy.get('button[type="submit"]')
    .should('be.visible')
    .click();

  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('loginSession', () => {
  cy.session(
    'orangehrm-session',
    () => {
      cy.loginViaUI();
    }
  );
});

Cypress.Commands.add('getNoRecordsMessage', () => {
  return cy.contains('No Records Found');
});

Cypress.Commands.add('deleteEmployeeById', (id) => {
  return cy.request({
    method: 'DELETE',
    url: `/web/index.php/api/v2/pim/employees`,
    body: { data: [id], meta: [], rels: [] },
    failOnStatusCode: false,
  });
});
