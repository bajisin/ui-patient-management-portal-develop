describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(1) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click({ force: true });

    //  ACTIVITY OVERVIEW MONTH-DATE
    cy.get(
      ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="1"]').click();
    cy.get(
      ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="2"]').click();
    cy.get(
      ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="3"]').click();
    cy.get(
      ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="4"]').click();
    cy.get(
      ".activityOverview__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="5"]').click();
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1672597800000"]').click();
    cy.get(
      ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > [data-testid="CalendarIcon"]'
    ).click({ force: true });
    cy.get('[data-timestamp="1701714600000"]').click();

    // // ORDER STATUS MONTH-DATE
    cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();
    cy.get('[data-value="1"]').click();
    cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();

    cy.get('[data-value="2"]').click();
    cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();

    cy.get('[data-value="3"]').click();
    cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();

    cy.get('[data-value="4"]').click();
    cy.get(".title__wrapper--left > .MuiInputBase-root > .MuiSelect-select").click();

    cy.get('[data-value="5"]').click();
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1672597800000"]').click();
    cy.get(
      ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > [data-testid="CalendarIcon"]'
    ).click({ force: true });
    cy.get('[data-timestamp="1701714600000"]').click();

    // CLIENT SNAPSHOTS MONTH-DATE
    cy.get(
      ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="1"]').click();
    cy.get(
      ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="2"]').click();
    cy.get(
      ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="3"]').click();
    cy.get(
      ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="4"]').click();
    cy.get(
      ".tenantSnapshots__wrapper > .basic__card > .title__wrapper > .title__wrapper--right > .MuiInputBase-root > .MuiSelect-select"
    ).click();
    cy.get('[data-value="5"]').click();
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1672597800000"]').click();

    cy.get(
      ":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1701714600000"]').click();

    // cy.get('#highcharts-sfxv0pr-22 > .highcharts-root > .highcharts-exporting-group > .highcharts-no-tooltip > .highcharts-button-box').click();

    // NOTIFICATIONS
    cy.get(".notification__section > .title__wrapper > .title__wrapper--right > .MuiTypography-root").click();

    // MONTH-DATE
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="1"]').click();
    cy.get(".MuiSelect-select").click();

    cy.get('[data-value="2"]').click();
    cy.get(".MuiSelect-select").click();

    cy.get('[data-value="3"]').click();
    cy.get(".MuiSelect-select").click();

    cy.get('[data-value="4"]').click();
    cy.get(".MuiSelect-select").click();

    cy.get('[data-value="5"]').click();
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1672597800000"]').click();

    cy.get(
      ":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1701714600000"]').click();
    // cy.get(":nth-child(1) > .MuiTypography-div > .MuiTypography-span").click();
    // cy.get(".profileData > .MuiStack-root > :nth-child(2)").click();
    // cy.get("#panel1bh-header").click();
    // cy.get("#panel2bh-header").click();
    // cy.get("#panel3bh-header").click();
    // cy.get("#panel4bh-header > .MuiAccordionSummary-content").click();
    // cy.get(":nth-child(2) > .MuiPaper-root > .MuiStack-root").click();
    // cy.get(":nth-child(3) > .MuiPaper-root > .MuiStack-root").click();
    // cy.get(":nth-child(4) > .MuiPaper-root > .MuiStack-root").click();

    // //  INSURANCE DETAILS
    // cy.get("#orderDetails-tab-1").click();
    // // TEST DATE
    // cy.get(".MuiTabs-flexContainer > .MuiTypography-h6").click();
    // cy.get("[data-testid=CloseIcon]").click();

    // cy.get(":nth-child(9) > .MuiButtonBase-root").click();
    // cy.get(':nth-child(1) > .MuiButtonBase-root').click({multiple:true});
    // cy.get(':nth-child(3) > .MuiButtonBase-root').click({force:true});

    // <DASHBOARD
    cy.get(".MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root").click();

    // REPORTS-OVERVIEW MONTH-DATE
    cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(2)").click({ force: true });
    cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(3)").click({ force: true });
    cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click({ force: true });
    cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click({ force: true });
    // cy.get(".MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    // cy.get(".MuiPaper-root > .MuiList-root > :nth-child(1)").click({ force: true });

    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root"
    ).click();

    // CREATE ORDER
    cy.get(".content__wrapper--header > .MuiButtonBase-root").click({ force: true });
  });
});
