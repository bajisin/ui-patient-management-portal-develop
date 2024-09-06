describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/dashboard')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiButton-contained').click().wait(10000);
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('#orderReports-tab-1').click();
    cy.get('#orderReports-tab-2').click();
    cy.get('#orderReports-tab-3').click();
    cy.get('#orderReports-tab-4').click();
    cy.get('#orderReports-tab-5').click();
    cy.get('#orderReports-tab-0').click();
    cy.get('.ls-advance-filter').click();
    cy.get(':nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('#-option-1').click();
    cy.get('.MuiDialogActions-root > .primary-btn').click();
    cy.get('.clear-all').click();
    cy.get('#simple-popover > .MuiBackdrop-root').click();
    /* ==== End Cypress Studio ==== */
  })
})