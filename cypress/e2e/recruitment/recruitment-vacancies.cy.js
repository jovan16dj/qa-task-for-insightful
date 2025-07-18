import RecruitmentPage from '@pages/RecruitmentPage';

describe('Recruitment - Vacancies Search Tests', () => {
  beforeEach(() => {
    cy.loginSession();
    RecruitmentPage.visit();
    RecruitmentPage.clickVacanciesTab();
  });

  it('should search by Job Title only', () => {
    RecruitmentPage.typeJobTitle('Software Engineer');
    RecruitmentPage.clickSearch();

    cy.get('div.oxd-table-body').then(($body) => {
      if ($body.find('.oxd-table-card').length > 0) {
        cy.contains('.oxd-table-card', 'Software Engineer').should('exist');
      } else {
        RecruitmentPage.getNoRecordsMessage().should('be.visible');
      }
    });
  });

  it('should search by dynamic Vacancy', () => {
    RecruitmentPage.selectFirstAvailableVacancy();
    RecruitmentPage.clickSearch();

    cy.get('div.oxd-table-body').then(($body) => {
      if ($body.find('.oxd-table-card').length > 0) {
        cy.get('.oxd-table-card').should('exist');
      } else {
        RecruitmentPage.getNoRecordsMessage().should('be.visible');
      }
    });
  });

  it('should search by dynamic Vacancy + dynamic Hiring Manager', () => {
    RecruitmentPage.selectFirstAvailableVacancy();
    RecruitmentPage.selectFirstAvailableHiringManager();
    RecruitmentPage.clickSearch();

    cy.get('div.oxd-table-body').then(($body) => {
      if ($body.find('.oxd-table-card').length > 0) {
        cy.get('.oxd-table-card').should('exist');
      } else {
        RecruitmentPage.getNoRecordsMessage().should('be.visible');
      }
    });
  });

  it('should search by Status only', () => {
    RecruitmentPage.selectStatus('Active');
    RecruitmentPage.clickSearch();

    cy.get('div.oxd-table-body').then(($body) => {
      if ($body.find('.oxd-table-card').length > 0) {
        cy.get('.oxd-table-card').should('exist');
      } else {
        RecruitmentPage.getNoRecordsMessage().should('be.visible');
      }
    });
  });

  it('should search by all filters combined', () => {
    RecruitmentPage.typeJobTitle('Software Engineer');
    RecruitmentPage.selectFirstAvailableVacancy();
    RecruitmentPage.selectFirstAvailableHiringManager();
    RecruitmentPage.selectStatus('Active');
    RecruitmentPage.clickSearch();

    cy.get('div.oxd-table-body').then(($body) => {
      if ($body.find('.oxd-table-card').length > 0) {
        cy.get('.oxd-table-card').should('exist');
      } else {
        RecruitmentPage.getNoRecordsMessage().should('be.visible');
      }
    });
  });
});
