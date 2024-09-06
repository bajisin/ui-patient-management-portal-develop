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

    // ABOUTUS #EDIT...
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.get(".ql-editor").clear().type("lifescanlabs");
    cy.get(".ql-bold").click();
    cy.get(".ql-italic").click();
    cy.get(".ql-underline").click();
    cy.get(".ql-strike").click();
    cy.get('[value="ordered"]').click();
    cy.get('[value="bullet"]').click();
    cy.get('[value="-1"]').click();
    cy.get('[value="-1"]').click();
    cy.get('[value="+1"]').click();
    cy.get(".ql-link").click();
    cy.get("[id*=':r5:']").type("lifescan");
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // FAQ...
    cy.get("#masterTenant-tab-1").click();
    // EDIT ICON...
    cy.get(".MuiButton-text > .MuiTypography-root").click();

    // #ADD NEW
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-container > .ql-editor").type(
      "master-data"
    );
    cy.get(".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-container > .ql-editor").click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-bold"
    ).click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-italic"
    ).click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-underline"
    ).click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-strike"
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(2) > [value="ordered"]'
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(2) > [value="bullet"]'
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(3) > [value="-1"]'
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(3) > [value="+1"]'
    ).click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(4) > .ql-link"
    ).click();
    cy.get("[id*=':r9:']").type("lifescan");

    cy.get(".MuiDialogActions-root > .MuiStack-root").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    // cy.get("#masterTenant-tab-2").click();

    // // PRIVACY & POLICY...
    // cy.get("#masterTenant-tab-2").click();
    // // Cypress.on("uncaught:exception", (_err, runnable, promise) => {
    // //   if (promise) {
    // //     return false;
    // //   }
    // // });
    // // Cypress.on("uncaught:exception", (err, runnable) => {
    // //   // we expect a 3rd party library error with message 'list not defined'
    // //   // and don't want to fail the test so we return false
    // //   if (err.message.includes("reading 'length")) {
    // //     return false;
    // //   }
    // //   // we still want to ensure there are no other unexpected
    // //   // errors, so we let them fail the test
    // // });
    // cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    // cy.get('[data-testid="myElement"]').should('exist').should('have.length', 1);

    // cy.get(".ql-editor").clear().type("lifescans");
    // cy.get(".ql-bold").click();
    // cy.get(".ql-italic").click();
    // cy.get(".ql-underline").click();
    // cy.get(".ql-strike").click();
    // cy.get('[value="ordered"]').click();
    // cy.get('[value="bullet"]').click();
    // cy.get('[value="-1"]').click();
    // cy.get('[value="+1"]').click();
    // cy.get(".ql-link").click();
    // cy.get("[placeholder='enter title']").type("management");
    // cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    // // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // // TERMS & CONDITIONS...
    cy.get("#masterTenant-tab-3").click();
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.get(".MuiTypography-root > .MuiButtonBase-root").click();
    cy.wait(15000);
    cy.get(".MuiDialogContent-root > .MuiButton-text").click();

    // // PATIENTS...
    // // #RACE...
    // cy.get("#master-tab-1").click({ force: true });
    // cy.get(".MuiInputBase-input").type("sai").clear();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("tests");
    // cy.get(".action__items > .primaryTextButton").click();
    // cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click({ force: true });
    // cy.get("[data-testid='myTextField']").type("aa");
    // cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    // cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    // cy.get(".modal-buttons-wrapper > .primary-btn").click();

    //
    // // ETHINIC GROUP...
    cy.get("#master-tab-1").click({ force: true });
    // // SEARCH...
    cy.get(".MuiInputBase-input").type("latinos").clear();
    // // ADD NEW...
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("lifescans");
    // cy.get(".action__items > .primaryTextButton").click();
    // // EDITING A EXIST RECORD...
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    // cy.get("[data-testid='myTextField']").type("c");
    cy.get("[data-testid='myTextField']").type("c");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    // // // DELETING A RECORD...
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // // SAVE BTN..
    // cy.get(".MuiButton-contained").click();
    // cy.get(".MuiTableBody-root > :nth-child(4) > :nth-child(1)");

    // // GENDER..
    cy.get("#patient-tab-2").click({ force: true });
    // // EDIT...
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click({ force: true });
    cy.get("[data-testid='myTextField']").type("lifescan1");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // DELETING A EXISTING RECORD...
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // ADD NEW...
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("A1").click();
    // cy.get(".action__items > .primaryTextButton").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();
    // cy.get(':nth-child(5) > .success_modal > .MuiButtonBase-root').click();

    // // #CLEAR ICON...
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();

    // // // SEARCH...
    cy.get(".MuiInputBase-input").type("male");

    // // GUARANTOR RELATIONS
    cy.get("#patient-tab-3").click();

    // // ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("Add");
    // cy.get(".action__items > .primaryTextButton").click();
    // // cy.get('.success_modal > .MuiButtonBase-root').click();

    // // #EDIT...
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    // // #DELETING A EXISTING RECORD...
    cy.get(":nth-child(2) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    // // #SEARCH...
    cy.get(".MuiInputBase-input").type("friend");

    // // CAREGIVER RELATIONS...
    cy.get("#patient-tab-4").click({ force: true });

    // // #ADD NEW..
    // cy.get(".MuiButton-outlined").click({ force: true });
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("Add patient");
    // cy.get(".action__items > .primaryTextButton").click();

    // // #EDIT...
    cy.get(":nth-child(2) > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input").click();
    cy.get(":nth-child(2) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".primaryTextButton > .MuiButton-startIcon > .MuiTypography-root").click();
    cy.get("[data-testid='myTextField']").type("a");
    // cy.get(":nth-child(2) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #EDIT >> CANCEL
    cy.get(":nth-child(2) > :nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input").click();
    cy.get(":nth-child(2) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(2) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // DELETING A EXISTING RECORD...
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #search...
    cy.get(".MuiInputBase-input").type("health");
    cy.get(".MuiButton-contained").click();
  });
});
