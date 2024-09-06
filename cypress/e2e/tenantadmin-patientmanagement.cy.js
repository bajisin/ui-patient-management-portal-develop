describe("template spec", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      '.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > [href="/dashboard"] > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root'
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(6) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    /// ///search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("aaa");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();
    // ////show and hide all tabs
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click({ force: true });
    /// ///hide all
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();

    /// /firstname
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // cy.get('.MuiBackdrop-invisible').click({force:true});
    // cy.get('.content__wrapper').click({force:true});
    // cy.get(".content__wrapper").click();

    /// //firstname , lastname etc popups
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click({force:true});

    // /// /lastname
    // /// /////////lastname
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get(
    // //   ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click({ force: true });
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // /// ///id
    cy.get(
      ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get(
    // //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click({ force: true });
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // /// ////email address
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get(
    // //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click({ force: true });
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // /// ///phone number
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get(
    // //   ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click({ force: true });
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // /// ///////address
    cy.get(
      ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get(
    // //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click({ force: true });
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // /// //associated with
    cy.get(
      ".css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    // /// ///order count
    cy.get(
      ".css-1rmm4s5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1rmm4s5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1rmm4s5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get('.css-1rmm4s5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    // // /// //go to next page
    // // // cy.get('[aria-label="Go to next page"]').click();
    // // // /// //previous page
    // // // cy.get('[aria-label="Go to previous page"]').click();

    // /////privacy policy popup
    // cy.get(".MuiDrawer-paperAnchorDockedLeft").click();
    cy.get(".MuiStack-root > .MuiTypography-root").click({ force: true });
    cy.get(".commonModal__wrapper--dialog > .MuiButtonBase-root > .MuiTypography-root").click({ force: true });
    // cy.get(".MuiTypography-inherit").click();
    // cy.get("[data-testid=CloseIcon]").click();
    cy.get(".MuiGrid-container > .MuiGrid-root").click({ force: true });
    cy.get(".content__wrapper").click({ force: true });

    /// /clicking on record a tab opens
    // cy.get(":nth-child(3) > .css-132xy47-MuiTableCell-root > span").click();
    cy.get(":nth-child(1) > .css-132xy47-MuiTableCell-root").click({ force: true });
    cy.get(":nth-child(1) > .css-132xy47-MuiTableCell-root > span").click({ force: true });
    cy.get("#orderDetails-tab-0").click();
    cy.get("#orderDetails-tab-1").click();
    cy.get("#orderDetails-tab-2").click();
    cy.get("#orderDetails-tab-3").click();
    cy.get(".parent--accordion > .MuiPaper-root").click();
    cy.get(".parent--accordion > .MuiPaper-root").click();
    cy.get(".basic__drawer > .MuiIconButton-root").click();

    /// ////create-order in patient management
    cy.get(".primary-btn").click();
    cy.get(".MuiPaper-elevation1").click();

    // cy.get('[data-cy=r1dh]').click(); // Assuming 'data-cy' attribute is used for selecting the element
    // cy.get('[data-cy=r1dh]').type('{downarrow}');

    // //Wait for the element to be visible and type the down arrow key

    cy.get("input[type='text']").type("Rikitha").type("{enter}", { force: true });

    /// /hide and show all
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();

    // firstname
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// /lastname
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //id///
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //emailaddress
    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //phone number
    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //address
    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //asssociated with
    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //order count
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// ///clicking internal records
    // cy.get(".content__wrapper").click();
    cy.get("body").click();
    cy.get(":nth-child(1) > .css-132xy47-MuiTableCell-root > span").click();

    /// ////create-order in patient management
    cy.get(".createOrder__wrapper--header > .MuiButtonBase-root").click();

    /// //edit patient in patient management
    // physician
    // cy.get('.MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
    // cy.get('.MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click();
    cy.get(".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({
      force: true
    });

    cy.get(".Mui-focused > #patientNameSearch").type("sagar").click();

    /// /insurance id
    cy.get(".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get(".MuiGrid-grid-md-8 > .MuiGrid-grid-sm-12 > .d-flex > .MuiButton-root").click(); /// /chech now

    /// /lab
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      '.MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();

    /// /facility
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ':nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();

    /// //step2
    /// /order templates
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ':nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();
    /// /order history
    cy.get(".MuiIconButton-edgeStart").click();
    cy.get(".MuiPickersArrowSwitcher-root > .MuiIconButton-edgeEnd").click();
    /// /select tests
    cy.get(".secondary__card > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".secondary__card > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get("#panelIndividualTest").click();
    cy.get("#panelIndividualTest-option-0").click();

    // /// /tests selected
    cy.get(
      ':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > [data-testid="myTextField"] > .MuiInputBase-input'
    ).click();
    cy.get(
      ':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > [data-testid="myTextField"] > .MuiInputBase-input'
    ).type("test");

    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(
      ":nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root"
    ).click();
    cy.get(':nth-child(2) > .MuiList-root > [tabindex="0"]').click();

    /// /apply all button
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();
    cy.get(".MuiTableRow-root > :nth-child(5) > .MuiButtonBase-root").click();
    cy.get(":nth-child(1) > :nth-child(5) > .MuiButtonBase-root").click();

    /// //priority type
    cy.get(
      ":nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get(".Mui-focused > #patientNameSearch").click();
    cy.get("#patientNameSearch-option-0").click();

    /// /order type
    cy.get(
      ":nth-child(5) > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(5) > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();

    /// /date
    cy.get(":nth-child(3) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(3) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-rowindex="3"] > [data-timestamp="1702492200000"]').click();
    /// /time
    cy.get(":nth-child(4) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(4) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="Select hours"] > .Mui-selected').click();
    cy.get('[aria-label="15 minutes"]').click();
    // cy.get('[aria-label="Select meridiem"] > .Mui-selected').click(); ////AM
    // cy.get('[aria-label="Select meridiem"] > [tabindex="-1"]').click(); /////PM
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click(); /// /ok

    /// /add collection details
    cy.get(".switch > .MuiTypography-root").click();
    /// date
    cy.get(":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-rowindex="3"] > [data-timestamp="1702319400000"]').click();
    /// /time
    cy.get(".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="Select hours"] > .Mui-selected').click();
    cy.get('[aria-label="20 minutes"]').click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click(); // ok

    /// /step3
    /// /pre authorization
    cy.get(".mini__card > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input").click();
    /// /checknow
    cy.get(".mini__card > .align-items-center > .MuiButtonBase-root").click();
    cy.get(":nth-child(2) > .MuiTypography-root > .MuiButtonBase-root").click(); /// /qr
    /// /provider sign
    cy.get("#uploadForm > .MuiButtonBase-root").click();
    cy.get(
      ".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();
    /// /submit after
    cy.get(".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();
    cy.get(".reject-btn").click(); /// /reject button
    /// /preview order
    cy.get(".action__wrapper > .MuiBox-root > :nth-child(1)").click();
    // cy.get(".order-preview-title > :nth-child(2) > .primary-btn").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    // cy.get(".modalClose > .MuiTypography-root").click();
    /// /save draft
    cy.get(".MuiBox-root > .MuiButton-outlined.ms-3").click();
    /// //submit button
    cy.get(".MuiButton-contained").click();
  });
});
