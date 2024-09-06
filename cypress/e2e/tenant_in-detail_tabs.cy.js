describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // in-detail page redirects to..
    cy.get(":nth-child(2) > .css-1svqgni-MuiTableCell-root").click();

    // Edit icon for editing...
    // cy.get(".MuiButton-text").click();
    // cy.get("#facilityName").type("lifescan");
    // cy.get(":nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#management-group-option-0").click();
    // cy.get(":nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#permission-tags-option-0").click();
    // cy.get(
    //   ".MuiGrid-grid-sm-6.common_checkbox_selection > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click();
    // cy.get("#lab-days-tags-option-0").click();
    // cy.get(".formcontrol__wrapper > :nth-child(2)").click();
    // cy.get(
    //   ":nth-child(2) > .MuiGrid-grid-sm-12.ps-0 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click();
    // cy.get("#permission-tags-option-0").click();
    // cy.get(".formcontrol__wrapper > :nth-child(2)").click();
    // cy.get('[id*=":r4r:"]').type("9889122344");
    // cy.get('[id*=":r4t:"]').type("life@gmail.com");
    // cy.get("[id*=':r4p:']").type("usa");
    // cy.get(".mt-0 > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("[id*=':r4v:-option-0']").click();
    // cy.get(".mt-0 > .MuiGrid-root").click();
    // cy.get(".MuiTypography-p > .switch > .MuiTypography-root").click();
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();

    // Add new user.....
    // cy.get(".MuiButton-contained").click();
    // cy.get("#facilityName").type("saikrishna");
    // cy.get("[id*=':r4p:']").type("hyderabad");
    // cy.get("[id*=':r4r:']").type("9100832632");
    // cy.get("[id*=':r4t:']").type("sai@gmail.com");
    // cy.get(".mt-0 > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // active toggle off & on..
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();

    // Client details tab...
    // advance search filter for All....
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    // cy.get("#permission-tags-option-0").click();
    // cy.get("#permission-tags-option-1").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".commonModal__wrapper--dialog").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    cy.get(".modalClose > .MuiTypography-root").click();
    // cy.get("[data-testid=CloseIcon]").click();

    // SHOW/HIDE COLUMNS ELEMENTS CHECK...

    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click({ force: true });
    cy.get('[data-testid="ViewColumnIcon"] > path').click({ force: true });
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
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".MuiButton-root:nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();

    // // asc & desc sort..
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });

    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click({ force: true });
    cy.get(
      ".css-y8xf0d-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-y8xf0d-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-y8xf0d-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click({ force: true });
    cy.get(
      ".css-1pea0w9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1pea0w9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-2gexry-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-2gexry-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-2w7f7g-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-2w7f7g-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-ihbl14-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ihbl14-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root"
    ).click();
    cy.get(
      '.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper"
    ).click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root"
    ).click();
    cy.get(".MuiTableCell-root:nth-child(4) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(4) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(5) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(5) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(6) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(6) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(7) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(7) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(8) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(8) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".css-1e1m30i").click();
    cy.get(".css-1e1m30i").click();
    cy.get(".MuiTableCell-root:nth-child(10) .Mui-TableHeadCell-Content-Wrapper").click();
    cy.get(".MuiTableCell-root:nth-child(10) .Mui-TableHeadCell-Content-Wrapper").click();

    // search filter....
    // cy.get(".MuiInputBase-root").type("test");
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();

    // Active tab..
    cy.get(
      ":nth-child(2) > :nth-child(1) > .tab__wrapper > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > #orderConfig-1"
    ).click();

    // advance search filter active tab....
    cy.get(
      ":nth-child(2) > :nth-child(1) > .tab__wrapper > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > #orderConfig-1"
    ).click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();

    // cy.get("#permission-tags-option-0").click();
    // cy.get("#permission-tags-option-1").click();
    cy.get(".commonModal__wrapper--dialog").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    cy.get(".modalClose > .MuiTypography-root").click();
    // cy.get("[data-testid=CloseIcon]").click();

    // advance search filter in in-active tab....
    cy.get(
      ":nth-child(2) > :nth-child(1) > .tab__wrapper > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > #orderConfig-2"
    ).click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();

    // cy.get("#permission-tags-option-0").click();
    // cy.get("#permission-tags-option-1").click();
    cy.get(".commonModal__wrapper--dialog").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    cy.get(".modalClose > .MuiTypography-root").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-0").click();

    // cy.get("#permission-tags-option-0").click();
    // cy.get("#permission-tags-option-1").click();
    cy.get(".commonModal__wrapper--dialog").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();
    cy.get(".modalClose > .MuiTypography-root").click();
    // cy.get("[data-testid=CloseIcon]").click();

    // Facilities on top goes to back....
    cy.get(".MuiStack-root > .MuiBreadcrumbs-root > .MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root").click();
  });
});
