describe("login mechanism", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    // clicking on profile-details
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(5) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      '[d="M240.941 0h542.118c133.068 0 240.941 107.873 240.941 240.941v542.118c0 133.068-107.873 240.941-240.941 240.941h-542.118c-133.068 0-240.941-107.873-240.941-240.941v-542.118c0-133.068 107.873-240.941 240.941-240.941z"]'
    ).click();
    cy.get(".commonModal__wrapper--dialog").click();
    cy.get("#firstName").clear().type("lifescan patients");
    cy.get("#middleName").clear().type("sience");
    cy.get("#lastName").clear().type("labs");
    cy.get("#streetAddress").clear().type("11B, Emerson Avengers");
    cy.get(".pac-target-input").clear().type("Jersey Village, TX, USA");
    cy.get("#zipCode").clear().type("50500");
    // cy.get("#emailAddress").clear().type("tenantadmin_Is@gmail.com");
    cy.get("#phoneNumber").clear().type("9876543210");
    cy.get("#alternatePhoneNumber").clear().type("9881243768");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(".MuiPaper-root > .MuiDialogActions-root > .MuiButtonBase-root").click();
    // here exit should come.
    // searching filter here
    cy.get(".MuiInputBase-input").type("life");
    cy.get(".title__wrapper > .MuiPaper-root").click();
    cy.get(".MuiInputBase-input").clear();
    // adding new one
    cy.get(".other-admin-list > :nth-child(1) > .MuiButtonBase-root").click();
    cy.get("#firstName").type("life");
    cy.get("#middleName").type("scan");
    cy.get("#lastName").type("labs");
    cy.get("#streetAddress").type("11B, Emerson Avengers");
    // cy.get(".pac-target-input").type("Jersey Village, TX, USA");
    // cy.get('.pac-target-input').type("usa");
    // cy.get(".pac-target-input").click().type("Jersey Village, TX, USA", { delay: 100 });
    // cy.get(".pac-item").should("be.visible");
    // cy.get(".pac-item:first").click({ force: true });
    // cy.get(".pac-target-input").should("be.visible").click();
    // cy.get(".pac-target-input").should("be.visible").type("Hyderabad, Telangana, India", { force: true });
    cy.get(".pac-target-input").should("be.visible").type("Hyderabad, Telangana, India", { force: true });
    cy.get(".pac-target-input").find(".pac-item:first").click({ force: true });
    cy.get("#zipCode").type("50431");
    cy.get("#emailAddress").type("tenantadmin_Is@gmail.com");
    cy.get("#phoneNumber").type("9822154890");
    cy.get("#alternatePhoneNumber").type("9991209876");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click({ force: true });
    // after submiting it is coming status as 400..
    // cy.get(".MuiDialogActions-root").click();
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click({ force: true });
    // search field for profile...
    // cy.get(".MuiInputBase-input").click({ force: true });
    // cy.get(".MuiInputBase-input").type("lifescan");
    // cy.get(".MuiButton-root").click({ multiple: true });
  });
});
