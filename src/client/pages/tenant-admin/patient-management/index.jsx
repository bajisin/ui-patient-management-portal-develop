import { Box, Button, Grid, Typography } from "@mui/material";
import { Patient, Order } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId, getLoggedInUserId } from "../../../utils/common";
import { useDispatch, useSelector } from "react-redux";

import PatientManagementTable from "@components/tenant-admin/PatientManagement/patientManagementTable";
import SearchComponent from "../../../components/search";
import { getPatientDetails } from "@redux/slices/tenantsSlice";
import { useNavigate } from "react-router-dom";

// import LabCilentDetailsTable from "../../components/tenant-admin/labs/labCilentDetailsTable";

export default function PatientManagement() {
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [searchVal, setSearchVal] = useState("");

  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };
  const { totalCount } = useSelector((state) => state.tenants);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchPatientData = () => {
    // dispatch an action for getPatientTenants
    dispatch(
      getPatientDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "DESC",
        searchValue: searchVal,
        sortKey: sortKey || "lastModifiedDate",
        role: getLoggedInUserRoleId(),
        tenantId: getTenantId(),
        userId: getLoggedInUserId()
      })
    );
  };
  useEffect(() => {
    fetchPatientData();
  }, [searchVal, pagination]);
  const updateSearch = (value) => {
    // fetchPatientData();
    setSearchVal(value);
  };
  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };
  const handleAddPatientClick = () => {
    // Pass parameters as query parameters
    const queryParams = {
      param: "addPatient"
    };
    navigate(`/patient-search?${new URLSearchParams(queryParams).toString()}`);
  };

  const handleCreateOrderClick = () => {
    // Pass parameters as query parameters
    const queryParams = {
      param: "createOrder"
    };
    navigate(`/patient-search?${new URLSearchParams(queryParams).toString()}`);
  };

  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Patient Management
            <Typography component="span" variant="span">
              View all the patients associated with tenant
            </Typography>
          </Typography>
          <Typography>
            {Patient && Patient?.createInd === true ? (
              <Button
                component="button"
                variant="outlined"
                className="primary-outline-btn"
                onClick={handleAddPatientClick}
                // navigate(`/patient-search`);
                // }
              >
                Add Patient
              </Button>
            ) : (
              ""
            )}
            {Order && Order?.createInd === true ? (
              <Button
                component="button"
                variant="outlined"
                className="primary-btn ms-2"
                onClick={handleCreateOrderClick}
                // navigate(`/patient-search`);
                // }
              >
                Create Order
              </Button>
            ) : (
              ""
            )}
          </Typography>
        </Typography>
        <Box className="order-config-section">
          <Grid container rowSpacing={2} className="content__wrapper--view">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__header px-3 pb-3">
                <Typography component="h5" variant="h5">
                  {totalCount} Patients found
                </Typography>
                <SearchComponent updateSearch={updateSearch} />
              </Box>
              <Box className="list__view">
                <PatientManagementTable updateSort={updateSort} updatePagination={updatePagination} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
