import DashboardPage from '@pages/DashboardPage';

describe('Dashboard Data Validation', () => {
  before(() => {
    cy.loginSession();
  });

  it('should validate key widgets and check negative assertions', () => {
    DashboardPage.visit();

    // positive assertions for real widgets
    DashboardPage.getWidgetTitle('Time at Work').should('be.visible');
    DashboardPage.getWidgetTitle('Employee Distribution by Sub Unit').should('be.visible');
    DashboardPage.getWidgetTitle('Employee Distribution by Location').should('be.visible');

    // negative assertions
    DashboardPage.getWidgetByText('Nonexistent Widget').should('not.exist');
    DashboardPage.getWidgetByText('999999 hours').should('not.exist');
  });
});
