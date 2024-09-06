// import packages

import "bootstrap";
import "./scss/_index.scss";
import "../translations/i18n";

import App from "./app";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import React from "react";
import { ThemeContextProvider } from "./context/themeContext";
import { createRoot } from "react-dom/client";
import { getConfig } from "./utils/config";
import history from "./history";
import store from "@redux/store";

// import redux

// import store

// import components

// import CSS

// global variables
const onRedirectCallback = (appState) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};
const container = document.getElementById("app-root");
const root = createRoot(container);
const config = getConfig();
const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null)
  }
};
// render DOM
root.render(
  // <React.StrictMode>
  <ThemeContextProvider>
    <Auth0Provider {...providerConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </ThemeContextProvider>
  // </React.StrictMode>
);
