import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CYCLING_AND_BOOKING } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { clubClassesMock } from "../../mockData/bookingPenaltyMock";
// import { REDUX_KEYS } from "@helpers/constants";

const initialState = {
  classes: { loading: false, data: [], error: "" },
  booking: { loading: false, data: [], error: "" }
};

// UPDATE EQUIPMENT INFO REDUCER
export const manageBooking = createSlice({
  name: "cyc-mb",
  initialState,
  extraReducers: (builder) => {
    // FOR FETCH CLASSES LISTING DATA
    builder.addCase(fetchClasses.pending, (state) => {
      state.classes.loading = true;
      state.classes.data = [];
      state.classes.error = "";
    });
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      state.classes.loading = false;
      state.classes.data = action.payload;
      state.classes.error = "";
    });
    builder.addCase(fetchClasses.rejected, (state, action) => {
      state.classes.loading = false;
      state.classes.data = clubClassesMock; // LOADING MOCK DATA FOR NOW
      state.classes.error = action.error.message;
    });

    // FOR FETCH BOOKING DETAILS
    builder.addCase(fetchBookingDetails.pending, (state) => {
      state.booking.loading = true;
      state.booking.data = [];
      state.booking.error = "";
    });
    builder.addCase(fetchBookingDetails.fulfilled, (state, action) => {
      state.booking.loading = false;
      state.booking.data = action.payload;
      state.booking.error = "";
    });
    builder.addCase(fetchBookingDetails.rejected, (state, action) => {
      state.booking.loading = false;
      state.booking.data = []; // LOADING MOCK DATA FOR NOW
      state.booking.error = action.error.message;
    });
  }
});

// FOR FETCHING CLASS DETAILS OF A CLUB API
export const fetchClasses = createAsyncThunk("updateEquipInfo/fetchClasses", ({ clubId, date }) => {
  return apiCall({ url: CYCLING_AND_BOOKING.club_wise_classes(clubId, date), method: "GET" }).then(
    (response) => response
  );
});

// FOR FETCHING CLASS DETAILS OF A CLUB API
export const fetchBookingDetails = createAsyncThunk("updateEquipInfo/fetchBookingDetails", ({ classId }) => {
  return apiCall({ url: CYCLING_AND_BOOKING.bike_reservation(classId), method: "GET" }).then((response) => response);
});

export default manageBooking.reducer;
