export function getServicePath() {
  // #TODO: Handle ENV switching (QA, STAG, PROD)
  return process.env.API_ENDPOINT;
}

export function getDevServicePath() {
  // #TODO: Handle ENV switching (QA, STAG, PROD)
  return process.env.DEV_API_ENDPOINT;
}

// FOR API END POINT VERSION and BASE PATH OF THE API
// const versionType = "v1";
// const BASE_URI = `${getServicePath()}/api/${versionType}`;
export const BASE_URI = `${getServicePath()}`;

export const DEV_BASE_URI = getDevServicePath();
// For GETTING THE LOGGED IN USER DETAILS
export const FETCH_LOGGEDIN_USER_DETAILS = () => `${DEV_BASE_URI}/api-super-admin/user/info`;
// FOR GETITNG THE LOGGED IN USER PERMISSIONS
export const FETCH_USER_PERMISSIONS = (userId) => `${BASE_URI}/security/user/get/${userId}/permissions`;

export const UPDATE_REGISTER_MEMBER = () => `${BASE_URI}/member/registerMember/put/`; // register member API
export const TestCompendium = "https://lsdevsa01.blob.core.windows.net/public-assets/TestCompendium_sample.xlsx";
export const PayerCompendium = "https://lsdevsa01.blob.core.windows.net/public-assets/payerCompendium_sample.xlsx";
// UPDATE EQUIPMENT INFO API URL'S
export const UPDATE_EQUIPMENT_INFO = {
  fetch_studio_layouts_listing: (facilityId) => `${BASE_URI}/StudioCycling/${facilityId}/layouts`,
  fetch_layout_informaion: (facilityStudioLayoutId) => `${BASE_URI}/StudioCycling/layout/${facilityStudioLayoutId}`
};

// BOOKING PENALTY REPORT API URL'S
export const BOOKING_PENALTY_REPORT = {
  class_booking_details: (payload) =>
    `${BASE_URI}/studioCycling/${payload.facilityId}/bookingDetail/${payload.classInstanceId}`
};

// ENDPOINTS CYCLING AND BOOKING SECTION
export const CYCLING_AND_BOOKING = {
  clubs: `${BASE_URI}/clubs/get/`,
  print_signUp_classes_list: (clubId) => `${BASE_URI}/StudioCycling/Club/${clubId}/signUp/classes`,
  print_signUp_class: (classId) => `${BASE_URI}/GroupFitness/Class/${classId}/signUp/print`,
  club_wise_classes: (clubId, date) => `${BASE_URI}/StudioCycling/${clubId}/class/${String(date).replaceAll("-", " ")}`,
  bike_reservation: (classId) => `${BASE_URI}/StudioCycling/class/${classId}/false/0/BikeReservation`
};

export const TENANT = {
  getAllTenants: () => `${DEV_BASE_URI}/api-super-admin/tenant/v2/tenants-list`,
  getTenantById: (tenantId) => `${DEV_BASE_URI}/api-super-admin/tenant/tenant-info?tenantId=${tenantId}`,
  saveTenant: () => `${DEV_BASE_URI}/api-super-admin/tenant/save-tenant`,
  updateTenant: () => `${DEV_BASE_URI}/api-super-admin/tenant/update-tenant`,
  getTenantList: () => `${DEV_BASE_URI}/api-super-admin/tenant/all-tenants`,
  updateStatus: () => `${DEV_BASE_URI}/api-admin/user/userStatusUpdate`
};

export const TENANT_ORDER_CONFIGURATION = {
  getOrderTemplateList: () => `${DEV_BASE_URI}/api-admin/order-template/list`,
  getOrderTemplateById: () => `${DEV_BASE_URI}/api-admin/order-template/template-by-Id`,
  getOrderDuplicateCheck: (data) => `${DEV_BASE_URI}/api-admin/order-template/query?orderTemplateName=${data}`,
  getTestList: () => `${DEV_BASE_URI}/api-admin/compendiums/test-list`,
  createOrder: () => `${DEV_BASE_URI}/api-admin/order-template/save`,
  createPanel: () => `${DEV_BASE_URI}/api-admin/panel/create`,
  deleteTest: () => `${DEV_BASE_URI}/api-admin/panel/delete-test`,
  duplicateCheck: (name) => `${DEV_BASE_URI}/api-admin/order-template/panel-test?name=${name}`
};
export const ORDER_LIST = {
  getOrderTemplate: () => `${DEV_BASE_URI}/api-admin/order-template`
};

