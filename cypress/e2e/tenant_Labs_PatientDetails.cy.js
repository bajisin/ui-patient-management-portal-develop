describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // LABS
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // CLIENT DETAILS TAB RE-DIRECTS
    cy.get(":nth-child(1) > .css-z3abwb-MuiTableCell-root").click();

    // PATIENT DETAILS
    cy.get(".parent-tab > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > #orderConfig-1").click();

    // SHOW/HIDE COLUMNS
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();

    // TABLE HEADERS
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
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root");
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click({ force: true });
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    cy.get(
      ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 as error message

    // cy.get(
    //   ".css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 as error message

    // SEARCH
    cy.get(".MuiInputBase-input").type("test");
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.get('[aria-label="clear"] > .secondaryIcon').click();
    // next/back page not done because of no-data in table.
  });
});
