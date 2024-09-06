import React from "react";
import RegisterMember from "../../src/client/pages/member/RegisterMember";

describe("<RegisterMember/>", () => {
  it("TC-1 renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RegisterMember />);
    cy.get(".page-title").should("have.text", "Register Member");
    cy.get(":nth-child(1) > .form-group > label").should("have.text", "Barcode ID");
    cy.get(":nth-child(2) > .form-group > label").should("have.text", "Last name");
    cy.get(":nth-child(3) > .form-group > label").should("have.text", "Email");
    cy.get(":nth-child(4) > .form-group > label").should("have.text", "Password");
  });
  it("TC-2 if all fields are empty", () => {
    cy.mount(<RegisterMember />);
    cy.get(".eq-primary-btn").click({ force: true });
  });

  it("TC-3 if any single field is missing", () => {
    cy.mount(<RegisterMember />);
    cy.get(":nth-child(2) > .form-group > .form-control").type("test");
    cy.get(":nth-child(3) > .form-group > .form-control").type("test@gmail.com");
    cy.get(":nth-child(4) > .form-group > .form-control").type("test12");
    cy.get(".eq-primary-btn").click({ force: true });
  });

  it("TC-4 if enter email in wrong format", () => {
    cy.mount(<RegisterMember />);
    cy.get(":nth-child(1) > .form-group > .form-control").type("123456");
    cy.get(":nth-child(2) > .form-group > .form-control").type("test");
    cy.get(":nth-child(3) > .form-group > .form-control").type("test");
    cy.get(":nth-child(4) > .form-group > .form-control").type("test12");
    cy.get(".eq-primary-btn").click({ force: true });
  });

  it("TC-5 if enter name in number format", () => {
    cy.mount(<RegisterMember />);
    cy.get(":nth-child(1) > .form-group > .form-control").type("123456");
    cy.get(":nth-child(2) > .form-group > .form-control").type("123");
    cy.get(":nth-child(3) > .form-group > .form-control").type("test@gmail.com");
    cy.get(":nth-child(4) > .form-group > .form-control").type("test12");
    cy.get(".eq-primary-btn").click({ force: true });
  });

  it("TC-6 if enter the password less than 6 characters", () => {
    cy.mount(<RegisterMember />);
    cy.get(":nth-child(1) > .form-group > .form-control").type("123456");
    cy.get(":nth-child(2) > .form-group > .form-control").type("test");
    cy.get(":nth-child(3) > .form-group > .form-control").type("test@gmail.com");
    cy.get(":nth-child(4) > .form-group > .form-control").type("abc");
    cy.get(".eq-primary-btn").click({ force: true });
  });
});
