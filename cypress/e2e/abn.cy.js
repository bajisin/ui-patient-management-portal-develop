describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiButton-contained').click().wait(30000);
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root').click();
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('#master-tab-7').click();
    cy.get(':nth-child(3) > div > #w3review').click();
    cy.get(':nth-child(4) > div > #w3review').click();
    cy.get('#master-tab-6').click();
    // cy.get('.MuiStack-root > .MuiButtonBase-root > .MuiTypography-root').click();
    // cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
    // cy.get('.MuiDialogContent-root > .MuiButton-text').click();
    // window.location.reload()
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    cy.get('.MuiStack-root > .MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('#\\:r0\\:').clear('hjdddggjhjhh');
    cy.get('#\\:r0\\:').type('hjdddggjhjhhh');
    cy.get('.ql-editor > :nth-child(3)').click();
    cy.get('#masterTenant-tab-1').click();
    cy.get('.MuiButton-text > .MuiTypography-root').click();
    cy.get('#\\:r1\\:').clear('prasd1212');
    cy.get('#\\:r1\\:').type('prasd1212');
    cy.get('#\\:r2\\:').clear('geu new2');
    cy.get('#\\:r2\\:').type('geu new2');
    cy.get(':nth-child(2) > .MuiTypography-div > .quill > .ql-container > .ql-editor > p').click();
    cy.get(':nth-child(4) > .MuiTypography-div > .quill > .ql-container > .ql-editor').click();
    cy.get('.MuiButton-contained').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
  })
})