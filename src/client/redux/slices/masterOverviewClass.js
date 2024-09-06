import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DEV_BASE_URI } from "../../../../config/api-config";
import axios from "axios";

const initialState = {
  data: [],
  masterUsers: [],
  loading: false
};
const masterSlice = createSlice({
  name: "master",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMasterDetails.pending, (state, action) => {
      state.loading = true;
      state.masterUsers = [];
    });
    builder.addCase(getMasterDetails.fulfilled, (state, action) => {
      state.masterUsers = action.payload;
      state.loading = false;
    });
    builder.addCase(getMasterDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});
export const { fetchMaster } = masterSlice.actions;
export default masterSlice.reducer;
export const getMasterDetails = createAsyncThunk("tenants/get", async (data) => {
  const result = await axios.get(`${DEV_BASE_URI}/tenants`);
  return result.data;
});
