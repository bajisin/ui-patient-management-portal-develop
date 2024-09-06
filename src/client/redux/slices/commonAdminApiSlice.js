import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { COMMON_ADMIN_APIS } from "../../../../config/api-config";
import { apiCall } from "@config/http-config";

const initialState = {
  loading: false,
  status: "",
  error: "",
  data: [],
  showSuccessPopup: false,
  popupMessage: "",
  orderableTypes: [],
  workGroupData: [],
  performingData: [],
  specimentData: [],
  continerTypeData: [],
  specimenFrozenType: [],
  instrumentList: [],
  facilityList: [],
  serviceList: [],
  managementGrpData: [],
  labsData: []
};

const commonAdminAPISlice = createSlice({
  name: "commonAdmin",
  initialState,

  extraReducers: (builder) => {
    // FOR FETCHING CLASS BOOKING DETAILS
    builder.addCase(fetchOrderableTypes.pending, (state) => {
      state.loading = true;
      state.orderableTypes = [];
      state.error = "";
    });
    builder.addCase(fetchOrderableTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.orderableTypes = action.payload;
      state.error = "";
    });
    builder.addCase(fetchOrderableTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchWorkGroup.pending, (state) => {
      state.loading = true;
      state.workGroupData = [];
      state.error = "";
    });
    builder.addCase(fetchWorkGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.workGroupData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchWorkGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPerformingDept.pending, (state) => {
      state.loading = true;
      state.performingData = [];
      state.error = "";
    });
    builder.addCase(getPerformingDept.fulfilled, (state, action) => {
      state.loading = false;
      state.performingData = action.payload;
      state.error = "";
    });
    builder.addCase(getPerformingDept.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSpecimentTypes.pending, (state) => {
      state.loading = true;
      state.specimentData = [];
      state.error = "";
    });
    builder.addCase(getSpecimentTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.specimentData = action.payload;
      state.error = "";
    });
    builder.addCase(getSpecimentTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getContainerTypes.pending, (state) => {
      state.loading = true;
      state.continerTypeData = [];
      state.error = "";
    });
    builder.addCase(getContainerTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.continerTypeData = action.payload;
      state.error = "";
    });
    builder.addCase(getContainerTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getInstrumentList.pending, (state) => {
      state.loading = true;
      state.instrumentList = [];
      state.error = "";
    });
    builder.addCase(getInstrumentList.fulfilled, (state, action) => {
      state.loading = false;
      state.instrumentList = action.payload;
      state.error = "";
    });
    builder.addCase(getInstrumentList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFacilityList.pending, (state) => {
      state.loading = true;
      state.facilityList = [];
      state.error = "";
    });
    builder.addCase(getFacilityList.fulfilled, (state, action) => {
      state.loading = false;
      state.facilityList = action.payload;
      state.error = "";
    });
    builder.addCase(getFacilityList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getServiceList.pending, (state) => {
      state.loading = true;
      state.serviceList = [];
      state.error = "";
    });
    builder.addCase(getServiceList.fulfilled, (state, action) => {
      state.loading = false;
      state.serviceList = action.payload;
      state.error = "";
    });
    builder.addCase(getServiceList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getManagementGrpData.pending, (state) => {
      state.loading = true;
      state.managementGrpData = [];
      state.error = "";
    });
    builder.addCase(getManagementGrpData.fulfilled, (state, action) => {
      state.loading = false;
      state.managementGrpData = action.payload;
      state.error = "";
    });
    builder.addCase(getManagementGrpData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getDaysLab.pending, (state) => {
      state.loading = true;
      state.labsData = [];
      state.error = "";
    });
    builder.addCase(getDaysLab.fulfilled, (state, action) => {
      state.loading = false;
      state.labsData = action.payload;
      state.error = "";
    });
    builder.addCase(getDaysLab.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getSpecimenFrozen.pending, (state) => {
      state.loading = true;
      state.specimenFrozenType = [];
      state.error = "";
    });
    builder.addCase(getSpecimenFrozen.fulfilled, (state, action) => {
      state.loading = false;
      state.specimenFrozenType = action.payload;
      state.error = "";
    });
    builder.addCase(getSpecimenFrozen.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });


  }
});

export default commonAdminAPISlice.reducer;

// FOR FETCHING Orderable DETAILS
export const fetchOrderableTypes = createAsyncThunk("users/fetchOrderableTypes", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getOrderableTypes(),
    method: "GET"
  }).then((response) => response.data);
});

// FOR FETCHING WorkGroup DETAILS
export const fetchWorkGroup = createAsyncThunk("users/fetchWorkGroup", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getWorkGroup(),
    method: "GET"
  }).then((response) => response.data);
});

// FOR FETCHING getPerformingDept DETAILS
export const getPerformingDept = createAsyncThunk("users/getPerformingDept", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getPerformingDept(),
    method: "GET"
  }).then((response) => response.data);
});

// FOR FETCHING getSpecimentTypes DETAILS
export const getSpecimentTypes = createAsyncThunk("users/getSpecimentTypes", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getSpecimentTypes(),
    method: "GET"
  }).then((response) => response.data);
});

// FOR FETCHING getContainer DETAILS
export const getContainerTypes = createAsyncThunk("users/getContainerTypes", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getContainerList(),
    method: "GET"
  }).then((response) => response.data);
});

// FOR FETCHING getInstrument DETAILS
export const getInstrumentList = createAsyncThunk("users/getInstrument", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getInstrumentList(),
    method: "GET"
  }).then((response) => response.data);
});
export const getFacilityList = createAsyncThunk("users/getFacility", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getFacilityList(),
    method: "GET"
  }).then((response) => response.data);
});

export const getServiceList = createAsyncThunk("users/getService", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getServiceList(),
    method: "GET"
  }).then((response) => response.data);
});

export const getManagementGrpData = createAsyncThunk("users/getManagementGrpData", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getManagementGrpData(),
    method: "GET"
  }).then((response) => response.data);
});

export const getDaysLab = createAsyncThunk("users/getDaysLab", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getDaysLab(),
    method: "GET"
  }).then((response) => response.data);
});
// Get Frozen
export const getSpecimenFrozen = createAsyncThunk("users/getSpecimenFrozen", (payload) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getSpecimenFrozen(),
    method: "GET"
  }).then((response) => response.data);
});
