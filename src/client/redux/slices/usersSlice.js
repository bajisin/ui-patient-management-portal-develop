import { COMMON_API, FETCH_LOGGEDIN_USER_DETAILS, TENANT_USERS } from "../../../../config/api-config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiCall } from "@config/http-config";
import axios from "axios";
import { getXtenantId } from "@utils/common";

const initialState = {
  loading: false,
  status: "",
  error: "",
  usersByEmail: [],
  featuresList: [],
  usersByPhone: [],
  data: [],
  userById: {},
  usersDetailsId: [],
  usersDetailsList: [],
  showSuccessPopup: false,
  popupMessage: "",
  tntDetailsLoading: false,
  tenantUserById: {},
  clientStatus: ""
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    }
  },
  // reducers: {
  // fetchTenants(state, action) {
  //   state.data = action.payload;
  // }
  // }
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.success = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createAdmin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(createAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(acceptTerms.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(acceptTerms.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(acceptTerms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.success = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // FOR FETCHING CLASS BOOKING DETAILS
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.userDetails = {};
      state.error = "";
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      sessionStorage.setItem("notificationFlag", action?.payload?.notificationFlag)
      state.loading = false;
      state.userDetails = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // builder.addCase(getUsersByEmail.pending, (state, action) => {
    //   state.loading = true;
    // });
    builder.addCase(getUsersByEmail.fulfilled, (state, action) => {
      state.usersByEmail = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersByEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFeaturesList.fulfilled, (state, action) => {
      state.featuresList = action.payload;
      state.loading = false;
    });
    builder.addCase(getFeaturesList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // builder.addCase(getUsersByPhone.pending, (state, action) => {
    //   state.loading = true;
    // });
    builder.addCase(getUsersByPhone.fulfilled, (state, action) => {
      state.usersByPhone = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersByPhone.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUsersByRole.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsersByRole.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersByRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getUsersDetailsId.pending, (state, action) => {
      state.loading = true;
      state.usersDetailsId = [];
      state.error = "";
    });
    builder.addCase(getUsersDetailsId.fulfilled, (state, action) => {
      state.usersDetailsId = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersDetailsId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUsersDetailsList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsersDetailsList.fulfilled, (state, action) => {
      state.usersDetailsList = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersDetailsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantAssetDetails.pending, (state, action) => {
      state.tntDetailsLoading = true;
    });
    builder.addCase(getTenantAssetDetails.fulfilled, (state, action) => {
      state.tntDetailsLoading = false;
    });
    builder.addCase(getTenantAssetDetails.rejected, (state, action) => {
      state.tntDetailsLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getTenantUserById.pending, (state, action) => {
      state.tntDetailsLoading = true;
    });
    builder.addCase(getTenantUserById.fulfilled, (state, action) => {
      state.tntDetailsLoading = false;
      state.tenantUserById = action.payload;
      localStorage.setItem("roleId", action?.payload?.roles[0]?.roleId || "");
      localStorage.setItem("userId", action?.payload?.userId);
    });
    builder.addCase(getTenantUserById.rejected, (state, action) => {
      state.tntDetailsLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateClientStatusDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateClientStatusDetails.fulfilled, (state, action) => {
      state.clientStatus = action.payload;
      state.loading = false;
    });
    builder.addCase(updateClientStatusDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});
export const { setShowSuccessPopup, setPopupMessage, fetchUsers } = usersSlice.actions;
// export const { fetchUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const createUser = createAsyncThunk("users/post", async (data) => {
  return apiCall({
    url: TENANT_USERS.createTenantUser(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});

export const updateUser = createAsyncThunk("users/put", async (data) => {
  return apiCall({
    url: TENANT_USERS.updateClientDetails(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});

// FOR FETCHING USER DETAILS
export const fetchUserDetails = createAsyncThunk("users/fetchUserDetails", (payload) => {
  console.trace();
  return apiCall({
    url: FETCH_LOGGEDIN_USER_DETAILS(),
    method: "GET"
  }).then((response) => response.data);
});

export const getUsersByEmail = createAsyncThunk("usersbyEmail/get", async (email) => {
  return apiCall({
    url: COMMON_API.emailValidation(email),
    method: "GET"
  }).then((response) => response.data);
});
export const getFeaturesList = createAsyncThunk("featuresList/get", async (userId) => {
  return apiCall({
    url: COMMON_API.getFeaturesList(userId),
    method: "GET"
  }).then((response) => response.data);
});

export const getUsersByPhone = createAsyncThunk("usersbyPhone/get", async (phone) => {
  return apiCall({
    url: COMMON_API.phoneValidation(phone),
    method: "GET"
  }).then((response) => response.data);
});
export const getUsersByRole = createAsyncThunk("usersByRole/get", async (role) => {
  const result = await axios.get(`http://localhost:3030/users?role=${role}`);
  return result.data;
});

export const createAdmin = createAsyncThunk("usersAdmin/post", async (data) => {
  return apiCall({
    url: TENANT_USERS.createAdmin(),
    method: "POST",
    data
  }).then((response) => response.data);
});
export const getUsersDetailsId = createAsyncThunk("usersDetailById/get", async (id) => {
  return apiCall({
    url: TENANT_USERS.getUserInfoByID(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response.data);
});
export const getUsersDetailsList = createAsyncThunk("usersDetailsList/get", async (id) => {
  // if(id){
  return apiCall({
    url: TENANT_USERS.getSuperadminList(id),
    method: "GET",
    id
  }).then((response) => response.data);
  // }
});

export const updateUserDetails = createAsyncThunk("userDetails/update", async (updatedUser) => {
  // Assuming `updatedUser` is the modified user details object
  return apiCall({
    url: TENANT_USERS.updateAdmin(),
    method: "POST",
    data: updatedUser
  }).then((response) => response.data);
});
export const getTenantAssetDetails = createAsyncThunk("tenantAsset/get", async (data, { rejectWithValue }) => {
  try {
    return apiCall({
      url: COMMON_API.getTenantAssetDetails(),
      method: "GET",
      xTenantId: getXtenantId() || data
    }).then((res) => sessionStorage.setItem("tntAssetDetails", res?.data && JSON.stringify(res.data)));
  } catch (err) {
    if (!err.response) {
      console.log(err.response);
    }
    return rejectWithValue(err);
  }
});
export const acceptTerms = createAsyncThunk("acceptTerms/post", async (acceptTerms) => {
  return apiCall({
    url: TENANT_USERS.acceptTerms(),
    method: "POST",
    data: acceptTerms
  }).then((response) => response.data);
});

export const getTenantUserById = createAsyncThunk("tenantUserById/get", async (id) => {
  return apiCall({
    url: TENANT_USERS.getTenantUserById(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res.data);
});

export const updateClientStatusDetails = createAsyncThunk("clientStatus/get", async (data) => {
  return apiCall({
    url: TENANT_USERS.updateClientStatus(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
