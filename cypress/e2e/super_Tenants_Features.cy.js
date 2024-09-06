describe("login mechanism", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    cy.get(":nth-child(1) > .css-16txn55-MuiTableCell-root").click();

    // FEATURES
    cy.get("#tenant-tab-4").click();

    // ON/OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // CANCEL
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiButton-outlined").click();

    // cy.get(
    //   ":nth-child(1) > :nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    // ).click();
    // cy.get(
    //   ":nth-child(1) > :nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > select"
    // ).select("Create");
    // cy.get(
    //   ":nth-child(2) > :nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    // ).click();
    // cy.get(
    //   ":nth-child(2) > :nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    // ).type("Create");
    // cy.get(
    //   ":nth-child(2) > :nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    // ).select("Read");
    // cy.get(
    //   ":nth-child(2) > :nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    // ).type("Update");
    // cy.get(
    //   ":nth-child(2) > :nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    // ).type("Delete");
    // cy.get("#-option-0").click();
    // cy.get("#-option-1").click();
    // cy.get("#-option-2").click();
    // cy.get("#-option-3").click();
    cy.get(".MuiBox-root > .MuiButton-root").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // SETTINGS
    cy.get("#tenant-tab-5").click();

    // ON/OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // CANCEL
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiButton-outlined").click();
  });
});
