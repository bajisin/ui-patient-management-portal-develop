import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DASHBOARD } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";

const initialState = {
  loading: false,
  reports: {},
  orderstats: {},
  error: "",
  dsrReports: {}
};

export const Reports = createSlice({
  name: "Reports",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dashboardStats.pending, (state) => {
      state.loading = true;
      state.stats = {};
      state.error = "";
    });
    builder.addCase(dashboardStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
      state.error = "";
    });
    builder.addCase(dashboardStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(dashboardReports.pending, (state) => {
      state.loading = true;
      state.reports = {};
      state.error = "";
    });
    builder.addCase(dashboardReports.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
      state.error = "";
    });
    builder.addCase(dashboardReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(dsrReports.pending, (state) => {
      state.loading = true;
      state.dsrReports = {};
      state.error = "";
    });
    builder.addCase(dsrReports.fulfilled, (state, action) => {
      state.loading = false;
      state.dsrReports = action.payload;
      state.error = "";
    });
    builder.addCase(dsrReports.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const dashboardReports = createAsyncThunk("dashboardReports/post", (payload) => {
  return apiCall({ url: DASHBOARD.getReports(), method: "POST", xTenantId: getXtenantId(), data: payload }).then(
    (response) => response
  );
});
export const dsrReports = createAsyncThunk("dsrReports/post", (payload) => {
  return apiCall({ url: DASHBOARD.getdsrReports(), method: "POST", xTenantId: getXtenantId(), data: payload }).then(
    (response) => response
  );
});
export const dashboardStats = createAsyncThunk("dashboardStats/post", (payload) => {
  return apiCall({ url: DASHBOARD.getOrderStat(), method: "POST", xTenantId: getXtenantId(), data: payload }).then(
    (response) => response
  );
});

export default Reports.reducer;