export const COMMON_API = {
  emailValidation: (email) => `${DEV_BASE_URI}/api-super-admin/user/query?email=${email}`,
  phoneValidation: (phn) => `${DEV_BASE_URI}/api-super-admin/user/query?phoneNumber=${phn}`,
  theme: () => `${DEV_BASE_URI}/api-super-admin/common/themes`,
  getTenantAssetDetails: () => `${DEV_BASE_URI}/api-super-admin/public/getTenantDetails`,
  getFeaturesList: (userId) =>
    `${DEV_BASE_URI}/api-super-admin/tenant-feature/get?id=${userId.userId}&roleId=${userId.id}`
};

export const TENANT_USERS = {
  createAdmin: () => `${DEV_BASE_URI}/api-super-admin/user/create`,
  updateAdmin: () => `${DEV_BASE_URI}/api-super-admin/user/update`,
  getUserInfoByID: (id) => `${DEV_BASE_URI}/api-super-admin/user/${id}`,
  getSuperadminList: () => `${DEV_BASE_URI}/api-super-admin/user/list`,
  getPatientDetails: () => `${DEV_BASE_URI}/api-super-admin/patient/list`,
  getOrderDetails: () => `${DEV_BASE_URI}/api-order/orders/order-list`,
  getTenantUserDetails: () => `${DEV_BASE_URI}/api-admin/user/list`,
  acceptTerms: () => `${DEV_BASE_URI}/api-super-admin/user/terms-accept`,
  getOrderDetailsById: () => `${DEV_BASE_URI}/api-order/orders/order-details`,
  getPatientDetailsById: () => `${DEV_BASE_URI}/api-admin/patient/detailsById`,
  createTenantUser: () => `${DEV_BASE_URI}/api-admin/user/create`,
  getTenantUserById: (id) => `${DEV_BASE_URI}/api-admin/user/getById/${id}`,
  updateClientStatus: () => `${DEV_BASE_URI}/api-admin/user/updateStatus`,
  updateClientDetails: () => `${DEV_BASE_URI}/api-admin/user/update`,
  getNpiData: () => `${DEV_BASE_URI}/api-order/common/npi-search`,
  getNpiDataForInternal: () => `${DEV_BASE_URI}/api-order/common/internal-npi-search`,
  getReconciliationCounts: () => `${DEV_BASE_URI}/api-order/orders/reconcilation-counts`
};

export const BROADCAST = {
  getBroacastList: () => `${DEV_BASE_URI}/api-super-admin/broadcast/list`,
  deleteBroadcast: (data) => `${DEV_BASE_URI}/api-super-admin/broadcast/delete/${data.id}/${data.roleId} `,
  updateBroadcast: (id) => `${DEV_BASE_URI}/api-super-admin/broadcast/update/${id} `,
  createBroadcast: () => `${DEV_BASE_URI}/api-super-admin/broadcast/create`,
  getBroadcastById: (data) => `${DEV_BASE_URI}/api-super-admin/broadcast/getById/${data.id}/${data.roleId}`,
  getBroadCastByPublic: () => `${DEV_BASE_URI}/api-super-admin/public/getBroadcastList`
};

export const TENANT_STATUS = {
  updateTenantStatus: () => `${DEV_BASE_URI}/api-super-admin/tenant/update-tenant-status`
};

export const MASTER_DATA = {
  saveTenantMasterData: () => `${DEV_BASE_URI}/api-super-admin/tenant/save-tenant-masterdata`,
  getAbn: (id) => `${DEV_BASE_URI}/api-order/orders/docHistory?docId=${id}`,
  getMasterData: (tenantId) => `${DEV_BASE_URI}/api-super-admin/tenant/tenant-masterdata-info/${tenantId}`,
  getFAQs: (tenantId) => `${DEV_BASE_URI}/api-super-admin/faq/list/${tenantId}`,
  updateFAQs: () => `${DEV_BASE_URI}/api-super-admin/faq/update`,
  abnUpload: () => `${DEV_BASE_URI}/api-order/orders/abn-upload`,
  codeMap: () => `${DEV_BASE_URI}/api-order/orders/priorAuth-codemap-upload`,
  createFAQs: () => `${DEV_BASE_URI}/api-super-admin/faq/create`,
  deleteFAQs: (tenantId) => `${DEV_BASE_URI}/api-super-admin/faq/delete/${tenantId}`,
  saveOrderMaster: () => `${DEV_BASE_URI}/api-admin/order-master/save`
};

