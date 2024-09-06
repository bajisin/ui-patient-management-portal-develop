describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:8080')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('addLab', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080/');
    cy.get('.MuiButton-contained').click().wait(30000);
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('.MuiTypography-div > .MuiButtonBase-root').click();
    cy.get('#labName').clear();
    cy.get('#labName').type('Siva Lab');
    cy.get(':nth-child(2) > .multiSelect_control > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"] > path').click();
    cy.get('#-option-0').click();
    cy.get('#email').clear();
    cy.get('#email').type('siva@gmail.com');
    cy.get('#phone').clear();
    cy.get('#phone').type('2345654345');
    cy.get('#altPhoneNumber').clear();
    cy.get('#altPhoneNumber').type('4565432345');
    cy.get('#react-select-2-input').clear();
    cy.get('#react-select-2-input').type('hyd');
    cy.get('#react-select-2-option-0').click();
    cy.get('#zipCode').clear();
    cy.get('#zipCode').type('45678');
    cy.get('.mt-0 > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click();
    cy.get('#permission-tags-option-3').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    cy.get('.success_modal > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
  });
})