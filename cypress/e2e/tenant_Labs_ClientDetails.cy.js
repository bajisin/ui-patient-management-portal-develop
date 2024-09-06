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

    // EDIT
    // cy.get(".header__wrapper--actions > .MuiButtonBase-root").click();

    // ACTIVE & IN-ACTIVE
    // cy.get(".switch > .MuiTypography-root").click();
    // cy.get(".PrivateSwitchBase-input").click();
    // cy.get(".MuiButton-contained").click();

    // cy.get(".switch > .MuiTypography-root").click();
    // cy.get(".PrivateSwitchBase-input").click();
    // cy.get(".MuiButton-contained").click();

    // ADVANCE SERACH FILTER
    // cy.get(".advance__filter-wrapper").click();
    // cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#permission-tags-option-0").click();
    // cy.get("#permission-tags-option-1").click();
    // cy.get(".MuiSelect-select").click();
    // cy.get('[data-value="2"]').click();
    // cy.get(".primary-btn").click();

    // cy.get(".advance__filter-wrapper").click();
    // cy.get(".clear-all").click();

    // cy.get(".advance__filter-wrapper").click();
    // cy.get("[data-testid=CloseIcon]").click();

    // SEARCH
    // cy.get(".MuiInputBase-input").type("test");
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get(".MuiButtonBase-root > .secondaryIcon > path:nth-child(1)").click({ multiple: true });

    // SHOW/HIDE COLUMNS
    // cy.get('[data-testid="ViewColumnIcon"] > path').click();
    // cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click();
    // cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click();
    // cy.get(".MuiBox-root > .Mui-disabled").click({ force: true });
    // cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    // cy.get(".MuiButton-root:nth-child(2)").click({ force: true });

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
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    // cy.get(
    //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

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
    // getting 500 error message.

    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    // cy.get(
    //   ".css-1c5eom2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1c5eom2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    // cy.get(
    //   ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 error message.

    // ACTIVE
    cy.get(
      ":nth-child(2) > :nth-child(1) > .tab__wrapper > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > #orderConfig-1"
    ).click();

    // ADVANCE SEARCH FILTER
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-0").click();
    cy.get("#permission-tags-option-1").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();

    cy.get(".advance__filter-wrapper").click();
    cy.get("[data-testid=CloseIcon]").click();

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
    // cy.get(
    //   ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root");

    // cy.get(
    //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // // cy.get(
    // //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click();
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root");

    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // // cy.get(
    // //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click();
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // getting 500 as error  message

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // getting 500 as error  message

    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();

    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // getting 500 as error  message

    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // getting 500 as error  message

    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // cy.get(
    //   ".css-1c5eom2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1c5eom2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 as error message.

    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // SEARCH
    // cy.get(".MuiInputBase-input").click({ multiple: true });
    cy.get(".icons-separted > .MuiPaper-root").click();
    cy.get(".MuiInputBase-input").type("shaik");
    cy.get(".searchIconBtn > .secondaryIcon").click();

    // IN-ACTIVE
    cy.get(
      ":nth-child(2) > :nth-child(1) > .tab__wrapper > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-flexContainer > #orderConfig-2"
    ).click();

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
    // cy.get(
    //   ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root");

    // cy.get(
    //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({force:true});
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // // cy.get(
    // //   ".css-18d1zw1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click();
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root");

    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // // cy.get(
    // //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // // ).click();
    // // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();

    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-4d3asa-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // cy.get(
    //   ".css-1c5eom2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1c5eom2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // getting 500 as error message.

    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // ADVANCE SEARCH FILTER
    cy.get(".advance__filter-wrapper").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-0").click();
    cy.get("#permission-tags-option-1").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".primary-btn").click();
    cy.get(".advance__filter-wrapper").click();
    cy.get(".clear-all").click();

    cy.get(".advance__filter-wrapper").click();
    cy.get("[data-testid=CloseIcon]").click();

    // SEARCH
    cy.get(".MuiInputBase-input").type("test");
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
  });
});
