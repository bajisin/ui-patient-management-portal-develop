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

    // #TEST COMEPENIUM
    cy.get("#master-tab-4").click({ force: true });
    // #SPECIEMEN TYPE
    // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[id*=':r9:']").type("specicemen");
    // cy.get(".action__items > .primaryTextButton").click();

    // // #EDIT
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anohc");
    // cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".action__items > .primaryTextButton").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anointin");
    cy.get(".action__items > .errorTextButton").click();
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiOutlinedInput-root input").type("ano");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #EDIT >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".MuiOutlinedInput-root input").type("ab");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #DELETE
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // // #DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // #SEARCH
    cy.get(".MuiInputBase-input").type("speciemen");
    cy.get(".MuiButton-contained").click();

    // // // CONTAINERTYPE
    cy.get("#testcomp-tab-1").click({ force: true });

    // // // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(
    //   ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("container");
    // cy.get("[data-testid='myTextFieldDesc']").type("type");
    // cy.get(":nth-child(1) > :nth-child(3) > .primaryTextButton").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #EDIT
    cy.get(".MuiButton-outlined").click();
    cy.get('[data-testid="myTextField"]').type("anohc");
    cy.get('[data-testid="myTextFieldDes"]').type("anohc");
    // cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".action__items > .primaryTextButton").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    cy.get(".MuiButton-outlined").click();
    cy.get('[data-testid="myTextField"]').type("anohc");
    cy.get('[data-testid="myTextFieldDes"]').type("anohc");
    cy.get(".action__items > .errorTextButton").click();
    cy.get(":nth-child(1) > :nth-child(3) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("container");
    cy.get("[data-testid='myTextFieldDes']").type("type");
    cy.get(":nth-child(1) > :nth-child(3) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #EDIT >> CANCEL
    cy.get(":nth-child(1) > :nth-child(3) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("container");
    cy.get("[data-testid='myTextFieldDes']").type("type");
    cy.get(":nth-child(1) > :nth-child(3) > .primaryTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #DELETE
    cy.get(":nth-child(1) > :nth-child(3) > .errorTextButton").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #DELETE >> CANCEL
    // cy.get(":nth-child(1) > :nth-child(3) > .errorTextButton").click();
    // cy.get(".success_modal > :nth-child(4)").click();
    // cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    // cy.get(".primary-outline-btn").click();

    // // #SEARCH
    cy.get(".MuiInputBase-input").type("container");
    // cy.get(".MuiButton-contained").click();

    // // // ORDERABLE TYPE
    cy.get("#testcomp-tab-2").click();

    // // // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("orderable");
    // cy.wait(1000);

    // cy.get(".action__items > .primaryTextButton").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();

    // // // #EDIT
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #EDIT >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // #DELETE
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // #SEARCH
    cy.get(".MuiInputBase-input").type("order");
    // cy.get(".MuiButton-contained").click();

    // // // PERFORMING DEPARTMENT
    cy.get("#testcomp-tab-3").click();

    // // // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[id*=':r9:']").type("performing");
    // cy.wait(1000);
    // cy.get(".action__items > .primaryTextButton").click();
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anohc");
    // cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".action__items > .primaryTextButton").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anointin");
    cy.get(".action__items > .errorTextButton").click();
    // // // // #EDIT
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #EDIT >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // // #DELETE
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // //  #SEARCH
    cy.get(".MuiInputBase-input").type("performing");
    // cy.get(".MuiButton-contained").click();

    // // // WORK GROUP
    cy.get("#testcomp-tab-4").click();

    // // // #ADD NEW
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[data-testid='myTextField']").type("work group");
    // cy.wait(1000);
    // cy.get(".action__items > .primaryTextButton").click();

    // // // // #EDIT
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anohc");
    // cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".action__items > .primaryTextButton").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anointin");
    cy.get(".action__items > .errorTextButton").click();
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #EDIT >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // // #DELETE
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // #DELETE >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // SEARCH
    cy.get(".MuiInputBase-input").type("perform");
    // cy.get(".MuiButton-contained").click();

    // // // INSTRUMENT
    cy.get("#testcomp-tab-5").click();

    // // // #ADD NEW
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anointin");
    // cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get(".action__items > .primaryTextButton").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();
    cy.get(".MuiButton-outlined").click();
    cy.get(".MuiOutlinedInput-root input").type("anointin");
    cy.get(".action__items > .errorTextButton").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get(".MuiButton-outlined").click();
    // cy.get("[id*=':r9:']").type("instrument");
    // cy.wait(1000);
    // cy.get(".action__items > .primaryTextButton").click();

    // // // #EDIT
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #EDIT >> CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    cy.get("[data-testid='myTextField']").type("a");
    cy.get(":nth-child(1) > :nth-child(2) > .primaryTextButton").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // #DELETE
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // #DELETE > CANCEL
    cy.get(":nth-child(1) > :nth-child(2) > .errorTextButton").click();
    cy.get(".MuiCheckbox-colorPrimary > .PrivateSwitchBase-input").click();
    cy.get(".primary-outline-btn").click();

    // // // SEARCH
    cy.get(".MuiInputBase-input").type("instrument");
    // cy.get(".MuiButton-contained").click();
  });
});
