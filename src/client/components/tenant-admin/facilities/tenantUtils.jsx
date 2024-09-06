export const getTenantDetails = () => {
  return JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
};
