describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(5) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    /// ///hide an dshow all
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(4)").click();

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

    /// ///firstname,lastname popups
    /// ///title
    cy.get(
      ".css-15n1da3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-15n1da3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-15n1da3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get('.css-15n1da3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();
    // cy.get('.css-15n1da3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(7) > .MuiBox-root').click();

    /// //description
    cy.get(
      ".css-1ax7e6b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ax7e6b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-1ax7e6b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    // cy.get('.css-1ax7e6b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();
    cy.get(
      ".css-1ax7e6b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// //broadcast type
    cy.get(
      ".css-2446ab-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-2446ab-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-2446ab-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    // cy.get('.css-2446ab-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();
    cy.get(
      ".css-2446ab-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// ///start date
    cy.get(
      ".css-18h0pqe-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-18h0pqe-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-18h0pqe-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    // cy.get('.css-18h0pqe-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();
    cy.get(
      ".css-18h0pqe-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// ///end date
    cy.get(
      ".css-v60gq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-v60gq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-v60gq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    // cy.get('.css-v60gq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();
    cy.get(
      ".css-v60gq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// //status
    cy.get(
      ".css-sgfohn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-sgfohn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-sgfohn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    // cy.get('.css-sgfohn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();
    cy.get(
      ".css-sgfohn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    /// //actions
    // cy.get('.css-1q5bgo3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get('.css-1q5bgo3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // cy.get('.css-1q5bgo3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();
    // cy.get('.css-1q5bgo3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();

    /// //go to next page
    cy.get('[aria-label="Go to next page"]').click();
    /// //previous page
    cy.get('[aria-label="Go to previous page"]').click();

    // /////privacy policy popup
    cy.get(".MuiStack-root > .MuiTypography-root").click();
    // cy.get("[data-testid=CloseIcon]").click();
    cy.get(".commonModal__wrapper--dialog > .MuiButtonBase-root > .MuiTypography-root").click();

    /// ///////delete broadcast
    cy.get(":nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .MuiBox-root > :nth-child(2)").click();
    // cy.get(".MuiFormControlLabel-root > .MuiTypography-root");
    cy.get(".PrivateSwitchBase-input").click();
    // cy.get('.MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(".MuiButton-outlined").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();

    /// /okay button
    cy.get(":nth-child(5) > .success_modal > .MuiButtonBase-root").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    /// ///advance search
    // //advnace search in order details
    cy.get(".advance__filter-wrapper").click();
    // cy.get("#permission-tags").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();

    //  //date range in order details
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="3"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="4"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="5"]').click();
    cy.get(".MuiStack-root > :nth-child(1) > .MuiInputBase-root").click();
    cy.get(":nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1673807400000"]').click();

    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1701801000000"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    /// /clearall
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // cy.get(".modalClose path").click();
    // cy.get(".modalClose > .MuiTypography-root").click();

    /// /search option
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("Patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get('[aria-label="clear"] > .secondaryIcon').click();
    // cy.get('[aria-label="clear"] > .secondaryIcon > path').click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // /// /create broadcast
    cy.get(".MuiTypography-div > .MuiButtonBase-root").click({ force: true });
    // cy.get(".MuiTypography-div > .MuiButtonBase-root").click();
    // cy.get('.modalClose > .MuiTypography-root').click();    ////closing the create broadcastpopup
    /// /broadcast type
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click(); /// /pre login
    cy.get(".MuiSelect-select").click();
    cy.get('.MuiList-root > [tabindex="-1"]').click(); /// //post login
    /// /role
    cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags").click();
    cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-1").click();
    /// /date from
    cy.get(":nth-child(3) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1703874600000"]').click();
    /// /time form
    cy.get(":nth-child(4) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="8 hours"]').click();
    // cy.get('[aria-label="20 minutes"]').click();
    cy.get(".MuiPickersLayout-root > .MuiDialogActions-root > .MuiButtonBase-root").click();

    // date to//
    cy.get(":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-rowindex="6"] > .MuiButtonBase-root').click();

    // time to//
    cy.get(":nth-child(6) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="8 hours"]').click();
    // cy.get('[aria-label="25 minutes"]').click();
    cy.get(".MuiPickersLayout-root > .MuiDialogActions-root > .MuiButtonBase-root").click();

    /// /add title
    // cy.get('#\:r3v\:')
    cy.get('[placeholder="Title"]').type("12121");
    cy.get(".MuiTypography-textarea").type("description").click();
    // ////publish button
    // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();   //-->error
    // /////final ok success popup
    // cy.get(':nth-child(7) > .success_modal > .MuiButtonBase-root').click();
    /// /closing create broadcast popup
    cy.get(".modalClose > .MuiTypography-root").click();

    //     /////edit broadcast
    cy.get(":nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .MuiBox-root > :nth-child(1)").click();
    // broadcast type
    cy.get(".MuiSelect-select").click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
    cy.get(".MuiSelect-select").click();
    cy.get(".MuiList-root > .Mui-selected").click();
    // role//
    // cy.get('.MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click();  ////disabled
    /// /date from
    cy.get(":nth-child(3) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1701282600000"]').click();
    /// /time from
    cy.get(":nth-child(4) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get(".MuiPickersLayout-root > .MuiDialogActions-root > .MuiButtonBase-root").click();

    /// /date to
    cy.get(":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get(".MuiIconButton-edgeStart").click();
    cy.get('[data-timestamp="1703010600000"]').click();

    /// /time to

    /// /time to
    cy.get(":nth-child(6) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[aria-label="5 hours"]').click();
    cy.get('[aria-label="10 minutes"]').click();
    cy.get(".MuiPickersLayout-root > .MuiDialogActions-root > .MuiButtonBase-root").click();
    // cy.get(".MuiPickersLayout-root > .MuiDialogActions-root > .MuiButtonBase-root").click();

    /// //add title
    cy.get('[placeholder="Title"]').type("12121");

    /// /description
    cy.get(".MuiTypography-textarea").click();

    /// /update button
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    /// /matbe later
    cy.get(".primary-outline-btn").click();
    /// //success popup again
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(".PrivateSwitchBase-input").click();
    /// /yes i agree button
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    /// //final ok success popup
    cy.get(":nth-child(7) > .success_modal > .MuiButtonBase-root").click();

    /// /Add tenant close
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .modalClose > .MuiTypography-root"
    ).click();
  });
});
