import broadcastSlice from "@redux/slices/boardCastSlice";
import commonAdminApiSlice from "@redux/slices/commonAdminApiSlice";
import compendiumSlice from "@redux/slices/compendiumSlice";
import { configureStore } from "@reduxjs/toolkit";
import facilitiesSlice from "@redux/slices/facilitiesSlice";
// import labsSlice from "@redux/slices/labs-slice";
import masterDataSlice from "@redux/slices/masterDataSlice";
// import orderSlice from "./slices/order-slice";
import orderTemplateSlice from "@redux/slices/ordertemplateSlice";
import patientsGroupSlice from "@redux/slices/masterData/patientsGroupSlice";
import tenantsSlice from "@redux/slices/tenantsSlice";
import userReducer from "@redux/slices/user";
import usersSlice from "@redux/slices/usersSlice";
import labsSlice from "@redux/slices/labs-slice";
import orderSlice from "./slices/order-slice";
import orderStatusSlice from "./slices/orderStatusSlice";
// import labsSlice from "@redux/slices/labs-slice";
// import orderSlice from "./slices/order-slice";
import activityOverviewSlice from "./slices/activityOverviewSlice";
import notificationListSlice from "./slices/notificationListSlice";
import tenantSnapshotSlice from "./slices/tenantSnapshotSlice";
// import { REDUX_KEYS } from "@helpers/constants";
import dashboardSlice from "./slices/dashboardSlice";

// Configure Store will have automatically do combineReducers
// https://github.com/reduxjs/redux-toolkit/blob/v1.8.0/packages/toolkit/src/configureStore.ts#L144
const store = configureStore({
  reducer: {
    user: userReducer,
    tenants: tenantsSlice,
    broadCasts: broadcastSlice,
    masterData: masterDataSlice,
    userDetails: usersSlice,
    patientsByGroupData: patientsGroupSlice,
    facilities: facilitiesSlice,
    compendium: compendiumSlice,
    orders: orderTemplateSlice,
    commonAdmin: commonAdminApiSlice,
    labs: labsSlice,
    DASHBOARDSTATUS: orderStatusSlice,
    Reports: dashboardSlice,
    createOrder: orderSlice,
    DASHBOARDACTIVITY: activityOverviewSlice,
    NOTIFICATIONLIST: notificationListSlice,
    TENANTSNAPSHOT: tenantSnapshotSlice
  }
});

export default store;
