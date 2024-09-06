// import packages

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import {
  broadcast,
  clientAdminUsers,
  clientDashboard,
  clientUsers,
  compendium,
  dashboardComponent,
  dsrReport,
  facilities,
  facilitiesparentOrderTab,
  homePath,
  labDetails,
  labs,
  loginPath,
  masterData,
  masterDataTenantDetails,
  myProfile,
  notificationPage,
  orderAndReports,
  orderConfiguration,
  patientManagement,
  privacyPolicy,
  profilePath,
  providerDashboard,
  reconciliation,
  registerMember,
  rootPath,
  searchMember,
  searchMemberDetails,
  signatureUpload,
  tenantConfiguration,
  tenantDetails,
  tntAdminMasterData,
  tntClientUserDetails,
  tntCreateOrder,
  tntDashboard,
  tntEditOrder,
  tntOrderReports,
  tntPatientManagement,
  tntPatientSearch,
  tntSelectedItems,
  tntUserDetails,
  uploadPatientDocs
} from "./routePaths";

import ClientDetails from "@components/users/client-details";
import DSRReport from "../pages/tenantDashboard/dsrReport";
import IdentityDocs from "../components/tenant-admin/PatientManagement/identityDocs";
import ImageUploadPreview from "../components/tenant-admin/PatientManagement/create-order/eligibityDetails/signature-upload";
import Loader from "@utils/Loader";
import NotificationPage from "@pages/notifications/notificationPage";
import { OrderConfiguration } from "@pages/admin/orderConfig/index";
import PrivateRoutes from "./PrivateRoute";
import TenantAddPatient from "../components/tenant-admin/PatientManagement/addPatient";

// import route paths

// public path components

import Login from "@pages/login";
import Home from "@pages/home";
import Policy from "@pages/login/privacypolicy";

import PatientProfile from "@pages/profile";
import SearchMember from "@pages/member/SearchMember";
import RegisterMember from "@pages/member/RegisterMember";
import SearchMemberDetails from "@pages/member/SearchInfo";
import Tenant from "@pages/admin/tenant";
import DashboardComponent from "@pages/dashboard";
import AdminProfile from "@pages/admin/profile";
import TenantDetails from "@components/tenant/tenant-details";
import MasterData from "@pages/admin/masterData/index";
import MasterDataTenantDetails from "@pages/admin/masterData/masterDataTenantDetails";
import OrderAndReports from "@pages/admin/orderReports/index";
import Broadcast from "@pages/admin/broadcast/index";
import Users from "@pages/tenant-admin/users";
import Reconciliation from "@pages/tenant-admin/reconciliation";
import Facilities from "@pages/tenant-admin/facilities/facilities";
import Labs from "@pages/tenant-admin/labs";
import TntOrderAndReports from "@pages/tenant-admin/ordersReports";
import RouteNotFound from "@pages/pageNotFound";
import TntAdminMasterData from "@pages/tenant-admin/master-data";
import Tntselecteditems from "@components/tenant-admin/order-config/order-config-tab/tntselecteditems";
import FacilitiesParentOrderTab from "@components/tenant-admin/facilities/facilitiesparentOrderTab";
import LabUsers from "@components/tenant-admin/labs";
import Compendium from "@pages/tenant-admin/compendium/index";
import PatientManagement from "@pages/tenant-admin/patient-management";
import TenantDashboard from "@pages/tenantDashboard/index";
import TntCreateOrder from "@components/tenant-admin/PatientManagement/createOrder";

// component
const AllRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path={rootPath} element={<Outlet />}>
            <Route index element={<Login />} />
            <Route path={loginPath} element={<Login />} />
            <Route path={signatureUpload} element={<ImageUploadPreview />} />
            <Route path={uploadPatientDocs} element={<IdentityDocs />} />
            <Route element={<PrivateRoutes />}>
              <Route path={homePath} element={<Home />} />
              <Route path="/policy" element={<Policy />} />
              <Route path={profilePath} element={<PatientProfile />} />
              <Route path={searchMember} element={<SearchMember />} />
              <Route path={searchMemberDetails} element={<SearchMemberDetails />} />
              <Route path={registerMember} element={<RegisterMember />} />
              <Route path={tenantConfiguration} element={<Tenant />} />
              <Route path={dashboardComponent} element={<DashboardComponent />} />
              <Route path={dsrReport} element={<DSRReport />} />
              <Route path={myProfile} element={<AdminProfile />} />
              <Route path={tenantDetails} element={<TenantDetails />} />
              <Route path={masterData} element={<MasterData />} />
              <Route path={masterDataTenantDetails} element={<MasterDataTenantDetails />} />
              <Route path={orderAndReports} element={<OrderAndReports />} />
              <Route path={orderConfiguration} element={<OrderConfiguration />} />
              <Route path={broadcast} element={<Broadcast />} />
              <Route path={tntUserDetails} element={<Users />} />
              <Route path={reconciliation} element={<Reconciliation />} />
              <Route path={facilities} element={<Facilities />} />
              <Route path={labs} element={<Labs />} />
              <Route path={tntOrderReports} element={<TntOrderAndReports />} />
              <Route path={tntPatientManagement} element={<TenantAddPatient />} />
              <Route path={tntAdminMasterData} element={<TntAdminMasterData />} />
              <Route path={tntSelectedItems} element={<Tntselecteditems />} />
              <Route path={labDetails} element={<LabUsers />} />
              <Route path={facilitiesparentOrderTab} element={<FacilitiesParentOrderTab />} />
              <Route path={tntClientUserDetails} element={<ClientDetails />} />
              <Route path={notificationPage} element={<NotificationPage />} />
              <Route path={compendium} element={<Compendium />} />
              <Route path={patientManagement} element={<PatientManagement />} />
              <Route path={tntDashboard} element={<TenantDashboard />} />
              <Route path={clientDashboard} element={<TenantDashboard />} />
              <Route path={providerDashboard} element={<TenantDashboard />} />
              <Route path={tntPatientSearch} element={<TntCreateOrder />} />
              <Route path={tntCreateOrder} element={<TntCreateOrder />} />
              <Route path={clientAdminUsers} element={<Users />} />
              <Route path={tntEditOrder} element={<TntCreateOrder />} />
              <Route path={clientUsers} element={<ClientDetails />} />
            </Route>
            <Route path="*" element={<RouteNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AllRoutes;
