import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TENANT_ORDER_CONFIGURATION } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";

// import { apiCall } from "../../../../config/http-config";

// import axios from "axios";

const initialState = {
  ordertestTemplateList: [],
  ordertestTemplate: {},
  orderDuplicateCheck: [],
  loading: false,
  success: "",
  error: "",
  check: [],
  orderTestList: [],
  showSuccessPopup: false,
  popupMessage: "",
  successStatus: "",
  panelList: [],
  idvTestList: [],
  totalCount: 0,
  panelDuplicateCheck: []
};

const orderTemplateSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = true;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload?.data;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderTemplateDetails.pending, (state, action) => {
      state.loading = true;
      state.ordertestTemplateList = [];
    });
    builder.addCase(getOrderTemplateDetails.fulfilled, (state, action) => {
      state.ordertestTemplateList = action?.payload?.data;
      state.loading = false;
      state.totalCount = action?.payload?.totalCount;
    });
    builder.addCase(getOrderTemplateDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getOrderTemplateById.pending, (state, action) => {
      state.loading = true;
      state.ordertestTemplate = {};
    });
    builder.addCase(getOrderTemplateById.fulfilled, (state, action) => {
      state.ordertestTemplate = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderTemplateById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOrderDuplicateCheck.pending, (state, action) => {
      state.loading = true;
      state.orderDuplicateCheck = {};
    });
    builder.addCase(getOrderDuplicateCheck.fulfilled, (state, action) => {
      state.orderDuplicateCheck = action.payload;
      state.check = action;
      state.loading = false;
    });
    builder.addCase(getOrderDuplicateCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTestList.pending, (state, action) => {
      state.loading = true;
      state.orderTestList = [];
    });
    builder.addCase(getTestList.fulfilled, (state, action) => {
      state.orderTestList = action.payload?.data;
      state.loading = false;
      state.totalCount = action?.payload?.totalCount;
    });
    builder.addCase(getTestList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createOrderTemplate.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrderTemplate.fulfilled, (state, action) => {
      state.successStatus = action?.payload?.status;
      state.popupMessage = action.payload?.data;
      state.loading = false;
      state.showSuccessPopup = true;
    });
    builder.addCase(createOrderTemplate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createPanel.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createPanel.fulfilled, (state, action) => {
      state.popupMessage = action.payload?.data;
      state.loading = false;
      state.showSuccessPopup = true;
    });
    builder.addCase(createPanel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteTest.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTest.fulfilled, (state, action) => {
      state.popupMessage = action.payload?.data;
      state.loading = false;
      state.showSuccessPopup = true;
    });
    builder.addCase(deleteTest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getPanelList.pending, (state, action) => {
      state.loading = true;
      state.panelList = [];
    });
    builder.addCase(getPanelList.fulfilled, (state, action) => {
      state.panelList = action.payload?.data;
      state.loading = false;
      state.totalCount = action.payload?.totalCount;
    });
    builder.addCase(getPanelList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getIdvTestList.pending, (state, action) => {
      state.loading = true;
      state.idvTestList = [];
    });
    builder.addCase(getIdvTestList.fulfilled, (state, action) => {
      state.idvTestList = action.payload?.data;
      state.loading = false;
      state.totalCount = action.payload?.totalCount;
    });
    builder.addCase(getIdvTestList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(duplicateCheck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(duplicateCheck.fulfilled, (state, action) => {
      state.panelDuplicateCheck = action.payload;
      state.loading = false;
    });
    builder.addCase(duplicateCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { setShowSuccessPopup, setPopupMessage } = orderTemplateSlice.actions;
export default orderTemplateSlice.reducer;
export const getOrderTemplateDetails = createAsyncThunk("orderTemplateDetails/post", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.getOrderTemplateList(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});

export const getOrderDuplicateCheck = createAsyncThunk("orderDuplicateCheck/get", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.getOrderDuplicateCheck(data.orderTemplateName),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
export const getOrderTemplateById = createAsyncThunk("orderById/get", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.getOrderTemplateById(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const getTestList = createAsyncThunk("testList/get", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.getTestList(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const createOrderTemplate = createAsyncThunk("createOrder/post", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.createOrder(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const createPanel = createAsyncThunk("createPanel/post", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.createPanel(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const deleteTest = createAsyncThunk("deleteTest/get", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.deleteTest(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const getPanelList = createAsyncThunk("panelList/get", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.getTestList(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const getIdvTestList = createAsyncThunk("idvTestList/get", async (data) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.getTestList(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const duplicateCheck = createAsyncThunk("duplicateCheck/get", async (name) => {
  return apiCall({
    url: TENANT_ORDER_CONFIGURATION.duplicateCheck(name),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res.data);
});
