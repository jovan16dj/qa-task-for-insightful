import RecruitmentPage from '@pages/RecruitmentPage';
import { assertSearchResults } from '@support/utils';

describe('Recruitment - Vacancies Search Tests', () => {
  beforeEach(() => {
    cy.loginSession();
    RecruitmentPage.visit();
    RecruitmentPage.clickVacanciesTab();
  });

  it('should search by Job Title only', () => {
    RecruitmentPage.typeJobTitle('Software Engineer');
    RecruitmentPage.clickSearch();
    assertSearchResults('Software Engineer');
  });

  it('should search by dynamic Vacancy', () => {
    RecruitmentPage.selectFirstAvailableVacancy();
    RecruitmentPage.clickSearch();
    assertSearchResults();
  });

  it('should search by dynamic Vacancy + dynamic Hiring Manager', () => {
    RecruitmentPage.selectFirstAvailableVacancy();
    RecruitmentPage.selectFirstAvailableHiringManager();
    RecruitmentPage.clickSearch();
    assertSearchResults();
  });

  it('should search by Status only', () => {
    RecruitmentPage.selectStatus('Active');
    RecruitmentPage.clickSearch();
    assertSearchResults();
  });

  it('should search by all filters combined', () => {
    RecruitmentPage.typeJobTitle('Software Engineer');
    RecruitmentPage.selectFirstAvailableVacancy();
    RecruitmentPage.selectFirstAvailableHiringManager();
    RecruitmentPage.selectStatus('Active');
    RecruitmentPage.clickSearch();
    assertSearchResults('Software Engineer');
  });
});
