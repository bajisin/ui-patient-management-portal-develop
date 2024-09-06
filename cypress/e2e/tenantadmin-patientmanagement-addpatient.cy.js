describe("template spec", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(6) > a > .MuiButtonBase-root"
    ).click();
    cy.get(".primary-outline-btn").click();
    cy.get(".MuiInputBase-root").click();
    cy.get(".MuiInputBase-root").click();
    // cy.get(".MuiInputBase-root").type("patient").click({force:true});
    cy.get(".MuiPaper-elevation1").click();
    cy.get("input[type='text']").type("Patient").type("{enter}", { force: true });

    // /////firstname,lastname popups
    // cy.get('.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    /// ////patient management -Add Patient
    /// ///firstnamelastname popups
    // cy.get('.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get(':nth-child(5) > .MuiPaper-root > .MuiList-root > :nth-child(4) > .MuiBox-root').click();

    /// //lastname
    // cy.get('.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    /// /id
    // cy.get('.css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    /// /email address
    // cy.get('.css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    /// /phone no
    // cy.get('.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    /// /address
    // cy.get('.css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    /// //associated with
    // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    // /////order count
    // cy.get('.css-1rmm4s5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-1rmm4s5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-1rmm4s5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    // cy.get('.MuiBackdrop-invisible').click();
    // cy.get('.MuiBackdrop-invisible', { log: true }).should('exist').click();
    // cy.get('.MuiBackdrop-invisible', { timeout: 10000 }).should('exist').click({ force: true });
    // cy.get('.MuiBackdrop-invisible', { timeout: 10000 }).should('exist').click();
    // cy.get(".MuiBackdrop-invisible")
    //   .should("be.visible") // Ensure the element is visible
    //   // .should('be.enabled')  // Ensure the element is enabled/clickable
    //   .click({ multiple: true });

    // ..........
    // cy.get(".MuiBackdrop-invisible").should("be.visible").click({ force: true, multiple: true });

    /// /another tab open when we click on table record
    // cy.get(".content__wrapper").click();
    // cy.get(".content__wrapper").should('be.visible').wait(1000).click();

    // ..........
    // cy.get(".content__wrapper").should("be.visible").click({ force: true });
    // cy.get(":nth-child(1) > .css-132xy47-MuiTableCell-root > span").click({ force: true });

    /// //another tab opens when we click on record
    cy.get(":nth-child(2) > .css-1ba3din-MuiTableCell-root").click();
    // cy.get(".createOrder__wrapper--header > .MuiButtonBase-root").click({ force: true });

    // /// /physician
    // cy.get(".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root")
    //   .click({
    //     force: true
    //   })
    //   .type("sagar");
    // cy.get(
    //   ".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    // );
    // cy.get("#-option-0").click();

    // cy.contains(".MuiAutocomplete-popper", "Desired Option").click();

    /// /insurance id
    // cy.get(".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({ force: true });
    /// //lab
    // cy.get(
    //   ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click({ force: true });
    /// //facility
    // cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({
    //   force: true
    // });

    // step 2 //test details
    // cy.get(
    //   ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click({ force: true });
    /// /select tests
    // cy.get(".secondary__card > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({
    //   force: true
    // });
    // / //order history
    // cy.get(".MuiIconButton-edgeStart").click({ force: true });
    // cy.get(".MuiIconButton-edgeEnd").click({ multiple: true });
    /// /order tests
    /// //priority type
    // cy.get(
    //   ":nth-child(4) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click({ force: true });
    /// /order type
    // cy.get(
    //   ":nth-child(4) > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click({ force: true });
    // cy.get(".switch > .MuiTypography-root").click({ force: true });
    // cy.get(":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click({
    //   force: true
    // });
    // cy.get(".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click({ force: true });
    // // cy.get("input[type='text']").type("aaaaaa").click({ force: true });
    // cy.get(".switch > .MuiTypography-root").click({ force: true });

    // // /// //step 3
    // // /// //eligibility and other details
    // cy.get(".mini__card > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input").click({
    //   force: true
    // });
    // cy.get(".mini__card > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input").click({
    //   force: true
    // });

    // cy.get(".mini__card > .align-items-center").click({ force: true });

    // // /// //generate QR Code
    // cy.get(":nth-child(2) > .MuiTypography-root > .MuiButtonBase-root").click({ force: true });

    // /// /uplaodnform
    // cy.get("#uploadForm").click({ force: true });

    // /// /submit after
    // cy.get(".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({ force: true });
    // // /// /checkbox
    // cy.get(".py-3 > .MuiButtonBase-root > .PrivateSwitchBase-input").click({ force: true });

    // // /// //reject button
    // cy.get(".reject-btn").click({ force: true });
    // // /// //previous order
    // cy.get(".action__wrapper > .MuiBox-root > :nth-child(1)").click({ force: true });
    // cy.get(":nth-child(1) > .primary-btn").click({ force: true });
    // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click({force:true});
    // /// //cancel icon for previous order
    // cy.get(".action__wrapper > .MuiBox-root > :nth-child(1)").click({ force: true });
    // cy.get("[data-testid=CloseIcon]").click({ force: true });
    // // /// ///save draft
    // cy.get(".MuiBox-root > .MuiButton-outlined.ms-3").click({ force: true });

    // // /// ///submit
    // cy.get(".MuiButton-contained").click({ force: true });

    // // in the table record itself.
    // /// ///hide and show all
    // cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();

    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();

    // // /// /firstname
    // cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // /// /lastname
    // cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // // /// /id
    // cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // // /// //emailaddress
    // cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // // /// /phoneno
    // cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // // /// /address
    // cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // // /// //associated with
    // cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // // /// //order count
    // cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// /physician
    cy.get(".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();

    /// //insurance id
    cy.get(".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();
    cy.get(
      '.d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click();
    // cy.get("[data-testid=ArrowDropDownIcon]").click({e:true});
    // cy.get("[data-testid=ArrowDropDownIcon]").click();
    // cy.get("[data-testid=ArrowDropDownIcon]").click();

    /// /checknow
    // cy.get(".MuiGrid-grid-sm-12 > .d-flex > .MuiButton-root").click();

    /// /lab
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get(
      '.MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]'
    ).click({ multiple: true });

    /// /facility
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click({ multiple: true });

    /// //step2 testdetails
    /// /order templates
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get(".Mui-focused > #patientNameSearch").click();
    // cy.get(".MuiFormControl-fullWidth > .Mui-focused").click();
    // cy.get("[data-testid=ArrowDropDownIcon]").click();

    // cy.get(".Mui-focused > .MuiAutocomplete-endAdornment").click();
    // cy.get("[data-testid=ArrowDropDownIcon]").click();

    // cy.get("#patientNameSearch").click();
    // cy.get("#patientNameSearch-option-1").type('sagar');
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).type("sagar");

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
    // cy.get('#panelIndividualTest-option-1').click();
    // cy.get('#panelIndividualTest-option-2').click();

    /// /test selected
    cy.get('[data-testid="myTextField"] > .MuiInputBase-input').type("test");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(':nth-child(2) > .MuiList-root > [tabindex="0"]').click({ force: true });
    // fasting required
    cy.get(".MuiTableRow-root > :nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input").click();
    cy.get(".MuiTableRow-root > :nth-child(5) > .MuiButtonBase-root").click(); /// //apply all

    /// /order details
    // priority type
    cy.get(
      ":nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get(".Mui-focused > #patientNameSearch").click();
    cy.get("#patientNameSearch-option-0").click();
    cy.get(
      ":nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get("#patientNameSearch-option-1").click();

    /// /order type
    cy.get(
      ":nth-child(5) > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(5) > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    /// /date
    cy.get(
      ":nth-child(5) > :nth-child(3) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(3) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-rowindex="4"] > [data-timestamp="1703010600000"]').click();
    /// /time
    cy.get(":nth-child(4) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(4) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="11 hours"]').click();
    // cy.get('[aria-label="20 minutes"]').click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    /// /add collection details
    // cy.get(".switch > .MuiTypography-root").click();

    /// /date
    // cy.get(":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(
    //   ":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();
    // cy.get('[data-timestamp="1700073000000"]').click();

    cy.get(
      ":nth-child(3) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-rowindex="2"] > [data-timestamp="1701801000000"]').click();
    /// /time
    // cy.get(".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(
    //   ".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();
    // cy.get('[aria-label="10 hours"]').click();
    // cy.get('[aria-label="10 minutes"]').click();
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click(); ////ok button
    cy.get(
      ":nth-child(4) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="10 minutes"]').click();

    /// //step 3 -eligibility details
    /// preauthporization
    // cy.get(".mini__card > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input").click();
    /// /provider sign
    cy.get("#uploadForm").click();
    cy.get("#uploadForm > .MuiButtonBase-root").click();
    /// /submit after
    cy.get(".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();
    /// /checkbox
    // cy.get(".py-3 > .MuiButtonBase-root > .PrivateSwitchBase-input").click();

    /// /preview order
    cy.get(".action__wrapper > .MuiBox-root > :nth-child(1)").click();
    // cy.get(".order-preview-title > :nth-child(2) > .primary-btn").click(); ////print file
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click(); /////submit
    cy.get(".modalClose > .MuiTypography-root").click();
    /// //close preview order

    /// ///save draft
    cy.get(".MuiBox-root > .MuiButton-outlined.ms-3").click();

    /// /submit button
    cy.get(".MuiButton-contained").click();
  });
});
