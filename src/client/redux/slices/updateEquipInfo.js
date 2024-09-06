import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_EQUIPMENT_INFO } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { stuidoLayoutsMock, layoutInfoMock } from "../mockData/updateEquipMock";

const initialState = {
  layoutListing: { loading: false, data: [], error: "" },
  layoutInfo: { loading: false, data: {}, error: "" }
};

// UPDATE EQUIPMENT INFO REDUCER
export const updateEquipInfo = createSlice({
  name: "updateEquipInfo",
  initialState,
  extraReducers: (builder) => {
    // FOR FETCHING STUDIOS LISTING DATA
    builder.addCase(fetchStudioLayoutsListing.pending, (state) => {
      state.layoutListing.loading = true;
      state.layoutListing.data = [];
      state.layoutInfo.data = {};
      state.layoutListing.error = "";
    });
    builder.addCase(fetchStudioLayoutsListing.fulfilled, (state, action) => {
      state.layoutListing.loading = false;
      state.layoutListing.data = action.payload;
      state.layoutListing.error = "";
    });
    builder.addCase(fetchStudioLayoutsListing.rejected, (state, action) => {
      state.layoutListing.loading = false;
      state.layoutListing.data = stuidoLayoutsMock; // LOADING MOCK FOR NOW
      state.layoutListing.error = action.error.message;
    });
    // FOR FETCHING LAYOUT INFORMATION DATA
    builder.addCase(fetchLayoutInfo.pending, (state) => {
      state.layoutInfo.loading = true;
      state.layoutInfo.data = {};
      state.layoutInfo.error = "";
    });
    builder.addCase(fetchLayoutInfo.fulfilled, (state, action) => {
      state.layoutInfo.loading = false;
      state.layoutInfo.data = action.payload;
      state.layoutInfo.error = "";
    });
    builder.addCase(fetchLayoutInfo.rejected, (state, action) => {
      state.layoutInfo.loading = false;
      state.layoutInfo.data = layoutInfoMock; // LOADING MOCK FOR NOW
      state.layoutInfo.error = action.error.message;
    });
  }
});

// FOR FETCHING STUDIO LISTING API
export const fetchStudioLayoutsListing = createAsyncThunk("updateEquipInfo/fetchStudioLayoutsListing", (facilityId) => {
  return apiCall({ url: UPDATE_EQUIPMENT_INFO.fetch_studio_layouts_listing(facilityId), method: "GET" }).then(
    (response) => response
  );
});

// FOR FETCHING LAYOUT EQUIPMENT INFORMATION
export const fetchLayoutInfo = createAsyncThunk("updateEquipInfo/fetchLayoutInfo", (facilityStudioLayoutId) => {
  return apiCall({ url: UPDATE_EQUIPMENT_INFO.fetch_layout_informaion(facilityStudioLayoutId), method: "GET" }).then(
    (response) => response
  );
});
export default updateEquipInfo.reducer;
