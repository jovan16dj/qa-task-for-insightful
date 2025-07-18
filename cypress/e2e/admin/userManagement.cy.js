import PIMPage from '@pages/PIMPage';
import UserManagementPage from '@pages/UserManagementPage';
import {
  generateRandomUsername,
  generateRandomPassword,
} from '@support/utils';

describe('User Management Test with Fixture-based Employees and Faker Credentials', () => {
  before(() => {
    cy.loginSession();
  });

  it('should create users using userData.json and faker for credentials', function () {
    cy.fixture('userData.json').then((users) => {
      users.forEach((user) => {
        const username = generateRandomUsername(); // intentionally using faker here for test data diversity.
        const password = generateRandomPassword();
        const employeeFullName = `${user.firstName} ${user.lastName}`;

        // pre-requisite: create employee
        PIMPage.visit();
        PIMPage.goToAddEmployee();
        PIMPage.fillEmployeeName(user.firstName, user.lastName);
        PIMPage.fillUniqueEmployeeId();
        PIMPage.submitAddEmployee();

        // step 1: add user linked to that employee
        UserManagementPage.visit();
        UserManagementPage.clickAddUser();
        UserManagementPage.selectUserRole(user.role);
        UserManagementPage.fillEmployeeName(employeeFullName);
        UserManagementPage.selectStatus(user.status);
        UserManagementPage.fillUsername(username);
        UserManagementPage.fillPassword(password);
        UserManagementPage.fillConfirmPassword(password);
        UserManagementPage.submitAddUser();
        cy.url().should('include', '/admin/viewSystemUsers');

        // step 2: verify user exists
        UserManagementPage.typeSearchUsername(username);
        UserManagementPage.clickSearchButton();
        UserManagementPage.getUserRow(username).should('exist');

        // step 3: edit user (toggle status)
        const newStatus = user.status === 'Enabled' ? 'Disabled' : 'Enabled';
        UserManagementPage.clickEditUser(username);
        UserManagementPage.selectStatus(newStatus);
        UserManagementPage.submitAddUser();
        cy.url().should('include', '/admin/viewSystemUsers');

        // step 4: verify updated status
        UserManagementPage.typeSearchUsername(username);
        UserManagementPage.clickSearchButton();
        UserManagementPage.getUserRow(username).should('contain.text', newStatus);

        // step 5: delete user
        UserManagementPage.clickDeleteUser(username);
        UserManagementPage.confirmDelete();

        // step 6: confirm deletion
        UserManagementPage.typeSearchUsername(username);
        UserManagementPage.clickSearchButton();
        cy.contains('No Records Found').should('be.visible');
      });
    });
  });
});
