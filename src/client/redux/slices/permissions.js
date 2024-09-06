import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_USER_PERMISSIONS } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { mockPermissionsData } from "../mockData/permissions-mock";

const initialState = {
  loading: false,
  permissions: [],
  error: ""
};

// PERMISSIONS REDUCER
export const permissions = createSlice({
  name: "userPermissions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserPermissions.pending, (state) => {
      state.loading = true;
      state.permissions = [];
      state.error = "";
    });
    builder.addCase(fetchUserPermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.permissions = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserPermissions.rejected, (state, action) => {
      state.loading = false;
      state.permissions = mockPermissionsData; // LOADING MOCK DATA FOR NOW;
      state.error = action.error.message;
    });
  }
});

// GET USER PERMISSIONS BASED ON USER ID
export const fetchUserPermissions = createAsyncThunk("userPermissions/fetchUserPermissions", (userId) => {
  return apiCall({ url: FETCH_USER_PERMISSIONS(userId), method: "GET" }).then((response) => response);
});

export default permissions.reducer;