export const TENANT_FEATURES = {
  getFeatures: (id, roleId) => `${DEV_BASE_URI}/api-super-admin/tenant-feature/get?id=${id}&roleId=${roleId}`,
  updateFeatures: () => `${DEV_BASE_URI}/api-super-admin/tenant-feature/update`
};
export const COMPENDIUM = {
  getTestCompendiums: () => `${DEV_BASE_URI}/api-admin/compendiums/test-compendiums-list`,
  getuploadExcelFile: () => `${DEV_BASE_URI}/api-admin/compendiums/upload-excel`,
  saveExcelFile: () => `${DEV_BASE_URI}/api-admin/compendiums/save-excel`,
  getPayerCompendiums: () => `${DEV_BASE_URI}/api-admin/payer-compendiums/list`,
  deleteTestCompendiumById: (id) => `${DEV_BASE_URI}/api-admin/compendiums/delete/${id}`,
  updateCompendium: () => `${DEV_BASE_URI}/api-admin/compendiums/save`,
  getpayeruploadExcelFile: () => `${DEV_BASE_URI}/api-admin/payer-compendiums/uploadExcel`,
  savePayerExcelFile: () => `${DEV_BASE_URI}/api-admin/payer-compendiums/save-payer-compendium-list`,
  getLabList: () => `${DEV_BASE_URI}/api-admin/common/labs?statusId=1`,
  getMneumonicList: () => `${DEV_BASE_URI}/api-admin/common/mneumonic`,
  updatePayerCompendium: () => `${DEV_BASE_URI}/api-admin/payer-compendiums/save`,
  deletePayerCompendium: (id) => `${DEV_BASE_URI}/api-admin/payer-compendiums/delete/${id}`
};
export const COMMON_ADMIN_APIS = {
  getOrderableTypes: () => `${DEV_BASE_URI}/api-admin/common/orderable-type`,
  getWorkGroup: () => `${DEV_BASE_URI}/api-admin/common/work-group`,
  getPerformingDept: () => `${DEV_BASE_URI}/api-admin/common/department`,
  getSpecimentTypes: () => `${DEV_BASE_URI}/api-admin/common/specimen-type`,
  getRaceList: () => `${DEV_BASE_URI}/api-admin/common/race-list?status=true`,
  getEthinicList: () => `${DEV_BASE_URI}/api-admin/common/ethinic-list?status=true`,
  getGenderList: () => `${DEV_BASE_URI}/api-admin/common/gender-list?status=true`,
  getRelastionList: (id) => `${DEV_BASE_URI}/api-admin/common/relation-list?rltnTypeId=${id}&status=true`,

  getGroupByList: (grpType) => `${DEV_BASE_URI}/api-admin/${grpType}`,
  saveUpdate: (data) => `${DEV_BASE_URI}/api-admin/${data}`,
  deleteGroup: (ordTypPrtyId) => `${DEV_BASE_URI}/api-admin/${ordTypPrtyId}`,
  deleteOrdersGroup: (ordTypPrtyId) => `${DEV_BASE_URI}/api-admin/order-master/delete/${ordTypPrtyId}`,
  getContainerList: () => `${DEV_BASE_URI}/api-admin/compendiums/Container-list`,
  getInstrumentList: () => `${DEV_BASE_URI}/api-admin/compendiums/instrument-list`,
  getFacilityList: () => `${DEV_BASE_URI}/api-admin/facilities-master/fcltyType-list`,
  getFacilityGrid: () => `${DEV_BASE_URI}/api-admin/facilities-master/fcltyType-patient-order-details`,
  getServiceList: () => `${DEV_BASE_URI}/api-admin/facilities-master/service-list`,
  getManagementGrpData: () => `${DEV_BASE_URI}/api-admin/facilities-master/management-group`,
  getDaysLab: () => `${DEV_BASE_URI}/api-admin/common/days-lab`,
  getSpecimenFrozen: () => `${DEV_BASE_URI}/api-admin/common/specimen-frozen-type`
};

