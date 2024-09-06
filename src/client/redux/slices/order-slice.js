import { COMMON_ADMIN_APIS, COMMON_MASTER_DATA_APIS, CREATE_ORDER, CREATE_PATIENT } from "@config/api-config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiCall } from "@config/http-config";
import axios from "axios";
import { docIds } from "../../_helpers/constants";
import { getXtenantId } from "@utils/common";

const initialState = {
  loading: false,
  success: "",
  error: "",
  showSuccessPopup: false,
  popupMessage: "",
  totalCount: 0,
  frequency: {},
  orderPriority: [],
  clients: [],
  lab: [],
  ocrData: "",
  facility: [],
  templates: [],
  relationList: [],
  raceList: [],
  genderList: [],
  ethinicList: [],
  panelList: [],
  testList: [],
  icd10: [],
  planTypes: [],
  abn: "",
  submissionTypes: [],
  labDaysByFacility: [],
  status: "",
  orderTypes: [],
  signaturePreview: null,
  orderStatus: {},
  session: {},
  abnDocStatus: {},
  provDocStatus: {},
  identityDocStatus: {},
  deleteCareGiver: "",
  uploadDocStatus: {},
  uploadIdentityDocs: {},
  orderId: "",
  getOrderDetails: [],
  updatePatientList: "",
  priorityTypes: [],
  scheduleTimeList: [],
  priorAuthCheck: "",
  providerSignClear: {},
  paymentTypes: []
};

const orderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = true;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload?.data;
    },
    setSignaturePreview: (state, action) => {
      state.signaturePreview = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTestDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTestDetails.fulfilled, (state, action) => {
      state.panelList = action.payload?.panelTest;
      state.testList = action.payload?.individualTest;
      state.loading = false;
    });
    builder.addCase(getTestDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getLabByUserId.pending, (state, action) => {
      state.loading = true;
      // state.lab = {};
    });
    builder.addCase(getLabByUserId.fulfilled, (state, action) => {
      state.lab = action.payload;
      state.loading = false;
    });
    builder.addCase(getLabByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getFacilityByUserId.pending, (state, action) => {
      state.loading = true;
      state.facility = {};
    });
    builder.addCase(getFacilityByUserId.fulfilled, (state, action) => {
      state.facility = action.payload;
      state.loading = false;
    });
    builder.addCase(getFacilityByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getClientByRoleId.pending, (state, action) => {
      state.loading = true;
      state.clients = [];
    });
    builder.addCase(getClientByRoleId.fulfilled, (state, action) => {
      state.clients = action.payload;
      state.loading = false;
    });
    builder.addCase(getClientByRoleId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getOrderFrequncy.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderFrequncy.fulfilled, (state, action) => {
      state.frequency = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderFrequncy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getTemplateList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTemplateList.fulfilled, (state, action) => {
      state.templates = action.payload;
      state.loading = false;
    });
    builder.addCase(getTemplateList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getOrderPriority.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderPriority.fulfilled, (state, action) => {
      state.orderPriority = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderPriority.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(addPatientDetails.pending, (state, action) => {
      state.loading = true;
      state.patientList = {};
    });
    builder.addCase(addPatientDetails.fulfilled, (state, action) => {
      state.patientList = action.payload.data;
      state.loading = false;
    });
    builder.addCase(addPatientDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(uploadOcr.pending, (state, action) => {
      state.loading = true;
      state.ocrData = {};
    });
    builder.addCase(uploadOcr.fulfilled, (state, action) => {
      state.ocrData = action.payload.data;
      state.loading = false;
    });
    builder.addCase(uploadOcr.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updatePatientDetails.pending, (state, action) => {
      state.loading = true;
      state.patientList = {};
    });
    builder.addCase(updatePatientDetails.fulfilled, (state, action) => {
      state.updatePatientList = action.payload;
      state.loading = false;
    });
    builder.addCase(updatePatientDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getRelationList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRelationList.fulfilled, (state, action) => {
      state.relationList = action.payload;
      state.loading = false;
    });
    builder.addCase(getRelationList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPlanType.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPlanType.fulfilled, (state, action) => {
      state.planTypes = action.payload;
      state.loading = false;
    });
    builder.addCase(getPlanType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getRaceList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getRaceList.fulfilled, (state, action) => {
      state.raceList = action.payload;
      state.loading = false;
    });
    builder.addCase(getRaceList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getGenderList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getGenderList.fulfilled, (state, action) => {
      state.genderList = action.payload;
      state.loading = false;
    });
    builder.addCase(getGenderList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getEthinicList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getEthinicList.fulfilled, (state, action) => {
      state.ethinicList = action.payload;
      state.loading = false;
    });
    builder.addCase(getEthinicList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getICD10Codes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getICD10Codes.fulfilled, (state, action) => {
      state.icd10 = action.payload[3];
      state.loading = false;
    });
    builder.addCase(getICD10Codes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(verifyABN.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyABN.fulfilled, (state, action) => {
      state.abn = action.payload;
      state.loading = false;
    });
    builder.addCase(verifyABN.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(priorAuthCheck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(priorAuthCheck.fulfilled, (state, action) => {
      state.priorAuthCheck = action.payload;
      state.loading = false;
    });
    builder.addCase(priorAuthCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(submisionType.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(submisionType.fulfilled, (state, action) => {
      state.submissionTypes = action.payload;
      state.loading = false;
    });
    builder.addCase(submisionType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getLabDays.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLabDays.fulfilled, (state, action) => {
      state.labDaysByFacility = action.payload;
      state.loading = false;
    });
    builder.addCase(getLabDays.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(providerSignClear.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(providerSignClear.fulfilled, (state, action) => {
      state.providerSignClear = action.payload;
      state.loading = false;
    });
    builder.addCase(providerSignClear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(insEligibilityCheck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(insEligibilityCheck.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
    });
    builder.addCase(insEligibilityCheck.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getOrderTypes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderTypes.fulfilled, (state, action) => {
      state.orderTypes = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPaymentTypes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPaymentTypes.fulfilled, (state, action) => {
      state.paymentTypes = action.payload;
      state.loading = false;
    });
    builder.addCase(getPaymentTypes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getPriorityList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPriorityList.fulfilled, (state, action) => {
      state.priorityTypes = action.payload;
      state.loading = false;
    });
    builder.addCase(getPriorityList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getScheduleTimeList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getScheduleTimeList.fulfilled, (state, action) => {
      state.scheduleTimeList = action.payload;
      state.loading = false;
    });
    builder.addCase(getScheduleTimeList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
      state.orderStatus = {};
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderStatus = action.payload;
      state.orderId = action?.payload?.data?.split("-")[1]?.trim("");
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getActiveSession.pending, (state, action) => {
      state.loading = true;
      state.session = {};
    });
    builder.addCase(getActiveSession.fulfilled, (state, action) => {
      state.session = action.payload;
      state.loading = false;
    });
    builder.addCase(getActiveSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(uploadDoc.pending, (state, action) => {
      state.loading = true;
      state.uploadDocStatus = {};
    });
    builder.addCase(uploadDoc.fulfilled, (state, action) => {
      state.uploadDocStatus = action.payload;
      state.loading = false;
    });
    builder.addCase(uploadDoc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(uploadIdentityDocs.pending, (state, action) => {
      state.loading = true;
      state.uploadIdentityDocs = {};
    });
    builder.addCase(uploadIdentityDocs.fulfilled, (state, action) => {
      state.uploadIdentityDocs = action.payload;
      state.loading = false;
    });
    builder.addCase(uploadIdentityDocs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOrderDetailsByDate.pending, (state, action) => {
      state.loading = true;
      state.getOrderDetails = {};
    });
    builder.addCase(getOrderDetailsByDate.fulfilled, (state, action) => {
      state.getOrderDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderDetailsByDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getIdentityDocs.pending, (state, action) => {
      state.loading = true;
      state.identityDocStatus = {};
    });
    builder.addCase(getIdentityDocs.fulfilled, (state, action) => {
      state.identityDocStatus = action.payload;
      state.loading = false;
    });
    builder.addCase(getIdentityDocs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteCareGiver.pending, (state, action) => {
      state.loading = true;
      state.deleteCareGiver = {};
    });
    builder.addCase(deleteCareGiver.fulfilled, (state, action) => {
      state.deleteCareGiver = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteCareGiver.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteInsuranceandGurantor.pending, (state, action) => {
      state.loading = true;
      state.deleteInsuranceandGurantor = {};
    });
    builder.addCase(deleteInsuranceandGurantor.fulfilled, (state, action) => {
      state.deleteInsuranceandGurantor = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteInsuranceandGurantor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getDoc.pending, (state, action) => {
      state.loading = true;
      state.abnDocStatus = {};
      state.provDocStatus = {};
    });
    builder.addCase(getDoc.fulfilled, (state, action) => {
      if (action.payload?.docTypeId === docIds.abnDocID) state.abnDocStatus = action.payload;
      else if (action.payload?.docTypeId === docIds.providerSignDocId) state.provDocStatus = action.payload;
      state.loading = false;
    });
    builder.addCase(getDoc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { setShowSuccessPopup, setPopupMessage, setSignaturePreview } = orderSlice.actions;
export default orderSlice.reducer;
export const getTestDetails = createAsyncThunk("orderTemplateDetails/post", async (id) => {
  // console.log(ORDER_LIST.getOrderTemplate());
  return apiCall({
    url: CREATE_ORDER.getTestDetails(id),
    method: "POST",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});

export const getLabByUserId = createAsyncThunk("lab/get", async () => {
  const subDomain = window.location.href?.split("/")[3];

  return apiCall({
    url:
      subDomain === "create-order" || subDomain === "edit-order"
        ? CREATE_ORDER.activeLabs()
        : CREATE_ORDER.labByUserId(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const getFacilityByUserId = createAsyncThunk("facility/get", async () => {
  const subDomain = window.location.href?.split("/")[3];
  return apiCall({
    url:
      subDomain === "create-order" || subDomain === "edit-order"
        ? CREATE_ORDER.activeFacility()
        : CREATE_ORDER.facilityByUserId(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const getClientByRoleId = createAsyncThunk("clientAdmin/get", async (data) => {
  return apiCall({
    url: CREATE_ORDER.clientByRoleId(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});

export const getTemplateList = createAsyncThunk("templateList/get", async () => {
  return apiCall({
    url: CREATE_ORDER.getTemplateList(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const getOrderFrequncy = createAsyncThunk("orderFreq/get", async () => {
  return apiCall({
    url: CREATE_ORDER.getOrderFrequncy(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const getOrderPriority = createAsyncThunk("orderPriority/get", async () => {
  return apiCall({
    url: CREATE_ORDER.orderPriority(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});
export const getOrderDetailsByDate = createAsyncThunk(" getOrderDetailsByDate/get", async (data) => {
  return apiCall({
    url: CREATE_ORDER.getOrderDetailsByDate(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});
export const addPatientDetails = createAsyncThunk("createPatient/post", async (formData) => {
  const response = await axios.post(CREATE_PATIENT.addPatientDetails(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-TenantID": getXtenantId(),
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
    }
  });
  return response.data;
});
export const uploadOcr = createAsyncThunk("uploadOcr/post", async (formData) => {
  const response = await axios.post(CREATE_PATIENT.uploadOcr(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-TenantID": getXtenantId(),
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
    }
  });
  return response.data;
});
export const uploadIdentityDocs = createAsyncThunk("uploadIdentityDocs/post", async ({ data, token }) => {
  const response = await axios.post(CREATE_PATIENT.uploadIdentityDocs(), data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-TenantID": getXtenantId(),
      Authorization: `${token}`
    }
  });
  return response.data;
});
export const updatePatientDetails = createAsyncThunk("updatePatient/post", async (formData) => {
  const response = await axios.post(CREATE_PATIENT.updatePatientDetails(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-TenantID": getXtenantId(),
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
    }
  });
  return response.data;
});

export const getGenderList = createAsyncThunk("gender/get", async () => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getGenderList(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});

export const getRaceList = createAsyncThunk("race/get", async () => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getRaceList(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});

export const getEthinicList = createAsyncThunk("ethinic/get", async () => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getEthinicList(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});
export const getRelationList = createAsyncThunk("guarantor/get", async () => {
  return apiCall({
    url: COMMON_MASTER_DATA_APIS.relationList(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});
export const getPlanType = createAsyncThunk("planType/get", async () => {
  return apiCall({
    url: COMMON_MASTER_DATA_APIS.getPlanType(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});

export const getICD10Codes = createAsyncThunk("icd10/get", async (terms) => {
  return apiCall({
    url: CREATE_ORDER.icd10(terms),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const verifyABN = createAsyncThunk("abn/post", async (data) => {
  return apiCall({
    url: CREATE_ORDER.verifyABN(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});
export const priorAuthCheck = createAsyncThunk("check/post", async (data) => {
  return apiCall({
    url: CREATE_ORDER.priorAuthCheck(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});

export const submisionType = createAsyncThunk("submisionType/get", async ({ orderTypeId, priorityId }) => {
  return apiCall({
    url: CREATE_ORDER.submisionType(orderTypeId, priorityId),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const getLabDays = createAsyncThunk("labDays/get", async (facilityId) => {
  return apiCall({
    url: CREATE_ORDER.labDays(facilityId),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});
export const providerSignClear = createAsyncThunk("providerSignClear/get", async (patientDocId) => {
  return apiCall({
    url: CREATE_ORDER.providerSignClear(patientDocId),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const insEligibilityCheck = createAsyncThunk("eligibilityCheck/get", async (data) => {
  return apiCall({
    url: CREATE_ORDER.insEligibilityCheck(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res?.data);
});

export const getOrderTypes = createAsyncThunk("orderTypes/get", async () => {
  return apiCall({
    url: CREATE_ORDER.getOrderTypes(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});
export const getPaymentTypes = createAsyncThunk("paymentTypes/get", async () => {
  return apiCall({
    url: CREATE_ORDER.getPaymentTypes(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const getPriorityList = createAsyncThunk("priorityType/get", async (id) => {
  if (id) {
    return apiCall({
      url: `${CREATE_ORDER.getPriorityList()}?orderTypeId=${id}`,
      method: "GET",
      xTenantId: getXtenantId()
    }).then((res) => res?.data);
  } else {
    return apiCall({
      url: CREATE_ORDER.getPriorityList(),
      method: "GET",
      xTenantId: getXtenantId()
    }).then((res) => res?.data);
  }
});

export const getScheduleTimeList = createAsyncThunk("scheduleTimeList/get", async ({ orderTypeId, priorityId }) => {
  if (priorityId !== "") {
    return apiCall({
      url: `${CREATE_ORDER.getScheduleTimeList()}?orderTypeId=${orderTypeId}&orderPriorityId=${priorityId}`,
      method: "GET",
      xTenantId: getXtenantId()
    }).then((res) => res?.data);
  } else {
    return apiCall({
      url: CREATE_ORDER.getScheduleTimeList(),
      method: "GET",
      xTenantId: getXtenantId()
    }).then((res) => res?.data);
  }
});

export const createOrder = createAsyncThunk("createOrder/post", async (formData) => {
  const response = await axios.post(CREATE_ORDER.createOrder(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-TenantID": getXtenantId(),
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
    }
  });
  return response.data;
});

export const getActiveSession = createAsyncThunk("getSession/get", async (userId) => {
  return apiCall({
    url: CREATE_ORDER.getActiveSession(userId),
    method: "GET",
    "X-TenantID": getXtenantId()
  }).then((res) => res?.data);
});

export const uploadDoc = createAsyncThunk("uploadDoc/post", async ({ data, token }) => {
  const response = await axios.post(CREATE_ORDER.uploadDoc(), data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-TenantID": getXtenantId() ? getXtenantId() : localStorage.getItem("subdomain"),
      Authorization: `${token}`
    }
  });
  return response.data;
});

export const getIdentityDocs = createAsyncThunk("getIdentityDocs/get", async ({ patientId, docId, token }) => {
  return apiCall({
    url: CREATE_PATIENT.getIdentityDocs(patientId, docId),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res.data);
});
export const getDoc = createAsyncThunk("getDoc/get", async ({ docId, orderId, patientId }) => {
  return apiCall({
    url: CREATE_ORDER.getDoc(docId, orderId, patientId),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res.data);
});
export const deleteCareGiver = createAsyncThunk("deleteCareGiver/get", async ({ patientCareGiverId }) => {
  return apiCall({
    url: CREATE_PATIENT.deleteCareGiver(patientCareGiverId),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res.data);
});

export const deleteInsuranceandGurantor = createAsyncThunk(
  "deleteInsuranceandGurantor/get",
  async ({ patientInsuranceId, patientGurantorId }) => {
    return apiCall({
      url: CREATE_PATIENT.deleteInsuranceandGurantor(patientInsuranceId, patientGurantorId),
      method: "GET",
      xTenantId: getXtenantId()
    }).then((res) => res.data);
  }
);
