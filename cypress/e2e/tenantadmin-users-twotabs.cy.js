describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root"
    ).click();
    cy.get("#tntUserDetails-tab-0").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root");
    cy.get(".MuiAutocomplete-endAdornment").click();
    // cy.get("#permission-tags").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    // date range in client admin
    cy.get(".MuiSelect-select").click();
    // cy.get('.MuiList-root > .Mui-selected').click()
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
    cy.get('[data-timestamp="1673289000000"]').click();
    cy.get(".MuiStack-root > :nth-child(1) > .MuiInputBase-root").click();
    cy.get(":nth-child(1) > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    // for pagination
    // cy.get('[aria-label="Go to next page"]').click();

    // for search option
    // cy.get('.MuiInputBase-input');
    // cy.get('.MuiDrawer-paperAnchorDockedLeft').click();
    // cy.get(
    //   ".MuiPaper-root:nth-child(1) .MuiListItem-root:nth-child(2) .MuiListItem-root:nth-child(1) .MuiTypography-root:nth-child(1)"
    // ).click();
    // cy.get(".MuiInputBase-input");
    // cy.get(".MuiInputBase-input").type("Sadhya");
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get(".MuiInputBase-input").clear();

    // for providers tab code starts here
    cy.get("#tntUserDetails-tab-1").click();

    // advance search in provider tab
    cy.get(".advance__filter-wrapper").click();
    // cy.get(".MuiFormControl-root > .MuiInputBase-root").click({multiple:true});
    cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get('.MuiAutocomplete-endAdornment').click();

    // cy.get("#permission-tags").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    // date range in provider
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
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    // clear all in provider tab
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();

    /// / search option in provider tab
    // cy.get(
    //   ".MuiPaper-root:nth-child(1) .MuiListItem-root:nth-child(2) .MuiListItem-root:nth-child(1) .MuiTypography-root:nth-child(1)"
    // ).click();
    // cy.get(".MuiInputBase-input");
    // cy.get(".MuiInputBase-input").type("aaa");
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get(".MuiInputBase-input").clear();

    /// //hide and show tab
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
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

    /// /fisrtname,lastname popups
    /// //firstname , last name popups
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// /lastname
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// /id
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// /emailaddress
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// //phone number
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// //address
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// //date
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// //status
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider").click();
    cy.get(
      ".css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
  });
});
