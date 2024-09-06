import React from "react";
import Sidebar from "./index";

describe("Side Navbar Menus", () => {
  it("Test Case#1 - Should render sidebar", () => {
    cy.mount(<Sidebar />);
  });

  it("Test Case#2 - Should render sidebar with MENU'S", () => {
    cy.mount(<Sidebar />);
    if (cy.get("[data-cy=sideNavBar]").children().its("length").should("be.gte", 1)) {
      cy.get("[data-cy=menuItem]").find("[data-cy=menuDetails]").its("length").should("be.gte", 1);
    } else {
      cy.get("[data-cy=sideNavBar]").should("have.length", 1);
    }
  });

  it("Test Case#3 - Should render sidebar SUBMENU'S", () => {
    cy.mount(<Sidebar />);
    if (cy.get("[data-cy=sideNavBar]").children().its("length").should("be.gte", 1)) {
      cy.get("[data-cy=menuItem]").each((menu) => {
        cy.wrap(menu).click();
        cy.get("[data-cy=subMenus]").should("be.visible");
        cy.get(menu).find("[data-cy=subMenuDetails]").its("length").should("be.gte", 1);
      });
    } else {
      cy.get("[data-cy=sideNavBar]").should("have.length", 1);
    }
  });
});
