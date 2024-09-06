describe("template spec", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    /// ///when we select physician in provider tab
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > .MuiButtonBase-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root"
    ).click();

    cy.get(".MuiButton-contained").click({ multiple: true });
    // cy.get('.MuiButton-contained').click({multiple:true});
    // cy.get(".MuiButton-contained").as("btn").click({ multiple: true });
    // cy.get('.MuiButton-contained').click();
    // Using aliases
    // cy.get('.MuiButton-contained').as('btn').click();
    // cy.get('@btn').click();

    // role//
    cy.get(":nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags").click();
    cy.get("#permission-tags-option-1").click();

    /// /provider options one is physician and another is nurses->for physician

    // //nurses//
    // cy.get(".toggle__buttons--right").click();
    // cy.get(".MuiToggleButtonGroup-root > .Mui-selected").click();

    // //npinumber//
    cy.get(".MuiGrid-grid-md-6 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();

    // cy.get(
    //   ".MuiGrid-grid-md-6 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    // ).click();
    // cy.get("#patientNameSearch").click();
    // cy.get("#patientNameSearch-option-0").click();
    // cy.get(".MuiGrid-grid-md-6 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(
    //   ".MuiGrid-grid-md-6 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    // ).click();
    // cy.get("#patientNameSearch").click();
    // cy.get("#patientNameSearch-option-1").click();

    /// /client admin//
    cy.get(":nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(
    //   ":nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    // ).click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click({ force: true });
    cy.get(".pt-4").click();
    // cy.get('select').select('-option-0', { force: true });

    // ////PERSONAL INFORMATION//
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
    // cy.get('[data-timestamp="1701282600000"]').click();
    cy.get('[data-timestamp="1703010600000"]').click();

    // street address//
    cy.get("#streetAddress").type("hhhhhh");

    // //city/state/country//
    //     cy.get(".pac-target-input").click().type("Hyderabad, Telangana, India", { delay: 100 });
    //     cy.get(".pac-item").should("be.visible").type('{enter}').click({multiple:true});
    // // cy.get(".pac-container .pac-item:first").click();

    cy.get(".pac-target-input").click().type("Hyderabad, Telangana, India", { delay: 100 });
    // Wait for the suggestion box to appear
    cy.get(".pac-item").should("be.visible");
    // Force click on the first suggestion, even if it's covered by another element
    // cy.get(".pac-item:first").should("be.visible").click({ force: true });

    cy.get(".pt-4").click();

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

    /// //success popup okay button
    cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();
  });
});
