import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BOOKING_PENALTY_REPORT } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { clsBookingDetaisMock } from "../mockData/bookingPenaltyMock";

const initialState = {
  loading: false,
  bookingDetails: {},
  error: ""
};

// BOOKING PENALITY REPORT
export const bookingPenaltyReport = createSlice({
  name: "bookingPenaltyReport",
  initialState,
  extraReducers: (builder) => {
    // FOR FETCHING CLASS BOOKING DETAILS
    builder.addCase(fetchClsBookingDetails.pending, (state) => {
      state.loading = true;
      state.bookingDetails = {};
      state.error = "";
    });
    builder.addCase(fetchClsBookingDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingDetails = action.payload;
      state.error = "";
    });
    builder.addCase(fetchClsBookingDetails.rejected, (state, action) => {
      state.loading = false;
      state.bookingDetails = clsBookingDetaisMock; // LOADING MOCK FOR NOW
      state.error = action.error.message;
    });
  }
});

// FOR FETCHING CLASS BOOKING DETAILS
export const fetchClsBookingDetails = createAsyncThunk("bookingPenaltyReport/fetchClBookingDetails", (payload) => {
  return apiCall({ url: BOOKING_PENALTY_REPORT.class_booking_details(payload), method: "GET" }).then(
    (response) => response
  );
});

export default bookingPenaltyReport.reducer;
