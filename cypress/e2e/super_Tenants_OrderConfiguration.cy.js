describe("login mechanism", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    // cy.get(
    //   ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    // ).click();
    // cy.get(":nth-child(1) > .css-16txn55-MuiTableCell-root").click();

    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(":nth-child(1) > .css-16txn55-MuiTableCell-root").click();

    // ORDER CONFIGURATION
    cy.get("#tenant-tab-2").click();

    // SEARCH
    cy.get('[data-testid="myTextField"]').type("121");
    // cy.get('.MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root').click();
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

    // TABLE HEADERS
    cy.get(
      ".css-1e0kqzl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1e0kqzl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1e0kqzl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-1nghs1y-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1nghs1y-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1nghs1y-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-30c6tw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-30c6tw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-30c6tw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // ON/OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // CANCEL
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiButton-outlined").click();

    // SHOW/HIDE COLUMNS
    cy.get("[data-testid=ViewColumnIcon]").click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    // cy.get('.MuiBox-root > .Mui-disabled').click();
    cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    cy.get(".MuiButton-text:nth-child(2)").click();

    // TEST LIST
    cy.get("#orderConfig-tab-1").click({ force: true });

    // SEARCH
    cy.get('[data-testid="myTextField"]').type("blood");
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

    // TABLE HEADERS
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    // ON/OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // OFF
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // CANCEL
    cy.get(".switch > .MuiTypography-root").click();
    cy.get(".MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(".MuiButton-outlined").click();

    // SHOW/HIDE COLUMNS
    cy.get("[data-testid=ViewColumnIcon]").click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    // cy.get('.MuiBox-root > .Mui-disabled').click();
    cy.get(".MuiButton-root:nth-child(3)").click({ force: true });
    cy.get(".MuiButton-text:nth-child(2)").click();
  });
});
