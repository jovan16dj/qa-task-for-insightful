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

    // assert section present
    MyInfoPage.getAttachmentsSection().should('be.visible');

    // assert attachment row visible
    MyInfoPage.getAttachmentRow(fileName).should('exist');

    // download (visual check only)
    MyInfoPage.downloadAttachment(fileName);

    // delete flow
    MyInfoPage.deleteAttachment(fileName);
    MyInfoPage.confirmDelete();

    cy.contains('No Records Found').should('be.visible');
  });
});
