import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { COMMON_ADMIN_APIS } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { getXtenantId } from "@utils/common";

const initialState = {
  loading: false,
  status: "",
  error: "",
  groupData: [],
  showSuccessPopup: false,
  popupMessage: ""
};
const patientsGroupSlice = createSlice({
  name: "patientsByGroup",
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
    builder.addCase(getPatientsByGroupId.pending, (state, action) => {
      state.loading = true;
      state.groupData = [];
    });
    builder.addCase(getPatientsByGroupId.fulfilled, (state, action) => {
      state.groupData = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(getPatientsByGroupId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(saveGroupData.pending, (state, action) => {
      state.loading = true;
      state.status = "";
    });
    builder.addCase(saveGroupData.fulfilled, (state, action) => {
      state.groupData.push(action.payload);
      state.loading = false;
      state.status = "added";
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(saveGroupData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateGroupData.pending, (state, action) => {
      state.loading = true;
      state.status = "";
    });
    builder.addCase(updateGroupData.fulfilled, (state, action) => {
      const objIndex = state.groupData.findIndex((obj) => obj.id === action.payload.id);

      state.groupData[objIndex] = action.payload;
      state.loading = false;
      state.status = "added";
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updateGroupData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteGroupData.pending, (state, action) => {
      state.loading = true;
      state.status = "";
    });
    builder.addCase(deleteGroupData.fulfilled, (state, action) => {
      const objIndex = state.groupData.findIndex((obj) => obj.id === action.payload.id);

      state.groupData.splice(objIndex, 1);
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(deleteGroupData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default patientsGroupSlice.reducer;
export const { setShowSuccessPopup, setPopupMessage } = patientsGroupSlice.actions;
export const getPatientsByGroupId = createAsyncThunk("patientsByGroup/get", async (data) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getGroupByList(data),
    method: "GET",
    xTenantID: getXtenantId()
  }).then((response) => response.data);
});
export const saveGroupData = createAsyncThunk("patientsByGroup/post", async (data) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.saveUpdate(data.url),
    method: "POST",
    xTenantID: getXtenantId(),
    data: data.payload
  }).then((response) => response.data);
});

export const updateGroupData = createAsyncThunk("patientsByGroup/put", async (data) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.saveUpdate(data.url),
    method: "POST",
    xTenantID: getXtenantId(),
    data: data.payload
  }).then((response) => response.data);
});

export const deleteGroupData = createAsyncThunk("patientsByGroup/delete", async (id) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.deleteGroup(id),
    method: "POST",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});

export const deleteOrdersGroupData = createAsyncThunk("patientsByGroup/delete", async (id) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.deleteOrdersGroup(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});