export const TENANT_BROADCAST = {
  getBroacastList: () => `${DEV_BASE_URI}/api-admin/broadcast/list`,
  deleteBroadcast: (data) => `${DEV_BASE_URI}/api-admin/broadcast/delete/${data.id}`,
  updateBroadcast: (id) => `${DEV_BASE_URI}/api-admin/broadcast/update/${id} `,
  createBroadcast: () => `${DEV_BASE_URI}/api-admin/broadcast/create`,
  getBroadcastById: (data) => `${DEV_BASE_URI}/api-admin/broadcast/getById/${data.id}`,
  getBroadCastByPublic: () => `${DEV_BASE_URI}/api-admin/public/getBroadcastList`
};

export const TENANT_FACILITY = {
  createFacility: () => `${DEV_BASE_URI}/api-admin/facility/create`,
  getFacilityList: () => `${DEV_BASE_URI}/api-admin/facility/list?statusId=1`,
  getFacilitiesById: (id) => `${DEV_BASE_URI}/api-admin/facility/${id}`,
  getFacilitiesByUserId: (data) => `${DEV_BASE_URI}/api-admin/facility/by-userId?userId=${data.userId}&statusId=1,2&roleId=${data.roleId}`,
  clientListByFacilityId: () => `${DEV_BASE_URI}/api-admin/facility/client-details`,
  patientListByFacilityId: () => `${DEV_BASE_URI}/api-admin/facility/patient-details`,
  orderListByFacilityId: () => `${DEV_BASE_URI}/api-admin/facility/order-details`,
  getFacilityGrid: () => `${DEV_BASE_URI}/api-admin/facility/list`,
  updateFacilityStatus: () => `${DEV_BASE_URI}/api-admin/facility/status`
};

export const COMMON_MASTER_DATA_APIS = {
  raceSave: () => `common/save-race-masterdata`,
  raceSaveAll: () => `common/saveall-race-status`,
  raceDelete: () => `common/delete-race/`,
  raceList: () => `common/race-list`,
  ethnicSave: () => `common/save-ethinic-masterdata`,
  ethnicSaveAll: () => `common/saveall-ethinic-status`,
  ethnicDelete: () => `common/delete-ethinic/`,
  ethinicList: () => "common/ethinic-list",
  getPlanType: () => `${DEV_BASE_URI}/api-admin/common/plan-type`,

  genderSave: () => `common/save-gender-masterdata`,
  genderSaveAll: () => `common/saveall-gender-status`,
  genderDelete: () => `common/delete-gender/`,
  genderList: () => "common/gender-list",
  guarantorSave: () => `common/save-relation-masterdata`,
  guarantorSaveAll: () => `common/saveall-relation-status`,
  guarantorDelete: () => `common/delete-relation/`,
  guarantorList: () => "common/relation-list?rltnTypeId=1",
  relationList: () => `${DEV_BASE_URI}/api-admin/common/relation-list?rltnTypeId=1&status=true`,
  careGiverSave: () => `common/save-relation-masterdata`,
  careGiverSaveAll: () => `common/saveall-relation-status`,
  careGiverDelete: () => `common/delete-relation/`,
  careGiverList: () => "common/relation-list?rltnTypeId=2",
  facilitySave: () => `facilities-master/save-fcltyType`,
  facilitySaveAll: () => `facilities-master/saveall-fcltyType-status`,
  facilityDelete: () => `facilities-master/fcltyType/delete/`,
  facilityList: () => "facilities-master/fcltyType-list",
  serviceSave: () => `facilities-master/save-service`,
  servicerSaveAll: () => `facilities-master/saveall-service-status`,
  serviceDelete: () => `facilities-master/service/delete/`,
  serviceList: () => "facilities-master/service-list",
  ManagementgroupSave: () => `facilities-master/save-management-group`,
  ManagementgroupSaveAll: () => `facilities-master/save-All-Management`,
  ManagementgroupDelete: () => `facilities-master/delete/managementGroupId/`,
  ManagementgroupList: () => `facilities-master/management-group`,
  orderSave: () => `order-master/save`,
  orderSaveAll: () => `order-master/saveall-status`,
  orderDelete: () => `order-master/delete/`,
  orderList: () => "order-master/list",
  specimenSave: () => `compendiums/save-specimen-type-masterdata`,
  specimenSaveAll: () => `compendiums/save-specimen-data`,
  specimenDelete: () => `compendiums/delete/specimenTypeId/`,
  specimenList: () => "compendiums/specimen-list",
  containerSave: () => `compendiums/save-container-Type-masterdata`,
  containerSaveAll: () => `compendiums/save-container-data`,
  containerDelete: () => `compendiums/delete/container/`,
  containerlistAll: () => `compendiums/Container-list`,
  OrderableSave: () => `compendiums/save-Orderable-Type-masterdata`,
  OrderableSaveAll: () => `compendiums/save-Orderable-Type-data`,
  OrderableDelete: () => `compendiums/delete/orderableTypeId/`,
  OrderableList: () => "compendiums/orderable-list",
  departmentSave: () => `compendiums/save-department-type-masterdata`,
  departmentSaveAll: () => `compendiums/save-department-master-data`,
  departmentDelete: () => `compendiums/delete/departmentTypeId/`,
  departmentList: () => "compendiums/department-list",
  workSave: () => `compendiums/save-work-Group-masterdata`,
  workSaveAll: () => `compendiums/save-work-group-data`,
  workDelete: () => `compendiums/delete/workGroupId/`,
  workList: () => "compendiums/workGroup-list",
  InstrumentSave: () => `compendiums/save-Instrument-masterdata`,
  InstrumentSaveAll: () => `compendiums/save-instrument-master-data`,
  InstrumentDelete: () => `compendiums/delete/instrument/`,
  InstrumentList: () => "compendiums/instrument-list"
};

