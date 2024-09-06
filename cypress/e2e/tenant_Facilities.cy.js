describe("login mechanism", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    // start from dashboard clicking on lab management!!
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(3) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(3) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(1) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();

    // list search here..
    // cy.get("input[type='text']").type("life");
    // cy.get(".icons-separted > .MuiPaper-root").click();
    // cy.get(".page__wrapper").click();
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get('[aria-label="Go to next page"]').click({ force: true });
    // cy.get('[aria-label="Go to previous page"]').click({ force: true });

    //  Add New Facility starts here
    // cy.get(".MuiTypography-div > .MuiButtonBase-root").click();
    // cy.get("[id*=':r65:']").click({ force: true }).type("9100832632");

    // cy.get("#facilityName").type("super admin");
    // cy.get("#management-group").click();
    // cy.get("#management-group-option-0").click();
    // cy.get(
    //   ".MuiGrid-grid-sm-12.ps-0 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #permission-tags"
    // ).click();
    // cy.get("#permission-tags-option-0").click({ force: true });
    // cy.get(
    //   ":nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #permission-tags"
    // ).click();
    // cy.get("#permission-tags-option-5").click();
    // cy.get(
    //   ".MuiGrid-grid-sm-6.common_checkbox_selection > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click();
    // cy.get("#lab-days-tags-option-0").click({ force: true });
    // cy.get("#lab-days-tags-option-1").click({ force: true });
    // cy.get("#lab-days-tags-option-2").click({ force: true });
    // cy.get(".mt-0 > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("[id*=]:r69:-option-0").click();
    // cy.get("[id*=':r2j:']").click({ force: true }).type("hyderabad");
    // cy.get("[id*=':r67:']").click({ force: true }).type("tenantadmin_Is@gmail.com");
    // cy.get('[id=":rr:"]').click({ force: true }).type("hyderabad");
    // cy.get('[id*=":rv:"]').click({ force: true }).type("admin@gmail.com");
    // cy.get("[id*=':r11:']").click();
    // cy.get("[id*=':r11:-option-6']").click({ force: true });
    // cy.get(".switch > .MuiTypography-root").click();
    // cy.get(".switch > .MuiTypography-root").click();
    // cy.get(".MuiButton-root:nth-child(1)").click();
    // cy.get("form").submit();
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click({ force: true });
    // cy.get(".success_modal > .MuiButtonBase-root").click();

    // Advance search filter comes here
    // cy.get(".advance__filter-wrapper").click();
    // cy.get(
    //   ":nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #permission-tags"
    // ).click();
    // cy.get("#permission-tags-option-0").click();
    // cy.get("#permission-tags-option-1").click();
    // cy.get(
    //   ":nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #permission-tags"
    // ).click({ force: true });
    // cy.get("#permission-tags-option-0").click();
    // cy.get("#permission-tags-option-1").click();
    // cy.get("#permission-tags-option-2").click();
    // cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root");
    // cy.get(":nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    // cy.get("#permission-tags").click({ force: true });

    // cy.get("#permission-tags-option-1").click({ force: true });
    // cy.get(".MuiDialogActions-root > .primary-btn").click();
    // cy.get(".advance__filter-wrapper").click();
    // cy.get(".clear-all").click();
    // cy.get('[data-testid="CloseIcon"]').click();

    // Search filter....
    // cy.get(".MuiInputBase-input");
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();

    // table header starts here...
    cy.get(".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions").click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions").click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(".css-1k5p02c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions").click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      ".css-1k10ai5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      ".css-1k10ai5-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-ihbl14-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-ihbl14-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(2)").click();
    cy.get(
      ".css-ihbl14-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-15fivvh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-15fivvh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-15fivvh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-15fivvh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1lkttq7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1lkttq7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ck7fy2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();

    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper"
    ).click({ force: true });
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(3) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(4) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(5) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(6) .PrivateSwitchBase-input").click();
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(7) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(8) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(9) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButtonBase-root:nth-child(10) .PrivateSwitchBase-input").click({ force: true });
    cy.get(".MuiButton-root:nth-child(1)").click();
    cy.get(".MuiButton-root:nth-child(3)").click();
    cy.get(".MuiButton-text:nth-child(2)").click();
    cy.get(".css-1ag9q10").click({ force: true });
    cy.get("[data-testid=KeyboardArrowRightIcon]").click({ force: true });
    cy.visit("http://localhost:8080/facilities");
    cy.get('[aria-label="Go to next page"]').click({ force: true });
    cy.get('[aria-label="Go to previous page"]').click({ force: true });

    // Grid view section
    // cy.get("[data-testid=GridViewIcon]").click();

    // cy.get(":nth-child(1) > .MuiPaper-root > :nth-child(3) > .MuiButtonBase-root > .primaryIcon").click({
    //   force: true
    // });
    // cy.get("#facilityName");
    // cy.get("#facilityName").type("lifescans");

    // cy.get("#management-group");
    // cy.get(".commonModal__wrapper--dialog").click();
    // cy.get(":nth-child(2) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root");
    // cy.get("#management-group");
    // cy.get(
    //   ".MuiGrid-grid-sm-12.ps-0 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #permission-tags"
    // ).click();
    // cy.get("#permission-tags-option-1").click();
    // cy.get(
    //   ":nth-child(4) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #permission-tags"
    // ).click();
    // cy.get("#permission-tags-option-0").click();
    // cy.get(
    //   ".MuiGrid-grid-sm-6.common_checkbox_selection > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    // ).click();
    // cy.get("#lab-days-tags-option-0").click();
    // cy.get("#lab-days-tags-option-1").click();
    // cy.get('[id="\\:rr\\:"]').click({ force: true }).type("usa");
    // cy.get(".formcontrol__wrapper").click({ force: true });
    // cy.get('[id=":rt:"]').click({ force: true }).clear().type("9100832632");
    // cy.get('[id=":rv:"]').click({ force: true }).clear().type("superadmin_Is@gmail.com");
    // cy.get(".mt-0 > .MuiGrid-root > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root");
    // cy.get('[id*=":r11:"]').click();
    // cy.get('[id=":r11:-option-0"]').click();
    // cy.get(".switch > .MuiTypography-root").click();
    // cy.get(".switch > .MuiTypography-root").click();
    // cy.get("#management-group").click();
    // cy.get("#management-group-option-0").click();
    // cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    // cy.get(".success_modal > .MuiButtonBase-root").click();

    // search for grid view section
    // cy.get("input[type='text']").type("lifescan");
    // cy.get(".icons-separted > .MuiPaper-root").click();
    // cy.get(".page__wrapper").click();
    // cy.get(".MuiButtonBase-root > .secondaryIcon").click();
  });
});
