describe("template spec", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    /// ///when we select nurses in provider tab above code should be in comment  mode
    cy.get(
      '.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > [href="/dashboard"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root'
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    /// //addnewuser
    cy.get(".MuiButton-contained").click({ multiple: true });
    // cy.get(".MuiButton-contained").as("btn").click({ multiple: true });

    /// /role
    cy.get(":nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    // facility
    cy.get(":nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();
    // cy.get("#\:r2p\:-option-0").should("be.visible").click();
    // cy.get("#\\:r2p\\:-option-0").should("be.visible").click();

    // lab
    cy.get(":nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(
    //   ":nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    // ).click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();

    /// /PERSONAL INFORMATION//
    // firstname
    cy.get(":nth-child(2) > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root").type("Adhya");

    // middle name//
    cy.get(".formcontrol__wrapper > :nth-child(2) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").type(
      "ooooo"
    );

    // lastname//
    cy.get(":nth-child(3) > .MuiFormControl-root > .MuiInputBase-root").type("aaaaa").click();

    // joining date//
    cy.get(":nth-child(4) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1703874600000"]').click();

    // street address//
    cy.get("#streetAddress").type("hhhhhh");

    // city/state/country//
    cy.get(".pac-target-input").click().type("Hyderabad, Telangana, India", { delay: 100 });
    cy.get(".pac-item").should("be.visible");

    // zipcode//
    cy.get("#zipCode").type("51004");

    /// /CONTACT INFORMATION//
    // email address/
    cy.get("#emailAddress").type("tenantadmin2_ls@gmail.com");

    // phone number//
    cy.get("#phoneNumber").type("9807849752");

    // home phone number//
    cy.get("#alternatePhoneNumber").type("9804347752");

    // send request button//
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    /// /modal close box
    cy.get(".modalClose > .MuiTypography-root").click();
  });
});
