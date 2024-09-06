import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BROADCAST } from "@config/api-config";
import { TENANT_BROADCAST } from "../../../../config/api-config";
import { apiCall } from "@config/http-config";
import moment from "moment";
import { roleIds } from "../../_helpers/constants";
import { getXtenantId } from "@utils/common";

const initialState = {
  data: [],
  loading: false,
  status: "",
  error: "",
  broadcastById: {},
  totalCount: 0,
  showSuccessPopup: false,
  popupMessage: "",
  publicList: []
};
const boardCastSlice = createSlice({
  name: "boardCast",
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
    builder.addCase(getboardCastDetails.pending, (state, action) => {
      state.loading = true;
      state.data = [];
    });
    builder.addCase(getboardCastDetails.fulfilled, (state, action) => {
      state.data = action?.payload?.data;
      state.loading = false;
      state.totalCount = action?.payload?.totalCount;
    });
    builder.addCase(getboardCastDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createBroadCast.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createBroadCast.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(createBroadCast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateBroadCast.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBroadCast.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updateBroadCast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteBroadCast.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteBroadCast.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(deleteBroadCast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBroadCastById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBroadCastById.fulfilled, (state, action) => {
      state.broadcastById = action.payload;
      state.loading = false;
    });
    builder.addCase(getBroadCastById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBroadCastPublicList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBroadCastPublicList.fulfilled, (state, action) => {
      state.publicList = action.payload;
      state.loading = false;
    });
    builder.addCase(getBroadCastPublicList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateTenantBroadCast.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTenantBroadCast.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updateTenantBroadCast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));

export const { setShowSuccessPopup, setPopupMessage } = boardCastSlice.actions;
export default boardCastSlice.reducer;
export const getboardCastDetails = createAsyncThunk("boardCastAll/get", async (data) => {
  if (loggedInUser?.roleMasterDTO?.roleId === roleIds.SUPER_ADMIN) {
    return apiCall({
      url: BROADCAST.getBroacastList(),
      method: "POST",
      xTenantId: getXtenantId(),
      data
    }).then((response) => response?.data);
  } else if (loggedInUser?.roleMasterDTO?.roleId === roleIds?.TENANT_ADMIN) {
    return apiCall({
      url: TENANT_BROADCAST.getBroacastList(),
      method: "POST",
      xTenantId: getXtenantId(),
      data
    }).then((response) => response?.data);
  }
});

export const createBroadCast = createAsyncThunk("boardCastAll/post", async (data) => {
  if (loggedInUser?.roleMasterDTO?.roleId === roleIds.SUPER_ADMIN) {
    return apiCall({
      url: BROADCAST.createBroadcast(),
      method: "POST",
      xTenantId: getXtenantId(),
      data
    }).then((response) => response.data);
  } else if (loggedInUser?.roleMasterDTO?.roleId === roleIds?.TENANT_ADMIN) {
    return apiCall({
      url: TENANT_BROADCAST.createBroadcast(),
      method: "POST",
      xTenantId: getXtenantId(),
      data
    }).then((response) => response.data.message);
  }
});

export const updateBroadCast = createAsyncThunk("boardCastAll/put", async (data) => {
  return apiCall({
    url: BROADCAST.updateBroadcast(data.id),
    method: "POST",
    xTenantId: getXtenantId(),
    data: data.superAdminPayload
  }).then((response) => response?.data);
});

export const updateTenantBroadCast = createAsyncThunk("boardCastTenant/put", async (data) => {
  return apiCall({
    url: TENANT_BROADCAST.updateBroadcast(data.id),
    method: "POST",
    xTenantId: getXtenantId(),
    data: data.tenantAdminPayload
  }).then((response) => response?.data);
});

export const deleteBroadCast = createAsyncThunk("boardCastAll/delete", async (data) => {
  if (loggedInUser?.roleMasterDTO?.roleId === roleIds.SUPER_ADMIN) {
    return apiCall({
      url: BROADCAST.deleteBroadcast(data),
      method: "GET",
      xTenantId: getXtenantId()
    }).then((response) => response.data);
  } else if (loggedInUser?.roleMasterDTO?.roleId === roleIds?.TENANT_ADMIN) {
    return apiCall({
      url: TENANT_BROADCAST.deleteBroadcast(data),
      method: "GET",
      xTenantId: getXtenantId()
    }).then((response) => response.data);
  }
});

export const getBroadCastById = createAsyncThunk("boardCastById/get", async (data) => {
  if (loggedInUser?.roleMasterDTO?.roleId === roleIds.SUPER_ADMIN) {
    return apiCall({
      url: BROADCAST.getBroadcastById(data),
      method: "GET",
      xTenantId: getXtenantId()
    }).then((response) => response.data);
  } else if (loggedInUser?.roleMasterDTO?.roleId === roleIds?.TENANT_ADMIN) {
    return apiCall({
      url: TENANT_BROADCAST.getBroadcastById(data),
      method: "GET",
      xTenantId: getXtenantId()
    }).then((response) => response.data);
  }
});

export const getBroadCastPublicList = createAsyncThunk("broadcastPublic/get", async () => {
  return apiCall({
    url: BROADCAST.getBroadCastByPublic(),
    method: "POST",
    xTenantId: getXtenantId(),
    data: { fromDate: moment().format("YYYY-MM-DD HH:mm:ss") }
  }).then((res) => res.data);
});
