describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiButton-contained').click().wait(20000);
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click().wait(10000);
    cy.get('#tntUserDetails-tab-1').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > .css-16adk58-MuiTableCell-root > span').click();
    cy.get('[data-testid="CloseIcon"]').click();
    cy.get('.ls-advance-filter').click();
    cy.get('.MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click();
    cy.get('#-option-0').click();
    cy.get('body').click();
    cy.get('[data-value="2"]').click();
    cy.get('.MuiDialogActions-root > .primary-btn').click();
    cy.get('#simple-popover > .MuiBackdrop-root').click();
    cy.get('.css-1u2w381-MuiModal-root-MuiDrawer-root > .MuiBackdrop-root').click();
    /* ==== End Cypress Studio ==== */
  })
})