export const TENANT_LABS = {
  getAllLabs: () => `${DEV_BASE_URI}/api-admin/labs/labs-list`,
  createLab: () => `${DEV_BASE_URI}/api-admin/labs/save`,
  updateLab: () => `${DEV_BASE_URI}/api-admin/labs/update`,
  getLabById: (id) => `${DEV_BASE_URI}/api-admin/labs/Labs-info?labId=${id}`,
  updateLabStatus: () => `${DEV_BASE_URI}/api-admin/labs/update-lab-status`,
  clientListByLabId: () => `${DEV_BASE_URI}/api-admin/labdetails/client-list`,
  patientListByLabId: () => `${DEV_BASE_URI}/api-admin/labdetails/patient-list`,
  orderListByLabId: () => `${DEV_BASE_URI}/api-admin/labdetails/order-list`
};
export const DASHBOARD = {
  getReports: () => `${DEV_BASE_URI}/api-dashboard/dashboard/reports`,
  getOrderStat: () => `${DEV_BASE_URI}/api-dashboard/dashboard/order-stats`,
  getdsrReports: () => `${DEV_BASE_URI}/api-order/orders/dsrReport`
};
export const CREATE_ORDER = {
  getTestDetails: (id) => `${DEV_BASE_URI}/api-admin/order-template/byorderTemplateId?orderTemplateId=${id}`,
  labByUserId: (id) => `${DEV_BASE_URI}/api-admin/common/labs`,
  activeLabs: () => `${DEV_BASE_URI}/api-admin/common/labs?statusId=1`,
  facilityByUserId: (id) => `${DEV_BASE_URI}/api-admin/facility/by-userId`,
  activeFacility: () => `${DEV_BASE_URI}/api-admin/facility/by-userId?statusId=1`,
  clientByRoleId: (roleId) => `${DEV_BASE_URI}/api-admin/user/by-roleId`,
  getTemplateList: () => `${DEV_BASE_URI}/api-admin/order-template/templatelist`,
  getOrderFrequncy: () => `${DEV_BASE_URI}/api-admin/common/order-rec-frequency`,
  orderPriority: () => `${DEV_BASE_URI}/api-admin/common/order-priority`,
  icd10: (terms) => `${DEV_BASE_URI}/api-order/common/icd10cm/search?terms=${terms}`,
  verifyABN: () => `${DEV_BASE_URI}/api-order/orders/verifyAbn`,
  priorAuthCheck: () => `${DEV_BASE_URI}/api-order/orders/verifyPriorAuth`,
  submisionType: (orderTypeId, priorityId) =>
    `${DEV_BASE_URI}/api-admin/order-master/submission-type?orderTypeId=${orderTypeId}&orderPriorityId=${priorityId}`,
  labDays: (facilityId) => `${DEV_BASE_URI}/api-admin/facility/by-facilityId?facilityId=${facilityId}`,
  providerSignClear: (patientDocId) => `${DEV_BASE_URI}/api-order/orders/clearDoc?patientDocId=${patientDocId}`,
  insEligibilityCheck: () => `${DEV_BASE_URI}/api-order/orders/insuranceEligibilityCheck`,
  // getOrderTypes: (priorityId) => `${DEV_BASE_URI}/api-admin/order-master/byPriorityId/${priorityId}`,
  createOrder: () => `${DEV_BASE_URI}/api-order/orders/create`,
  getActiveSession: (userId) => `${DEV_BASE_URI}/api-admin/user/session-by-userId?userId=${userId}`,
  uploadDoc: () => `${DEV_BASE_URI}/api-order/orders/uploadDoc`,
  getDoc: (docId, orderId, patientId) =>
    `${DEV_BASE_URI}/api-order/orders/getDocByOrderIdDocIdPatientId?docId=${docId}&orderId=${orderId}&patientId=${patientId}`,
  getOrderDetailsByDate: () => `${DEV_BASE_URI}/api-order/orders/orderdetails-bydate`,
  getOrderTypes: () => `${DEV_BASE_URI}/api-admin/order-master/orderTypes`,
  getPaymentTypes: () => `${DEV_BASE_URI}/api-admin/order-master/paymentTypes`,
  getPriorityList: () => `${DEV_BASE_URI}/api-admin/order-master/priorityList`,
  getScheduleTimeList: () => `${DEV_BASE_URI}/api-admin/order-master/schdTime`
};

