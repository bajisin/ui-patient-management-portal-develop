import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "@config/http-config";
import { CREATE_USER } from "@config/api-config";
import { getXtenantId } from "@utils/common";
// import { REDUX_KEYS } from "@helpers/constants";

const defaultSelect = { user: {} };

export const userSlice = createSlice({
  // name: REDUX_KEYS.REDUX_USER,
  name: "user",
  initialState: defaultSelect,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, { payload }) => {
      const redirectPath = payload || "/";
      localStorage.clear();
      window.location = redirectPath;
    }
  }

  // extraReducers: (builder) => {
  //   builder.addCase(createUser.pending, (state, action) => {
  //     state.loading = true;
  //   });
  //   builder.addCase(createUser.fulfilled, (state, action) => {
  //     state.success = action.payload;
  //     state.loading = false;
  //     state.showSuccessPopup = true;
  //     state.popupMessage = action.payload;
  //   });
  //   builder.addCase(createUser.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.error.message;
  //   });
  // }
});

// Action creators are generated for each case reducer function
export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

export const createUser = createAsyncThunk("user/post", async (data) => {
  return apiCall({
    url: CREATE_USER.createUser(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});

export const emailVerify = createAsyncThunk("email/get", async () => {
  return apiCall({
    url: CREATE_USER.emailVerify(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});
