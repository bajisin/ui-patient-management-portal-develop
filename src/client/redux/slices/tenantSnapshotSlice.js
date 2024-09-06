import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TENANTSNAPSHOT } from "../../../../config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";

const initialState = {
  tenantSnapshot: {},
  verifyEmail: {}
};
const tenantSnapShotSlice = createSlice({
  name: "snapshot",
  initialState,
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
      window.location.reload();
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getverifyEmail.pending, (state) => {
      state.loading = true;
      //   state.dashboardActivity = [];
      state.error = "";
    });
    builder.addCase(getverifyEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.verifyEmail = action.payload;
      state.error = "";
    });
    builder.addCase(getverifyEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantSnapshot.pending, (state) => {
      state.loading = true;
      //   state.dashboardActivity = [];
      state.error = "";
    });
    builder.addCase(getTenantSnapshot.fulfilled, (state, action) => {
      state.loading = false;
      state.tenantSnapshot = action.payload;
      state.error = "";
    });
    builder.addCase(getTenantSnapshot.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default tenantSnapShotSlice.reducer;
export const getTenantSnapshot = createAsyncThunk("tenantSnapshot/post", async (data) => {
  return apiCall({
    url: TENANTSNAPSHOT.getTenantSnapshot(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response?.data);
});
export const getverifyEmail = createAsyncThunk("verifyEmail/post", async (data) => {
  return apiCall({
    url: TENANTSNAPSHOT.getverifyEmail(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response?.data);
});
