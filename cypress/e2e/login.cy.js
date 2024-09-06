// describe("login mechanism", () => {
//   // the follow flow will redirect to till the 2FA and stops
//   it("logs into login.microsoftonline through a user web app", () => {
//     cy.visit("localhost:8080");

//     // ABOUT US
//     cy.get(":nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root").click();
//     cy.get(".MuiButtonBase-root > .MuiTypography-root").click();

//     // PRIVACY POLICY
//     cy.get(":nth-child(2) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root").click();
//     cy.get(".MuiButtonBase-root > .MuiTypography-root").click();

//     // FAQ
//     cy.get(":nth-child(3) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root").click();
//     cy.get(".MuiButtonBase-root > .MuiTypography-root").click();

//     cy.get(".MuiButton-contained").click();
//     cy.wait(40000);

//     // After entering into the page user needs to logout
//     cy.get(".headerRightSection > .ls-rightarrow").click();
//     cy.get(".page__wrapper").click();
//     cy.get("body").click();
//     cy.get(".MuiMenuItem-root:nth-child(2)").click();
//     cy.get("body").click();
//     cy.get(".MuiButtonBase-root:nth-child(3)").click();
//     cy.get("body").click();
//     cy.get(".MuiButtonBase-root:nth-child(4)").click();
//     cy.get("body").click();
//     cy.get(".MuiButtonBase-root:nth-child(5)").click();
//     cy.get(".page__wrapper").click();
//     cy.get(".MuiToolbar-root").click();
//     cy.get("body").click();
//     cy.get(".MuiMenuItem-root:nth-child(2)").click();
//     cy.get("body").click();
//     cy.get(".MuiButtonBase-root:nth-child(3)").click();
//     // dsr reports
//     cy.get(".page__wrapper").click();
//     cy.get(".MuiButton-root").click();
//     cy.get(".ls-advance-filter").click();
//     cy.get("body").click();
//     cy.get(".MuiMenuItem-root:nth-child(2)").click();
//     cy.get(".primary-btn").click();
//     cy.get(".primary-btn").click();
//     cy.get(".css-1i0e6f3-MuiModal-root-MuiPopover-root > .MuiBackdrop-root").click();

// cy.get("body").click();
// cy.get(".MuiMenuItem-root:nth-child(2)").click();
// cy.get("body").click();
// cy.get(".MuiButtonBase-root:nth-child(3)").click();
// cy.get("body").click();
// cy.get(".MuiButtonBase-root:nth-child(4)").click();
// cy.get("body").click();
// cy.get(".MuiMenuItem-root:nth-child(2)").click();
// cy.get("body").click();
// cy.get(".MuiButtonBase-root:nth-child(3)").click();
// cy.get("body").click();
// cy.get(".MuiButtonBase-root:nth-child(4)").click();
// cy.get("li > .Mui-selected").click();
// cy.get("body").click();
// cy.get(".MuiMenuItem-root:nth-child(2)").click();
// cy.get("body").click();
// cy.get(".MuiButtonBase-root:nth-child(3)").click();
// cy.get("body").click();
// cy.get(".MuiButtonBase-root:nth-child(4)").click();

// SIGN OUT
// cy.get(".MuiButtonBase-root > .MuiTypography-body1").click();
// cy.get(".MuiStack-root > .MuiButton-contained").click();

// cy.get(".btn").click();
// cy.origin("login.microsoftonline.com", () => {
//   // LIVE_USERNAME add your own equinox username
//   cy.get('input[type="email"]').type(Cypress.env("LIVE_USERNAME"));
//   cy.get('input[type="submit"]').click();
// });

// cy.origin("https://sts.equinoxfitness.com", () => {
//   // LIVE_USERNAME add your own equinox password
//   cy.get('input[type="password"]').type(Cypress.env("LIVE_PASSWORD"), {
//     log: false
//   });
//   cy.get("span#submitButton").click();
//   });
// });
// });
// # Add this code before the test to bypass the login
// Cypress.Commands.add("login", (username, password) => {
//   cy.visit("/login");
//   cy.get(".login__section").click();

//   //   cy.get(":nth-child(1) > .MuiButtonBase-root > .MuiListItemText-root > .MuiTypography-root").click();

//   cy.get('input[name="username"]').type("tenantadmin_ls@gmail.com");
//   cy.get('input[name="password"]').type("Test@1234");
//   cy.get('button[type="submit"]').click();
//   cy.url().should("include", "/home");
//   cy.get("h1").should("contain", "Welcome to LifeScan");
// });

// // Then in your test, you can use the command like this
// describe("Login Test", () => {
//   it("Logs in with tenantadmin_ls@gmail.com and Test@1234", () => {
//     cy.login("tenantadmin_ls@gmail.com", "Test@1234");
//   });
// });
// describe("Login Test", () => {
//   it("Logs in with tenantadmin_ls@gmail.com and Test@1234", () => {
//     cy.visit("/home"); // assuming the login page is at /login

//     // fill in the username and password fields
//     cy.get('input[name="username"]').type("tenantadmin_ls@gmail.com");
//     cy.get('input[name="password"]').type("Test@1234");

//     // submit the form
//     cy.get('button[type="submit"]').click();

//     // assert that the user is logged in and on the home page
//     cy.url().should("include", "/home");
//     cy.get("h1").should("contain", "Welcome to LifeScan");
//   });
// });
// describe("Policy Component", () => {
//   it("opens the Policy popup when handleOpenForPolicy is called", () => {
//     cy.visit("localhost:8080");

//     // Assuming that the Policy component has been mounted and is visible
//     cy.get("[data-cy=AboutUs]").should("be.visible");

//     // Call the handleOpenForPolicy function
//     cy.get('[data-cy="AboutUs"]').click({ multiple: true, force: true });
//     // cy.get('[data-cy="Privacypolicy"] .MuiTypography-root').click();
//     cy.get('[data-cy="closeIcon"]').click();

//     // Check that the Policy popup is visible
//     cy.get('[data-cy="Privacypolicy"]').should("be.visible");
//     cy.get('[data-cy="Privacypolicy"]').click({ multiple: true });
//     // cy.get('[data-cy="Privacypolicy"] .MuiTypography-root').click();
//     cy.get(".MuiTypography-span").click();

//     cy.get('[data-cy="FAQ"]').should("be.visible");
//     cy.get('[data-cy="FAQ"]').click({ multiple: true });
//     // cy.get('[data-cy="FAQ"] .MuiTypography-root').click();

//     cy.get(".MuiTypography-span").click();
//     cy.get(".MuiButton-contained").click();
//     // cy.wait(40000);
//   });

//   /* ==== Test Created with Cypress Studio ==== */
//   it('login-test', function () {
//     /* ==== Generated with Cypress Studio ==== */
//     cy.visit('http://localhost:8080/');
//     cy.get('[data-cy="AboutUs"] > .MuiTypography-root').click();
//     cy.get('[data-cy="closeIcon"] > .MuiTypography-root').click();
//     cy.get('[data-cy="Privacypolicy"] > .MuiListItemText-root > .MuiTypography-root').click();
//     cy.get('.MuiButtonBase-root > .MuiTypography-root').click();
//     cy.get('[data-cy="FAQ"] > .MuiListItemText-root > .MuiTypography-root').click();
//     cy.get('.MuiButtonBase-root > .MuiTypography-root').click();
//     cy.get('.MuiButton-startIcon > img').click();
//     cy.get('.MuiButton-contained').click();
//     /* ==== End Cypress Studio ==== */
//   });
// });
// cy.get(".MuiTypography-span").click();
