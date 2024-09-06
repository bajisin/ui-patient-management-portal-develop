describe("Policy Component", () => {
  //   it("opens the Policy popup when handleOpenForPolicy is called", () => {
  //     cy.visit("http://localhost:8080/dashboard");

  //     cy.get(".MuiButton-contained").click();
  //     cy.wait(60000);

  //     cy.get(
  //       ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root"
  //     ).click();
  //   })

  /* ==== Test Created with Cypress Studio ==== */
  it("Table list", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:8080/dashboard");
    cy.get(".MuiButton-contained").click();
    cy.wait(60000);
    cy.get(
      ".sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root"
    ).click();
    cy.get(
      '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get('[tabindex="0"] > .MuiBox-root').click();
    cy.get(
      '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(3) > .MuiBox-root").click();
    cy.get(
      '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiPaper-root > .MuiList-root > :nth-child(4)").click();
    cy.get(
      '.css-atfe07-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiMenu-root > .MuiBackdrop-root").click({ force: true });
    cy.get(
      '.css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      '.css-ma4a4e-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();
    cy.get(
      '.css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]'
    ).click();

    cy.get(
      '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1ar1kyh-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-195uxcg-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1y6mi2k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-11u5hr7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-fsb16k-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-17cuyev-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(".MuiList-root > :nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1vx9yh7-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-1fd1bt4-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-rt9vg0-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"] > path'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-l000fj-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(7) > .MuiBox-root").click();
    cy.get(
      '.css-ezq2s8-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(":nth-child(8) > .MuiBox-root").click();
    cy.get(
      '.css-1xfvl8q-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();
    cy.get(
      '.css-1jddh3i-MuiTableCell-root > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions > .css-1vo6kym-MuiButtonBase-root-MuiIconButton-root > [data-testid="MoreVertIcon"]'
    ).click();
    cy.get(".MuiList-root > :nth-child(5) > .MuiBox-root").click();



    cy.get(':nth-child(1) > .css-11hndyc-MuiTableCell-root > img').click();
    cy.get('.sidebar__wrapper > .MuiDrawer-root > .MuiPaper-root > .mobileViewSidenav > .MuiList-root > :nth-child(2) > a > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get(':nth-child(1) > .css-11hndyc-MuiTableCell-root > img').click();
    cy.get('.MuiButton-text > .MuiTypography-root').click();
    cy.contains('Update Request').click();
    cy.get('.success_modal > .MuiButtonBase-root').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    cy.get('.success_modal > .MuiButtonBase-root').click();
    cy.get('.MuiStack-root > .switch > .MuiTypography-root').click();
    cy.get('#checkbox').check();
    cy.get('.PrivateSwitchBase-input').check();
    cy.get('.MuiDialogActions-root > .MuiStack-root > .MuiButton-contained').click();
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    cy.get('.MuiButton-contained').click();
    cy.get('#firstName').clear('p');
    cy.get('#firstName').type('pavan');
    cy.get('#lastName').clear('k');
    cy.get('#lastName').type('kumar');
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('[data-timestamp="1719599400000"]').click();
    cy.get('.css-qbdosj-Input').click();
    cy.get('.css-tj5bde-Svg').click();
    cy.get('.css-tj5bde-Svg').click();
    cy.get('.css-qbdosj-Input').click();
    cy.get('#react-select-2-input').clear();
    cy.get('#react-select-2-input').type('america');
    cy.get('#react-select-2-option-0').click();
    cy.get('#zipCode').clear('4');
    cy.get('#zipCode').type('45365');
    cy.get('#emailAddress').clear('k');
    cy.get('#emailAddress').type('kmr@gmail.com');
    cy.get('#phoneNumber').clear('8');
    cy.get('#phoneNumber').type('8723450567');
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click();
    cy.get('.MuiTypography-body1 > .MuiButtonBase-root').click();

    /* ==== Generated with Cypress Studio ==== */
   
    /* ==== End Cypress Studio ==== */
  });
});
