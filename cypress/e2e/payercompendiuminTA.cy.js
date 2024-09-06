describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiButton-contained').click().wait(20000);
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(4) > a > .MuiButtonBase-root').click();
    cy.get('#compendium-1').click();
    cy.get('.MuiTypography-body1 > .MuiButtonBase-root').click();
    cy.get('.toggle__buttons--left > .MuiTypography-root').click();
    // cy.get('#\\:r5k\\:').type('payer');
    // cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').click();
    // cy.get(':nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').click();
    // cy.get('#-option-0').click();
    // cy.get('#\\:r5n\\:').clear('12');
    // cy.get('#\\:r5n\\:').type('123');
    // cy.get('#\\:r5o\\:').clear('h');
    // cy.get('#\\:r5o\\:').type('home');
    // cy.get('.css-qbdosj-Input').click();
    // cy.get('#react-select-2-input').clear();
    // cy.get('#react-select-2-input').type('visa');
    // cy.get('#react-select-2-option-0').click();
    // cy.get('#zipCode').clear('12');
    // cy.get('#zipCode').type('12345');
    // cy.get('.multiSelect_control > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click();
    // cy.get('#-option-1').click();
    // cy.get('#-option-3 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get(':nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').click();
    // cy.get('#-option-0').click();
    // cy.get('#\\:r5u\\:').clear('1');
    // cy.get('#\\:r5u\\:').type('123');
    // cy.get('#\\:r5v\\:').clear('4');
    // cy.get('#\\:r5v\\:').type('456');
    // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    // cy.get('.PrivateSwitchBase-input').check();
    // cy.get('.modal-buttons-wrapper > .primary-btn').click();
    // cy.get(':nth-child(6) > .success_modal > .MuiButtonBase-root').click();
    // cy.get('.success_modal > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('editpayer', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080');
    cy.get('.MuiButton-contained').click().wait(30000);
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root').click();
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(4) > a > .MuiButtonBase-root').click();
    cy.get('#compendium-1').click();
    cy.get(':nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .MuiBox-root > :nth-child(1)').click();
    cy.get('#\\:r6v\\:').clear('BCDs');
    cy.get('#\\:r6v\\:').type('BCDs');
    cy.get('.MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator').click();
    cy.get('#-option-1').click();
    cy.get('#\\:r72\\:').clear('B234');
    cy.get('#\\:r72\\:').type('B234');
    cy.get('#\\:r73\\:').clear('KUKATPALLYi');
    cy.get('#\\:r73\\:').type('KUKATPALLYi');
    cy.get('.css-166bipr-Input').click();
    cy.get('#react-select-2-input').clear();
    cy.get('#react-select-2-input').type('NELLORe');
    cy.get('#react-select-2-option-1').click();
    cy.get('#\\:r74\\:').clear('63843.');
    cy.get('#\\:r74\\:').type('63843');
    cy.get('#permission-tags').click();
    cy.get('#permission-tags-option-6').click();
    cy.get(':nth-child(8) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
    cy.get(':nth-child(8) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click();
    cy.get('#-option-0').click();
    cy.get('#\\:r79\\:').clear('ID8632s');
    cy.get('#\\:r79\\:').type('ID8632s');
    cy.get('#\\:r7a\\:').clear('GP385');
    cy.get('#\\:r7a\\:').type('GP385');
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    cy.get('.PrivateSwitchBase-input').check();
    cy.get('.modal-buttons-wrapper > .primary-btn').click();
    cy.get('.success_modal > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
  });
})