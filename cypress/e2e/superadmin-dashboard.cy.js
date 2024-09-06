describe("dashboard page", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("passes", () => {
    //     cy.get(
    //       ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     // cy.get(".MuiMenuItem-root:nth-child(2)").click();
    //     cy.get(
    //       ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="2"]').click();
    //     cy.get(
    //       ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="3"]').click();
    //     cy.get(
    //       ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     // cy.get('[data-value="4"]').click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     /////custom date range
    //     cy.get(
    //       ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     cy.get('[data-value="5"]').click();
    //     cy.get(".MuiGrid-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root").click();
    //     cy.get(
    //       ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    //     ).click();
    //     cy.get('[data-timestamp="1699986600000"]').click();
    //     cy.get(
    //       ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="5"]').click();
    //     cy.get(":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root").click();
    //     cy.get(
    //       ":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    //     ).click();
    //     cy.get('[data-timestamp="1700937000000"]').click();

    //     /// ////orderstaus
    //     // cy.get(
    //     //   ".orderStatus__wrapper > .basic__card > .title__wrapper > .title__wrapper--left > .MuiTypography-span"
    //     // ).click();
    //     cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get('[data-value="2"]').click();
    //     cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get('[data-value="3"]').click();
    //     cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get('[data-value="4"]').click();
    //     cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get('[data-value="5"]').click();
    //     cy.get(".pe-1 > .MuiFormControl-root > .MuiInputBase-root").click();
    //     cy.get(".pe-1 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    //     cy.get('[data-timestamp="1673980200000"]').click();
    //     cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get('[data-value="5"]').click();
    //     cy.get(".ps-1 > .MuiFormControl-root > .MuiInputBase-root").click();
    //     cy.get(".ps-1 > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root").click();
    //     cy.get('[data-timestamp="1700850600000"]').click();

    //     // /// /////tenant snapshots
    //     // cy.get(
    //     //   ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--left > .MuiTypography-h5"
    //     // ).click();
    //     // cy.get(
    //     //   ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     // ).click();
    //     cy.get(
    //       ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     cy.get(
    //       ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="2"]').click();
    //     cy.get(
    //       ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     cy.get(
    //       ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="3"]').click();
    //     cy.get(
    //       ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="4"]').click();
    //     cy.get(
    //       ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="5"]').click();
    //     cy.get('.MuiGrid-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root').click();
    //     cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    //     cy.get('[data-timestamp="1673289000000"]').click();
    //     cy.get(
    //       ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    //     ).click();
    //     cy.get('[data-value="5"]').click();
    //     cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root').click();
    //     cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
    //     cy.get('[data-timestamp="1700418600000"]').click();

    //     cy.get(".MuiGrid-spacing-xs-3").click();

    //  /////highcharts
    // //  cy.get('#highcharts-bw0bmz0-22 > .highcharts-root > .highcharts-exporting-group > .highcharts-no-tooltip > .highcharts-button-box').click();
    //     // cy.get('#highcharts-qjqhyzr-21 > .highcharts-root > .highcharts-exporting-group > .highcharts-no-tooltip > .highcharts-button-symbol').click({force:true});
    //     // cy.get('.tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--left > .MuiTypography-span').click();
    //     // cy.get('#highcharts-zi4z8qf-27 > .highcharts-root > .highcharts-exporting-group > .highcharts-no-tooltip > .highcharts-button-box')
    //     // cy.get(".highcharts-button-pressed > .highcharts-button-box").click();
    //     // cy.get(".highcharts-menu-item:nth-child(1)").click();
    //     // cy.get(".highcharts-button-pressed > .highcharts-button-box").click();
    //     // cy.get(".highcharts-menu-item:nth-child(1)").click();
    //     // cy.get(".highcharts-button-pressed > .highcharts-button-box").click();
    //     // cy.get(".highcharts-menu-item:nth-child(2)").click();
    //     // cy.get('#highcharts-rwhdxwq-21 > .highcharts-root > .highcharts-exporting-group > .highcharts-no-tooltip > .highcharts-button-box').click();
    //     //     cy.get('.highcharts-contextmenu').click({force:true});
    //     //     cy.get('#highcharts-k8wa57v-21 > .highcharts-root > .highcharts-exporting-group > .highcharts-no-tooltip > .highcharts-button-symbol').click();

    //     //     cy.get('.MuiPaper-elevation0').click();
    //     // cy.get('.highcharts-button-pressed > .highcharts-button-symbol').click();
    //     // cy.get('.highcharts-menu-item:nth-child(1)').click();
    //     // cy.get('.highcharts-button-pressed > .highcharts-button-box').click();
    //     // cy.get('.highcharts-menu-item:nth-child(1)').click();
    //     // cy.get('.highcharts-button-pressed > .highcharts-button-symbol').click();
    //     // cy.get('.highcharts-menu-item:nth-child(2)').click();
    //     // cy.get('.highcharts-button-pressed > .highcharts-button-box').click();
    //     // cy.get('.highcharts-menu-item:nth-child(4)').click();

    //     //// reports overview
    //     cy.get(
    //       ".reportsOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--left > .MuiTypography-h5"
    //     ).click();
    //     cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get("#menu- > .MuiPaper-root > .MuiList-root > :nth-child(1)").click();
    //     cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get(".MuiPaper-root > .MuiList-root > :nth-child(2)").click();
    //     cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get(".MuiPaper-root > .MuiList-root > :nth-child(3)").click();
    //     cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click();
    //     cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    //     // cy.get(".MuiPaper-root > .MuiList-root > :nth-child(5)").click();
    //     cy.get('.MuiList-root > .Mui-selected').click();
    //     cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    //     cy.get(".MuiList-root > :nth-child(6)").click();

    //     /////notifications
    //     // cy.get(".notification__section > .title__wrapper > .title__wrapper--left > .MuiTypography-h5").click();
    //     cy.get(".notification__section > .title__wrapper > .title__wrapper--right > .MuiTypography-root").click();
    //     cy.get(".MuiSelect-select").click();
    //     cy.get(".MuiList-root > .Mui-selected").click();
    //     cy.get(".MuiSelect-select").click();
    //     cy.get('[data-value="2"]').click();
    //     cy.get(".MuiSelect-select").click();
    //     cy.get('[data-value="3"]').click();
    //     cy.get(".MuiSelect-select").click();
    //     cy.get('[data-value="4"]').click();
    //     cy.get(".MuiSelect-select").click();
    //     cy.get('[data-value="5"]').click();
    //     cy.get(".MuiPaper-root > .MuiInputBase-root > .MuiInputBase-input").click();
    //     cy.get(".MuiButtonBase-root > .secondaryIcon");
    //     cy.get(":nth-child(1) > .MuiTypography-div > .MuiTypography-span").click();

    //     /// //search option in notifications
    //     // cy.get('.MuiPaper-root > .MuiInputBase-root > .MuiInputBase-input').click();
    //     // cy.get('.title__wrapper--right > .MuiPaper-root').click();
    //     // cy.get('[aria-label="clear"] > .secondaryIcon').click();
    //     /// ///popup opens
    //     cy.get("#panel1bh-header > .MuiAccordionSummary-content > .MuiTypography-root").click();
    //     cy.get("#panel1bh-header > .MuiAccordionSummary-content > .MuiTypography-root").click();

    //     // panel 1
    //     cy.get("#panel2bh-header > .MuiAccordionSummary-content").click();
    //     cy.get("#panel2bh-header > .MuiAccordionSummary-content").click();

    //     /// /panel 2
    //     cy.get("#panel3bh-header > .MuiAccordionSummary-content").click();
    //     cy.get("#panel3bh-header > .MuiAccordionSummary-content").click();

    //     /// /individual test tab
    //     cy.get("#panel4bh-header > .MuiAccordionSummary-content").click();
    //     cy.get("#panel4bh-header > .MuiAccordionSummary-content").click();

    //     /// //inside individual test fields
    //     cy.get(".MuiGrid-container > :nth-child(1) > .MuiPaper-root").click();
    //     cy.get(":nth-child(1) > .MuiPaper-root > .MuiStack-root").click();
    //     cy.get(".MuiGrid-container > :nth-child(2) > .MuiPaper-root");
    //     cy.get(":nth-child(2) > .MuiPaper-root > .MuiStack-root").click();
    //     cy.get(".MuiGrid-container > :nth-child(3) > .MuiPaper-root");
    //     cy.get(":nth-child(3) > .MuiPaper-root > .MuiStack-root");
    //     cy.get(".MuiGrid-container > :nth-child(4) > .MuiPaper-root");
    //     cy.get(":nth-child(4) > .MuiPaper-root > .MuiStack-root");
    //     /// /individual tab
    //     cy.get("#orderDetails-tab-1").click();
    //     // cy.get('.MuiTabs-flexContainer > .MuiTypography-h6').click();
    //     cy.get(".close-drawer").click();

    //     /// /move to next page
    //     cy.get(":nth-child(9) > .MuiButtonBase-root").click();
    //     cy.get(":nth-child(9) > .MuiButtonBase-root").click();
    //     cy.get(":nth-child(9) > .MuiButtonBase-root").click();
    //     cy.get(".MuiPagination-ul > :nth-child(1)").click();
    //     cy.get(".MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root").click();

    //     ///privacy policy tab
    //     cy.get('.footer__wrapper > .MuiStack-root > .MuiTypography-root').click();
    //     cy.get(".MuiDialog-container").click();
    //     // cy.get("[data-testid=CloseIcon]").click();
    //     cy.get('.commonModal__wrapper--dialog > .MuiButtonBase-root > .MuiTypography-root').click();
    //     ////go back to dashboard
    //     cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').click();

    /// /add tenant in super admin
    cy.get(".content__wrapper--header > .MuiButtonBase-root").click();
    // tenant name
    cy.get("[id*=':r19:']").type("abcde");
    // font family
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > :nth-child(1) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get(".MuiList-root > .Mui-selected").click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > :nth-child(1) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="1"]').click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > :nth-child(1) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="2"]').click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > :nth-child(1) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="3"]').click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > :nth-child(1) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="4"]').click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > :nth-child(1) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="5"]').click();

    /// /select theme
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .MuiGrid-grid-lg-8 > .mt-1 > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #theme-selector"
    ).click();
    cy.get(':nth-child(2) > [style="background-color: rgb(6, 47, 110); color: rgb(6, 47, 110);"]').click();
    cy.get(':nth-child(2) > [style="background-color: rgb(35, 0, 38); color: rgb(35, 0, 38);"]').click();

    /// /SPOC Details
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > .MuiGrid-root.mb-2 > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    // firstname//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #firstName"
    )
      .type("Aadhya")
      .click();
    // middle name//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #middleName"
    ).type("sss");
    // last name//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > #lastName"
    ).type("kanes");

    // email address//
    // cy.get(':nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > #emailAddress').type("S@gmail.com").click();
    // cy.get(':nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > #emailAddress').type('type', 'Superadmin_ls@gmail.com');
    // cy.get(':nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > #emailAddress')
    // .type('Superadmin_ls@gmail.com')
    // .click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > #emailAddress"
    )
      .clear() // Optionally clear the field before typing
      .type("Superadmin_ls@gmail.com")
      .click();

    // phone no//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(5) > .w-100 > .MuiFormControl-root > .MuiInputBase-root > #phoneNumber"
    )
      .type("9807896786")
      .click();
    // home phone no//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(6) > .w-100 > .MuiFormControl-root > .MuiInputBase-root > #alternatePhoneNumber"
    )
      .type("9805673456")
      .click();
    // contract date//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(7) > .MuiGrid-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(7) > .MuiGrid-container > :nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1700245800000"]').click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(7) > .MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(7) > .MuiGrid-container > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1700850600000"]').click();
    // street address//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(8) > .MuiFormControl-root > .MuiInputBase-root > #streetAddress"
    )
      .type("Hyderabad")
      .click();

    // city/state/country//
    cy.get(".MuiDialog-root:nth-child(5) form").click();
    cy.get(".MuiDialog-root:nth-child(5) .pac-target-input:nth-child(1)").type("Hyderabad");
    cy.wait(1000);
    cy.get(".MuiDialog-root:nth-child(5) .pac-target-input:nth-child(1)").type("{downarrow}");
    cy.wait(1000);
    // Confirm the selected suggestion by typing Enter
    cy.get(".MuiDialog-root:nth-child(5) .pac-target-input:nth-child(1)").type("{enter}");
    cy.get(".MuiDialog-root:nth-child(5) .MuiDialogActions-root > .MuiButtonBase-root").click();
    // Optionally, wait for form submission (adjust the wait time as needed)
    cy.wait(5000);
    // cy.get(':nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(9) > div > .pac-target-input').type("Hyderabad").click();

    // zipcode//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(5) > :nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > #zipCode"
    )
      .type("50124")
      .click();

    /// /uploading image
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogContent-root > .formcontrol__wrapper > :nth-child(1) > .css-1e6jbaj-MuiGrid-root > .MuiTypography-div > .upload__logo--content > input"
    ).click();
    cy.wait(2000);
    /// /send request button//
    cy.get(
      ":nth-child(5) > .MuiDialog-container > .MuiPaper-root > form > .commonModal__wrapper--dialog > .MuiDialogActions-root > .MuiButtonBase-root"
    ).click();
  });
});
