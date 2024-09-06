import { EventType, PublicClientApplication } from "@azure/msal-browser";

import { updateUser } from "@redux/slices/user";
import { useDispatch } from "react-redux";

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

export const msalConfig = {
  auth: {
    clientId: process.env.MSAL_AUTH_CLIENT_ID,
    authority: process.env.MSAL_AUTH_AUTHORITY,
    redirectUri: "/"
  },
  cache: {
    storeAuthStateInCookie: true // Set this to "true" if you are having issues on IE11 or Edge
  }
};

export const instance = new PublicClientApplication(msalConfig);

if (!instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  instance.setActiveAccount(instance.getAllAccounts()[0]);
}

instance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    instance.setActiveAccount(account);
    useDispatch(updateUser(account));
  }
});

export const loginRequest = {
  scopes: ["User.Read"]
};

export async function callMsGraph(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer);
  const options = {
    method: "GET",
    headers
  };
  /* eslint-disable no-console */
  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export const triggerLogin = () => {
  if (instance) {
    /* eslint-disable no-console */
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  }
};

export const triggerLogout = () => {
  localStorage.clear();

  if (instance) {
    const logoutRequest = {
      account: getCachedUser(),
      postLogoutRedirectUri: "/"
    };

    instance.logoutRedirect(logoutRequest);
  } else {
    window.location = "/";
  }
};

export const getCachedUser = () => {
  if (instance) {
    const allAccounts = instance.getAllAccounts();
    if (allAccounts.length > 0) {
      return allAccounts[0];
    }
    return null;
  }
  return null;
};

export const fetchAccessToken = async () => {
  if (instance) {
    const allAccounts = instance.getAllAccounts();
    const account = allAccounts[0] || {};
    return await instance
      .acquireTokenSilent({ ...loginRequest, account })
      .then(async (response) => {
        return response.accessToken;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }
  return null;
};
