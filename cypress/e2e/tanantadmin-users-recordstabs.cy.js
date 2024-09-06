// when we click on names it will open other tab contain user, order and patient details
describe("template spec", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("passes", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    /// /client-tab
    cy.get("#tntUserDetails-tab-0").click();

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
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();
    /// advance filter in users client tab
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get('.MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    /// /date range
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
    cy.get('[data-timestamp="1674153000000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1701714600000"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click(); /// /search
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // //clicking a record inside table
    cy.get(":nth-child(1) > .css-pcl9uh-MuiTableCell-root > span").click();

    // ////hide and show tabs
    // cy.get('.css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root').click();
    // cy.get('.css-1crctjg > :nth-child(1)').click();
    // cy.get('.css-1crctjg > :nth-child(3)').click();
    // cy.get('.css-1crctjg > :nth-child(2)').click();

    // // ////firstname
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // // /////popups open three dots
    // firstname
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // ////lastname
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //email
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //phone number
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // address
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // Date
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // city
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //country
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //state
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //status
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("Patient");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();
    /// advance filter in users client tab
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get('.MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    /// /date range
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
    cy.get('[data-timestamp="1674153000000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1701714600000"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click(); /// /search
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // //clicking a record inside table
    cy.get(":nth-child(1) > .css-pcl9uh-MuiTableCell-root > span").click();

    // ////hide and show tabs
    // cy.get('.css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root').click();
    // cy.get('.css-1crctjg > :nth-child(1)').click();
    // cy.get('.css-1crctjg > :nth-child(3)').click();
    // cy.get('.css-1crctjg > :nth-child(2)').click();

    // // ////firstname
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // // /////popups open three dots
    // firstname
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // ////lastname
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //email
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //phone number
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // address
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // Date
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // city
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //country
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //state
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //status
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// //////////advance search
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    // cy.get('.MuiList-root > .Mui-selected').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="2"]').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="3"]').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="4"]').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="5"]').click();
    cy.get(".MuiStack-root > :nth-child(1) > .MuiInputBase-root").click();
    cy.get(":nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1703788200000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get('[data-timestamp="1701714600000"]').click();
    cy.get('[aria-rowindex="3"] > .Mui-selected').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click(); /// /search
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    cy.get(".modalClose > .MuiTypography-root").click(); /// /close advancesearch

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
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// //order details tab in users-(internal tab)
    cy.get("#tenant-tab-1").click();
    // ////hide and show
    // cy.get('.css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root').click();
    // cy.get('.css-1crctjg > :nth-child(1)').click();
    // cy.get('.css-1crctjg > :nth-child(3)').click();
    // cy.get('.css-1crctjg > :nth-child(2)').click();

    // ////firstname
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(14) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(14) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(15) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(15) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    /// //firstname..popups
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
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // lastname
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
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // order id
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // order type
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // priority type
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // order date
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // email address
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // phone no
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
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // patient id
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // tenantadmin
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // client admin
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // provider
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // test count
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // create by
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // status
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// /advance search
    cy.get(".ls-advance-filter").click();
    // order status
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();
    cy.get("#-option-5").click();

    // date range
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
    cy.get('[data-timestamp="1674585000000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1701455400000"]').click();

    // order type
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-0").click();
    cy.get("#permission-tags-option-1").click();
    cy.get("#permission-tags-option-2").click();

    // priority type
    cy.get(":nth-child(5) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-0").click();
    cy.get("#permission-tags-option-1").click();

    cy.get(".primary-btn").click();
    cy.get(".clear-all").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

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
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// /go to next page
    cy.get('[aria-label="Go to next page"]').click();
    cy.get('[aria-label="Go to previous page"]').click();

    // patient details tab
    cy.get("#tenant-tab-2").click();

    // hide and show
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();

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

    /// /firstname popups
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
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // lastname
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
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // id
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
    cy.get(
      ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // email address
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
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // phone no
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
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //address
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
    cy.get(
      ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //associated with
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

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
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// /go to next page
    cy.get('[aria-label="Go to next page"]').click();
    cy.get('[aria-label="Go to previous page"]').click();

    /// /patient details click on record in table
    cy.get(":nth-child(1) > .css-132xy47-MuiTableCell-root > span").click();
    cy.get("#orderDetails-tab-0").click();
    cy.get("#orderDetails-tab-1").click();
    cy.get("#orderDetails-tab-2").click();
    cy.get("#orderDetails-tab-3").click();

    // edit patient
    cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();

    /// /checkbox
    cy.get(
      ".MuiTypography-div > .dflex > .MuiTypography-label > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();

    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #firstName").click();
    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #firstName").clear().type("Sandhya");

    cy.get("#middleName").clear().click();

    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #lastName").click();
    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #lastName").clear().type("ppppp");

    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    cy.get(":nth-child(5) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(5) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    cy.get(
      ".MuiTypography-div > .MuiGrid-container > :nth-child(6) > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ".MuiTypography-div > .MuiGrid-container > :nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1701109800000"]').click();

    cy.get(":nth-child(7) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(7) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    cy.get("#permanentAddr").click();
    cy.get("#permanentAddr").clear().type("hyderabad");

    cy.get("#communicationAddr").click();
    cy.get("#communicationAddr").clear().type("hyderabad");

    cy.get("#email").click();
    cy.get("#email").clear().type("tenantadmin_ls@gmail.com");

    cy.get("#contactNumber").click();
    cy.get("#contactNumber").clear().type("9804535234");

    cy.get("#panel1a-content > .MuiButton-root").click(); /// /save button

    /// /step-2
    cy.get("#step2 > .stepper__accordion--testDetails > :nth-child(1)").click();

    cy.get("form > :nth-child(2) > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #driving-license").click();
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiTypography-root"
    ).click(); /// /clear

    cy.get("form > :nth-child(2) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();

    cy.get("form > :nth-child(2) > :nth-child(3) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#insurance").click();
    cy.get(
      ":nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiTypography-root"
    ).click();

    cy.get("#ssnId").type("12").click();

    cy.get("#step3 > .MuiPaper-root > #panel1a-header").click();

    cy.get("#step4 > .MuiPaper-root > #panel1a-header").click();

    // home tab
    // cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > [href="/addPatient"] > .MuiButtonBase-root').click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root"
    ).click();

    // /// ///edit user
    cy.get("#tntUserDetails-tab-0").click();
    /// /providers tab
    cy.get("#tntUserDetails-tab-1").click();

    // hide and show
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();

    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();

    /// //////////advance search
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    /// /date range
    cy.get(".MuiSelect-select").click();
    cy.get('#menu- > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    // cy.get('.MuiList-root > .Mui-selected').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="2"]').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="3"]').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="4"]').click();
    // cy.get('.MuiSelect-select').click();
    cy.get('[data-value="5"]').click();
    cy.get(".MuiStack-root > :nth-child(1) > .MuiInputBase-root").click();
    cy.get(":nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1703788200000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get('[data-timestamp="1701714600000"]').click();
    cy.get('[aria-rowindex="3"] > .Mui-selected').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click(); /// /search
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    cy.get(".modalClose > .MuiTypography-root").click(); /// /close advancesearch

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
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// //order details tab in users-(internal tab)
    cy.get("#tenant-tab-1").click();
    // ////hide and show
    // cy.get('.css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root').click();
    // cy.get('.css-1crctjg > :nth-child(1)').click();
    // cy.get('.css-1crctjg > :nth-child(3)').click();
    // cy.get('.css-1crctjg > :nth-child(2)').click();

    // ////firstname
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(6) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(7) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(8) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(9) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(14) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(14) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    // cy.get(':nth-child(15) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();
    // cy.get(':nth-child(15) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root').click();

    /// //firstname..popups
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
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // lastname
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
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // order id
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // order type
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // priority type
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // order date
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // email address
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // phone no
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
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // patient id
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // tenantadmin
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // client admin
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // provider
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // test count
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // create by
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
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // status
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// /advance search
    cy.get(".ls-advance-filter").click();
    // order status
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();
    cy.get("#-option-4").click();
    cy.get("#-option-5").click();

    // date range
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
    cy.get('[data-timestamp="1674585000000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1701455400000"]').click();

    // order type
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-0").click();
    cy.get("#permission-tags-option-1").click();
    cy.get("#permission-tags-option-2").click();

    // priority type
    cy.get(":nth-child(5) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-0").click();
    cy.get("#permission-tags-option-1").click();

    cy.get(".primary-btn").click();
    cy.get(".clear-all").click();
    // cy.get('.modalClose > .MuiTypography-root').click();

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
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// /go to next page
    cy.get('[aria-label="Go to next page"]').click();
    cy.get('[aria-label="Go to previous page"]').click();

    // patient details tab
    cy.get("#tenant-tab-2").click();

    // hide and show
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();

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

    /// /firstname popups
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
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // lastname
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
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // id
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
    cy.get(
      ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // email address
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
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // phone no
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
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //address
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
    cy.get(
      ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // //associated with
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('.MuiMenuItem-divider > .MuiBox-root').click();
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // // cy.get('.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

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
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// /go to next page
    cy.get('[aria-label="Go to next page"]').click();
    cy.get('[aria-label="Go to previous page"]').click();

    /// /patient details click on record in table
    cy.get(":nth-child(1) > .css-132xy47-MuiTableCell-root > span").click();
    cy.get("#orderDetails-tab-0").click();
    cy.get("#orderDetails-tab-1").click();
    cy.get("#orderDetails-tab-2").click();
    cy.get("#orderDetails-tab-3").click();

    // edit patient
    cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();

    /// /checkbox
    cy.get(
      ".MuiTypography-div > .dflex > .MuiTypography-label > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).click();

    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #firstName").click();
    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #firstName").clear().type("Sandhya");

    cy.get("#middleName").clear().click();

    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #lastName").click();
    cy.get(".w-100 > .MuiFormControl-root > .MuiInputBase-root > #lastName").clear().type("ppppp");

    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    cy.get(":nth-child(5) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(5) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    cy.get(
      ".MuiTypography-div > .MuiGrid-container > :nth-child(6) > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ".MuiTypography-div > .MuiGrid-container > :nth-child(6) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1701109800000"]').click();

    cy.get(":nth-child(7) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ":nth-child(7) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator"
    ).click();

    cy.get("#permanentAddr").click();
    cy.get("#permanentAddr").clear().type("hyderabad");

    cy.get("#communicationAddr").click();
    cy.get("#communicationAddr").clear().type("hyderabad");

    cy.get("#email").click();
    cy.get("#email").clear().type("tenantadmin_ls@gmail.com");

    cy.get("#contactNumber").click();
    cy.get("#contactNumber").clear().type("9804535234");

    cy.get("#panel1a-content > .MuiButton-root").click(); /// /save button

    /// /step-2
    cy.get("#step2 > .stepper__accordion--testDetails > :nth-child(1)").click();

    cy.get("form > :nth-child(2) > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #driving-license").click();
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiTypography-root"
    ).click(); /// /clear

    cy.get("form > :nth-child(2) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();

    cy.get("form > :nth-child(2) > :nth-child(3) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#insurance").click();
    cy.get(
      ":nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiTypography-root"
    ).click();

    cy.get("#ssnId").type("12").click();

    cy.get("#step3 > .MuiPaper-root > #panel1a-header").click();

    cy.get("#step4 > .MuiPaper-root > #panel1a-header").click();

    // home tab
    // cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > [href="/addPatient"] > .MuiButtonBase-root').click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root"
    ).click();

    // /// ///edit user
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(10) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(11) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(12) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    cy.get(":nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(13) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// /firstname popups
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // lastname
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // id
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // emailaddress
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // phone no
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // address
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // date
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // city
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // country
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // state
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // status
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// advance filter in users client tab
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get('.MuiAutocomplete-endAdornment > .MuiButtonBase-root').click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    /// /date range
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
    cy.get('[data-timestamp="1674585000000"]').click();
    cy.get(".MuiStack-root > :nth-child(2) > .MuiInputBase-root").click();
    cy.get(":nth-child(2) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get('[data-timestamp="1701455400000"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click(); /// /search
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // home tab
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root"
    ).click();

    // /// ///edit user
    cy.get("#tntUserDetails-tab-0").click();
    /// /providers tab
    cy.get("#tntUserDetails-tab-1").click();
    cy.get(":nth-child(1) > .css-pcl9uh-MuiTableCell-root > span").click();

    // cy.get("#tenant-tab-2").click();
    cy.get(".MuiButton-text").click();
    // role//
    cy.get(":nth-child(1) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").type("aaa");

    cy.get(
      ":nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment"
    ).click();
    cy.get(":nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();

    cy.get(":nth-child(3) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get('#-option-1').click();

    /// //personal information
    cy.get("#firstName").click();

    cy.get("#middleName").type("aaaa");

    cy.get("#lastName").click();

    cy.get(":nth-child(4) > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get('[data-timestamp="1700850600000"]').click();
    cy.get(".MuiIconButton-edgeStart").click();
    cy.get('[data-timestamp="1703874600000"]').click();

    cy.get("#streetAddress").click();

    cy.get(".pac-target-input").click();
    // cy.get('.pac-target-input').type("");

    cy.get("#zipCode").type("{backspace}");

    cy.get("#emailAddress").click();

    cy.get("#phoneNumber").clear().type("9086767566");

    cy.get("#alternatePhoneNumber").clear().type("9604534235");

    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    cy.get(".primary-btn:nth-child(1)").click();
    cy.get("form").submit();

    cy.get(".modalClose > .MuiTypography-root").click();
  });
});
