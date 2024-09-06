import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { COMMON_ADMIN_APIS } from "../../../../config/api-config";
import { COMPENDIUM } from "@config/api-config";
import { apiCall } from "@config/http-config";
import axios from "axios";
import { getXtenantId } from "@utils/common";

const initialState = {
  data: [],
  loading: false,
  status: "",
  error: "",
  showSuccessPopup: false,
  popupMessage: "",
  compendiumList: [],
  uploadSuccess: false,
  compendiumData: {},
  compendiumListDelete: [],
  payerCompendiumList: [],
  labList: [],
  mneumonicList: [],
  relationList: [],
  uploadedData: "",
  uploadedPayerData: ""
};

const compendiumSlice = createSlice({
  name: "compendium",
  initialState,
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    },
    setCompendiumEditData: (state, action) => {
      state.compendiumData = action.payload;
    },
    setCompendiumListDelete: (state, action) => {
      state.compendiumListDelete = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTestCompendiumsList.pending, (state, action) => {
      state.loading = true;
      state.data = [];
      state.compendiumList = [];
    });
    builder.addCase(getTestCompendiumsList.fulfilled, (state, action) => {
      state.loading = false;
      state.compendiumList = action?.payload?.data;
      state.totalCount = action?.payload?.totalCount;
    });
    builder.addCase(getTestCompendiumsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPayerCompendiumsList.pending, (state, action) => {
      state.loading = true;
      state.data = [];
      state.payerCompendiumList = [];
    });
    builder.addCase(getPayerCompendiumsList.fulfilled, (state, action) => {
      state.loading = false;
      state.payerCompendiumList = action.payload?.data;
      state.totalCount = action.payload?.totalCount;
    });
    builder.addCase(getPayerCompendiumsList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(uploadExcelFile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadExcelFile.fulfilled, (state, action) => {
      state.uploadSuccess = action.payload;
      state.loading = false;
    });
    builder.addCase(uploadExcelFile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(saveExcelFile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveExcelFile.fulfilled, (state, action) => {
      state.uploadedData = action.payload;
      state.loading = false;
    });
    builder.addCase(saveExcelFile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(savePayerExcelFile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(savePayerExcelFile.fulfilled, (state, action) => {
      state.uploadedPayerData = action.payload;
      state.loading = false;
    });
    builder.addCase(savePayerExcelFile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(uploadPayercompendiumExcelFile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadPayercompendiumExcelFile.fulfilled, (state, action) => {
      state.uploadSuccess = action.payload;
      state.loading = false;
    });
    builder.addCase(uploadPayercompendiumExcelFile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteTestCompendiumById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTestCompendiumById.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
      state.compendiumListDelete = state.compendiumListDelete.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(deleteTestCompendiumById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateCompendiumlist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCompendiumlist.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      // state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updateCompendiumlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getLabList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLabList.fulfilled, (state, action) => {
      state.labList = action.payload;
      state.loading = false;
    });
    builder.addCase(getLabList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getMneumonicList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMneumonicList.fulfilled, (state, action) => {
      state.mneumonicList = action.payload;
      state.loading = false;
    });
    builder.addCase(getMneumonicList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updatePayerCompendium.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePayerCompendium.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
    });
    builder.addCase(updatePayerCompendium.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deletePayerCompendium.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletePayerCompendium.fulfilled, (state, action) => {
      state.status = action.payload;
      state.loading = false;
      state.showSuccessPopup = true;
      state.popupMessage = action.payload;
      // state.compendiumListDelete = state.compendiumListDelete.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(deletePayerCompendium.rejected, (state, action) => {
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
  }
});
export const { setShowSuccessPopup, setPopupMessage, setCompendiumEditData } = compendiumSlice.actions;
export default compendiumSlice.reducer;

export const getTestCompendiumsList = createAsyncThunk(
  "getTestCompendiums/get",
  async ({
    pagination,
    status,
    sortKey,
    sortOrder,
    searchValue,
    searchKeys,
    specimenTypeId,
    sortBy,
    workGroupId,
    orderTypeId,
    preferredContainerType,
    alternateContainerType,
    departmentId
  }) => {
    return apiCall({
      url: COMPENDIUM.getTestCompendiums(),
      method: "POST",
      xTenantId: getXtenantId(),
      data: {
        pageNo: pagination.pageIndex || 0,
        pageSize: pagination.pageSize || 10,
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder || "DESC",
        searchValue: searchValue || "",
        // searchKeys: searchKeys || "",
        // sortBy: sortBy || "",
        specimenTypeId: specimenTypeId || [],
        workGroupId: workGroupId || [],
        departmentId: departmentId || [],
        orderTypeId: orderTypeId || [],
        preferredContainerType: preferredContainerType || [],
        alternateContainerType: alternateContainerType || []
      }
    }).then((response) => response?.data);
  }
);
export const getPayerCompendiumsList = createAsyncThunk(
  "getPayerCompendiums/get",
  async ({
    pagination,
    status,
    sortKey,
    sortOrder,
    searchValue,
    searchKeys,

    sortBy
  }) => {
    return apiCall({
      url: COMPENDIUM.getPayerCompendiums(),
      method: "POST",
      xTenantId: getXtenantId(),
      data: {
        pageNo: pagination.pageIndex || 0,
        pageSize: pagination.pageSize || 10,
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder || "DESC",
        searchValue: searchValue || ""
        // searchKeys: searchKeys || "",
        // sortBy: sortBy || "",
      }
    }).then((response) => response?.data);
  }
);
export const uploadExcelFile = createAsyncThunk("uploadExcelFile/get", async (formData) => {
  return axios
    .post(COMPENDIUM.getuploadExcelFile(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-TenantID": getXtenantId(),
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
      }
    })
    .then((response) => response);
});

export const saveExcelFile = createAsyncThunk("saveExcelFile/post", async (data) => {
  return apiCall({
    url: COMPENDIUM.saveExcelFile(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});

export const uploadPayercompendiumExcelFile = createAsyncThunk("uploadPayerExcelFile/get", async (formData) => {
  return axios
    .post(COMPENDIUM.getpayeruploadExcelFile(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-TenantID": getXtenantId(),
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
      }
    })
    .then((response) => response);
});
export const savePayerExcelFile = createAsyncThunk("savePayerExcelFile/post", async (data) => {
  return apiCall({
    url: COMPENDIUM.savePayerExcelFile(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});
export const deleteTestCompendiumById = createAsyncThunk("testCompendium/delete", async ({ id }) => {
  return apiCall({
    url: COMPENDIUM.deleteTestCompendiumById(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response.data);
});
export const updateCompendiumlist = createAsyncThunk("CompendiumAll/post", async (data) => {
  return apiCall({
    url: COMPENDIUM.updateCompendium(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((response) => response?.data);
});

export const getLabList = createAsyncThunk("getLab/get", async () => {
  return apiCall({
    url: COMPENDIUM.getLabList(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const getMneumonicList = createAsyncThunk("getMneumonic/get", async () => {
  return apiCall({
    url: COMPENDIUM.getMneumonicList(),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((res) => res?.data);
});

export const updatePayerCompendium = createAsyncThunk("updatePayer/put", async (data) => {
  return apiCall({
    url: COMPENDIUM.updatePayerCompendium(),
    method: "POST",
    xTenantId: getXtenantId(),
    data
  }).then((res) => res.data);
});

export const deletePayerCompendium = createAsyncThunk("payerCompendium/delete", async ({ id }) => {
  return apiCall({
    url: COMPENDIUM.deletePayerCompendium(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response.data);
});

export const getRelationList = createAsyncThunk("relationlist/get", async (id) => {
  return apiCall({
    url: COMMON_ADMIN_APIS.getRelastionList(id),
    method: "GET",
    xTenantId: getXtenantId()
  }).then((response) => response?.data);
});
