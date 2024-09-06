describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();

    /// /date range in user details
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="3"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="4"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="5"]').click();
    cy.get(".MuiStack-root > :nth-child(1) > .MuiInputBase-root").click();
    cy.get(":nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1703010600000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1701887400000"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get("[data-testid=CloseIcon]").click();
    // cy.get(".modalClose > .MuiTypography-root").click();

    /// /search in user details now search functionality not working
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("aaa");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();

    /// //search unselect icon
    cy.get('[aria-label="clear"] > .secondaryIcon').click();

    /// /grid view showall hide all
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();

    /// hide all
    cy.get(".css-1crctjg > :nth-child(1)").click();

    /// /show all
    cy.get(".css-1crctjg > :nth-child(3)").click();
    /// /resort order
    cy.get(".css-1crctjg > :nth-child(2)").click();

    /// //clicking all button
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// associated with
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// /patientid
    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //firstname
    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //lastname
    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// ///created date nad time
    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //status
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// / processed date and time
    // cy.get(":nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    // cy.get(":nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    // cy.get(".MuiBackdrop-invisible").click({multiple:true});
    cy.get(".content__wrapper").click({ force: true });
    // cy.get(".MuiBackdrop-invisible")
    //   .should("exist") // Ensure the element exists
    //   .should("be.visible") // Ensure the element is visible
    //   .then(($element) => {
    //     // Attempt to click the element without failing the test
    //     if ($element.length > 0) {
    //       $element.click();
    //     }
    //   });

    /// //nextpage
    cy.get('[aria-label="Go to next page"]').click({ force: true });
    /// //go to previous page
    cy.get('[aria-label="Go to previous page"]').click({ force: true });

    /// //orderid
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    /// /////created by
    // cy.get('.css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    /// /////created by
    cy.get(
      ".css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get('.css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();

    /// ////associated with
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click();
    /// /////patient id
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    /// ////firstname
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
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    /// //////lastname
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
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    /// ///////created date and time
    // cy.get('.css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    /// /////status
    /// ///////created date and time
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    /// /////status
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-gdcryx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// ///when we click on record popup opens
    cy.get(":nth-child(1) > .css-tfk16x-MuiTableCell-root > span").click({ force: true });
    // cy.get('.basic__drawer > .MuiIconButton-root').click();
    cy.get("#orderDetails-tab-0").click();
    cy.get("#panel4bh-header").click();
    cy.get("#panel4bh-header").click();
    // cy.get(".MuiGrid-root > .MuiPaper-root > :nth-child(1) > .MuiTypography-root").click();
    // cy.get(".MuiGrid-root > .MuiPaper-root > :nth-child(3)").click();
    cy.get("#orderDetails-tab-1").click();
    cy.get(".MuiAccordionSummary-content").click();
    cy.get(".MuiAccordionSummary-content").click();

    /// /edit order
    cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();
    /// //edit order for order and reports page

    // upload order details
    cy.get(".createOrder__wrapper--header > .MuiButtonBase-root").click();

    // physician
    cy.get(".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".Mui-focused > #patientNameSearch").type("sagar").click();
    cy.get(
      ".MuiGrid-grid-md-12 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();

    /// /insurance id
    cy.get(".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".d-flex > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    cy.get(".MuiGrid-grid-md-8 > .MuiGrid-grid-sm-12 > .d-flex > .MuiButton-root").click(); /// /checknow

    // lab
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();

    // facility
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();

    /// //step2 testdetails
    /// /order templates
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click({ force: true });
    cy.get(
      ":nth-child(3) > .MuiGrid-root > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root"
    ).click();
    // cy.get('.MuiGrid-grid-lg-7').click();
    cy.get(".Mui-focused > #patientNameSearch").click();

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
    cy.get(".switch > .MuiTypography-root").click();

    /// /date
    cy.get(":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(1) > .css-1nrlq1o-MuiFormControl-root > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-rowindex="4"] > [data-timestamp="1703183400000"]').click();
    /// /time
    cy.get(".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="10 hours"]').click();
    // cy.get('[aria-label="9 minutes"]').click();
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

    // cy.get(".close-drawer").click();
    // cy.get(':nth-child(1) > .css-tfk16x-MuiTableCell-root > span').click();
  });
});
