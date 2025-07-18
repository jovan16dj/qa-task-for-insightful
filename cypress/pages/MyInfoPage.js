import BasePage from '@basepages/BasePage';
import { routes } from '@routes';

class MyInfoPage extends BasePage {
  visit() {
    super.visit(routes.myInfo);
  }

  getAttachmentsSection() {
    return cy.contains('h6', 'Attachments');
  }

  getAttachmentRow(fileName) {
    return cy.contains('.oxd-table-row', fileName);
  }

  downloadAttachment(fileName) {
    this.getAttachmentRow(fileName)
      .find('i.bi-download')
      .parents('button')
      .click();
  }

  deleteAttachment(fileName) {
    this.getAttachmentRow(fileName)
      .find('i.bi-trash')
      .parents('button')
      .click();
  }

  confirmDelete() {
    cy.contains('button', 'Yes, Delete').click();
  }
}

export default new MyInfoPage();