export const CREATE_PATIENT = {
  addPatientDetails: () => `${DEV_BASE_URI}/api-admin/patient/add`,
  updatePatientDetails: () => `${DEV_BASE_URI}/api-admin/patient/update`,
  uploadOcr: () => `${DEV_BASE_URI}/api-order/orders/uploadOCR`,
  uploadIdentityDocs: () => `${DEV_BASE_URI}/api-admin/patient/uploadDoc`,
  getIdentityDocs: (patientId, docId) =>
    `${DEV_BASE_URI}/api-admin/patient/downloadDoc?patientId=${patientId}&documentId=${docId}`,
  deleteCareGiver: (id) => `${DEV_BASE_URI}/api-admin/patient/deletePatientCareGiver/${id}`,
  deleteInsuranceandGurantor: (insId, gurId) =>
    `${DEV_BASE_URI}/api-admin/patient/deleteInsuranceAndGurantor?patientInsuranceId=${insId}&patientGurantorId=${gurId}`
};

export const DASHBOARDSTATUS = {
  orderStatusDashboard: () => `${DEV_BASE_URI}/api-dashboard/dashboard/order-status`
};
export const DASHBOARDACTIVITY = {
  getDashboardActivity: () => `${DEV_BASE_URI}/api-dashboard/dashboard/activity-overview`
};
export const NOTIFICATIONLIST = {
  getNotificationList: () => `${DEV_BASE_URI}/api-dashboard/dashboard/notification-list`
};

export const TENANTSNAPSHOT = {
  getTenantSnapshot: () => `${DEV_BASE_URI}/api-dashboard/dashboard/snapshots`,
  getverifyEmail: () => `${DEV_BASE_URI}/api-super-admin/user/verify-email`
};

export const CREATE_USER = {
  createUser: () => `${DEV_BASE_URI}/api-admin/user/create-okta-user`,
  emailVerify: () => `${DEV_BASE_URI}/api-super-admin/user/verify-email`
};
