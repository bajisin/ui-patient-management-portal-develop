export const getLogoname = () => {
  if (sessionStorage.getItem("tntAssetDetails")) {
    const tntDetails = JSON.parse(sessionStorage.getItem("tntAssetDetails"));
    const root = document.documentElement;
    root.style.setProperty("--primary", tntDetails?.tenantDetails?.primMain);
    root.style.setProperty("--primary-font", tntDetails?.tenantDetails?.fontDTO?.fontdesc);
    return tntDetails?.tenantDetails?.tenantLogo;
  }
};

export const getTenantId = () => {
  return JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;
};

export const getLoggedInUserRoleId = () => {
  return JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
};
export const getLoggedInUserRoleName = () => {
  return JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleName;
};

export const getLoggedInUserId = () => {
  return JSON.parse(sessionStorage.getItem("userDetails"))?.id;
};

export const paginationPayload = ({ pagination, sortKey, sortOrder, searchVal, value }) => {
  return {
    pageNo: pagination.pageIndex || 0,
    pageSize: value ? 12 : pagination.pageSize || 10,
    searchValue: searchVal || "",
    sortKey: sortKey || "lastModifiedDate",
    sortOrder: sortOrder?.toUpperCase() || "DESC"
  };
};

export const createTemplatePayload = (templateName, orderTemplate) => {
  return {
    createdBy: getLoggedInUserId(),
    orderTemplateName: templateName,
    tenantId: getTenantId(),
    roleId: getLoggedInUserRoleId(),
    orderTemplateDataDTO: orderTemplate
  };
};

export const getAuthToken = () => {
  return JSON.parse(sessionStorage.getItem("authInfo"))?.accessToken;
};

export const imageUrlToBinary = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch the image. Status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    // Convert the array buffer to a Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert the Uint8Array to a regular JavaScript array
    const binaryData = Array.from(uint8Array);

    return binaryData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getXtenantId = () => {
  return sessionStorage.getItem("tenantId");
};
