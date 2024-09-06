/* ==== Test Created with Cypress Studio ==== */
it('broadcasttable', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080');
    cy.get('.MuiButton-contained').click().wait(30000);
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(4) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get(':nth-child(1) > .css-19x01mn-MuiTableCell-root').click();
    cy.get(':nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .d-flex > :nth-child(1)').click();
    cy.get('.MuiAutocomplete-popupIndicator > [data-testid="ArrowDropDownIcon"]').click();
    cy.get('#\\:r1s\\:-option-1').click();
    cy.get('.MuiAutocomplete-popupIndicator > [data-testid="ArrowDropDownIcon"]').click();
    cy.get('body').click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1721413800000"]').click();
    cy.get(':nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[aria-label="Select minutes"] > .Mui-selected').click();
    cy.get('[aria-label="25 minutes"]').click();
    cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').click();
    cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1721586600000"]').click();
    cy.get(':nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[aria-label="15 minutes"]').click();
    cy.get('.MuiGrid-container > :nth-child(8)').click();
    cy.get('#\\:r26\\:').clear('testh');
    cy.get('#\\:r26\\:').type('testhh');
    cy.get('#\\:r27\\:').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    cy.get('.PrivateSwitchBase-input').check();
    cy.get('.modal-buttons-wrapper > .primary-btn').click();
    cy.get('.success_modal > .MuiButtonBase-root').click();
    cy.get(':nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .d-flex > :nth-child(2) > .MuiTypography-root').click();
    cy.get('.PrivateSwitchBase-input').check();
    cy.get('.modal-buttons-wrapper > .primary-btn').click();
    cy.get(':nth-child(5) > .success_modal > .MuiButtonBase-root').click();
    cy.get('.success_modal > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
});