describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // WHEN CLICKING ON COMPENDIUMS..
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(4) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // // ADVANCE SEARCH FILTER..
    cy.get(".advance__filter-wrapper").click();
    cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#-option-0").click();
    // cy.get("#-option-1").click();
    cy.get(":nth-child(6) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-1").click();
    // cy.get("#-option-2").click();
    cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#-option-0").click();
    // cy.get("#-option-1").click();
    cy.get(":nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-1").click();
    cy.get(":nth-child(5) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#permission-tags-option-1").click();
    // cy.get('#permission-tags-option-6').click();
    cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    // cy.get("#-option-1").click();
    cy.get(".MuiDialogActions-root").click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    // TABLE HEADERS CHECK...
    cy.get(".content__wrapper").click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1unutvm-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1cbrc1g-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1cbrc1g-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-r21mfw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-r21mfw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-m8x8ez-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-m8x8ez-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-8lo51c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-8lo51c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-8lo51c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(2) > .MuiBox-root").click();
    cy.get(
      '.css-l7ejyu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-l7ejyu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-dsn0al-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-dsn0al-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1vqxyx8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1vqxyx8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1vqxyx8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-n33b9v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-n33b9v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(
    //   ".css-12i68ez-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-12i68ez-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    // cy.get(
    //   ".css-109yt4o-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-109yt4o-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-16oy25s-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-16oy25s-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    // cy.get(
    //   ".css-1amds07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   ".css-1amds07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    cy.get(
      ".css-9owt57-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-9owt57-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      '.css-1kz0mpb-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click({ force: true });

    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1kz0mpb-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click({ force: true });

    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1xxbwyw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1xxbwyw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-18mi1lk-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-18mi1lk-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-j3f5hz-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-j3f5hz-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-k9wpt0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-k9wpt0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      ".css-1y7fmai-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1y7fmai-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();

    // SEARCH IN TEST COMPENDIUM...
    // cy.get(".MuiInputBase-input").click({ multiple: true });
    // cy.get("[data-testid='myTextField']").type("test");
    // cy.get("[data-testid='myTextField']").clear().type("test");

    // EDIT ICON FOR TABLE RECORD...
    // cy.get(":nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .MuiBox-root > :nth-child(1)").click({ force: true });
    // cy.get("[placeholder='Test Name']").type("life");

    // cy.get("[placeholder='Test Name']").type("life");
    // cy.get("[placeholder='Test Code']").type("4567");
    // cy.get("[placeholder='15 mo Value']").type("4567");
    // cy.get("[placeholder='Lab Corp Send Out']").type("8765");
    // cy.get("[placeholder='Lab Corp Alias']").type("8765");
    // cy.get("[placeholder='TAT 1']").type("234");
    // cy.get("[placeholder='$123']").type("098");
    // cy.get("[placeholder='Cpt Code']").type("1234");
    // cy.get("[placeholder='LONIC Code']").type("987");
    // cy.get("[placeholder='LONIC Description']").type("230");
    // cy.get("[placeholder='Min Value']").type("654");

    // cy.get(":nth-child(6) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#-option-1").click();
    // cy.get(":nth-child(8) > .MuiFormControl-root > .MuiInputBase-root").type("life");
    // cy.get(":nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-0").click();
    // cy.get(":nth-child(11) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-1").click();
    // cy.get(":nth-child(12) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-1").click();
    // cy.get(":nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-1").click();
    // cy.get(":nth-child(11) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-3").click();
    // cy.get(":nth-child(12) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-2").click();
    // cy.get(":nth-child(13) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-2").click();
    // cy.get(":nth-child(14) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#container-tags-option-3").click();

    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    // cy.get(".PrivateSwitchBase-input").click();
    // cy.get(".modal-buttons-wrapper > .primary-btn").click();
    // cy.get(".MuiButton-contained").click();
    // cy.get(".success_modal > .MuiTypography-div > .MuiTypography-root").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();
    // getting 500 error

    // DELETING THE RECORD IN THE TABLE...
    cy.get(":nth-child(1) > .css-1j2c8hm-MuiTableCell-root > .MuiBox-root > :nth-child(2)").click({ force: true });
    // cy.get(".MuiTableRow-root:nth-child(1) .deleteRedIcon > path:nth-child(2)");
    cy.get(".PrivateSwitchBase-input").click();
    cy.get(".MuiButton-contained").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // ADD TEST COMPENDIUM
    // // // UPLOAD
    // // const resumeFilePath = "chart.pdf";

    // // cy.get(".formcontrol__wrapper > .MuiTypography-div").click({ force: true });
    // cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();
    // cy.wait(15000);
    // cy.get(".MuiDialogContent-root > .MuiButton-root").click();

    // cy.wait(15000);
    // cy.get(".commonModal__wrapper--dialog > .MuiButton-root").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();

    //  ADD TEST COMPENDIUM.. OPEN & CLOSE...
    // cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();
    // cy.get("[data-testid=CloseIcon]").click();

    // ADD TEST COMPENIUM...
    cy.get(".MuiTypography-body1 > .MuiButtonBase-root").click();

    // MANUAL...
    cy.get(".toggle__buttons--left").click();
    cy.get('[placeholder = "Test Name"]').type("sai");
    cy.get("[placeholder='Code']").type("54323");
    cy.get("[placeholder='15 mo Value']").type("121");

    cy.get(":nth-child(6) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-1").click();

    cy.get("[placeholder = 'Lab Corp Send Out']").type("lifescan");
    cy.get(":nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-0").click();
    cy.get(":nth-child(9) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-0").click();
    cy.get(":nth-child(11) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-0").click();
    cy.get(":nth-child(12) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-0").click();
    cy.get(":nth-child(13) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-0").click();
    cy.get(":nth-child(14) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-1").click();
    cy.get("[placeholder='Lab Corp Send Out']").type("121");
    cy.get("[placeholder='Lab Corp Alias']").type("121");

    cy.get(".MuiGrid-container > :nth-child(1) > .MuiTypography-root").type("labs");
    cy.get("[placeholder='TAT']").type("121");
    cy.get("[placeholder='$123']").type("121");
    cy.get("[placeholder='CPT Codes']").type("121");
    cy.get("[placeholder='LONIC Description']").type("121");
    cy.get("[placeholder='LONIC Code']").type("121");
    cy.get("[placeholder='Min Vol']").type("121");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(".PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // TEST COMPENDIUM
    // SHOW/HIDE COLUMNS..,
    cy.get(".list__header").click();
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
    cy.get(".MuiButtonBase-root:nth-child(18) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(18) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(19) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(19) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(20) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(20) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(21) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(21) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(22) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(22) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(23) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(23) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButton-text:nth-child(1)").click();
    cy.get(".MuiButton-root:nth-child(4)").click();
    cy.get(".css-1crctjg").click();
    cy.get(".MuiButton-root:nth-child(2)").click();
    cy.get(".css-1crctjg").click();
    cy.get(".MuiButton-text:nth-child(1)").click();
    cy.get(".MuiButton-root:nth-child(4)").click();
  });
});
