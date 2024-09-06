// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// SUPER ADMIN LOGIN
Cypress.Commands.add("Login", () => {
  cy.visit("http://localhost:8080/dashboard", {
    onBeforeLoad(win) {
      win.sessionStorage.setItem(
        "authInfo",

        JSON.stringify({
          accessToken:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJpc3MiOiJodHRwczovL2xpZmVzY2FuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTY3MzkxM2U3ZDNhZGE2NmI0ZjNjMDUiLCJhdWQiOlsiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vbGlmZXNjYW4udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMTYxMDI1NSwiZXhwIjoxNzAxNjE3NDU1LCJhenAiOiJlZTFJR1UyNjJteTBVeU5ycDN6emduQnp3OXpCOG1ndyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.cqeEYeN9dtbbVH5t-y003MkM1qvUW-4QvmJoweTNy1jyUPHdizK7njcXtlhh4eBiUZ-inTMqViSt-QO9rzBpQ4rcmOD1cdmiMWBvpaH0CnXoGGlmhWa0iUqoiq9FxCv_9BttedQrD0ZjnEC6V8hVQ72-MsJIO4QGDUri7KCCVgG7Y4Ib8Mv7yHXD2B5tJ6SQJsAra0gHUrSmOFRtQdccz7nXRLPGllH9PEBPm0RZbUve7iIQFfe36gMQWj_iM40vW5LAH1dA_vWCYH7xCI8R6lsDl-q54Zc28hxIBAhaIgedsjeVvvuokyWl-sVN8EIqTrwR1otAdVqSZMnY1zv0sQ",
          access_token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJpc3MiOiJodHRwczovL2xpZmVzY2FuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTY3MzkxM2U3ZDNhZGE2NmI0ZjNjMDUiLCJhdWQiOlsiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vbGlmZXNjYW4udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMTYxMDI1NSwiZXhwIjoxNzAxNjE3NDU1LCJhenAiOiJlZTFJR1UyNjJteTBVeU5ycDN6emduQnp3OXpCOG1ndyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.cqeEYeN9dtbbVH5t-y003MkM1qvUW-4QvmJoweTNy1jyUPHdizK7njcXtlhh4eBiUZ-inTMqViSt-QO9rzBpQ4rcmOD1cdmiMWBvpaH0CnXoGGlmhWa0iUqoiq9FxCv_9BttedQrD0ZjnEC6V8hVQ72-MsJIO4QGDUri7KCCVgG7Y4Ib8Mv7yHXD2B5tJ6SQJsAra0gHUrSmOFRtQdccz7nXRLPGllH9PEBPm0RZbUve7iIQFfe36gMQWj_iM40vW5LAH1dA_vWCYH7xCI8R6lsDl-q54Zc28hxIBAhaIgedsjeVvvuokyWl-sVN8EIqTrwR1otAdVqSZMnY1zv0sQ",
          scope: "openid profile email",
          expiresIn: 7200,
          expires_in: 7200,
          tokenType: "Bearer",
          token_type: "Bearer",
          state: "bJwpqUeBwKM_UrXuxAXCXiVo7nyeSajn",
          idToken:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJuaWNrbmFtZSI6InRlbmFudGFkbWluX2xzIiwibmFtZSI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci85NjJjZDM1ZTk4NDM2ZjQyNmIwNjAzNTE3OWNlNzdlNz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnRlLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTAxVDEzOjUzOjMxLjAwNVoiLCJlbWFpbCI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vIiwiYXVkIjoiZWUxSUdVMjYybXkwVXlOcnAzenpnbkJ6dzl6QjhtZ3ciLCJpYXQiOjE3MDE2MTAyNTUsImV4cCI6MTcwMTY0NjI1NSwic3ViIjoiYXV0aDB8NjU2NzM5MTNlN2QzYWRhNjZiNGYzYzA1IiwiYXRfaGFzaCI6Ing3ZmxaN184ZEJDNERmTUZmQ2hiMkEiLCJzaWQiOiJBOEtXdDRadjJOblJveExoaHliUWhJLWd0RlY0LTZnRiIsIm5vbmNlIjoiRVBteTRBVmVyQ1NkUXd1TThCN1RRbjVrVlhhZzVaakcifQ.nkEYoUCobNXWPOymmbsrkJTVoAGzwuVbBoQ1F69x1haQ1yRLcWwPXkzs05S4QDnfAAuB9iNNYso8mEGpL-OCEKLP_aZij8FPRuEEo-NJQnX3pCMYZa2mfdBxOdsBoi_SA3-Ftzvi6X8Ui4rzjs6YrCmz6AM1Gwp16_sroWSyDNfARL26QV4xszf80k0un5LIP-Al7UY-m8fOFKI2ALBiE3u6z_NeXgNjMV7Ks4A1bcqAbiSdxc2kZXMBkrWY7jOwlQtLZEVJXsTpPhX5tXhqAfrjREsqxtGo9nLCQBWqYNtrP0U_tJkM2MX79GNVc67pBPhofRRXzpGHzrnkcskslw",
          id_token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJuaWNrbmFtZSI6InRlbmFudGFkbWluX2xzIiwibmFtZSI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci85NjJjZDM1ZTk4NDM2ZjQyNmIwNjAzNTE3OWNlNzdlNz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnRlLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTAxVDEzOjUzOjMxLjAwNVoiLCJlbWFpbCI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vIiwiYXVkIjoiZWUxSUdVMjYybXkwVXlOcnAzenpnbkJ6dzl6QjhtZ3ciLCJpYXQiOjE3MDE2MTAyNTUsImV4cCI6MTcwMTY0NjI1NSwic3ViIjoiYXV0aDB8NjU2NzM5MTNlN2QzYWRhNjZiNGYzYzA1IiwiYXRfaGFzaCI6Ing3ZmxaN184ZEJDNERmTUZmQ2hiMkEiLCJzaWQiOiJBOEtXdDRadjJOblJveExoaHliUWhJLWd0RlY0LTZnRiIsIm5vbmNlIjoiRVBteTRBVmVyQ1NkUXd1TThCN1RRbjVrVlhhZzVaakcifQ.nkEYoUCobNXWPOymmbsrkJTVoAGzwuVbBoQ1F69x1haQ1yRLcWwPXkzs05S4QDnfAAuB9iNNYso8mEGpL-OCEKLP_aZij8FPRuEEo-NJQnX3pCMYZa2mfdBxOdsBoi_SA3-Ftzvi6X8Ui4rzjs6YrCmz6AM1Gwp16_sroWSyDNfARL26QV4xszf80k0un5LIP-Al7UY-m8fOFKI2ALBiE3u6z_NeXgNjMV7Ks4A1bcqAbiSdxc2kZXMBkrWY7jOwlQtLZEVJXsTpPhX5tXhqAfrjREsqxtGo9nLCQBWqYNtrP0U_tJkM2MX79GNVc67pBPhofRRXzpGHzrnkcskslw"
        })
      );

      win.sessionStorage.setItem(
        "userDetails",

        JSON.stringify({
          createdBy: null,
          modifiedBy: "SPA000001",
          id: "SPA000001",
          firstName: "LSLpatient",
          lastName: "SuperAdminlogin",
          middleName: "SAamerica",
          phoneNumber: "9441761835",
          alternativePhoneNumber: "9441761835",
          address: "11B, Emerson Avengers",
          city: "Jersey Village",
          state: "TX",
          statusId: 1,
          country: "USA",
          zipCode: "74803",
          statusDesc: null,
          roleMasterDTO: { roleId: 1, roleName: "Super Admin" },
          assoiciatedDTO: null,
          email: "superadmin_ls@gmail.com",
          email_verified: true
        })
      );
    }
  });
});
// Tenant Admin Login..
Cypress.Commands.add("LoginTenant", () => {
  cy.visit("http://localhost:8080/dashboard", {
    onBeforeLoad(win) {
      win.sessionStorage.setItem(
        "authInfo",

        JSON.stringify({
          accessToken:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJpc3MiOiJodHRwczovL2xpZmVzY2FuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTY3MzkxM2U3ZDNhZGE2NmI0ZjNjMDUiLCJhdWQiOlsiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vbGlmZXNjYW4udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMTYxMDI1NSwiZXhwIjoxNzAxNjE3NDU1LCJhenAiOiJlZTFJR1UyNjJteTBVeU5ycDN6emduQnp3OXpCOG1ndyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.cqeEYeN9dtbbVH5t-y003MkM1qvUW-4QvmJoweTNy1jyUPHdizK7njcXtlhh4eBiUZ-inTMqViSt-QO9rzBpQ4rcmOD1cdmiMWBvpaH0CnXoGGlmhWa0iUqoiq9FxCv_9BttedQrD0ZjnEC6V8hVQ72-MsJIO4QGDUri7KCCVgG7Y4Ib8Mv7yHXD2B5tJ6SQJsAra0gHUrSmOFRtQdccz7nXRLPGllH9PEBPm0RZbUve7iIQFfe36gMQWj_iM40vW5LAH1dA_vWCYH7xCI8R6lsDl-q54Zc28hxIBAhaIgedsjeVvvuokyWl-sVN8EIqTrwR1otAdVqSZMnY1zv0sQ",
          access_token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJpc3MiOiJodHRwczovL2xpZmVzY2FuLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTY3MzkxM2U3ZDNhZGE2NmI0ZjNjMDUiLCJhdWQiOlsiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vbGlmZXNjYW4udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMTYxMDI1NSwiZXhwIjoxNzAxNjE3NDU1LCJhenAiOiJlZTFJR1UyNjJteTBVeU5ycDN6emduQnp3OXpCOG1ndyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.cqeEYeN9dtbbVH5t-y003MkM1qvUW-4QvmJoweTNy1jyUPHdizK7njcXtlhh4eBiUZ-inTMqViSt-QO9rzBpQ4rcmOD1cdmiMWBvpaH0CnXoGGlmhWa0iUqoiq9FxCv_9BttedQrD0ZjnEC6V8hVQ72-MsJIO4QGDUri7KCCVgG7Y4Ib8Mv7yHXD2B5tJ6SQJsAra0gHUrSmOFRtQdccz7nXRLPGllH9PEBPm0RZbUve7iIQFfe36gMQWj_iM40vW5LAH1dA_vWCYH7xCI8R6lsDl-q54Zc28hxIBAhaIgedsjeVvvuokyWl-sVN8EIqTrwR1otAdVqSZMnY1zv0sQ",
          scope: "openid profile email",
          expiresIn: 7200,
          expires_in: 7200,
          tokenType: "Bearer",
          token_type: "Bearer",
          state: "_iE-gHtBxmZF5Dnzr5.v1flMLUzzSB1s",
          idToken:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJuaWNrbmFtZSI6InRlbmFudGFkbWluX2xzIiwibmFtZSI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci85NjJjZDM1ZTk4NDM2ZjQyNmIwNjAzNTE3OWNlNzdlNz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnRlLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTAxVDEzOjUzOjMxLjAwNVoiLCJlbWFpbCI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vIiwiYXVkIjoiZWUxSUdVMjYybXkwVXlOcnAzenpnbkJ6dzl6QjhtZ3ciLCJpYXQiOjE3MDE2MTAyNTUsImV4cCI6MTcwMTY0NjI1NSwic3ViIjoiYXV0aDB8NjU2NzM5MTNlN2QzYWRhNjZiNGYzYzA1IiwiYXRfaGFzaCI6Ing3ZmxaN184ZEJDNERmTUZmQ2hiMkEiLCJzaWQiOiJBOEtXdDRadjJOblJveExoaHliUWhJLWd0RlY0LTZnRiIsIm5vbmNlIjoiRVBteTRBVmVyQ1NkUXd1TThCN1RRbjVrVlhhZzVaakcifQ.nkEYoUCobNXWPOymmbsrkJTVoAGzwuVbBoQ1F69x1haQ1yRLcWwPXkzs05S4QDnfAAuB9iNNYso8mEGpL-OCEKLP_aZij8FPRuEEo-NJQnX3pCMYZa2mfdBxOdsBoi_SA3-Ftzvi6X8Ui4rzjs6YrCmz6AM1Gwp16_sroWSyDNfARL26QV4xszf80k0un5LIP-Al7UY-m8fOFKI2ALBiE3u6z_NeXgNjMV7Ks4A1bcqAbiSdxc2kZXMBkrWY7jOwlQtLZEVJXsTpPhX5tXhqAfrjREsqxtGo9nLCQBWqYNtrP0U_tJkM2MX79GNVc67pBPhofRRXzpGHzrnkcskslw",
          id_token:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IloxNGhlNmtlVElKdDJnRV9ITnhhUSJ9.eyJuaWNrbmFtZSI6InRlbmFudGFkbWluX2xzIiwibmFtZSI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci85NjJjZDM1ZTk4NDM2ZjQyNmIwNjAzNTE3OWNlNzdlNz9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnRlLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTAxVDEzOjUzOjMxLjAwNVoiLCJlbWFpbCI6InRlbmFudGFkbWluX2xzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9saWZlc2Nhbi51cy5hdXRoMC5jb20vIiwiYXVkIjoiZWUxSUdVMjYybXkwVXlOcnAzenpnbkJ6dzl6QjhtZ3ciLCJpYXQiOjE3MDE2MTAyNTUsImV4cCI6MTcwMTY0NjI1NSwic3ViIjoiYXV0aDB8NjU2NzM5MTNlN2QzYWRhNjZiNGYzYzA1IiwiYXRfaGFzaCI6Ing3ZmxaN184ZEJDNERmTUZmQ2hiMkEiLCJzaWQiOiJBOEtXdDRadjJOblJveExoaHliUWhJLWd0RlY0LTZnRiIsIm5vbmNlIjoiRVBteTRBVmVyQ1NkUXd1TThCN1RRbjVrVlhhZzVaakcifQ.nkEYoUCobNXWPOymmbsrkJTVoAGzwuVbBoQ1F69x1haQ1yRLcWwPXkzs05S4QDnfAAuB9iNNYso8mEGpL-OCEKLP_aZij8FPRuEEo-NJQnX3pCMYZa2mfdBxOdsBoi_SA3-Ftzvi6X8Ui4rzjs6YrCmz6AM1Gwp16_sroWSyDNfARL26QV4xszf80k0un5LIP-Al7UY-m8fOFKI2ALBiE3u6z_NeXgNjMV7Ks4A1bcqAbiSdxc2kZXMBkrWY7jOwlQtLZEVJXsTpPhX5tXhqAfrjREsqxtGo9nLCQBWqYNtrP0U_tJkM2MX79GNVc67pBPhofRRXzpGHzrnkcskslw"
        })
      );

      win.sessionStorage.setItem(
        "userDetails",

        JSON.stringify({
          createdBy: null,
          modifiedBy: "SPA000001",
          id: "SPA000001",
          firstName: "LSLpatient",
          lastName: "SuperAdminlogin",
          middleName: "SAamerica",
          phoneNumber: "9441761835",
          alternativePhoneNumber: "9441761835",
          address: "11B, Emerson Avengers",
          city: "Jersey Village",
          state: "TX",
          statusId: 1,
          country: "USA",
          zipCode: "74803",
          statusDesc: null,
          roleMasterDTO: { roleId: 2, roleName: "Tenant Admin" },
          assoiciatedDTO: null,
          email: "tenantadmin_ls@gmail.com",
          email_verified: true
        })
      );
    }
  });
});
