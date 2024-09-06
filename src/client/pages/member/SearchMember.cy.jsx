import React from "react";
import SearchMember from "./SearchMember";

describe("<SearchMember />", () => {
  it("renders", () => {
    cy.mount(<SearchMember />);
  });
  it.only("Check Radio buttons", () => {
    cy.mount(<SearchMember />);
    cy.get("[type='radio']").check();
  });
  it.only("Test the input text area", () => {
    cy.mount(<SearchMember />);
    cy.focused().should("have.class", "search-item");
  });
  it.only("accepts input", () => {
    cy.mount(<SearchMember />);
    cy.get(".search-item");
  });
  it.only("tests search button click", () => {
    cy.mount(<SearchMember />);
    cy.focused().click();
  });
});
