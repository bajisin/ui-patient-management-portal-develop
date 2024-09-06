describe("login mechanism", () => {
  beforeEach(() => {
    cy.Login();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.visit("http://localhost:8080/master-data");
    cy.get(".MuiPaper-root:nth-child(1) .MuiListItem-root:nth-child(3) .MuiTypography-root").click();
    cy.visit("http://localhost:8080/master-data");
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("life");
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    cy.visit("http://localhost:8080/master-data");
    cy.get('[data-testid="ViewColumnIcon"] > path').click({ force: true });
    cy.get(".css-1crctjg > :nth-child(1)").click("");
    cy.get(".css-1crctjg > :nth-child(3)").click("");
    cy.get(".css-1crctjg > :nth-child(2)").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click();
    cy.get("[data-testid=KeyboardArrowRightIcon]").click({ force: true });
    cy.get("[data-testid=KeyboardArrowLeftIcon]").click();
    cy.get(
      '.css-g65iko-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    // cy.get('[tabindex="0"] > .MuiBox-root').click();
    // cy.get(
    //   '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    // ).click();
    // cy.get(".MuiMenuItem-divider").click();
    // cy.get(
    //   '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    // ).click();
    // cy.get(".MuiPaper-root > .MuiList-root > :nth-child(5)").click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    // cy.get(".Mui-focusVisible > .MuiBox-root").click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    // cy.get(":nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    // cy.get('[tabindex="0"] > .MuiBox-root').click({ multiple: true });
    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get(
    //   ".css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    // ).click({ force: true });
    // cy.get(":nth-child(5) > .MuiBox-root").click();

    // when clicking on a record in table redirects to the in-detail section
    cy.get(":nth-child(1) > .css-16txn55-MuiTableCell-root > span").click({ force: true });
    cy.get(
      '[d="M240.941 0h542.118c133.068 0 240.941 107.873 240.941 240.941v542.118c0 133.068-107.873 240.941-240.941 240.941h-542.118c-133.068 0-240.941-107.873-240.941-240.941v-542.118c0-133.068 107.873-240.941 240.941-240.941z"]'
    ).click();
    // cy.get("[id*=':r91:']").type("lifescan");
    cy.get(".ql-editor").clear().type("lifescanslabs");
    cy.get(".ql-bold").click();
    cy.get(".ql-italic").click();
    cy.get(".ql-underline").click();
    cy.get(".ql-strike").click();
    cy.get('[value="ordered"]').click();
    cy.get('[value="bullet"]').click();
    cy.get('[value="-1"]').click();
    cy.get('[value="+1"]').click();
    cy.get(".ql-link").click();
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();

    // FAQ...
    cy.get("#masterTenant-tab-1").click({ force: true });
    cy.get(".MuiButton-text").click();
    // cy.get("[id*=':r99:']").type("lifescanlabs");
    cy.get(":nth-child(2) > .MuiTypography-div > .quill > .ql-container > .ql-editor").type("patients");
    cy.get(":nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-bold").click();
    cy.get(":nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-italic").click();
    cy.get(":nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-underline").click();
    cy.get(":nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-strike").click();
    cy.get(':nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(2) > [value="ordered"]').click();
    cy.get(':nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(2) > [value="bullet"]').click();
    cy.get(':nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(3) > [value="-1"]').click();
    cy.get(':nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(3) > [value="+1"]').click();
    cy.get(":nth-child(2) > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(4) > .ql-link").click();
    cy.get(".MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    // Adding New FAQ in FAQ
    cy.get(".MuiButton-outlined").click({ force: true });

    // add new starting field...
    // // cy.get("[id*=':rdj:']").type("patients");
    cy.get(".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-container > .ql-editor").type(
      "superadmin"
    );
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-bold"
    ).click();

    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-italic"
    ).click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-underline"
    ).click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(1) > .ql-strike"
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(2) > [value="ordered"]'
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(2) > [value="bullet"]'
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(3) > [value="-1"]'
    ).click();
    cy.get(
      '.MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(3) > [value="+1"]'
    ).click();
    cy.get(
      ".MuiDialogContent-root > .mt-1 > .MuiTypography-div > .quill > .ql-toolbar > :nth-child(4) > .ql-link"
    ).click();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButtonBase-root").click();
    cy.get(".MuiButton-outlined").click();
    cy.get("[data-testid=CloseIcon]").click();

    // privacy
    cy.get("#masterTenant-tab-2").click({ force: true });
    // EDIT ICON...
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();

    // // cy.get("[id*=':r97:']").type("lifescan");
    cy.get(".ql-editor").type("labs-patient");
    cy.get(".ql-bold").click();
    cy.get(".ql-italic").click();
    cy.get(".ql-underline").click();
    cy.get(".ql-strike").click();
    cy.get('[value="ordered"]').click();
    cy.get('[value="bullet"]').click();
    cy.get('[value="-1"]').click();
    cy.get('[value="+1"]').click();
    cy.get(".ql-link").click();
    cy.get(".MuiStack-root > .MuiButtonBase-root");
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();

    //  TERMS & CONDITION...
    cy.get("#masterTenant-tab-3").click({ force: true });
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(15000);
    cy.get(".MuiDialogContent-root > .MuiButton-text").click({ force: true });
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
    cy.get("[data-testid=CloseIcon]").click();
  });
});
