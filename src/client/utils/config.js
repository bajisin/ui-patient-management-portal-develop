import CryptoJS from "crypto-js";
const ivKey = "1234567890123456";
const key = "LSHLTH##12$20221";
const encryptKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(key));

const parserIv = CryptoJS.enc.Utf8.parse(ivKey);
const ivConfig = {
  iv: parserIv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
};

export function getConfig() {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.

  const oktaConfig = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  const audience = oktaConfig?.tenantConfigurationDTO?.oktaAudience;
  const encryptedClientId = oktaConfig?.tenantConfigurationDTO?.oktaClientId;
  const decrypted = encryptedClientId ? CryptoJS.AES.decrypt(encryptedClientId, encryptKey, ivConfig) : "";
  const finalDecrypted = decrypted ? decrypted.toString(CryptoJS.enc.Utf8).slice(1, -1) : "";

  return {
    domain: oktaConfig?.tenantConfigurationDTO?.oktaDomain,
    clientId: finalDecrypted || oktaConfig?.tenantConfigurationDTO?.oktaClientId,
    ...(audience ? { audience } : null),
    logo: oktaConfig?.tenantLogo
  };
}
