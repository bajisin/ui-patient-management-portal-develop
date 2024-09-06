import {
  COMMON_API,
  DEV_BASE_URI,
  TENANT,
  TENANT_FACILITY,
  TENANT_FEATURES,
  TENANT_ORDER_CONFIGURATION,
  TENANT_STATUS,
  TENANT_USERS
} from "../../../../config/api-config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiCall } from "../../../../config/http-config";
import axios from "axios";
import dayjs from "dayjs";
import { getXtenantId } from "@utils/common";
import moment from "moment";

const initialState = {
  data: [],
  tenantUsers: [],
  tenantList: [],
  tenantOrders: [],
  tenantOrdersList: {},
  tenantPatients: [],
  ordersAndReports: [],
  reconciliationCounts: {},
  tenantById: {},
  tenantByEmail: [],
  orderTemplateList: [],
  // ordertestTemplateList: [],
  tenantByPhone: [],
  tenantTemplate: {},
  // ordertestTemplate: {},
  tenantLists: {},
  loading: false,
  success: "",
  error: "",
  isLoaded: false,
  labOrders: [],
  labCilentOrder: [],
  themes: [],
  patientsList: [],
  tenantStatus: false,
  tenantFeatures: [],
  featureStatus: "",
  showSuccessPopup: false,
  popupMessage: "",
  orderDetails: [],
  patientList: [],
  orderDetailsById: {},
  patientDetailsById: {},
  npiData: {},
  orderList: [],
  npiArray: [], // for temporary use,
  npiforInternal: [],
  tenantListData: [],
  updateStatus: {}
};

