import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DASHBOARDACTIVITY } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";
const initialState = {
  dashboardActivity: {}
};
const activityOverviewSlice = createSlice({
  name: "order",
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
    builder.addCase(getDashboardActivity.pending, (state) => {
      state.loading = true;
      //   state.dashboardActivity = [];
      state.error = "";
    });
    builder.addCase(getDashboardActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardActivity = action.payload;
      state.error = "";
    });
    builder.addCase(getDashboardActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default activityOverviewSlice.reducer;
export const getDashboardActivity = createAsyncThunk("dashboardActivity/post", async (data) => {
  return apiCall({
    url: DASHBOARDACTIVITY.getDashboardActivity(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response?.data);
});
