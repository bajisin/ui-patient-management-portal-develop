describe("dsrReports", () => {
  it("tenantlogin", () => {
    cy.visit("localhost:8080");
    cy.get(".MuiButton-contained").click();
    cy.wait(40000);
    // cy.visit("tenantDashboard");
    // cy.get(".MuiButton-root").click({ multiple: true, force: true, waitForAnimations: false });
    cy.get("button").as("btn").click({ multiple: true }) > cy.get("@btn").click();
    cy.get(".content__wrapper--header").click();
    cy.get(".MuiToolbar-regular").click();
    cy.get(
      ".MuiPaper-root:nth-child(1) .MuiListItem-root:nth-child(1) .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // cy.get(".ls-advance-filter").click();
    // cy.get("body").click();
    // cy.get(".MuiMenuItem-root:nth-child(2)").click();
    // cy.get(".primary-btn").click();

    // cy.get("[data-cy=AdvanceFilter]").click();
    // cy.get("body").click();
    // cy.get(".MuiMenuItem-root:nth-child(2)").click();
    // cy.get(".primary-btn").click();
    // cy.get(".css-1i0e6f3-MuiModal-root-MuiPopover-root > .MuiBackdrop-root").click();
    // cy.get(".MuiButtonBase-root > a").click();
    // cy.get(".css-1ag9q10").click();
  });
});
