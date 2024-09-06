describe("login mechanism", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(":nth-child(1) > .css-16txn55-MuiTableCell-root").click();

    // #EDIT
    cy.get(".MuiButton-text").click();
    cy.get("[placeholder='Enter Tenant Name']").type("life");
    cy.get(".MuiSelect-select").click();
    cy.get(".MuiList-root > .Mui-selected").click();
    cy.get(".MuiFormGroup-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("[placeholder='Enter First Name']").clear().type("sai");
    cy.get("[placeholder='Enter Middle Name']").clear().type("krishna");
    cy.get("[placeholder='Enter Last Name']").clear().type("veeragoni");
    cy.get("[placeholder='Enter Email Address']").clear().type("superadmin_Is@gmail.com");
    cy.get("[placeholder='Enter Phone Number']").clear().type("9441761835");
    cy.get("[placeholder='Enter Home Phone Number']").clear().type("9100832632");
    cy.get("[placeholder='Enter Street Address']").clear().type("usa");
    // cy.get("[placeholder='Enter a location']").type("");
    cy.get("[placeholder='Enter Zip Code']").clear().type("21342");
    cy.get(
      ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1691433000000"]').click();
    cy.get(
      ":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root"
    ).click();
    cy.get('[data-timestamp="1698690600000"]').click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    Cypress.on("uncaught:exception", (_err, runnable, promise) => {
      if (promise) {
        return false;
      }
    });
    cy.get(".success_modal > .MuiButtonBase-root").click();

    // // ADD TENAT ADMIN
    // cy.get(".MuiButton-contained").click();
    // cy.get("[placeholder='Enter First Name']").type("sai");
    // cy.get("[placeholder='Enter Middle Name']").type("krishna");
    // cy.get("[placeholder='Enter Last Name']").type("veeragoni");
    // cy.get("[placeholder='Enter Street Address']").type("usa");
    // // cy.get("[placeholder='Enter a location']").type("usa river");
    // cy.get(".pac-target-input").type("Hyderabad, Telangana, India", { force: true });
    // cy.get(".pac-item").first().click({ force: true }); // Select the first suggestion
    // Cypress.on("uncaught:exception", (err, runnable) => {
    //   // we expect a 3rd party library error with message 'list not defined'
    //   // and don't want to fail the test so we return false
    //   if (err.message.includes("place_id")) {
    //     return false;
    //   }
    //   // we still want to ensure there are no other unexpected
    //   // errors, so we let them fail the test
    // });
    // cy.get("[placeholder='Enter Zip Code']").type("37812");
    // cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get('[data-timestamp="1701541800000"]').click();
    // cy.get("[placeholder='Enter Email Address']").type("tenantadmin_Is@gmail.com");
    // cy.get("[placeholder='Enter Phone Number']").type("9100832632");
    // cy.get("[placeholder='Enter Home Phone Number']").type("9441761835");
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // TOGGLE SWITCH ON/OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".PrivateSwitchBase-input").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".PrivateSwitchBase-input").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // ADVANCE SEARCH FILTER
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    // cy.get("#-option-1").click();
    // cy.get("#-option-2").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    // ADVANCE-CLEAR
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // ADVANCE OPEN-CLOSE
    cy.get(".ls-advance-filter").click();
    cy.get(".modalClose > .MuiTypography-root").click();

    // SEARCH
    cy.get("[data-testid='myTextField']").type("tests");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // TABLE HEADERS
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click({ force: true });

    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    // cy.get('.MuiMenuItem-divider > .MuiBox-root').click({force:true});

    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

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
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click();
    cy.get(".MuiBox-root > .Mui-disabled").click({ force: true });
    cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    cy.get(".MuiButton-text:nth-child(2)").click({ force: true });

    // TENANT ADMIN
    cy.get("#child-tab-1").click({ force: true });

    // #ADVANCE SEARCH FILTER
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    // cy.get("#-option-0").click();
    // cy.get("#-option-1").click();
    // cy.get("#-option-2").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    // ADVANCE-CLEAR
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // ADVANCE OPEN-CLOSE
    cy.get(".ls-advance-filter").click();
    cy.get(".modalClose > .MuiTypography-root").click();

    // SEARCH
    cy.get("[data-testid='myTextField']").type("tests");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    // SHOW/HIDE COLUMNS
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
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
    cy.get(".MuiBox-root > .Mui-disabled").click({ force: true });
    cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    cy.get(".MuiButton-text:nth-child(2)").click({ force: true });

    // Client Admin
    cy.get("#child-tab-2").click({ force: true });

    // #ADVANCE SEARCH FILTER
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    // ADVANCE-CLEAR
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // ADVANCE OPEN-CLOSE
    cy.get(".ls-advance-filter").click();
    cy.get(".modalClose > .MuiTypography-root").click();

    // SEARCH
    cy.get("[data-testid='myTextField']").type("tests");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // TABLE HEADERS
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    // SHOW/HIDE COLUMNS
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
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
    cy.get(".MuiBox-root > .Mui-disabled").click({ force: true });
    cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    cy.get(".MuiButton-text:nth-child(2)").click({ force: true });

    // PROVIDERS
    cy.get("#child-tab-3").click({ force: true });

    // #ADVANCE SEARCH FILTER
    cy.get(".ls-advance-filter").click();
    cy.get(".MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".MuiDialogActions-root > .primary-btn").click();

    // ADVANCE-CLEAR
    cy.get(".ls-advance-filter").click();
    cy.get(".clear-all").click();

    // ADVANCE OPEN-CLOSE
    cy.get(".ls-advance-filter").click();
    cy.get(".modalClose > .MuiTypography-root").click();

    // SEARCH
    cy.get("[data-testid='myTextField']").type("tests");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // TABLE HEADERS
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click();
    // cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // SHOW/HIDE COLUMNS
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
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
    cy.get(".MuiBox-root > .Mui-disabled").click({ force: true });
    cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    cy.get(".MuiButton-text:nth-child(2)").click({ force: true });
  });
});
