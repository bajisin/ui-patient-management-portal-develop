import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "@config/http-config";
import { UPDATE_REGISTER_MEMBER } from "@config/api-config";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: "",
  success: ""
};

// REGISTER MEMBER REDUCER
export const registerMember = createSlice({
  name: "registerMember",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateRegisterMember.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = "";
    });
    builder.addCase(updateRegisterMember.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.error = "";
    });
    builder.addCase(updateRegisterMember.rejected, (state, action) => {
      state.loading = false;
      state.success = ""; // LOADING MOCK DATA FOR NOW;
      state.error = action.error.message;
      toast.error("Unable to register member. Your membership could not be located");
    });
  }
});

export const updateRegisterMember = createAsyncThunk("registerMember/updateRegisterMember", (data) => {
  return apiCall({ url: UPDATE_REGISTER_MEMBER(), method: "PUT", data }).then((response) => response);
});
export default registerMember.reducer;
