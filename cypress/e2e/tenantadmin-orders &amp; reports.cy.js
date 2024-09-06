describe("template spec", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    ).click();

    // ///view iconin actions tab
    cy.get(":nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .MuiBox-root > :nth-child(1)").click();
    cy.get("#orderDetails-tab-0").click();
    cy.get("#orderDetails-tab-1").click();
    cy.get(":nth-child(1) > #panel1bh-header").click();
    cy.get(":nth-child(1) > #panel1bh-header").click();

    cy.get(" #panel1bh-header").click();
    cy.get("#panel1bh-header").click();

    // cy.get('#panel4bh-header').click();
    // cy.get('#panel4bh-header').click();

    // cy.get('.MuiGrid-root > .MuiPaper-root > :nth-child(1)').click();
    // cy.get('.MuiGrid-root > .MuiPaper-root > :nth-child(2)').click();

    /// // //insurance details tab
    cy.get("#orderDetails-tab-1").click();
    cy.get("#panel1bh-header").click();
    cy.get("#panel1bh-header").click();

    /// /edit order
    cy.get(".profileData > .MuiTypography-body1 > .MuiButtonBase-root").click();

    /// //edit order for order and reports page
    /// /upload order details
    cy.get(".createOrder__wrapper--header > .MuiButtonBase-root").click();

    /// /step1
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
    cy.get(".MuiGrid-grid-sm-12 > .d-flex > .MuiButton-root").click();

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
    cy.get("#patientNameSearch-option-1").click();

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
    cy.get(':nth-child(2) > .MuiList-root > [tabindex="0"]').click();
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
    cy.get(":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1700073000000"]').click();
    /// /time
    cy.get(".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="10 hours"]').click();
    cy.get('[aria-label="10 minutes"]').click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click(); /// /ok button

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
    cy.get(".modalClose > .MuiTypography-root").click(); /// //close preview order

    /// ///save draft
    cy.get(".MuiBox-root > .MuiButton-outlined.ms-3").click();

    /// /submit button
    cy.get(".MuiButton-contained").click();

    /// //home tab
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(1) > a > .MuiButtonBase-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // cy.get(".basic__drawer > .MuiIconButton-root").click(); ////close the view details tab

    // /// //hide and show all values
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(4)").click();

    // /// /tenantadmin
    cy.get(":nth-child(3) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(4) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(4) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(5) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(5) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(6) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(6) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(7) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(7) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(8) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(8) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(9) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(9) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(10) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(10) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(11) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(11) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(12) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(12) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(13) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(13) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(14) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(14) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(15) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(15) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(16) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(16) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(17) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(17) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(18) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(18) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// ///order and reports
    /// //firstname, lastname popups
    /// tanant admin
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1gn32y1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();

    cy.get(
      ".css-ftld8c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    //     /// //client admin
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-zzjdrs-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1s7iiuj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-zzjdrs-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    //     /// /provider
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1hb131h-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1kpcx0c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1hb131h-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    //     /// ///order id
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-loxfvf-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1hg59u2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-loxfvf-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// //patient id
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-b1e068-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();

    cy.get(
      ".css-zu567n-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// ///firstname
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-kvbusk-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();

    cy.get(
      ".css-3tau65-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// //lastname
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-b0vwr1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();

    cy.get(
      ".css-f18km3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root');
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// ///order date
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1367k1t-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();

    cy.get(
      ".css-5mh29r-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // /// ///email address
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1seta6m-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-17vywpq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// ///phone no
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1a6rpba-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1d3999w-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // /// ///priority type
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1n07i92-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-u8s0zr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // /// //order type
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1qikntp-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-138n0um-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // /// ///created by
    cy.get(
      ".css-xbpnw7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-xbpnw7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-xbpnw7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-18n793z-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-dfxefd-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-xbpnw7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-xbpnw7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // /// ////test count
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-25qwm6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-rzveqm-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // /// ///status
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-l9y3td-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1kwv5ue-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // /// //Actions
    cy.get(
      ".css-1oxz9s6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1kvylfx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click({ force: true });
    cy.get(
      ".css-1q5bgo3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1q5bgo3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // /// /advnace filter
    /// /advnace search
    /// /order status
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(':nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();

    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]');
    cy.get('[data-value="3"]');
    cy.get('[data-value="4"]');
    cy.get('[data-value="5"]');
    /// /for ordertype dropdown
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    /// /priority type dropdown
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

    // /// ///search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("Patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();

    /// //go to next page
    // cy.get('[aria-label="Go to next page"]').click();
    // /// //previous page
    // cy.get('[aria-label="Go to previous page"]').click();

    /// //2nd tab-inprogress
    cy.get("#orderReports-tab-1").click();

    /// ///advnace search in inprogress tab
    /// /order status
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();

    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]');
    cy.get('[data-value="3"]');
    cy.get('[data-value="4"]');
    cy.get('[data-value="5"]');
    /// /for ordertype dropdown
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    /// /priority type dropdown
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

    /// /////search option->error
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("Patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();

    // Cypress.on("uncaught:exception", (_err, runnable, promise) => {
    //   if (promise) {
    //     return false;
    //   }
    // });
    // cy.get('.MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root').click();
    // Cypress.on("uncaught:exception", (_err, runnable, promise) => {
    //   if (promise) {
    //     return false;
    //   }
    // });

    // // Cypress.on("uncaught:exception", (err, runnable) => {
    // //   // we expect a 3rd party library error with message 'list not defined'
    // //   // and don't want to fail the test so we return false
    // //   if (err.message.includes("setDate is not a function")) {
    // //     return false;
    // //   }
    // //   // we still want to ensure there are no other unexpected
    // //   // errors, so we let them fail the test
    // // });
    // cy.get('[aria-label="clear"] > .secondaryIcon').click();

    /// //go to next page
    // cy.get('[aria-label="Go to next page"]').click();
    /// //previous page
    // cy.get('[aria-label="Go to previous page"]').click();

    /// //tab-3 --> drafts
    cy.get("#orderReports-tab-2").click();
    /// //advance search in drafts tab
    /// /order status
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    // cy.get('#permission-tags-option-0').click();
    // cy.get('#permission-tags-option-1').click();
    // cy.get('#permission-tags-option-2').click();
    // cy.get('#permission-tags-option-3').click();
    // cy.get('#permission-tags-option-4').click();

    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]');
    cy.get('[data-value="3"]');
    cy.get('[data-value="4"]');
    cy.get('[data-value="5"]');
    /// /for ordertype dropdown
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    /// /priority type dropdown
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    // cy.get("#permission-tags-option-2").click();
    // cy.get("#permission-tags-option-3").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

    /// ///search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("Patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();

    /// /tab-4  -->onhold
    cy.get("#orderReports-tab-3").click();
    /// //advance search in onhold tab
    /// /order status
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();

    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]');
    cy.get('[data-value="3"]');
    cy.get('[data-value="4"]');
    cy.get('[data-value="5"]');
    /// /for ordertype dropdown
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    /// /priority type dropdown
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

    /// ///search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();

    /// /tab-5  -->completed
    cy.get("#orderReports-tab-4").click();
    /// //advance search in completed tab
    /// /order status
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();

    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]');
    cy.get('[data-value="3"]');
    cy.get('[data-value="4"]');
    cy.get('[data-value="5"]');
    /// /for ordertype dropdown
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    /// /priority type dropdown
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

    /// ///search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();

    // /////tab-6 -->cancelled
    cy.get("#orderReports-tab-5").click();
    /// //advance search in cancelled tab
    /// /order status
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();

    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]');
    cy.get('[data-value="3"]');
    cy.get('[data-value="4"]');
    cy.get('[data-value="5"]');
    /// /for ordertype dropdown
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    /// /priority type dropdown
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

    /// ///search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();

    // ////tab-7  --->rejected
    cy.get("#orderReports-tab-8").click();
    /// //advance search in rejected tab
    /// /order status
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();

    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]');
    cy.get('[data-value="3"]');
    cy.get('[data-value="4"]');
    cy.get('[data-value="5"]');
    /// /for ordertype dropdown
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(':nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
    // cy.get(':nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    /// /priority type dropdown
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

    /// ///search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();

    /// ///create -order
    /// //

    cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();
    cy.get(".MuiInputBase-root").click();
    cy.get(".MuiInputBase-root").click();
    // cy.get(".MuiInputBase-root").type("patient").click({force:true});
    cy.get(".MuiPaper-elevation1").click();
    cy.get("input[type='text']").type("Rikitha").type("{enter}", { force: true });

    /// / //hide and show all
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();

    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();

    /// /firstname
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// /lastname
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// /id
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// //emailaddress
    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// /phoneno
    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// /address
    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// //associated with
    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// //order count
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// /another tab open when we click on table record
    cy.get(".content__wrapper").should("be.visible").click({ force: true });

    cy.get(":nth-child(1) > .css-132xy47-MuiTableCell-root > span").click({ force: true });

    /// //another tab opens when we click on record
    cy.get(".createOrder__wrapper--header > .MuiButtonBase-root").click({ force: true });

    /// /physician
    cy.get(".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({
      force: true
    });
    // cy.get('[data-testid=ArrowDropDownIcon]').click();
    cy.get(".Mui-focused > #patientNameSearch").type("sagar").click();

    // cy.get('.MuiGrid-root:nth-child(1) > .MuiAutocomplete-root #patientNameSearch').type('1427451467 - AMIN SAGAR').click({force:true});

    // /// /insurance id
    cy.get(".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get(".MuiGrid-grid-md-8 > .MuiGrid-grid-sm-12 > .d-flex > .MuiButton-root").click();

    // cy.get(".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({ force: true });

    // /// //lab
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();

    /// //facility
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({
      force: true
    });
    cy.get(
      ":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    /// ///step 2
    /// //order templates
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click({ force: true });
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    // cy.get('.MuiGrid-grid-lg-7').click();
    cy.get(".Mui-focused > #patientNameSearch").click();

    /// /select tests
    cy.get(".secondary__card > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click({
      force: true
    });
    cy.get("#panelIndividualTest").click();
    cy.get("#panelIndividualTest-option-0").click();
    // cy.get("#panelIndividualTest-option-1").click();

    /// //order history
    // cy.get(".MuiIconButton-edgeStart").click();
    cy.get(".MuiIconButton-edgeStart").click();
    cy.get(".MuiPickersArrowSwitcher-root > .MuiIconButton-edgeEnd").click();
    // cy.get(".MuiIconButton-edgeEnd").click();

    // /// /tests selected
    cy.get(
      ':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > [data-testid="myTextField"] > .MuiInputBase-input'
    ).click();
    cy.get(
      ':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > [data-testid="myTextField"] > .MuiInputBase-input'
    ).type("test");
    // cy.get(':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > [data-testid="myTextField"] > .MuiInputBase-input').should('exist').then(() => {
    //   setStartDate(date);
    // });
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(
      ":nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root"
    ).click();
    cy.get(':nth-child(2) > .MuiList-root > [tabindex="0"]').click();
    // cy.get(':nth-child(1) > :nth-child(3) > .MuiFormControl-root > .MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root').click();
    /// /apply all button
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();
    // cy.get(':nth-child(2) > :nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input').click();
    cy.get(".MuiTableRow-root > :nth-child(5) > .MuiButtonBase-root").click();

    cy.get(":nth-child(1) > :nth-child(5) > .MuiButtonBase-root").click();

    // cy.get("#panel1a-header").click({ force: true });
    // cy.get(".MuiTableRow-root > :nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiTableRow-root > :nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input").click({ force: true });

    /// /order tests
    /// //priority type
    // cy.get(
    //   ":nth-child(4) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click();
    cy.get(
      ":nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();

    // cy.get(':nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();
    // cy.get(':nth-child(5) > :nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click();
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
    cy.get('[aria-rowindex="5"] > [data-timestamp="1703701800000"]').click();

    /// /time
    cy.get(":nth-child(4) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(4) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="3 hours"]').click();
    // cy.get('[aria-label="15 minutes"]').click();
    // cy.get('[aria-label="Select meridiem"] > .Mui-selected').click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    /// //add collection details
    /// /switch button
    // cy.get(".switch > .MuiTypography-root").click();
    /// /date
    cy.get(":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1701282600000"]').click();

    /// /time
    cy.get(".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="Select hours"] > .Mui-selected').click();
    cy.get('[aria-label="5 minutes"]').click();
    // cy.get('[aria-label="Select meridiem"] > [tabindex="-1"]').click();
    // cy.get('[aria-label="Select meridiem"] > [tabindex="-1"]').click();
    /// /collected by
    // cy.get("[placeholder=' ']").type("john");

    /// /step 3 eligibility and other details
    /// /pre authorization
    cy.get(".mini__card > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input").click();
    /// /verify abn
    cy.get(".mini__card > .align-items-center").click();
    /// //generate qr
    // cy.get(":nth-child(2) > .MuiTypography-root > .MuiButtonBase-root").click();
    /// /provider sign
    cy.get("#uploadForm").click();
    cy.get("#uploadForm > .MuiButtonBase-root").click();
    /// /submit after
    cy.get(".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".ps-0 > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    /// /checkbox
    cy.get(".py-3 > .MuiButtonBase-root > .PrivateSwitchBase-input").click({ force: true });

    /// //reject button
    cy.get(".reject-btn").click({ force: true });

    /// //previous order
    cy.get(".action__wrapper > .MuiBox-root > :nth-child(1)").click({ force: true });
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click({ force: true });
    // // cy.get(":nth-child(1) > .primary-btn").click({ force: true });
    // // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click({force:true});
    // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    // // cy.get('.modalClose > .MuiTypography-root').click();

    // /// //cancel icon for previous order
    cy.get(".action__wrapper > .MuiBox-root > :nth-child(1)").click({ force: true });
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click({ force: true });
    // cy.get("[data-testid=CloseIcon]").click({ force: true });

    // /// ///save draft
    cy.get(".MuiBox-root > .MuiButton-outlined.ms-3").click({ force: true });

    // /// ///submit
    cy.get(".MuiButton-contained").click({ force: true });
  });
});
