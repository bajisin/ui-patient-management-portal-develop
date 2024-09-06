import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CYCLING_AND_BOOKING } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { CLUBS } from "@redux/mockData/clubs";
// import { REDUX_KEYS } from "@helpers/constants";

const initialState = {
  loading: false,
  clubs: [],
  error: ""
};

// UPDATE EQUIPMENT INFO REDUCER
export const cyclingAndBookableCommon = createSlice({
  name: "cyc-book",
  initialState,
  extraReducers: (builder) => {
    // FOR FETCH CLUBS LISTING DATA
    builder.addCase(fetchClubs.pending, (state) => {
      state.loading = true;
      state.clubs = [];
      state.error = "";
    });
    builder.addCase(fetchClubs.fulfilled, (state, action) => {
      state.loading = false;
      state.clubs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchClubs.rejected, (state, action) => {
      state.loading = false;
      state.clubs = CLUBS; // LOADING MOCK DATA FOR NOW
      state.error = action.error.message;
    });
  }
});

// FOR FETCHING CLUBS LISTING API
export const fetchClubs = createAsyncThunk(`${"cyc-book"}/fetchClubs`, () => {
  return apiCall({ url: CYCLING_AND_BOOKING.clubs, method: "GET" }).then((response) => response);
});

export default cyclingAndBookableCommon.reducer;
