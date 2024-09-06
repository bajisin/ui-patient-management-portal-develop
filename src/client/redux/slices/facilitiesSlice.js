import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TENANT_FACILITY } from "@config/api-config";
import { apiCall } from "@config/http-config";
import axios from "axios";
import { getXtenantId } from "@utils/common";

const initialState = {
  data: [],
  loading: false,
  success: "",
  error: "",
  facilitiesOrders: [],
  facilityGrid: [],
  facilitiesOverviewOrder: null,
  showSuccessPopup: false,
  showFailPopup: false,
  popupMessage: "",
  totalCount: 0,
  clientList: [],
  patientList: [],
  orderList: [],
  facilitiesById: [],
  facilitiesByUserId: []
};

const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  // reducers: {
  // fetchTenants(state, action) {
  //   state.data = action.payload;
  // }
  // }
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
      // window.location.reload();
    },
    setShowFailPopup: (state, action) => {
      state.showFailPopup = action.payload;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFacilitiesById.pending, (state, action) => {
      state.loading = true;
      // state.facilitiesOrders = [];
    });
    builder.addCase(getFacilitiesById.fulfilled, (state, action) => {
      state.facilitiesById = action.payload;
      state.loading = false;
      state.status = "loaded";
      state.data = action.payload?.data;
      state.totalCount = action?.payload?.totalCount;
    });
    builder.addCase(getFacilitiesById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getFacilitiesByUserId.pending, (state, action) => {
      state.loading = true;
      // state.facilitiesOrders = [];
    });
    builder.addCase(getFacilitiesByUserId.fulfilled, (state, action) => {
      state.facilitiesByUserId = action.payload;
      state.loading = false;
      state.status = "loaded";
      state.data = action.payload?.data;
      state.totalCount = action?.payload?.totalCount;
    });
    builder.addCase(getFacilitiesByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getFacilitiesDetails.pending, (state, action) => {
      state.loading = true;
      // state.facilitiesOrders = [];
    });
    builder.addCase(getFacilitiesDetails.fulfilled, (state, action) => {
      state.facilitiesOrders = action.payload;
      state.loading = false;
      state.status = "loaded";
      state.data = action.payload.data;
      state.totalCount = action?.payload?.totalCount;
    });
    builder.addCase(getFacilitiesDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFacilitiesOverviewDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getFacilitiesOverviewDetails.fulfilled, (state, action) => {
      state.facilitiesOverviewOrder = action.payload; // Assuming action.payload is an array of objects
      state.loading = false;
    });
    builder.addCase(getFacilitiesOverviewDetails.rejected, (state, action) => {
      state.loading = false;
      state.showFailPopup = true;
      state.error = action.error.message;
    });
    builder.addCase(createFacility.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createFacility.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(createFacility.rejected, (state, action) => {
      state.loading = false;
      state.showFailPopup = true;
      state.error = action.error.message;
    });
    builder.addCase(clientListByFacilityId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clientListByFacilityId.fulfilled, (state, action) => {
      state.clientList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(clientListByFacilityId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(patientListByFacilityId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(patientListByFacilityId.fulfilled, (state, action) => {
      state.patientList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(patientListByFacilityId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(orderListByFacilityId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(orderListByFacilityId.fulfilled, (state, action) => {
      state.orderList = action.payload.data;
      state.loading = false;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(orderListByFacilityId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getFacilityGrid.pending, (state) => {
      state.loading = true;
      state.facilityGrid = [];
      state.error = "";
    });
    builder.addCase(getFacilityGrid.fulfilled, (state, action) => {
      state.loading = false;
      state.facilityGrid = action.payload;
      state.error = "";
    });
    builder.addCase(getFacilityGrid.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateFacilityStatus.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateFacilityStatus.fulfilled, (state, action) => {
      state.popupMessage = action.payload;
      state.showSuccessPopup = true;
      state.loading = false;
    });
    builder.addCase(updateFacilityStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { fetchFacilities, setShowSuccessPopup, setPopupMessage, setShowFailPopup } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;

export const getFacilitiesById = createAsyncThunk("overviewFacilitiesById/get", async (id) => {
  return apiCall({
    url: TENANT_FACILITY.getFacilitiesById(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response.data);
});

export const getFacilitiesByUserId = createAsyncThunk("getFacilitiesByUserId/get", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.getFacilitiesByUserId(data),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response.data);
});

export const getFacilitiesDetails = createAsyncThunk("overviewFacilitiesDetails/get", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.getFacilityList(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});

export const getFacilityGrid = createAsyncThunk("detailsFacilityGrid/post", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.getFacilityGrid(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response?.data);
});
export const getFacilitiesOverviewDetails = createAsyncThunk("facilitiesDetails/get", async (id) => {
  const result = await axios.get(`http://localhost:3030/facilitiesDetails?facilitiesDto.id=${id}`);
  return result.data;
});

export const createFacility = createAsyncThunk("createFacility/post", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.createFacility(),
    method: "POST",
    xTenantID: getXtenantId(),
    data
  }).then((response) => response.data);
});
export const clientListByFacilityId = createAsyncThunk("clientList/post", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.clientListByFacilityId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const patientListByFacilityId = createAsyncThunk("patientList/post", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.patientListByFacilityId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const orderListByFacilityId = createAsyncThunk("orderList/post", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.orderListByFacilityId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
export const updateFacilityStatus = createAsyncThunk("updateStatus/post", async (data) => {
  return apiCall({
    url: TENANT_FACILITY.updateFacilityStatus(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});
