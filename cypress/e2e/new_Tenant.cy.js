describe("Policy Component", () => {
  it("opens the Policy popup when handleOpenForPolicy is called", () => {
    cy.visit("http://localhost:8080/dashboard");


    cy.get(".MuiButton-contained").click();
    cy.wait(30000);

    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    ).click();
    cy.get('.MuiInputBase-input').type('check');
    cy.get('.MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root').click();
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(4)").click({ force: true });
    cy.get(
      ":nth-child(3) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).uncheck();
    cy.get(
      ":nth-child(3) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).check();
    cy.get(':nth-child(4) > .css-1pc03ml > .MuiBox-root > [aria-label="Pin to left"] > [data-testid="PushPinIcon"] > path').click();
    cy.get('.MuiMenu-root > .MuiBackdrop-root').click();
    cy.get('#simple-tab-1').click();
    cy.get('#simple-tab-2').click();
    cy.get('#simple-tab-3').click();
    cy.get('#simple-tab-0').click();

    // advance search

    // cy.get(
    //   ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    // ).click();
    // cy.get('.ls-advance-filter').click();
    // cy.get('.MuiSelect-select').click()

    // cy.get('[data-value="4"]').click();
    // cy.get('.MuiDialogActions-root > .primary-btn').click();


    // add tenent

    // cy.get(
    //   ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    // ).click();
    // cy.get('.MuiDialogActions-root > .primary-btn').click();
    // cy.get(".MuiTypography-div > .MuiButtonBase-root").click();
    // // cy.visit("http://localhost:8080/tenant-config");
    cy.get(".MuiTypography-div > .MuiButtonBase-root").click();
    cy.get('input[name="tenantName"]').type("pavan");
    cy.get(":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select").click();
    cy.get(".MuiList-root > .Mui-selected").click();
    cy.get('div[id="theme-selector"]').click();
    cy.get('.MuiPaper-root > .MuiList-root > :nth-child(2)').click()
    cy.get(".MuiGrid-root.mb-2").click();
    cy.get("#firstName").clear("pavan");
    cy.get("#firstName").type("pavan");
    cy.get("#lastName").clear("k");
    cy.get("#lastName").type("kumar");
    cy.get("#emailAddress").clear("k");
    cy.get("#emailAddress").type("kkr@gamil.com");
    cy.get("#phoneNumber").clear("7");
    cy.get("#phoneNumber").type("7890234320");
    cy.get("#alternatePhoneNumber").clear("3");
    cy.get("#alternatePhoneNumber").type("3456780958");
    // cy.get(
    //   ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();
    // cy.get('[data-timestamp="1719513000000"]').click();
    // cy.get(
    //   ":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    // ).click();
    // cy.get('[aria-rowindex="6"] > .MuiButtonBase-root').click()
    cy.get('#react-select-2-input').type('americ');
    cy.get('#react-select-2-option-1').click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get("#zipCode").type("52345");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

  });




  /* ==== Test Created with Cypress Studio ==== */
  // it('advancefilter', function () {
  //   /* ==== Generated with Cypress Studio ==== */
  //   cy.visit('http://localhost:8080');
  //   cy.get('.MuiButton-contained').click().wait(30000);
  //   cy.get('.icons-separted > .MuiTypography-root').click();
  //   cy.get('body').click();
  //   cy.get('[data-value="2"]').click();
  //   cy.get('.primary-btn').click();
  //   cy.get('body').click();
  //   cy.get('[data-value="3"]').click();
  //   cy.get('.primary-btn').click();
  //   cy.get('body').click();
  //   cy.get('[data-value="4"]').click();
  //   cy.get('.primary-btn').click();
  //   cy.get('body').click();
  //   cy.get('[data-value="5"]').click();
  //   cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
  //   cy.get('[data-timestamp="1721327400000"]').click();
  //   cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root').click();
  //   cy.get('[data-timestamp="1721932200000"]').click();
  //   cy.get('[aria-rowindex="4"] > .Mui-selected').click();
  //   cy.get('.primary-btn').click();
  //   cy.get('.clear-all').click();
  //   cy.get('#simple-popover > .MuiBackdrop-root').click();
  //   /* ==== End Cypress Studio ==== */
  // });
});
