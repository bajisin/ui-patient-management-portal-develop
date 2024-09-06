describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('logout', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:8080');

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiButton-contained').click().wait(20000);
    cy.get('.headerRightSection > .ls-rightarrow').click();
    cy.get('.MuiList-root > .MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('.MuiButton-outlined').click();
    cy.get('.headerRightSection > .ls-rightarrow').click();
    cy.get('.MuiList-root > .MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('.MuiStack-root > .MuiButton-contained').click();
    cy.get('.MuiButton-contained').click().wait(20000);
    cy.get('.ls-rightarrow').click();
    cy.get('.Mui-focusVisible').click();
    cy.get('.ls-rightarrow').click();
    cy.get('[tabindex="-1"] > .MuiTypography-root').click();
    cy.get('.MuiDialog-container').click();
    cy.get('.ls-rightarrow').click();
    cy.get('[tabindex="-1"] > .MuiTypography-root').click();
    cy.get('.MuiButton-contained').click();
    /* ==== End Cypress Studio ==== */
  });
})