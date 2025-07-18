import RecruitmentPage from '@pages/RecruitmentPage';

export function assertSearchResults(title) {
  RecruitmentPage.getVacancyCount().then(count => {
    if (count > 0) {
      if (title) {
        RecruitmentPage.getVacancyRow(title)
          .should('exist')
          .and('contain.text', title);
      } else {
        RecruitmentPage.getAllVacancyRows()
          .should('have.length.greaterThan', 0);
      }
    } else {
      RecruitmentPage.getNoRecordsMessage().should('be.visible');
    }
  });
}

import { faker } from '@faker-js/faker';

export function generateRandomUsername() {
  const base = faker.internet.userName().toLowerCase().replace(/\W/g, '');
  const shortSuffix = Date.now().toString().slice(-3);
  return `${base}${shortSuffix}`;
}

export function generateRandomPassword() {
  const base = faker.internet.password(11, false, /[A-Za-z!@#$%^&*()_+]/)
  return `${base}6` // faker does not guarantee a number, so added this 
}                   // to ensure password criteria is met consistently
