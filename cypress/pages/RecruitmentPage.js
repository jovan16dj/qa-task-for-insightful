import BasePage from '@basepages/BasePage';
import { routes } from '@routes';

class RecruitmentPage extends BasePage {
  visit() {
    super.visit(routes.recruitment);
  }

  clickVacanciesTab() {
    cy.contains('a', 'Vacancies').click();
  }

  typeJobTitle(title) {
    cy.contains('label', 'Job Title')
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();
    cy.contains('.oxd-select-option', title).click();
  }

  selectFirstAvailableVacancy() {
    cy.contains('label', 'Vacancy')
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();
    cy.get('.oxd-select-option').eq(1).click();
  }

  selectFirstAvailableHiringManager() {
    cy.contains('label', 'Hiring Manager')
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();
    cy.get('.oxd-select-option').eq(1).click();
  }

  selectStatus(status) {
    cy.contains('label', 'Status')
      .parents('.oxd-input-group')
      .find('.oxd-select-text')
      .click();
    cy.contains('.oxd-select-option', status).click();
  }

  clickSearch() {
    cy.get('button[type="submit"]').contains('Search').click();
  }

  // synchronous find inside a single .then, so no retry on '.oxd-table-card'
  getAllVacancyRows() {
    return cy.get('div.oxd-table-body').then($body => {
      const cards = $body.find('.oxd-table-card');
      return cy.wrap(cards);
    });
  }

  getVacancyCount() {
    return cy.get('div.oxd-table-body').then($body => {
      return $body.find('.oxd-table-card').length;
    });
  }

  getVacancyRow(vacancyName) {
    return cy.contains('.oxd-table-card', vacancyName);
  }

  getNoRecordsMessage() {
    return cy.contains('No Records Found');
  }
}

export default new RecruitmentPage();
