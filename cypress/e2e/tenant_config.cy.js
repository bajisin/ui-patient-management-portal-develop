describe("Policy Component", () => {
    it("opens the Policy popup when handleOpenForPolicy is called", () => {
      cy.visit("http://localhost:8080/dashboard");


      cy.get(".MuiButton-contained").click();
      cy.wait(60000);

      cy.get(
        ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
      ).click();

      /* ==== Generated with Cypress Studio ==== */
      cy.get(':nth-child(1) > .css-16txn55-MuiTableCell-root > span').click();
      cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > a').click();
      cy.get(':nth-child(1) > .css-16txn55-MuiTableCell-root > span').click();
      cy.get('.MuiBreadcrumbs-ol > :nth-child(3) > a').click();

      cy.get('.MuiButton-text > .MuiTypography-root').click();
      cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
      cy.get('.success_modal > .MuiButtonBase-root').click();
      /* ==== End Cypress Studio ==== */
    })
})