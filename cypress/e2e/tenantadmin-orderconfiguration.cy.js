describe("template spec", () => {
  beforeEach(() => {
    cy.LoginTenant();
  });
  it("logs into login.microsoftonline through a user web app", () => {
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiList-root > :nth-child(4) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    /// tabs
    cy.get(".panel_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".content__wrapper").click();

    cy.get(
      '.panel_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"] > path'
    ).click();

    /// /select option in dropdown of panel test
    cy.get("#panelIndividualTest-option-0").should("be.visible").click();
    cy.get("#panelIndividualTest-option-1").should("be.visible").click();

    /// //individual tests
    cy.get(".individual_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".individual_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").type(
      "cand"
    );
    cy.get("#panelIndividualTest-option-0").click();
    cy.get(".title__wrapper").click();
    // cy.get(".MuiAutocomplete-popupIndicatorOpen path").click();
    // cy.get('.MuiCheckbox-colorPrimary > .PrivateSwitchBase-input').click();
    // cy.get('#panelIndividualTest-option-0').should("be.visible").click();

    cy.get(".title__wrapper").click();

    /// ///create order template button
    cy.get(".title__wrapper--right > .MuiButtonBase-root").click();

    /// //create order template
    /// /template name
    cy.get('[placeholder="Template Name"]').type("12121");

    /// /confirm button
    cy.get(".MuiDialogActions-root > .MuiButton-contained").click({ force: true });
    // cy.get(".MuiDialogActions-root > .MuiButton-contained").click({force:true});
    // cy.get('.MuiDialogActions-root > .MuiButton-contained').click();

    /// /okay success
    cy.get(".success_modal > .MuiButtonBase-root").click();
    // cy.get(".MuiDialogActions-root > .MuiButton-outlined").click(); /// //back button
    // cy.get('.MuiDialogActions-root > .MuiButton-contained').click();   ////confirm  button   ->not working

    /// ///create order template button for backbutton

    /// /select option in dropdown of panel test
    cy.get(".panel_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".content__wrapper").click();

    cy.get(
      '.panel_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"] > path'
    ).click();
    cy.get("#panelIndividualTest-option-0").should("be.visible").click();
    cy.get("#panelIndividualTest-option-1").should("be.visible").click();

    /// //individual tests
    cy.get(".individual_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".individual_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").type(
      "cand"
    );
    cy.get("#panelIndividualTest-option-0").click();
    cy.get(".title__wrapper").click();

    cy.get(".title__wrapper--right > .MuiButtonBase-root").click();
    cy.get('[placeholder="Template Name"]').type("12121");
    cy.get(".MuiDialogActions-root > .MuiButton-outlined").click(); /// //back button

    /// //tab-2 test list
    cy.get("#orderConfig-1").click();
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("T-Uptake");
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get('[aria-label="clear"] > .secondaryIcon > path').click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// /delete icon in actions
    cy.get(":nth-child(1) > .css-imq00f-MuiTableCell-root > .MuiButtonBase-root > img").click();
    /// /yes agree check box
    cy.get(".success_modal > .MuiTypography-div > .MuiTypography-root").click();
    /// /cancel
    cy.get(".modal-buttons-wrapper > .primary-outline-btn").click();

    /// //delete the value
    cy.get(":nth-child(1) > .css-imq00f-MuiTableCell-root > .MuiButtonBase-root > img").click();

    /// /yes agree check box
    // cy.get(".success_modal > .MuiTypography-div > .MuiTypography-root").click();
    // cy.get(":nth-child(1) > .css-imq00f-MuiTableCell-root > .MuiButtonBase-root > img").click();
    cy.get(".PrivateSwitchBase-input").click();
    cy.get(".modal-buttons-wrapper > .primary-btn").click();

    /// /okay success popup
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    // cy.get(".PrivateSwitchBase-input").click();

    /// //go to next page
    cy.get('[aria-label="Go to next page"]').click();
    /// //previous page
    cy.get('[aria-label="Go to previous page"]').click();

    /// /hide and show all
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    /// ///test name
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //test type
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// ///panel name
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(5) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// ///Actions
    cy.get(":nth-child(6) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(6) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// ///popups hide and ascending order
    /// /test name
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    // cy.get(':nth-child(5) > .MuiPaper-root > .MuiList-root > :nth-child(4) > .MuiBox-root').click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// /test type
    cy.get(
      ".css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    // cy.get(':nth-child(5) > .MuiPaper-root > .MuiList-root > :nth-child(4) > .MuiBox-root').click();

    /// //panel name
    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// //test list -->internal tabs   -->panel tests
    cy.get("#config-child-tab-1").click();
    /// ///internal tab(test list) -->individual tests
    // cy.get("#orderConfig-1").click();
    // /// /search
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("Vancomycin");
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();
    // cy.get('[aria-label="clear"] > .secondaryIcon > path').click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    /// //go to next page
    cy.get('[aria-label="Go to next page"]').click();
    /// //previous page
    cy.get('[aria-label="Go to previous page"]').click();

    /// /hide and show all
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    /// ///test name
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// //panel name
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(4) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();

    /// //popups
    /// /test name
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    // cy.get(':nth-child(5) > .MuiPaper-root > .MuiList-root > :nth-child(4) > .MuiBox-root').click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();

    /// //panel test
    cy.get(".css-1vo6kym-MuiButtonBase-root-MuiIconButton-root").click({ force: true });
    // cy.get('.css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root').click({force:true});
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      ".css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    /// ///internal tab(test list) -->individual tests
    cy.get("#config-child-tab-2").click();
    // cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    /// /test name
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    cy.get(":nth-child(3) > .MuiBox-root > .MuiFormControlLabel-root > .MuiTypography-root").click();
    /// /popups
    cy.get(".css-1vo6kym-MuiButtonBase-root-MuiIconButton-root").click({ force: true });
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(".css-1vo6kym-MuiButtonBase-root-MuiIconButton-root").click({ force: true });
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(".css-1vo6kym-MuiButtonBase-root-MuiIconButton-root").click({ force: true });
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    /// //go to next page
    cy.get('[aria-label="Go to next page"]').click();
    /// /previous page
    cy.get('[aria-label="Go to previous page"]').click();
    // /// //search
    cy.get(".content__wrapper").click();
    cy.get(".MuiInputBase-input").click();
    cy.get(".MuiInputBase-input").type("Vancomycin");
    cy.get(".MuiButtonBase-root > .secondaryIcon").click();

    //  /////go to next page
    //  cy.get('[aria-label="Go to next page"]').click();
    //  /////previous page
    //  cy.get('[aria-label="Go to previous page"]').click();

    /// ///////top internal tab --order template
    cy.get("#orderConfig-2").click();
    /// /clicking record
    cy.get(".MuiGrid-container > :nth-child(1) > .MuiButtonBase-root").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click(); /// //edit button
    /// tabs
    cy.get(".panel_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".content__wrapper").click();

    cy.get(
      '.panel_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"] > path'
    ).click();

    /// /select option in dropdown of panel test
    cy.get("#panelIndividualTest-option-0").should("be.visible").click();
    cy.get("#panelIndividualTest-option-1").should("be.visible").click();

    /// //individual tests
    cy.get(".individual_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(".individual_test > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").type(
      "cand"
    );
    cy.get("#panelIndividualTest-option-0").click();
    cy.get(".title__wrapper").click();

    /// /edit order template
    cy.get(".title__wrapper--right > .MuiButtonBase-root").click();

    // /// /close popup
    cy.get(".modalClose > .MuiTypography-root").click();

    // // /// /next page
    // // cy.get('.MuiTablePagination-actions > [tabindex="0"]').click();
    // // cy.get('[aria-label="Go to next page"]').click();

    // // /// /previous page
    // // cy.get('[aria-label="Go to previous page"]').click();

    // // /// //search in order -configuration internal tab -order template
    // // cy.get(".title__wrapper--right > .MuiPaper-root").click();
    // // cy.get(".content__wrapper").click();
    // // cy.get(".css-yz9k0d-MuiInputBase-input").click();
    // // cy.get(".css-yz9k0d-MuiInputBase-input").type("code");
    // // cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();

    // /// /clicking on record tab opens
    // // cy.get(".MuiGrid-root > .MuiButtonBase-root").click();
    // cy.get(".MuiGrid-container > :nth-child(1) > .MuiButtonBase-root").click();
    // cy.get(".modalClose > .MuiTypography-root").click();

    /// create panel
    /// create-panel    --inprogress
    cy.get(".MuiButton-outlined").click();
    cy.get('[placeholder="Test Name"]').type("John Doe");
    // cy.get('[placeholder="Panels"]').type("1212");

    /// /select tests
    cy.get(
      ".select_test > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    // cy.get('.select_test > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment').click();
    // cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#panelIndividualTest").click({ force: true });
    cy.get("#panelIndividualTest-option-0").click();
    // cy.get(".MuiAutocomplete-endAdornment").click();
    // cy.get(".MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get(
      ".select_test > :nth-child(2) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
    ).click();
    // cy.get("#panelIndividualTest").click();
    // cy.get(".MuiAutocomplete-endAdornment").click();
    cy.get("#panelIndividualTest-option-0").click();
    cy.get("#panelIndividualTest-option-1").click();
    cy.get("#panelIndividualTest-option-2").click();
    /// /cpt codes
    cy.get('[placeholder="CPT Code"]').type("12345");

    // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();     ////buttonfunctionality not working
    cy.get(".modalClose > .MuiTypography-root").click();
    // // next page
    // cy.get('.MuiTablePagination-actions > [tabindex="0"]').click();

    /// //create test
    // cy.get(".MuiButton-contained").click();
    cy.get(".MuiTypography-body1 > .MuiButton-contained").click();
    cy.get(".MuiToggleButtonGroup-root > .Mui-selected").click();
    cy.get(".drag-drop-title").click();
    cy.get(".drag-drop-title > .MuiTypography-root").click();
    cy.wait(100);
    cy.get(".MuiDialogContent-root > .MuiButton-root").click();

    /// //manual uplaod
    cy.get(".toggle__buttons--left").click();
    /// /add test compendium uploading all the details manually
    cy.get("[placeholder='Test Name']").type("sssss");
    cy.get("[placeholder='Code']").type("aaaaa");
    cy.get("[placeholder='15 mo Value']").type("1221");
    cy.get("[placeholder='Lab Corp Send Out']").type("1221");
    cy.get("[placeholder='Lab Corp Alias']").type("1221");
    /// /specimen type
    cy.get(":nth-child(6) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#-option-0").click();
    // cy.get('#-option-1').click();
    /// /container type
    cy.get(":nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-0").click();

    // cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();     ////buttonfunctionality not working
    // cy.get('.modalClose > .MuiTypography-root').click()
    // next page
    // cy.get('.MuiTablePagination-actions > [tabindex="0"]').click();

    /// /description
    // cy.get(":nth-child(8) > .MuiFormControl-root > .MuiInputBase-root").click();
    /// /description
    cy.get(":nth-child(8) > .MuiFormControl-root > .MuiInputBase-root").click();

    /// /preferred container type
    cy.get(":nth-child(9) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-1").click();

    /// /description
    cy.get(":nth-child(10) > .MuiFormControl-root > .MuiInputBase-root").click();

    /// /orderable type
    cy.get(":nth-child(11) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-1").click();

    /// //performing dept
    cy.get(":nth-child(12) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-3").click();

    /// //work group
    cy.get(":nth-child(13) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-0").click();

    /// //instrument type
    cy.get(":nth-child(14) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root").click();
    cy.get("#container-tags-option-2").click();

    /// tat
    cy.get("[placeholder='TAT']").type("uuu");

    /// /cost
    cy.get("[placeholder='$123']").type("120$");

    /// /cpt codes
    cy.get("[placeholder='CPT Codes']").type("12u22");

    /// /ionic code
    cy.get("[placeholder='LONIC Code']").type("12");

    /// //ionic description
    cy.get("[placeholder='LONIC Description']").type("awdwer");

    /// //min vol
    cy.get("[placeholder='Min Vol']").type("{backspace}");
    cy.get("[placeholder='Min Vol']").type("9");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click(); /// /save button

    /// /success popup
    cy.get(".success_modal").click({ force: true });
    cy.get(".success_modal > .MuiTypography-div > .MuiTypography-root").click({ force: true });
    cy.get(".primary-btn:nth-child(1)").click({ force: true });
    cy.get("form").submit();
    cy.get(".PrivateSwitchBase-input").click();
    cy.get(".MuiButton-text:nth-child(2)").click();
    cy.get(".success_modal > .MuiButtonBase-root").click(); /// /success okay button

    // cy.get(".success_modal > .MuiTypography-div > .MuiTypography-root").click();
    // cy.get(".modal-buttons-wrapper > .primary-outline-btn").click(); /////cancel button
    // cy.get(".modal-buttons-wrapper > .primary-btn").click(); /// //okay button
  });
});
