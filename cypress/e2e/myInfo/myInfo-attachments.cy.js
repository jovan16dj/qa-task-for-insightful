import MyInfoPage from '@pages/MyInfoPage';

describe('My Info - Attachments Tests (intercept + UI download/delete, wildcard intercept)', () => {
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

    // Assert section present
    MyInfoPage.getAttachmentsSection().should('be.visible');

    // Assert attachment row visible
    MyInfoPage.getAttachmentRow(fileName).should('exist');

    // Download (visual check only)
    MyInfoPage.downloadAttachment(fileName);

    // Delete flow
    MyInfoPage.deleteAttachment(fileName);
    MyInfoPage.confirmDelete();

    cy.contains('No Records Found').should('be.visible');
  });
});
