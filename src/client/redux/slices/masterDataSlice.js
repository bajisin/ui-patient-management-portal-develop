import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { MASTER_DATA } from "@config/api-config";
import { apiCall } from "@config/http-config";
import axios from "axios";
import { getXtenantId } from "@utils/common";

const initialState = {
  loading: false,
  status: "",
  error: "",
  aboutUsData: {},
  faqData: [],
  delete: {},
  update: {},
  create: {},
  abn: {},
  abnUpload: "",
  codeMap: ""
};
const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMasterDataByTenatId.pending, (state, action) => {
      state.loading = true;
      state.aboutUsData = {};
    });
    builder.addCase(getMasterDataByTenatId.fulfilled, (state, action) => {
      state.aboutUsData = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(getMasterDataByTenatId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // Handling getAbn actions
    builder.addCase(getAbn.pending, (state, action) => {
      state.loading = true;
      state.abn = {};
    });
    builder.addCase(getAbn.fulfilled, (state, action) => {
      state.abn = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(getAbn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateAboutUs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAboutUs.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.loading = false;
    });
    builder.addCase(updateAboutUs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(abnUpload.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(abnUpload.fulfilled, (state, action) => {
      state.abnUpload = action.payload.status;
      state.loading = false;
    });
    builder.addCase(abnUpload.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(codeMap.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(codeMap.fulfilled, (state, action) => {
      state.codeMap = action.payload.status;
      state.loading = false;
    });
    builder.addCase(codeMap.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFAQs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFAQs.fulfilled, (state, action) => {
      state.faqData = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(getFAQs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateFAQs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateFAQs.fulfilled, (state, action) => {
      state.update = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(updateFAQs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createFAQs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createFAQs.fulfilled, (state, action) => {
      state.create = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(createFAQs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteFAQs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteFAQs.fulfilled, (state, action) => {
      state.delete = action.payload;
      state.loading = false;
      state.status = "loaded";
    });
    builder.addCase(deleteFAQs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default masterDataSlice.reducer;

export const getMasterDataByTenatId = createAsyncThunk("masterData/get", async (id) => {
  return apiCall({
    url: MASTER_DATA.getMasterData(id),
    method: "GET"
  }).then((res) => res);
});
export const getAbn = createAsyncThunk("abn/get", async (id) => {
  return apiCall({
    url: MASTER_DATA.getAbn(id),
    method: "GET"
  }).then((resp) => resp);
});

export const updateAboutUs = createAsyncThunk("updateAboutus/post", async (formData) => {
  return axios
    .post(MASTER_DATA.saveTenantMasterData(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-TenantID": getXtenantId(),
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
      }
    })
    .then((response) => response);
});
export const abnUpload = createAsyncThunk("abnUpload/post", async (formData) => {
  return axios
    .post(MASTER_DATA.abnUpload(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-TenantID": getXtenantId(),
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
      }
    })
    .then((response) => response);
});
export const codeMap = createAsyncThunk("codeMap/post", async (formData) => {
  return axios
    .post(MASTER_DATA.codeMap(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-TenantID": getXtenantId(),
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
      }
    })
    .then((response) => response);
});

export const getFAQs = createAsyncThunk("getFAQs/get", async (tenantId) => {
  return apiCall({
    url: MASTER_DATA.getFAQs(tenantId),
    method: "GET",
    xTenantID: getXtenantId()
  }).then((response) => response.data);
});

export const updateFAQs = createAsyncThunk("getFAQs/update", async (data, { rejectWithValue }) => {
  return apiCall({
    url: MASTER_DATA.updateFAQs(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response.data);
});

export const deleteFAQs = createAsyncThunk("getFAQs/delete", async (id) => {
  return apiCall({
    url: MASTER_DATA.deleteFAQs(id),
    method: "GET",
    xTenantID: getXtenantId()
  }).then((response) => response.data);
});

export const createFAQs = createAsyncThunk("getFAQs/create", async (data) => {
  return apiCall({
    url: MASTER_DATA.createFAQs(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response.data);
});

export const saveMasterOrder = createAsyncThunk("saveMasterOrder/post", async (data) => {
  return apiCall({
    url: MASTER_DATA.saveOrderMaster(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response.data);
});
