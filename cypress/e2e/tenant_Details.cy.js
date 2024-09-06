describe("Policy Component", () => {
  it("opens the Policy popup when handleOpenForPolicy is called", () => {
    cy.visit("http://localhost:8080/dashboard");

    cy.get(".MuiButton-contained").click();
    cy.wait(30000);

    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
    ).click();

    //   cy.get(':nth-child(1) > .css-11hndyc-MuiTableCell-root > img').click();
    //   cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    //   cy.get(':nth-child(1) > .css-11hndyc-MuiTableCell-root > img').click();
    //   cy.get('.MuiButton-text > .MuiTypography-root').click();
    //   cy.contains('Update Request').click();
    //   cy.get('.success_modal > .MuiButtonBase-root').click({force:true});
    //   cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    //   cy.get('.success_modal > .MuiButtonBase-root').click();
    //   cy.get('.MuiStack-root > .switch > .MuiTypography-root').click();
    //   cy.get('#checkbox').check();
    //   cy.get('.PrivateSwitchBase-input').check();
    //   cy.get('.MuiDialogActions-root > .MuiStack-root > .MuiButton-contained').click();
    //   cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    //   cy.get('.MuiButton-contained').click();
    //   cy.get('#firstName').clear('p');
    //   cy.get('#firstName').type('pavan');
    //   cy.get('#lastName').clear('k');
    //   cy.get('#lastName').type('kumar');
    //   cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    //   cy.get('[data-timestamp="1719599400000"]').click();
    //   cy.get('.css-qbdosj-Input').click();
    //   cy.get('.css-tj5bde-Svg').click();
    //   cy.get('.css-tj5bde-Svg').click();
    //   cy.get('.css-qbdosj-Input').click();
    //   cy.get('#react-select-2-input').clear();
    //   cy.get('#react-select-2-input').type('america');
    //   cy.get('#react-select-2-option-0').click();
    //   cy.get('#zipCode').clear('4');
    //   cy.get('#zipCode').type('45365');
    //   cy.get('#emailAddress').clear('k');
    //   cy.get('#emailAddress').type('kmr@gmail.com');
    //   cy.get('#phoneNumber').clear('8');
    //   cy.get('#phoneNumber').type('8723450567');
    //   cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    //   cy.get('.MuiTypography-body1 > .MuiButtonBase-root').click();

    // userDetails
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(1) > .css-16txn55-MuiTableCell-root > span").click();
    cy.get(".MuiInputBase-input").clear("t");
    cy.get(".MuiInputBase-input").type("test");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get(".ls-advance-filter").click();
    cy.get('.MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click();
    cy.get("#-option-0 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="4"]').click({ force: true });
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get("#simple-popover > .MuiBackdrop-root").click();
    cy.get('[aria-label="clear"] > .MuiTypography-root').click();
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(4)").click();
    cy.get(
      ":nth-child(3) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).uncheck();
    cy.get(
      ":nth-child(3) > .css-1pc03ml > .MuiFormControlLabel-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input"
    ).check();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click();
    cy.get("#child-tab-1").click();
    cy.get("#child-tab-2").click();
    cy.get("#child-tab-3").click();
    cy.get("#child-tab-0").click();
    cy.get(
      '.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-tqueyn-MuiButtonBase-root-MuiIconButton-root > [data-testid="DragHandleIcon"]'
    ).click();
    cy.get(
      '.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-tqueyn-MuiButtonBase-root-MuiIconButton-root > [data-testid="DragHandleIcon"]'
    ).click();
    cy.get(
      '.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(3)").click();
    cy.get(
      '.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      '.css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-lqzhe2-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1oiaa15-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1klk4m9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(8) > .MuiBox-root").click();
    cy.get(":nth-child(1) > .css-19unuuy-MuiTableCell-root > .switch > .MuiTypography-root").click();
    cy.get(".MuiButton-outlined").click();
    /* ==== End Cypress Studio ==== */

    // order configuration
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#tenant-tab-2").click();
    cy.get(".MuiInputBase-input").clear("r");
    cy.get(".MuiInputBase-input").type("ravi");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click({ force: true });
    cy.get('[data-testid="ViewColumnIcon"]').click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click();
    cy.get(
      '.css-1e0kqzl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-1nghs1y-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-30c6tw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-1e0kqzl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1e0kqzl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-1nghs1y-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1nghs1y-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-1nghs1y-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-30c6tw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-30c6tw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-30c6tw-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get('[data-testid="MoreVertIcon"] > path').click();
    cy.get(":nth-child(5) > .MuiBox-root").click();
    cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
    cy.get("#orderConfig-tab-1").click();
    cy.get('[data-testid="ViewColumnIcon"]').click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click();
    cy.get(".MuiInputBase-input").clear("a");
    cy.get(".MuiInputBase-input").type("add");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get(
      '.css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"] > path'
    ).click();
    cy.get(
      '.css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-svfac6-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-v9dwsu-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-4vfnxn-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get('[data-testid="MoreVertIcon"]').click();
    cy.get(":nth-child(5) > .MuiBox-root").click();
    /* ==== End Cypress Studio ==== */

    // patient details

    /* ==== Generated with Cypress Studio ==== */
    cy.get("#tenant-tab-3").click();
    cy.get(".css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root").click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click();
    cy.get(
      '.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-10rtznl-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(":nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      '.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      ".css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root"
    ).click();
    cy.get('.MuiMenu-root > .MuiPaper-root > .MuiList-root > [tabindex="0"]').click();
    cy.get(
      '.css-7hw8nq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    // cy.get('.MuiInputBase-input').type('divya');
    // cy.get('.MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root').click();
    /* ==== End Cypress Studio ==== */

    // features  and settings

    /* ==== Generated with Cypress Studio ==== */
    cy.get("#tenant-tab-4").click();
    cy.get(":nth-child(1) > :nth-child(3) > :nth-child(1) > .PrivateSwitchBase-input").uncheck();
    cy.get(":nth-child(1) > :nth-child(3) > :nth-child(2) > .PrivateSwitchBase-input").uncheck();
    cy.get(":nth-child(1) > :nth-child(3) > :nth-child(3) > .PrivateSwitchBase-input").uncheck();

    cy.get(":nth-child(2) > :nth-child(3) > :nth-child(1) > .PrivateSwitchBase-input").uncheck();
    cy.get(".MuiBox-root > .MuiButton-root").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get("#tenant-tab-5").click();
    /* ==== End Cypress Studio ==== */

    // tab2 and tab1
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#tenant-tab-1").click();
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".css-1crctjg > :nth-child(2)").click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click();
    cy.get(
      '.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-mt25hc-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-17i44ya-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-lu7orh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click();
    cy.get(
      '.css-1690df9-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-xbpnw7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(":nth-child(4) > .MuiBox-root").click();
    cy.get('[data-testid="MoreVertIcon"]').click();
    cy.get(":nth-child(5) > .MuiBox-root").click();
    cy.get(
      '.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1j4gyim-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-16wysj3-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-qxwk8l-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(2) > .MuiBox-root").click();
    cy.get(
      '.css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1ctpwyx-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-7kk64k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-31nn5a-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-124s9hq-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-9sm356-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-xbpnw7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-ljhh1c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-ljhh1c-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get('[data-testid="KeyboardArrowRightIcon"] > path').click({ force: true });
    // cy.get('.MuiInputBase-input').clear('d');
    cy.get(".MuiInputBase-input").type("divya");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    // cy.get('[aria-label="clear"] > .MuiTypography-root').click();

    // cy.get('.ls-advance-filter').click();
    // cy.get(':nth-child(1) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"] > path').click();
    // cy.get('#-option-0 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get('#-option-1 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get('#-option-2 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get('.MuiSelect-select').click();
    // cy.get('[data-value="4"]').click({force:true});
    // cy.get(':nth-child(3) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click();
    // cy.get('#permission-tags-option-0 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get('#permission-tags-option-2 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get(':nth-child(4) > .w-100 > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > #permission-tags').click();
    // cy.get('#permission-tags-option-0 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get('#permission-tags-option-1 > .MuiButtonBase-root > .PrivateSwitchBase-input').check();
    // cy.get('.MuiDialogActions-root > .primary-btn').click();
    // cy.get('#simple-popover > .MuiBackdrop-root').click();
    // cy.get('.MuiTabs-flexContainer').click();
    // cy.get('.loader-wrapper').click();
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    // cy.get('.MuiInputBase-input').clear('d');
    // cy.get('.MuiInputBase-input').type('divya');
    // cy.get('.MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root').click();
    // cy.get('[aria-label="clear"] > .MuiTypography-root').click();
    
    cy.get("#tenant-tab-0").click();
    cy.get(":nth-child(1) > .css-1m75igq-MuiTableCell-root > .switch > .MuiTypography-root").click();
    cy.get(".PrivateSwitchBase-input").check();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(":nth-child(1) > .css-pcl9uh-MuiTableCell-root > span").click();
    cy.get(":nth-child(2) > .css-hulwq2-MuiTableCell-root").click();
    cy.get('[data-testid="ViewColumnIcon"] > path').click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click();
    cy.get(
      '.css-1uyjz6p-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1qp7qi8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1b5s0jv-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-70dyhr-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(4) > .MuiBox-root").click();
    cy.get(
      '.css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click();
    cy.get(
      '.css-jp1ag8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(5) > .MuiBox-root").click();
    cy.get(
      '.css-1fvy01q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-11hyiva-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-1bqfi6v-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenuItem-divider > .MuiBox-root").click();
    cy.get(
      '.css-1mi43ti-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-qg8hjy-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1gtool7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(".MuiInputBase-input").clear("s");
    cy.get(".MuiInputBase-input").type("satya");
    cy.get(".MuiPaper-root > .MuiButtonBase-root > .MuiTypography-root").click();
    cy.get(".ls-advance-filter").click();
    cy.get('.MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click();
    cy.get("#-option-1 > .MuiButtonBase-root > .PrivateSwitchBase-input").check();
    cy.get(".MuiDialogContent-root").click();
    cy.get(".MuiSelect-select").click();
    cy.get('[data-value="4"]').click({ force: true });
    cy.get(".MuiDialogActions-root > .primary-btn").click();
    cy.get("#simple-popover > .MuiBackdrop-root").click({ force: true });
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */

    cy.get(".switch > .MuiTypography-root").click();
    cy.get("#checkbox").uncheck({ force: true });
    cy.get(".PrivateSwitchBase-input").check();
    cy.get(".MuiDialogActions-root > .MuiStack-root > .MuiButton-contained").click();
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click();
    cy.get(".MuiButton-contained").click();
    cy.get("#firstName").clear("s");
    cy.get("#firstName").type("satya");
    cy.get("#middleName").clear("s");
    cy.get("#middleName").type("sai");
    cy.get("#lastName").clear("k");
    cy.get("#lastName").type("kumar");
    cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
    // cy.get('[data-timestamp="1719599400000"]').click();
    cy.get(".css-1fdsijx-ValueContainer").click();
    cy.get("#react-select-2-input").clear();
    cy.get("#react-select-2-input").type("america");
    cy.get("#react-select-2-option-0").click();
    cy.get("#zipCode").clear("3");
    cy.get("#zipCode").type("34524");
    cy.get("#emailAddress").clear("s");
    cy.get("#emailAddress").type("sai@gmail.com");
    cy.get("#phoneNumber").clear("9");
    cy.get("#phoneNumber").type("9845678904");
    cy.get(".MuiDialogActions-root > .MuiButtonBase-root").click({ force: true });
    cy.get(".modalClose > .MuiTypography-root").click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get("#tenant-tab-3").click().wait(10000);
    cy.get(":nth-child(2) > .css-132xy47-MuiTableCell-root").click();
    cy.get('[data-testid="CloseIcon"] > path').click();
    cy.get("#tenant-tab-2").click();
    cy.get(":nth-child(2) > .css-12aytv7-MuiTableCell-root > span").click();
    cy.get(
      '.MuiDialogContent-root > .table__wrapper > .MuiPaper-elevation2 > .css-1omuo8w-MuiToolbar-root > .css-1ag9q10 > .css-1cjiko4 > .MuiBox-root > .MuiButtonBase-root > [data-testid="ViewColumnIcon"] > path'
    ).click();
    cy.get(".css-1crctjg > :nth-child(1)").click();
    cy.get(".css-1crctjg > :nth-child(3)").click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click();
    cy.get('[data-testid="CloseIcon"]').click();
    cy.get("#tenant-tab-1").click();
    cy.get(":nth-child(2) > .css-132xy47-MuiTableCell-root").click();
    cy.get('[data-testid="CloseIcon"]').click();

    /* ==== End Cypress Studio ==== */
  });
});
