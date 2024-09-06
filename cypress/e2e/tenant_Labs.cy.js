describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // LABS
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // ADD NEW LAB
    cy.get(".MuiTypography-div > .MuiButtonBase-root").click();
    cy.get("#labName").type("labs");
    cy.get(
      ":nth-child(2) > .multiSelect_control > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input"
    ).click();
    cy.get("#-option-0").click();
    cy.get("#email").type("tenatadmin_Is@gmail.com");
    cy.get("#phone").type("9441761835");
    cy.get("#altPhoneNumber").type("9441761835");
    cy.get("#address").type("usa");
    // cy.get(".pac-target-input").type("usa");
    // cy.get(".pac-item").first().should("be.visible").click({ force: true });
    cy.get(".pac-target-input").type("Hyderabad, Telangana, India", { force: true });
    // cy.get(".pac-target-input").type("Hyderabad, Telangana, India");
    cy.get(".pac-item").first().click({ force: true }); // Select the first suggestion
    // cy.wait(1000);
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get("#zipCode").type("50500");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // we expect a 3rd party library error with message 'list not defined'
      // and don't want to fail the test so we return false
      if (err.message.includes("place_id")) {
        return false;
      }
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    });
    cy.get("#permission-tags").click();
    cy.get("#permission-tags-option-0").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    // dropdown options not coming..

    // ADVANCE SEARCH FILTER
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-0").click();
    cy.get("#permission-tags-option-1").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    cy.get(".modalClose > .MuiTypography-root").click();

    // SHOW/HIDE COLUMNS
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButton-root:nth-child(1)").click();
    cy.get(".MuiButton-root:nth-child(3)").click();
    cy.get(".MuiButton-text:nth-child(2)").click();

    // TABLE HEADERS CHECK
    cy.get(
      ".css-7lhhqc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-7lhhqc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-7lhhqc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    cy.get(
      ".css-1tyexax-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1tyexax-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    // SEARCH...
    cy.get(".MuiInputBase-input").type("hyderabad");
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get("[data-testid=KeyboardArrowRightIcon]").click();
    cy.get("[data-testid=KeyboardArrowLeftIcon]").click();

    cy.get(".MuiInputBase-input").clear().type("hyderabad");
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click({ multiple: true });
    // cy.get(".MuiButtonBase-root > .secondaryIcon > path:nth-child(1)").click();
  });
});
