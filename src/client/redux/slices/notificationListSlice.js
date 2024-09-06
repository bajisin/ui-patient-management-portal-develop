import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NOTIFICATIONLIST } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";

const initialState = {
  notificationList: {}
};
const notificationListSlice = createSlice({
  name: "notification",
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
    builder.addCase(getNotificationList.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getNotificationList.fulfilled, (state, action) => {
      state.loading = false;
      state.notificationList = action.payload;
      state.error = "";
    });
    builder.addCase(getNotificationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});
export default notificationListSlice.reducer;

export const getNotificationList = createAsyncThunk("notificationList/post", async (data) => {
  return apiCall({
    url: NOTIFICATIONLIST.getNotificationList(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response?.data);
});
