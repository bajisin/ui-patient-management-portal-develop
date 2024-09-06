import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TENANT_LABS } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";

const initialState = {
  data: [],
  loading: false,
  success: "",
  error: "",
  labById: {},
  showSuccessPopup: false,
  popupMessage: "",
  totalCount: 0,
  clientList: [],
  patientList: [],
  orderList: []
};

const labsSlice = createSlice({
  name: "labs",
  initialState,
  // reducers: {
  // fetchTenants(state, action) {
  //   state.data = action.payload;
  // }
  // }
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
      // window.location.reload();
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllLabs.pending, (state, action) => {
      state.loading = true;
      // state.facilitiesOrders = [];
    });
    builder.addCase(getAllLabs.fulfilled, (state, action) => {
      state.loading = false;
      state.totalCount = action.payload.totalCount;
      state.data = action.payload.data;
    });
    builder.addCase(getAllLabs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createLab.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createLab.fulfilled, (state, action) => {
      state.showSuccessPopup = true; // Assuming action.payload is an array of objects
      state.loading = false;
      state.status = "loaded";
      state.popupMessage = action.payload;
    });
    builder.addCase(createLab.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateLab.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateLab.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updateLab.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getLabById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLabById.fulfilled, (state, action) => {
      state.labById = action.payload;
      state.loading = false;
    });
    builder.addCase(getLabById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateLabStatus.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateLabStatus.fulfilled, (state, action) => {
      state.popupMessage = action.payload;
      state.showSuccessPopup = true;
      state.loading = false;
    });
    builder.addCase(updateLabStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(clientListByLabId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clientListByLabId.fulfilled, (state, action) => {
      state.clientList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
      // console.log(action.payload.data, "kk")
    });
    builder.addCase(clientListByLabId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(patientListByLabId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patientListByLabId.fulfilled, (state, action) => {
      state.patientList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(patientListByLabId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(orderListByLabId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(orderListByLabId.fulfilled, (state, action) => {
      state.orderList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(orderListByLabId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { setShowSuccessPopup, setPopupMessage } = labsSlice.actions;
export default labsSlice.reducer;

export const getAllLabs = createAsyncThunk("getAllLabs/get", async (data) => {
  return apiCall({
    url: TENANT_LABS.getAllLabs(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});
export const createLab = createAsyncThunk("create/get", async (data) => {
  return apiCall({
    url: TENANT_LABS.createLab(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response.data);
});

export const updateLab = createAsyncThunk("update/post", async (data) => {
  return apiCall({
    url: TENANT_LABS.updateLab(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response.data);
});

export const getLabById = createAsyncThunk("getById/get", async (id) => {
  return apiCall({
    url: TENANT_LABS.getLabById(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res);
});

export const updateLabStatus = createAsyncThunk("updateStatus/post", async (data) => {
  return apiCall({
    url: TENANT_LABS.updateLabStatus(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const clientListByLabId = createAsyncThunk("clientList/post", async (data) => {
  return apiCall({
    url: TENANT_LABS.clientListByLabId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const patientListByLabId = createAsyncThunk("patientList/post", async (data) => {
  return apiCall({
    url: TENANT_LABS.patientListByLabId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const orderListByLabId = createAsyncThunk("orderList/post", async (data) => {
  return apiCall({
    url: TENANT_LABS.orderListByLabId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
