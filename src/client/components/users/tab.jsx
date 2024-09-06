import React, { useEffect, useState } from "react";
import { getOrderDetails, getPatientDetails, getTenantUsers } from "../../redux/slices/tenantsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AdvanceSearch from "@components/tenant/tenant-details/user-details/advance-search";
import Box from "@mui/material/Box";
import ClientDetailsTable from "./tntUserDetailsTable";
import OrderList from "../tenant/tenant-details/order-details/orderList";
import PatientDetailsTable from "../tenant/tenant-details/patient-details/patientDetailsTable";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { getLoggedInUserRoleId } from "../../utils/common";
import { roleIds } from "../../_helpers/constants";

// import AdvanceFilterIcon from "@assets/images/ls_svg/advance-filter.svg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tenant-tabpanel-${index}`}
      aria-labelledby={`tenant-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `tenant-tab-${index}`,
    "aria-controls": `tenant-tabpanel-${index}`
  };
}

export default function ClientDetailsTab() {
  const tabNameToIndex1 = {
    0: "user-details",
    1: "order-details",
    2: "patient-details"
  };

  const tabNameToIndex2 = {
    0: "order-details",
    1: "patient-details"
  };

  const indexToTabName1 = {
    "user-details": 0,
    "order-details": 1,
    "patient-details": 2
  };

  const indexToTabName2 = {
    "order-details": 0,
    "patient-details": 1
  };

  const tabNameToIndex = getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? tabNameToIndex2 : tabNameToIndex1;
  const indexToTabName = getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? indexToTabName2 : indexToTabName1;
  const routeParams = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(indexToTabName[routeParams.tabName]);
  const { pathname } = useLocation();
  const userId = pathname.split("/")[3];
  const clientUserId = pathname.split("/")[2];
  const tenant = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { tenantUserById } = useSelector((state) => state.userDetails);
  const handleFilter = () => {
    setFilterOpen(true);
  };
  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const updateSort = (val) => {
    if (val[0]?.id === "status.statusDesc") {
      setSortKey(val[0]?.id?.split(".")[1]);
    } else {
      setSortKey(val[0]?.id);
    }
    setSortOrder(val[0]?.desc ? "desc" : "asc");
  };

  const updateSearch = (value) => {
    setSearchVal(value);
  };
  // const fetchOrderDetailsData = (data) => {
  //   // dispatch an action for getusertenants
  //   dispatch(getTenantOrderDetails(data));
  // };

  const handleChange = (event, newValue) => {
    setSortKey("");
    setSortOrder("");
    setSearchVal("");
    setPagination({ pageIndex: 0, pageSize: 10 });
    if (getLoggedInUserRoleId() === roleIds.TENANT_ADMIN) {
      navigate(`/tenant-admin-users/client-admin/${routeParams.id}/${tabNameToIndex[newValue]}`);
    } else if (getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN)
      navigate(`/client-admin-users/${routeParams.id}/${tabNameToIndex[newValue]}`);

    setValue(newValue);
  };

  const fetchUsers = () => {
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize
        },
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder.toUpperCase() || "DESC",
        searchValue: searchVal || "",
        tenantId: tenant?.tenantId,
        roleId: [roleIds?.PROVIDER],
        role: loggedInUserRole
        // userId: [userId]
      })
    );
  };
  const [selectedType, setSelectedType] = useState([]);
  const [priorityType, setPriorityType] = useState([]);

  const fetchOrderDetails = () => {
    dispatch(
      getOrderDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "ASC",
        searchValue: searchVal,
        searchKeys: [],
        sortKey: sortKey || "firstName",
        sortBy: sortKey || "firstName",
        orderStatus: [],
        orderType: [],
        priorityType: [],
        roleId: loggedInUserRole,
        startDate: "",
        endDate: "",
        tenantId: tenant?.tenantId,
        // userId: ["LIF000001"],
        userRoleId: [roleIds.CLIENT_ADMIN]
      })
    );
  };

  const fetchPatientDetails = () => {
    dispatch(
      getPatientDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "DESC",
        searchValue: searchVal,
        sortKey: sortKey || "lastModifiedDate",
        role: loggedInUserRole,
        tenantId: tenant?.tenantId
      })
    );
  };

  useEffect(() => {
    const userstatusId = selectedStatus.map((t) => t.id);
    if (getLoggedInUserRoleId() !== roleIds.CLIENT_ADMIN) {
      if (value === 0) {
        dispatch(
          getTenantUsers({
            pagination: {
              pageNo: pagination.pageIndex,
              pageSize: pagination.pageSize
            },
            sortKey: sortKey || "lastModifiedDate",
            sortOrder: sortOrder.toUpperCase() || "DESC",
            searchValue: searchVal || "",
            tenantId: tenant?.tenantId,
            roleId: [roleIds?.PROVIDER],
            role: Number(localStorage.getItem("roleId")),
            userId: pathname.includes("tenant-admin-users/client-admin") ? [userId] : [],
            // userId: loggedInUserRole === 2 ? [userId] : [tenantUserById?.userId],
            statusId: userstatusId,
            startDate,
            endDate
          })
        );
      }
    }
    if (getLoggedInUserRoleId() !== roleIds.CLIENT_ADMIN ? value === 1 : value === 0) {
      dispatch(
        getOrderDetails({
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sortOrder: sortOrder.toUpperCase() || "DESC",
          searchValue: searchVal,
          searchKeys: [],
          sortKey: sortKey || "lastModifiedDate",
          orderStatus: [],
          orderType: [],
          priorityType: [],
          roleId: Number(localStorage.getItem("roleId")),
          startDate,
          endDate,
          tenantId: tenant?.tenantId,
          userId: getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? clientUserId : tenantUserById?.userId || userId
          // statusId:  userId || userstatusId
        })
      );
    }
    if (getLoggedInUserRoleId() !== roleIds.CLIENT_ADMIN ? value === 2 : value === 1) {
      dispatch(
        getPatientDetails({
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sortOrder: sortOrder.toUpperCase() || "DESC",
          searchValue: searchVal,
          sortKey: sortKey || "lastModifiedDate",
          role: Number(localStorage.getItem("roleId")),
          tenantId: tenant?.tenantId,
          statusId: userstatusId,
          userId: tenantUserById?.userId,
          startDate,
          endDate
        })
      );
    }
  }, [value, pagination, sortOrder, sortKey, searchVal]);
  return (
    <>
      <Box className="tab__wrapper parent-tab">
        <Tabs value={value} onChange={handleChange} aria-label="Tenant Details Tab" className="tabs_sections">
          {getLoggedInUserRoleId() !== 3 && <Tab label="User Details" {...a11yProps(0)} />}
          <Tab label="Order Details" {...a11yProps(1)} />
          <Tab label="Patient Details" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? (
          <OrderList
            updateSearch={updateSearch}
            updatePagination={updatePagination}
            updateSort={updateSort}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            setPriorityType={setPriorityType}
            priorityType={priorityType}
            setSelectedType={setSelectedType}
            selectedType={selectedType}
          />
        ) : (
          <ClientDetailsTable
            tab="provider"
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            updatePagination={updatePagination}
            updateSort={updateSort}
            updateSearch={updateSearch}
            usersId={userId}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? (
          <PatientDetailsTable
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            updatePagination={updatePagination}
            updateSort={updateSort}
            updateSearch={updateSearch}
          />
        ) : (
          <OrderList
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            setSelectedType={setSelectedType}
            selectedType={selectedType}
            setPriorityType={setPriorityType}
            priorityType={priorityType}
            updateSearch={updateSearch}
            updatePagination={updatePagination}
            updateSort={updateSort}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PatientDetailsTable updatePagination={updatePagination} updateSort={updateSort} updateSearch={updateSearch} />
      </TabPanel>
      {/* <AdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        roles={[roleIds.PROVIDER]}
        userId={userId}
        call="users"
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      /> */}
    </>
  );
}
