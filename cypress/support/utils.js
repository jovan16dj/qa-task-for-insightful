import { faker } from '@faker-js/faker';

export function generateRandomUsername() {
  const base = faker.internet.userName().toLowerCase().replace(/\W/g, '');
  const shortSuffix = Date.now().toString().slice(-3); 
  return `${base}${shortSuffix}`;
}

export function generateRandomPassword() {
  return faker.internet.password(12, false, /[A-Za-z0-9!@#$%^&*()_+]/);
}