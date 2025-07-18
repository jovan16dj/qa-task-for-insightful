import BasePage from '@basepages/BasePage';
import { routes } from '@routes';

class DashboardPage extends BasePage {
  visit() {
    super.visit(routes.dashboard);
  }

  getWidgetTitle(title) {
    return cy.contains('p.oxd-text', title);
  }

  getWidgetByText(text) {
    return cy.contains(text);
  }
}

export default new DashboardPage();
