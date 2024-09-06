import React, { useEffect, useState } from "react";
import { getFeatures, getOrderDetails, getPatientDetails, getTenantUsers } from "@redux/slices/tenantsSlice";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import ClientDetailsTable from "../../users/tntUserDetailsTable";
import FeaturesTable from "./featuresTable";
import OrderConfigurationTabComponent from "./order-config/orderConfigurationTab";
import OrderList from "./order-details/orderList";
import PatientDetailsTable from "./patient-details/patientDetailsTable";
import PropTypes from "prop-types";
import SettingsTab from "./settingsTab";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TntUserDetailsTab from "../../users/tenantUserDetailTabs";
import UserDetailsTabComponent from "./user-details/userDetailsTab";
import { roleIds } from "../../../_helpers/constants";

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

export default function TenantTabComponent({
  renderParent,
  setRenderParent,
  roles,
  setRoles,
  tenantRole,
  setTenantRole,
  selectedTenant,
  setSelectedTenant,
  setClientTab,
  clientTab
}) {
  const tabNameToIndex = {
    0: "user-details",
    1: "order-details",
    2: "order-configuration",
    3: "patient-details",
    4: "features",
    5: "settings"
  };

  const indexToTabName = {
    "user-details": 0,
    "order-details": 1,
    "order-configuration": 2,
    "patient-details": 3,
    features: 4,
    settings: 5
  };
  const routeParams = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(indexToTabName[routeParams.tabName]);
  const [searchVal, setSearchVal] = useState("");
  const [userId, setUserId] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [pagination1, setPagination1] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [priorityType, setPriorityType] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();

  const fetchPatientData = () => {
    // dispatch an action for getPatientTenants
    dispatch(
      getPatientDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "ASC",
        searchValue: searchVal,
        sortKey: sortKey || "lastModifiedDate",
        role: getLoggedInUserRoleId(),
        tenantId,
        userId: getLoggedInUserId() || ""
      })
    );
  };
  const fetchOrderDetailsData = () => {
    const statusIds = selectedStatus.map((t) => t.id);
    const types = selectedType.map((t) => t.id);
    const priorities = priorityType.map((t) => t.id);
    dispatch(
      getOrderDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "ASC",
        searchValue: searchVal,
        searchKeys: [],
        sortKey: sortKey || "firstName",
        sortBy: sortKey || "firstName",
        roleId: getLoggedInUserRoleId(),
        startDate,
        endDate,
        tenantId,
        orderStatus: statusIds,
        orderType: types,
        priorityType: priorities
      })
    );
  };

  const handleChange = (event, newValue) => {
    setSortKey("");
    setSortOrder("");
    setSearchVal("");
    setPagination({ pageIndex: 0, pageSize: 10 });
    navigate(`/tenant-config/tenant-details/${routeParams.tenantId}/${tabNameToIndex[newValue]}`);
    setValue(newValue);
  };
  const [selectedTenantId, setTenantId] = useState("");
  const { pathname } = useLocation();
  const tenantId = pathname.split("/")[3];
  const fetchTenantUserData = ({ roleId }) => {
    const userstatusId = selectedStatus.map((t) => t.id);
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: (pagination1 && pagination1?.pageIndex) || pagination.pageIndex,
          pageSize: pagination1 ? pagination1?.pageSize : pagination.pageSize
        },
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder.toUpperCase() || "DESC",
        searchValue: searchVal || "",
        tenantId,
        roleId: roleId || roles,
        role: getLoggedInUserRoleId(),
        userId:
          renderParent === true ? [] : selectedTenantId || selectedTenant ? [selectedTenantId || selectedTenant] : [],
        statusId: userstatusId,
        startDate,
        endDate
      })
    );
  };
  const fetchFeatures = () => {
    dispatch(getFeatures({ id: tenantId, roleId: getLoggedInUserRoleId() }));
  };

  useEffect(() => {
    if (
      userId === 0 &&
      value === 0 &&
      roles.includes(roleIds.TENANT_ADMIN) &&
      roles.includes(roleIds.CLIENT_ADMIN) &&
      roles.includes(roleIds.PROVIDER)
    ) {
      fetchTenantUserData({ roleId: [roleIds.TENANT_ADMIN, roleIds.CLIENT_ADMIN, roleIds.PROVIDER] });
      setPagination1({ pageIndex: 0, pageSize: 10 });
    }

    if (value === 1) {
      fetchOrderDetailsData();
      // setPagination1({ pageIndex: 0, pageSize: 10 });
    }

    if (value === 3) {
      fetchPatientData();
    }
    if (value === 4) {
      fetchFeatures();
    }
  }, [value, searchVal, pagination, sortKey, sortOrder, roles]);

  const updateSearch = (value) => {
    setSearchVal(value);
  };

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const updateSort = (val) => {
    if (val[0]?.id === "role.roleName") {
      setSortKey("role");
      setSortOrder(val[0]?.desc ? "desc" : "asc");
    } else if (val[0]?.id === "associatedWith.userName") {
      setSortKey("associatedWith");
      setSortOrder(val[0]?.desc ? "desc" : "asc");
    } else {
      setSortKey(val[0]?.id);
      setSortOrder(val[0]?.desc ? "desc" : "asc");
    }
  };

  return (
    <>
      <Box className="tab__wrapper parent-tab">
        <Tabs value={value} onChange={handleChange} aria-label="Tenant Details Tab" className="tabs_sections">
          <Tab label="User Details" {...a11yProps(0)} />
          <Tab label="Order Details" {...a11yProps(1)} />
          <Tab label="Order Configuration" {...a11yProps(2)} />
          <Tab label="Patient Details" {...a11yProps(3)} />
          <Tab label="Features" {...a11yProps(4)} />
          <Tab label="Settings" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {renderParent ? (
          <UserDetailsTabComponent
            userId={userId}
            setUserId={setUserId}
            fetchData={fetchTenantUserData}
            updatePagination={updatePagination}
            updateSort={updateSort}
            paginations={pagination}
            setPaginations={setPagination}
            updateSearch={updateSearch}
            setRoles={setRoles}
            roles={roles}
            setRenderParent={setRenderParent}
            setTenantRole={setTenantRole}
            sortKey={sortKey}
            sortOrder={sortOrder}
            searchVal={searchVal}
            setSelectedTenant={setSelectedTenant}
            setTenantId={setTenantId}
            setSortKey={setSortKey}
            setSortOrder={setSortOrder}
            setSearchVal={setSearchVal}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setClientTab={setClientTab}
          />
        ) : tenantRole && clientTab == false ? (
          <TntUserDetailsTab
            calluser="user details"
            selectedTenantId={selectedTenantId}
            searchVal={searchVal}
            setRoles={setRoles}
            roles={roles}
            updateSearch={updateSearch}
            selectedTenant={selectedTenant}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            startDate={startDate}
            pagination={pagination}
            setPagination={setPagination}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setPagination1={setPagination1}
            setTenantRole={setTenantRole}
            setClientTab={setClientTab}
            clientTab={clientTab}
            setTenantId={setTenantId}
          />
        ) : (
          clientTab && (
            <ClientDetailsTable
              tab="provider"
              selectedTenantId={selectedTenantId}
              updatePagination={updatePagination}
              updateSort={updateSort}
              setSelectedStatus={setSelectedStatus}
              selectedStatus={selectedStatus}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              updateSearch={updateSearch}
              paginations={pagination}
              setPaginations={setPagination}
              setRenderParent={setRenderParent}
              setTenantRole={setTenantRole}
              setTenantId={setTenantId}
            />
          )
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderList
          updateSearch={updateSearch}
          updatePagination={updatePagination}
          updateSort={updateSort}
          dataType="tenant"
          setPriorityType={setPriorityType}
          priorityType={priorityType}
          setSelectedStatus={setSelectedStatus}
          selectedStatus={selectedStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderConfigurationTabComponent />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PatientDetailsTable
          updateSearch={updateSearch}
          updatePagination={updatePagination}
          updateSort={updateSort}
          dataType="tenant"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <FeaturesTable tenantId={tenantId} roleId={getLoggedInUserRoleId()} fetchFeatures={fetchFeatures} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <SettingsTab />
      </TabPanel>
    </>
  );
}
