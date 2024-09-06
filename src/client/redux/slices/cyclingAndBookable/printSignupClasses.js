import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CYCLING_AND_BOOKING } from "@config/api-config";
import { apiCall } from "@config/http-config";
import { SIGNUP_CLASSES } from "@redux/mockData/signupClasses";
// import { REDUX_KEYS } from "@helpers/constants";

const initialState = {
  loading: false,
  data: [],
  error: ""
};

// UPDATE EQUIPMENT INFO REDUCER
export const printSignupClasses = createSlice({
  name: "cyc-prt-cls",
  initialState,
  extraReducers: (builder) => {
    // FOR FETCH CLUBS LISTING DATA
    builder.addCase(fetchPrintClasses.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = "";
    });
    builder.addCase(fetchPrintClasses.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPrintClasses.rejected, (state, action) => {
      state.loading = false;
      state.data = SIGNUP_CLASSES; // LOADING MOCK DATA FOR NOW
      state.error = action.error.message;
    });
  }
});

// FOR FETCHING SIGNUP CLASSES AS PER CLUB ID
export const fetchPrintClasses = createAsyncThunk("cyc-prt-cls/fetchPrintClasses", ({ clubId }) => {
  return apiCall({ url: CYCLING_AND_BOOKING.print_signUp_classes_list(clubId), method: "GET" }).then(
    (response) => response
  );
});

export default printSignupClasses.reducer;
