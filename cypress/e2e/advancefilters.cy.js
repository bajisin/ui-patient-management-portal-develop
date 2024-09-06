it('advancefilter', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080');
    cy.get('.MuiButton-contained').click().wait(30000);
    cy.get('.icons-separted > .MuiTypography-root').click();
    cy.get('body').click();
    cy.get('[data-value="2"]').click();
    cy.get('.primary-btn').click();
    cy.get('body').click();
    cy.get('[data-value="3"]').click();
    cy.get('.primary-btn').click();
    cy.get('body').click();
    cy.get('[data-value="4"]').click();
    cy.get('.primary-btn').click();
    cy.get('body').click();
    cy.get('[data-value="5"]').click();
    cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1721327400000"]').click();
    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1721932200000"]').click();
    cy.get('[aria-rowindex="4"] > .Mui-selected').click();
    cy.get('.primary-btn').click();
    cy.get('.clear-all').click();
    cy.get('#simple-popover > .MuiBackdrop-root').click();
    /* ==== End Cypress Studio ==== */
});