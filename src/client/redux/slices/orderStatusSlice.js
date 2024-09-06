import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DASHBOARDSTATUS } from "../../../../config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";

const initialState = {
  orderStatus: {}
};

const orderStatusSlice = createSlice({
  name: "orderstatus",
  initialState,

  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderStatusDashboard.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(orderStatusDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.orderStatus = action.payload;
      state.error = "";
    });
    builder.addCase(orderStatusDashboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});
export default orderStatusSlice.reducer;

export const orderStatusDashboard = createAsyncThunk("orderStatus/post", async (data) => {
  return apiCall({
    url: DASHBOARDSTATUS.orderStatusDashboard(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
