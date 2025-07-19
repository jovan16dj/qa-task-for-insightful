import PIMPage from '@pages/PIMPage'
import UserManagementPage from '@pages/UserManagementPage'
import { generateRandomUsername, generateRandomPassword } from '@support/utils'

describe('User Management Test with Fixture-based Employees and Faker Credentials', () => {
  const empShortIds    = []
  const usernames = []
  let users       = []

  before(() => {
    cy.loginSession()
    cy.fixture('userData.json').then(data => {
      users = data
    })
  })

  beforeEach(() => {
    cy.loginSession()    
  })

  it('creates employees & system users', () => {
    users.forEach(user => {
      const username = generateRandomUsername() // intentionally using faker here for test data diversity
      const password = generateRandomPassword()
      usernames.push(username)

      PIMPage.visit()
      PIMPage.goToAddEmployee()
      PIMPage.fillEmployeeName(user.firstName, user.lastName)
      const shortId = PIMPage.fillUniqueEmployeeId()
      empShortIds.push(shortId)
      PIMPage.submitAddEmployee()

      UserManagementPage.visit()
      UserManagementPage.clickAddUser()
      UserManagementPage.selectUserRole(user.role)
      UserManagementPage.fillEmployeeName(`${user.firstName} ${user.lastName}`)
      UserManagementPage.selectStatus(user.status)
      UserManagementPage.fillUsername(username)
      UserManagementPage.fillPassword(password)
      UserManagementPage.fillConfirmPassword(password)
      UserManagementPage.submitAddUser()
      cy.url().should('include', '/admin/viewSystemUsers')
      UserManagementPage.typeSearchUsername(username)
      UserManagementPage.clickSearchButton()
      UserManagementPage.getUserRow(username).should('exist')
    })
  })

  it('updates user statuses', () => {
    users.forEach((user, i) => {
      const username  = usernames[i]
      const newStatus = user.status === 'Enabled' ? 'Disabled' : 'Enabled'

      UserManagementPage.visit()
      UserManagementPage.typeSearchUsername(username)
      UserManagementPage.clickSearchButton()
      UserManagementPage.clickEditUser(username)
      UserManagementPage.selectStatus(newStatus)
      UserManagementPage.submitAddUser()
      cy.url().should('include', '/admin/viewSystemUsers')
      UserManagementPage.typeSearchUsername(username)
      UserManagementPage.clickSearchButton()
      UserManagementPage.getUserRow(username).should('contain.text', newStatus)
    })
  })

  it('deletes system users', () => {
    usernames.forEach(username => {
      UserManagementPage.visit()
      UserManagementPage.typeSearchUsername(username)
      UserManagementPage.clickSearchButton()
      UserManagementPage.clickDeleteUser(username)
      UserManagementPage.confirmDelete()
      UserManagementPage.typeSearchUsername(username)
      UserManagementPage.clickSearchButton()
      cy.getNoRecordsMessage().should('be.visible');
    })
  })

  after(() => {
    empShortIds.forEach(shortId => {
    PIMPage.deleteEmployeeById(shortId)
    cy.getNoRecordsMessage().should('be.visible');
    })
  })
})
