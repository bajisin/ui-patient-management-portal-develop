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

    // ORDER DETAILS
    cy.get(".parent-tab > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > #orderConfig-2").click();

    // SHOW/HIDE COLUMNS
    cy.get("[data-testid=ViewColumnIcon]").click();
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
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(14) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(14) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(15) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(15) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(16) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(16) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(17) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(17) .PrivateSwitchBase-input").click();
    cy.get(".MuiBox-root > .Mui-disabled").click({ force: true });
    cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    cy.get(".MuiButton-root:nth-child(2)").click({ force: true });

    // TABLE HEADERS
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
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
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    // cy.get(
    //   ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({force:true});
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    // cy.get(
    //   ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({force:true});
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    // cy.get(
    //   ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    // cy.get(
    //   ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    // SEARCH
    // cy.get(".MuiInputBase-input").type("tests");
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // getting 500 as error message

    // VIEW DETAILS
    cy.get(".view-details__right-drawer").click();
    cy.get("[data-testid=CloseIcon]").click();

    // LAB DETAILS
    cy.get(".MuiBreadcrumbs-ol > :nth-child(3) > .MuiTypography-root").click();

    // > LAB
    cy.get(".MuiStack-root > .MuiBreadcrumbs-root > .MuiBreadcrumbs-ol > :nth-child(1) > a").click();
  });
});
