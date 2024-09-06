describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // MASTER-DATA
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // FACILITIES
    cy.get("#master-tab-2").click();
    // // facility type...
    // // #ADD NEW..
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[id*=':r9:']").type("appss");
    // cy.get(".action__items > .primaryTextButton").click();

    // // #EDIT...
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[id*=':r7:']").type("a");
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #EDIT >> CANCEL
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[id*=':r9:']").type("a");
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".primary-outline-btn").click();

    // // #DELETING A EXISTING RECORD
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    // DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #SEARCH...
    cy.get(".MuiInputBase-input").type("apps");
    cy.get(".MuiButton-contained").click();

    // // SERVICES
    cy.get("#facility-tab-1").click();
    // // // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[id*=':r9:']").type("servicess");
    // cy.get(".action__items > .primaryTextButton").click();

    // // #EDIT
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[id*=':rb:']").type("s");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #EDIT >> CANCEL
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[id*=':rd:']").type("s");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".primary-outline-btn").click();

    // // #DELETING A EXISTING RECORD
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();
    // // #SEARCH
    cy.get(".MuiInputBase-input").type("services");
    cy.get(".MuiButton-contained").click();

    // // MANAGEMENT GROUP
    cy.get("#facility-tab-2").click();
    // // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[id*=':r9:']").type("management services");
    // cy.get(".action__items > .primaryTextButton").click();

    // // #EDIT
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[id*=':rf:']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #EDIT >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[id*=':rh:']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #DELETING A EXISTING RECORD
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #SEARCH
    cy.get(".MuiInputBase-input").type("management");
    // cy.get(".MuiButton-contained").click();

    // ORDER
    // #ORDER TYPE
    cy.get("#master-tab-3").click();
    // // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(
    //   ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[id*=':rd:']").type("order");
    // cy.get("[id*=':rf:']").type("type");
    // cy.get("[id*=':rh:']").type("one");
    // cy.get(":nth-child(1) > .action__items > .primaryTextButton").click();

    // #EDIT
    cy.get(":nth-child(1) > .action__items > .primaryTextButton").click();
    cy.get("[id*=':rj:']").type("order");
    cy.get("[id*=':rl:']").type("1");
    cy.get("[id=':rn:']").type("001");
    cy.get(":nth-child(1) > .action__items > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();

    // #EDIT >> CANCEL
    cy.get(":nth-child(1) > .action__items > .primaryTextButton").click();
    cy.get("[id*=':rp:']").type("order");
    cy.get("[id*=':rr:']").type("1");
    cy.get("[id=':rt:']").type("001");
    cy.get(":nth-child(1) > .action__items > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // #DELETING A EXISTING RECORD
    cy.get(":nth-child(1) > .action__items > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #DELETE >> CANCEL
    cy.get(":nth-child(1) > .action__items > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #SEARCH
    // Cypress.on("uncaught:exception", (_err, runnable, promise) => {
    //   if (promise) {
    //     return false;
    //   }
    // });
    // cy.get(".MuiInputBase-input").type("patients");
    // Cypress.on("uncaught:exception", (_err, runnable, promise) => {
    //   if (promise) {
    //     return false;
    //   }
    // });
    // cy.get(".MuiButton-contained").click();
  });
});
