import MyInfoPage from '@pages/MyInfoPage';

describe('My Info - Attachments Tests (intercept + ui download/delete)', () => {
  const fileName = 'sample.pdf';
  const description = 'Test file upload description';

  before(() => {
    cy.loginSession();

    cy.intercept(
      'GET',
      /\/api\/v2\/pim\/employees\/\d+\/screen\/personal\/attachments.*/,
      {
        statusCode: 200,
        body: {
          data: [
            {
              id: 1,
              filename: fileName,
              comment: description,
            },
          ],
        },
      }
    ).as('getAttachments');
  });

  it('should show mocked attachment and verify download/delete in UI', () => {
    MyInfoPage.visit();

    cy.wait('@getAttachments');

    MyInfoPage.getAttachmentsSection().should('be.visible');
    MyInfoPage.getAttachmentRow(fileName).should('exist');

    MyInfoPage.downloadAttachment(fileName);
    MyInfoPage.deleteAttachment(fileName);
    MyInfoPage.confirmDelete();

    cy.getNoRecordsMessage().should('be.visible');
  });
});
