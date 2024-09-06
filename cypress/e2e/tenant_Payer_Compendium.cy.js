describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(4) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // PAYEER'S COMPENDIUM...
    cy.get("#compendium-1").click();

    // // TABLE RECORD EDIT ICON..
    cy.get(":nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .MuiBox-root > :nth-child(1)").click({ force: true });
    cy.get("[id*=':ra5:']").type("lifescan");
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get("#-option-1").click();
    // cy.get(":nth-child(9) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#permission-tags-option-6").click();
    // cy.get("#-option-0").click();
    cy.get(":nth-child(10) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    // cy.get("[placeholder='Test Name']").type("life");
    cy.get("[placeholder = 'Code']").type("12");
    // cy.get("[placeholder = 'Test #1']").type("dfg");
    cy.get("[placeholder = 'payerCode']").type("98");
    // cy.get("[placeholder = 'Test #1']").type("212");
    cy.get("[placeholder = 'Home address']").type("usa");
    cy.get("[placeholder = 'Enter a location']").type("a");
    cy.get("[placeholder = 'Zip Code']").clear().type("2");
    cy.get("[placeholder = 'Subscriber Id']").type("0987");
    cy.get("[placeholder = 'Group Id']").type("80");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(".MuiButton-contained").click({ force: true });
    cy.get("form").submit();
    cy.get(".PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // TABLE HEADERS
    cy.get(
      ".css-s483qv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-s483qv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-1ru4ssn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ru4ssn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1g38f9i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1g38f9i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-uifm1p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-uifm1p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-1t51fqw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1t51fqw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click(); //
    // cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click(); //

    cy.get(
      ".css-1fd1bt4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fd1bt4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click(); //
    // cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click(); //

    // cy.get(
    //   ".css-1rr702t-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1rr702t-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click(); //
    // cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click(); //
    // cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click(); //

    cy.get(
      ".css-1vx9yh7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1vx9yh7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // cy.get(
    //   ".css-uifm1p-MuiTableCell-root > .Mui-TableHeadCell-Content .click({force:true})> .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-uifm1p-MuiTableCell-root > .Mui-Table.click({force:true})HeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    // cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    cy.get(
      ".css-1oxz9s6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1kvylfx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // // SEARCH PAYER'S COMPENDIUM...
    // cy.get(".MuiInputBase-input").click({ force: true });
    // // cy.get(".MuiInputBase-input").type("advohc");
    // cy.get(".MuiInputBase-input").type("adhovc").click({ force: true });
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get('[aria-label="clear"] > .secondaryIcon').click();
    // cy.get('[aria-label="Go to next page"]').click();

    // // ADD PAYER COMPENDIUM...
    cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();

    // MANUAL...
    cy.get(".toggle__buttons--left").click();
    cy.get(":nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-1").click();
    cy.get(".multiSelect_control > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get(":nth-child(9) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-1").click();
    cy.get('[placeholder="Insurance Name"]').type("John Doe");
    cy.get('[placeholder="Code"]').type("23121");
    cy.get('[placeholder="Address"]').type("hyderabad");
    cy.get('[placeholder="Home Address"]').type("durgam cheruvu");
    cy.get('[placeholder="Zip code"]').type("45454");
    cy.get('[placeholder="Subscriber Id"]').type("89897655");
    cy.get('[placeholder="Group Id"]').type("234545435");
    cy.get(".pac-target-input").type("Hyderabad, Telangana, India");
    cy.get(".pac-item").first().click({ force: true }); // Select the first suggestion
    // cy.wait(1000);
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });

    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // // UPLOAD..
    // cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();
    // cy.get(".formcontrol__wrapper > .MuiTypography-div").click();
    // // eslint-disable-next-line cypress/no-unnecessary-waiting
    // cy.wait(15000);
    // cy.get(".MuiDialogContent-root > .MuiButton-root").click();
    // // 500 status getting

    // //  ADD PAYER COMPENDIUM.. OPEN & CLOSE...
    // cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();
    // cy.get(".modalClose > .MuiTypography-root").click();

    // // SHOW/HIDE COLUMNS...
    cy.get("[data-testid=ViewColumnIcon]").click({ force: true });
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
    cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".css-1crctjg").click();
    cy.get(".MuiButton-root:nth-child(3)").click();
    cy.get(".MuiButton-root:nth-child(2)").click();
  });
});
