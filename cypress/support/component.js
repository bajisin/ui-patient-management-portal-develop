import { mount } from "cypress/react18";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import React from "react";
import "../../src/client/scss/_index.scss";

Cypress.Commands.add("mount", (component, options = {}) => {
  const { reduxStore = store, routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;
  const wrapped = (
    <Provider store={reduxStore}>
      <MemoryRouter {...routerProps}>{component}</MemoryRouter>
    </Provider>
  );
  return mount(wrapped, mountOptions);
});