const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    }
  },
  // reducers: {
  // fetchTenants(state, action) {
  //   state.data = action.payload;
  // }
  // }
  extraReducers: (builder) => {
    builder.addCase(getTenants.pending, (state, action) => {
      state.loading = true;
      state.tenantList = [];
    });
    builder.addCase(getTenants.fulfilled, (state, action) => {
      state.tenantList = action?.payload?.data;
      state.totalCount = action?.payload?.totalCount;
      state.loading = false;
      state.isLoaded = true;
    });
    builder.addCase(getTenants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(orderListByFacilityId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(orderListByFacilityId.fulfilled, (state, action) => {
      state.orderList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(orderListByFacilityId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOrdersAndReports.pending, (state, action) => {
      state.loading = true;
      state.ordersAndReports = [];
    });
    builder.addCase(getOrdersAndReports.fulfilled, (state, action) => {
      state.ordersAndReports = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrdersAndReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantUsers.pending, (state, action) => {
      state.loading = true;
      state.tenantUsers = [];
    });
    builder.addCase(getTenantUsers.fulfilled, (state, action) => {
      state.tenantUsers = action.payload.data || [];
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(getTenantUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTenantList.pending, (state, action) => {
      state.loading = true;
      state.tenantUsers = [];
    });
    builder.addCase(getTenantList.fulfilled, (state, action) => {
      state.tenantListData = action.payload || [];
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(getTenantList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateStatus.pending, (state, action) => {
      state.loading = true;
      state.tenantUsers = [];
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.updateStatus = action.payload || [];
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTenantOrderDetails.pending, (state, action) => {
      state.loading = true;
      state.tenantOrdersList = {};
      state.tenantOrders = [];
    });
    builder.addCase(getTenantOrderDetails.fulfilled, (state, action) => {
      state.tenantOrdersList = action.payload.data;
      state.tenantOrders = action.payload;
      state.loading = false;
    });
    builder.addCase(getTenantOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTenantTemplateDetails.pending, (state, action) => {
      state.loading = true;
      state.tenantTemplate = {};
      state.orderTemplateList = [];
      state.status = false;
    });
    builder.addCase(getTenantTemplateDetails.fulfilled, (state, action) => {
      state.tenantTemplate = action.payload;
      state.orderTemplateList = action.payload.data;
      state.loading = false;
      state.status = true;
    });
    builder.addCase(getTenantTemplateDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantTestDetails.pending, (state, action) => {
      state.loading = true;
      // state.tenantLists = {};
      state.tenantOrderTests = [];
    });
    builder.addCase(getTenantTestDetails.fulfilled, (state, action) => {
      state.tenantLists = action.payload;
      state.tenantOrderTests = action.payload;
      state.loading = false;
      // state.status = "loaded";
    });
    builder.addCase(getTenantTestDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createTenants.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createTenants.fulfilled, (state, action) => {
      state.success = action.payload;
      state.loading = false;
    });
    builder.addCase(createTenants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateTenants.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTenants.fulfilled, (state, action) => {
      state.success = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTenants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantsById.pending, (state, action) => {
      state.loading = true;
      state.tenantById = [];
    });
    builder.addCase(getTenantsById.fulfilled, (state, action) => {
      state.tenantById = action.payload;
      state.loading = false;
    });
    builder.addCase(getTenantsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantsByEmail.pending, (state, action) => {
      state.loading = true;
      state.tenantByEmail = {};
    });
    builder.addCase(getTenantsByEmail.fulfilled, (state, action) => {
      state.tenantByEmail = action.payload;
      state.loading = false;
    });
    builder.addCase(getTenantsByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantsByPhone.pending, (state, action) => {
      state.loading = true;
      state.tenantByPhone = {};
    });
    builder.addCase(getTenantsByPhone.fulfilled, (state, action) => {
      state.tenantByPhone = action.payload;
      state.loading = false;
    });
    builder.addCase(getTenantsByPhone.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getLabDetails.pending, (state, action) => {
      state.loading = true;
      state.labOrders = [];
    });
    builder.addCase(getLabDetails.fulfilled, (state, action) => {
      state.labOrders = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(getLabDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getLabCilentDetails.pending, (state, action) => {
      state.loading = true;
      state.labCilentOrder = null; // Reset to an empty array when fetching new data
    });
    builder.addCase(getLabCilentDetails.fulfilled, (state, action) => {
      state.labCilentOrder = action.payload; // Assuming action.payload is an array of objects
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(getLabCilentDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getThemes.pending, (state, action) => {
      state.loading = true;
      state.themes = [];
    });
    builder.addCase(getThemes.fulfilled, (state, action) => {
      state.themes = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(getThemes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPatientDetails.pending, (state, action) => {
      state.loading = true;
      state.patientsList = [];
    });
    builder.addCase(getPatientDetails.fulfilled, (state, action) => {
      state.patientsList = action?.payload?.data;
      state.totalCount = action?.payload?.totalCount;
      state.loading = false;
      state.isLoaded = true;
    });
    builder.addCase(getPatientDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateTenantStatusDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTenantStatusDetails.fulfilled, (state, action) => {
      state.tenantStatus = action.payload;
      state.loading = false;
    });
    builder.addCase(updateTenantStatusDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFeatures.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFeatures.fulfilled, (state, action) => {
      state.tenantFeatures = action.payload;
      state.loading = false;
    });
    builder.addCase(getFeatures.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateFeatures.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateFeatures.fulfilled, (state, action) => {
      state.featureStatus = action.payload;
      state.loading = false;
    });
    builder.addCase(updateFeatures.rejected, (state, action) => {
      state.loading = false;
      state.featureStatus = action.error.message;
      state.error = action.error.message;
    });
    builder.addCase(saveTenant.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveTenant.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(saveTenant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.orderDetails = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPatientList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPatientList.fulfilled, (state, action) => {
      state.patientList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(getPatientList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getReconciliationCounts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getReconciliationCounts.fulfilled, (state, action) => {
      state.reconciliationCounts = action.payload;
      state.loading = false;
    });
    builder.addCase(getReconciliationCounts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOrderDetailsById.pending, (state, action) => {
      state.loading = true;
      state.orderDetailsById = {};
    });
    builder.addCase(getOrderDetailsById.fulfilled, (state, action) => {
      state.orderDetailsById = action.payload.data;
      state.loading = false;
    });
    builder.addCase(getOrderDetailsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPatientDetailsById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPatientDetailsById.fulfilled, (state, action) => {
      state.patientDetailsById = action.payload;
      state.loading = false;
    });
    builder.addCase(getPatientDetailsById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getNpiDetailsByNumber.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNpiDetailsByNumber.fulfilled, (state, action) => {
      state.npiData = action.payload;
      state.npiArray = action.payload; // for temporary use
      state.loading = false;
    });
    builder.addCase(getNpiDetailsByNumber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getNpiDetailsForInternal.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNpiDetailsForInternal.fulfilled, (state, action) => {
      state.npiforInternal = action.payload;
      state.loading = false;
    });
    builder.addCase(getNpiDetailsForInternal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { fetchTenants, setShowSuccessPopup, setPopupMessage } = tenantsSlice.actions;
export default tenantsSlice.reducer;
export const orderListByFacilityId = createAsyncThunk("orderList/post", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.orderListByFacilityId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
export const getTenants = createAsyncThunk(
  "tenants/get",
  async ({
    pagination,
    status,
    sortKey,
    sortOrder,
    searchValue,
    tenantIds,
    tenantStatus,
    startDate,
    endDate,
    role
  }) => {
    return apiCall({
      url: TENANT.getAllTenants(),
      method: "POST",
      data: {
        pageNo: pagination.pageIndex || 0,
        pageSize: pagination.pageSize || 10,
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder || "DESC",
        status: status || "All",
        searchValue: searchValue || "",
        tenantIds: tenantIds || [],
        tenantStatus: tenantStatus || [],
        startDate: (startDate && moment(startDate).format("YYYY-MM-DD")) || "",
        endDate: (endDate && moment(endDate).format("YYYY-MM-DD")) || "",
        role
      }
    }).then((response) => response?.data);
  }
);
export const getTenantUsers = createAsyncThunk("tenantUsers/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.getTenantUserDetails(),
    method: "POST",
    data: {
      pageNo: data.pagination.pageIndex || data.pagination.pageNo || 0,
      pageSize: data.pagination.pageSize || 10,
      sortKey: data.sortKey || "lastModifiedDate",
      sortOrder: data.sortOrder.toUpperCase() || "DESC",
      searchValue: data.searchValue || "",
      tenantId: data.tenantId,
      roleId: data.roleId,
      statusId: data.statusId || [],
      role: data.role,
      userId: data?.userId || [],
      startDate: data?.startDate ? dayjs(data?.startDate).format("YYYY-MM-DD") : "",
      endDate: data?.endDate ? dayjs(data?.endDate).format("YYYY-MM-DD") : ""
    }
  }).then((response) => response?.data);
});
export const getTenantList = createAsyncThunk("tenantList/post", async (data) => {
  return apiCall({
    url: TENANT.getTenantList(),
    method: "POST",
    data
  }).then((response) => response?.data);
});
export const updateStatus = createAsyncThunk("updateStatus/post", async (data) => {
  return apiCall({
    url: TENANT.updateStatus(),
    method: "POST",
    data
  }).then((response) => response?.data);
});

export const getTenantOrderDetails = createAsyncThunk("tenantOrderDetails/get", async (data) => {
  const result = await axios.get(`${DEV_BASE_URI}/tenantOrderDetails`);
  return result.data;
});
export const getPatientList = createAsyncThunk("getPatients/get", async (id) => {
  if (id) {
    const response = await axios.get(`${DEV_BASE_URI}/api-admin/patient/getTenants?patientId=${id}`, {
      headers: {
        "X-TenantID": getXtenantId(),
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
      }
    });


    return response.data;
  }
});

export const getTenantPatientDetails = createAsyncThunk("tenantPatientDetails/get", async (data) => {
  const result = await axios.get(`${DEV_BASE_URI}/tenantPatientDetails`);
  return result.data;
});

export const getTenantTemplateDetails = createAsyncThunk(
  "tenantTemplateDetails/get",
  async ({ pagination, sortKey, sortOrder, searchValue, tenantId, roleId }) => {
    return apiCall({
      url: TENANT_ORDER_CONFIGURATION.getOrderTemplateList(),
      method: "POST",
      data: {
        pageNo: pagination.pageIndex || 0,
        pageSize: pagination.pageSize || 10,
        searchValue: searchValue || "",
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder || "DESC",
        tenantId,
        roleId
      }
    }).then((response) => response?.data);
  }
);
export const getTenantTestDetails = createAsyncThunk(
  "tenantConfigurationTestDetails/get",
  async ({
    pagination,
    sortKey,
    sortOrder,
    searchValue,
    sortBy,
    tenantId,
    roleId,
    testIds,
    panelIds,
    testCategory
  }) => {
    return apiCall({
      url: TENANT_ORDER_CONFIGURATION.getTestList(),
      method: "POST",
      xTenantId: getXtenantId(),
      data: {
        pageNo: pagination.pageIndex || 0,
        pageSize: pagination.pageSize || 10,
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder.toUpperCase() || "DESC",
        searchValue: searchValue || "",
        tenantId,
        roleId,
        testIds,
        panelIds,
        testCategory
      }
    }).then((response) => response?.data);
  }
);

export const getOrdersAndReports = createAsyncThunk("orderReports/get", async (data) => {
  const result = await axios.get(`${DEV_BASE_URI}/orderReports`);
  return result.data;
});

export const createTenants = createAsyncThunk("tenants/post", async (data) => {
  const result = await axios.post(`${DEV_BASE_URI}/tenants`, data);
  return result;
});

export const updateTenants = createAsyncThunk("tenants/put", async (data) => {
  const result = await axios.put(`${DEV_BASE_URI}/tenants/${data.id}`, data);
  return result;
});

export const getTenantsById = createAsyncThunk("tenantsbyId/get", async (id) => {
  return apiCall({
    url: TENANT.getTenantById(id),
    method: "GET"
  }).then((response) => response);
});

export const getTenantsByEmail = createAsyncThunk("tenantsbyEmail/get", async (id) => {
  const result = await axios.get(`${DEV_BASE_URI}/tenants?emailAddress=${id}`);
  return result.data;
});

export const getTenantsByPhone = createAsyncThunk("tenantsbyPhone/get", async (id) => {
  const result = await axios.get(`${DEV_BASE_URI}/tenants?phoneNumber=${id}`);
  return result.data;
});
export const getLabDetails = createAsyncThunk("labsDetailsTable/get", async (data) => {
  const result = await axios.get(`http://localhost:3030/overviewLabDetails`);
  return result.data;
});
export const getLabCilentDetails = createAsyncThunk("labCilentDetailsTable/get", async (id) => {
  const result = await axios.get(`http://localhost:3030/cilentLabDetails?labDto.id=${id}`);
  return result.data;
});

export const getThemes = createAsyncThunk("themes/get", async () => {
  return apiCall({
    url: COMMON_API.theme(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});

export const getPatientDetails = createAsyncThunk("patients/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.getPatientDetails(),
    method: "POST",
    data
  }).then((res) => res?.data);
});

export const getOrderDetails = createAsyncThunk("orders/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.getOrderDetails(),
    method: "POST",
    data
  }).then((res) => res?.data);
});
export const getReconciliationCounts = createAsyncThunk("reconciliationCounts/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.getReconciliationCounts(),
    method: "GET"
  }).then((res) => res?.data);
});
export const updateTenantStatusDetails = createAsyncThunk(
  "updateTenantStatus/post",
  async ({ status, tenantId, role, createdBy }) => {
    // Assuming `updatedUser` is the modified user details object
    return apiCall({
      url: TENANT_STATUS.updateTenantStatus(),
      method: "POST",
      data: { status, tenantId, role, createdBy }
    }).then((response) => response.data);
  }
);
// export const updateTenantStatusDetails = createAsyncThunk("updateTenantStatus/post", async ({ status, tenantId }) => {
//   try {
//     const response = await apiCall({
//       url: TENANT_STATUS.updateTenantStatus(),
//       method: "POST",
//       data: { status, tenantId }
//     });

//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("API responded with an error status:", error.response.status);
//       console.error("Error details:", error.response.data);
//     } else {
//       console.error("Error making the API request:", error.message);
//     }

//     throw error; // Rethrow the error to be captured by the rejected action
//   }
// });

export const getFeatures = createAsyncThunk("getFeatures/get", async (data) => {
  return apiCall({
    url: TENANT_FEATURES.getFeatures(data.id, data.roleId),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res.data);
});

export const updateFeatures = createAsyncThunk("updateFeatures/post", async (data) => {
  return apiCall({
    url: TENANT_FEATURES.updateFeatures(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
export const saveTenant = createAsyncThunk("saveTenant/post", async (formData) => {
  // Assuming `updatedUser` is the modified user details object
  return apiCall({
    url: TENANT.saveTenant(),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "X-TenantID": getXtenantId(),
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
    },
    data: formData
  }).then((response) => response?.data);
});

export const getOrderDetailsById = createAsyncThunk("getOrdersById/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.getOrderDetailsById(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response);
});

export const getPatientDetailsById = createAsyncThunk("getPatientsById/get", async (data) => {
  // console.log(data,"data")
  // if(data?.patientId){
  return apiCall({
    url: TENANT_USERS.getPatientDetailsById(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
  // }

});

export const getNpiDetailsByNumber = createAsyncThunk("getNpiDetails/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.getNpiData(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});
export const getNpiDetailsForInternal = createAsyncThunk("getNpiDetailsForInternal/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.getNpiDataForInternal(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});
