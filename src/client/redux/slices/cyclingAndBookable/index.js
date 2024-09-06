// import { REDUX_KEYS } from "@helpers/constants";
import commonReducer from "./common";
import printSignupClasses from "./printSignupClasses";
import manageBookingReducer from "./manageBooking";

const cycleAndBookableReducers = {
  "cyc-book": commonReducer,
  "cyc-prt-cls": printSignupClasses,
  "cyc-mb": manageBookingReducer
};

export default cycleAndBookableReducers;
