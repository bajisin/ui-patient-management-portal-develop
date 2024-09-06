describe("login mechanism", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    cy.get(":nth-child(1) > .css-16txn55-MuiTableCell-root").click();

    // ØRDER DETAILS
    cy.get("#tenant-tab-1").click();

    // // ADVANCE SEARCH FILTER
    // cy.get(".ls-advance-filter").click();
    // cy.get(":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#-option-0").click();
    // // cy.get("#-option-1").click();
    // // cy.get("#-option-2").click();
    // cy.get(".MuiSelect-select").click();
    // cy.get('[data-value="2"]').click();
    // cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#permission-tags-option-0").click();
    // // cy.get("#permission-tags-option-1").click();
    // cy.get(":nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#permission-tags-option-0").click();
    // cy.get(".MuiDialogActions-root > .primary-btn").click({ force: true });
    // // cy.get("#permission-tags-option-1").click();
    // // cy.get(".MuiDialogActions-root > .primary-btn").click({ force: true });
    // // cy.get(".MuiDialogActions-root > .primary-btn").click({ force: true });

    // Cypress.on("fail", (error, runnable) => {
    //   // debugger;

    //   // we now have access to the err instance
    //   // and the mocha runnable this failed on

    //   throw error; // throw error to have test still fail
    // });

    // it('calls the "fail" callback when this test fails', () => {
    //   // when this cy.get() fails the callback
    //   // is invoked with the error
    //   cy.get(".MuiDialogActions-root > .primary-btn").click({ force: true });
    // });

    // it("is doing something very important", (done) => {
    //   // this event will automatically be unbound when this
    //   // test ends because it's attached to 'cy'
    //   cy.on("uncaught:exception", (err, runnable) => {
    //     expect(err.message).to.include(" Cannot read properties of null (reading 'length')");

    //     // using mocha's async done callback to finish
    //     // this test so we prove that an uncaught exception
    //     // was thrown
    //     done();

    //     //     // return false to prevent the error from
    //     //     // failing this test
    //     return false;
    //   });

    //   //   // assume this causes an error
    //   cy.get(".MuiDialogActions-root > .primary-btn").click({ force: true });
    //   //   cy.get(".MuiDialogActions-root > .primary-btn").click({ force: true });
    // });

    // cy.get(".ls-advance-filter").click();
    // cy.get(".clear-all").click();
    // cy.get(".ls-advance-filter").click({ force: true });
    // cy.get(".modalClose > .MuiTypography-root").click();

    // it("is doing something very important", (done) => {
    //   // this event will automatically be unbound when this
    //   // test ends because it's attached to 'cy'
    //   cy.on("uncaught:exception", (err, runnable) => {
    //     expect(err.message).to.include("Cannot read properties of null (reading 'length')");

    //     // using mocha's async done callback to finish
    //     // this test so we prove that an uncaught exception
    //     // was thrown
    //     done();

    //     // return false to prevent the error from
    //     // failing this test
    //     return false;
    //   });

    //   // assume this causes an error
    //   // cy.get('button').click()
    //   cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    // });

    // TABLE HEADERS
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1oudira-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-qcltl4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.css-y1n6dj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click();
    // cy.get('.MuiList-root > :nth-child(4) > .MuiBox-root').click();

    // // SEARCH FILTER
    cy.get("[data-testid='myTextField']").type("divya");
    // cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    it("is doing something very important", (done) => {
      // this event will automatically be unbound when this
      // test ends because it's attached to 'cy'
      cy.on("uncaught:exception", (err, runnable) => {
        expect(err.message).to.include("setStartDate is not a function");

        // using mocha's async done callback to finish
        // this test so we prove that an uncaught exception
        // was thrown
        done();

        // return false to prevent the error from
        // failing this test
        return false;
      });

      // assume this causes an error
      // cy.get('button').click()
      cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    });
    cy.get('[aria-label="Go to next page"]').click({ force: true });
    cy.get('[aria-label="Go to previous page"]').click({ force: true });

    // cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // cy.get("path").click();
    // cy.get("path").click();
    // cy.get("path").click();

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
