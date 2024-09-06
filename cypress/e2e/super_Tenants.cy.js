describe("login mechanism", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    // TENANTS
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    ).click();
    // ADD TENANT
    // cy.get(".content__wrapper--header > .MuiButtonBase-root").click();
    // cy.get("[id*=':r19:']").type("sai");
    // // cy.get(
    // //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > :nth-child(1) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select"
    // // ).click();

    // // #select theme
    // // cy.get(
    // //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > .mt-1 > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #theme-selector"
    // // ).click();

    // // #spoc details
    // // cy.get(
    // //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > .MuiGrid-root.mb-2 > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // // ).click();

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #firstName"
    // ).type("krishna");
    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #middleName"
    // ).type("sai");

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > #lastName"
    // ).type("vee");

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(5) > .w-100 > .MuiFormControl-root > .MuiInputBase-root > #phoneNumber"
    // ).type("9441761835");

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(6) > .w-100 > .MuiFormControl-root > .MuiInputBase-root > #alternatePhoneNumber"
    // ).type("9100832632");

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(7) > .MuiGrid-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();

    // cy.get('[data-timestamp="1699900200000"]');

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(7) > .MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();

    // cy.get('[data-timestamp="1700505000000"]');

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(8) > .MuiFormControl-root > .MuiInputBase-root > #streetAddress"
    // ).type("united states");
    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(9) > div > .pac-target-input"
    // )
    //   .type("usa river tanzania")
    //   .type("{enter}", { force: true });

    // cy.get(
    //   ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > #zipCode"
    // ).type("67551");

    // // ADVANCE FILTER
    // #All.

    // SEARCH
    // cy.get(".MuiInputBase-input").click();

    // cy.get('.MuiInputBase-input').click({multiple:true});

    // cy.get(".MuiInputBase-input").type("life");
    cy.get("[data-testid='myTextField']").type("life");
    cy.get(".ls-icon-search").click();
    cy.get('[aria-label="Go to next page"]').click({ force: true });
    cy.get('[aria-label="Go to previous page"]').click({ force: true });
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get(".MuiSelect-select").click({ force: true });
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // TABLE HEADERS
    cy.get(".content__wrapper").click({ force: true });
    cy.get(
      ".css-x6mnvb-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-nx9o8o-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get('.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(5) > .MuiBox-root').click();
    // cy.get('.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();

    cy.get(
      ".css-atfe07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(2) > .MuiBox-root").click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(
    //   ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get(
    //   '.css-1ofqokh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    // ).click();
    // cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    // cy.get(
    //   ".css-8kzl0b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-tqueyn-MuiButtonBase-root-MuiIconButton-root"
    // ).click();

    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    // #phone
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(7) > .MuiBox-root')

    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(7) > .MuiBox-root')

    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(7) > .MuiBox-root')

    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get('.css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(7) > .MuiBox-root')

    // cy.get(
    //   ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(
    //   ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(
    //   ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();

    // cy.get(
    //   ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiPaper-root > .MuiList-root > :nth-child(3)").click();
    // // cy.get('.css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // // cy.get('.MuiList-root > :nth-child(7) > .MuiBox-root').click();

    // SEARCH
    cy.get(".MuiInputBase-input").type("life");
    cy.get(".ls-icon-search").click();

    // SHOW/HIDE COLUMNS
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".MuiButton-root:nth-child(1)").click();
    cy.get(".MuiButton-text:nth-child(2)").click();
    cy.get(".MuiButton-root:nth-child(3)").click();
    cy.get(".MuiButton-root:nth-child(4)").click();
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
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(":nth-child(13) > .css-1pc03ml > .css-tqueyn-MuiButtonBase-root-MuiIconButton-root").click();
    cy.get(":nth-child(12) > .css-1pc03ml > .MuiBox-root").click();
    cy.get(":nth-child(12) > .css-1pc03ml > .MuiBox-root").click();

    // ACTIVE
    cy.get("#simple-tab-1").click({ force: true });

    // SEARCH
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("life");
    cy.get(".ls-icon-search").click();
    // cy.get('[aria-label="Go to next page"]').click();
    // cy.get('[aria-label="Go to previous page"]').click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // ADVANCE-FILTER
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    // cy.get("#-option-1").click();
    // cy.get("#-option-2").click();
    // cy.get("#-option-3").click();
    cy.get(".MuiSelect-select").click({ force: true });
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // // SHOW/HIDE COLUMNS
    // cy.get('[data-testid="ViewColumnIcon"] > path').click();
    // cy.get(".MuiButton-root:nth-child(1)").click();
    // cy.get(".MuiButton-text:nth-child(2)").click();
    // cy.get(".MuiButton-root:nth-child(3)").click();
    // cy.get(".MuiButton-root:nth-child(4)").click();
    // cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(11) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(12) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    // cy.get(":nth-child(13) > .css-1pc03ml > .css-tqueyn-MuiButtonBase-root-MuiIconButton-root").click();
    // cy.get(":nth-child(12) > .css-1pc03ml > .MuiBox-root").click();
    // cy.get(":nth-child(12) > .css-1pc03ml > .MuiBox-root").click();

    // TABLE HEADERS
    cy.get(
      ".css-x6mnvb-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-nx9o8o-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1xy0oil-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-atfe07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-8kzl0b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1ofqokh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-92frqw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-ue7ns-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-wod9em-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-mqxd9b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1shi6mt-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1mbbzsh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1pvn0la-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1ru0cyo-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1tuzn7e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-yjk8ei-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1vyag5o-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-lyve5v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1o3mznh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-13oc7s2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1w97mhu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();

    // // IN-ACTIVE
    cy.get("#simple-tab-2").click();

    // SEARCH
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("life");
    cy.get(".ls-icon-search").click();
    // cy.get('[aria-label="Go to next page"]').click();
    // cy.get('[aria-label="Go to previous page"]').click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // ADVANCE SEARCH FILTER
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    //
    // cy.get("#-option-1").click();
    // cy.get("#-option-2").click();
    // cy.get("#-option-3").click();

    cy.get(".MuiSelect-select").click({ force: true });
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // // SHOW/HIDE COLUMNS
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".MuiButton-root:nth-child(1)").click();
    cy.get(".MuiButton-text:nth-child(2)").click();
    cy.get(".MuiButton-root:nth-child(3)").click();
    cy.get(".MuiButton-root:nth-child(4)").click();
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
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(":nth-child(13) > .css-1pc03ml > .css-tqueyn-MuiButtonBase-root-MuiIconButton-root").click();
    cy.get(":nth-child(12) > .css-1pc03ml > .MuiBox-root").click();
    cy.get(":nth-child(12) > .css-1pc03ml > .MuiBox-root").click();

    // // SEARCH
    // cy.get(".MuiInputBase-root").click({multiple:true}).type("test");
    // cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();

    // // PENDING
    cy.get("#simple-tab-3").click({ force: true });

    // SEARCH
    cy.get("[data-testid='myTextField']").type("andhra");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // // ADVANCE SEARCH FILTER
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    //
    cy.get("#-option-1").click();
    cy.get("#-option-2").click();
    cy.get("#-option-3").click();

    cy.get(".MuiSelect-select").click({ force: true });
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // TABLE HEADERS
    cy.get(
      ".css-x6mnvb-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-nx9o8o-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();

    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get(
    //   ".css-atfe07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-atfe07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click({ force: true });
    cy.get(
      ".css-atfe07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1xy0oil-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-8kzl0b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1ofqokh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-92frqw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-ue7ns-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-wod9em-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-mqxd9b-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1shi6mt-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1mbbzsh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1pvn0la-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1ru0cyo-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1tuzn7e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-yjk8ei-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1vyag5o-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-lyve5v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1o3mznh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-13oc7s2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1vx9yh7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1vx9yh7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1vx9yh7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-lqrzq0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-ey3fb6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-1fd1bt4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fd1bt4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1fd1bt4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1webnw8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-taa5rq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1bv09j1-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1xc2bvq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-l000fj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-l000fj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-l000fj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1bomxd9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(6) > .MuiBox-root").click();

    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1w97mhu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();

    // SHOW/HIDE COLUMNS
    cy.get("[data-testid=ViewColumnIcon]").click();
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
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(13) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(14) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(14) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(15) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(15) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(16) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(16) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(17) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(17) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButton-root:nth-child(1)").click({ force: true });
    cy.get(".MuiButton-root:nth-child(4)").click({ force: true });
    cy.get(".MuiButton-text:nth-child(2)").click({ force: true });
  });
});
