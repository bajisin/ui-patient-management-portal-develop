import { Client, Provider, roleIds } from "../../_helpers/constants";
import React, { useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useLocation, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TntUsersDetailTable from "./tntUserDetailsTable";
import { getLoggedInUserId } from "../../utils/common";
import { getTenantUsers } from "@redux/slices/tenantsSlice";
import { useDispatch } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tntUserDetails-tabpanel-${index}`}
      aria-labelledby={`tntUserDetails-tab-${index}`}
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
    id: `tntUserDetails-tab-${index}`,
    "aria-controls": `tntUserDetails-tabpanel-${index}`
  };
}

export default function UserDetailsTabComponent({
  selectedTenantId,
  calluser,
  selectedTenant,
  roles,
  setRoles,
  searchVal,
  updateSearch,
  handleFilter,
  setSelectedStatus,
  selectedStatus,
  startDate,
  setStartDate,
  setPagination: propSetPagination,
  pagination: propPagination,
  // pagination,
  // setPagination,
  endDate,
  setEndDate,
  setPagination1,
  setTenantRole,
  setClientTab,
  clientTab,
  setTenantId
}) {
  // const tabNameToIndex = {
  //   0: "client-admin",
  //   1: "providers"
  // };

  const indexToTabName = {
    "client-admin": 0,
    providers: 1
  };
  const { pageIndex: propPageIndex = 0, pageSize: propPageSize = 10 } = propPagination || {};
  const [pagination, setPagination] = useState({
    pageIndex: propPageIndex,
    pageSize: propPageSize
  });
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(indexToTabName[routeParams.tabName] || 0);
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const tenantId = getTenantId();
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const { pathname } = useLocation();
  const taTenantId = pathname.split("/")[1];
  // const [localPagination, setlocalPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 10
  // });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const handleChange = (event, newValue) => {
    setSortKey("");
    setSortOrder("");
    setPagination({ pageIndex: 0, pageSize: 10 });
    // navigate(`/tenant-admin-users/${tabNameToIndex[newValue]}`);
    setValue(newValue);
    if (newValue === 0) {
      setRoles([roleIds.CLIENT_ADMIN]);
      // dispatch(getUsersByRole("Client Admin"));
    } else if (newValue === 1) setRoles([roleIds.PROVIDER]);
    // dispatch(getUsersByRole("Provider"));
  };

  const updatePagination = (paginationProp) => {
    if (calluser === "user details") {
      setPagination1(paginationProp);
    }
    setPagination(paginationProp);
  };

  // const updateSort = (val) => {
  //   console.log(val, "val");
  //   setSortKey(val[0].id);
  //   setSortOrder(val[0].desc ? "desc" : "asc");
  // };
  const updateSort = (val) => {
    if (val[0]?.id === "status.statusDesc") {
      setSortKey(val[0]?.id?.split(".")[1]);
    } else {
      setSortKey(val[0]?.id);
      setSortOrder(val[0].desc ? "desc" : "asc");
    }
  };

  const fetchTenantUserData = (data) => {
    // dispatch an action for getusertenants
    const userstatusId = selectedStatus?.map((t) => t.id);
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize
        },
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder?.toUpperCase() || "DESC",
        searchValue: searchVal || "",
        tenantId: getTenantId(),
        roleId: roles,
        role: getLoggedInUserRoleId(),
        userId:
          taTenantId === "tenant-admin-users" && value === 0
            ? []
            : getLoggedInUserRoleId() === roleIds.TENANT_ADMIN
            ? []
            : [getLoggedInUserId()] || [],
        statusId: userstatusId,
        startDate,
        endDate
      })
    );
  };
  React.useEffect(() => {
    if (getLoggedInUserRoleId() === roleIds.TENANT_ADMIN) {
      fetchTenantUserData();
    }
  }, []);
  // useEffect(() => {
  //   fetchTenantUserData();
  // }, [roles]);

  React.useEffect(() => {
    if (taTenantId === "tenant-admin-users") {
      // fetchTenantUserData();
    }
    if (value === 0) {
      setRoles([roleIds.CLIENT_ADMIN]);
      if (getLoggedInUserRoleId() === roleIds.TENANT_ADMIN) {
        fetchTenantUserData();
      }
      // dispatch(getUsersByRole("Client Admin"));
      // fetchTenantUserData();
    } else if (value === 1) {
      setRoles([roleIds.PROVIDER]);
      if (getLoggedInUserRoleId() === roleIds.TENANT_ADMIN) {
        fetchTenantUserData();
      }

      // dispatch(getUsersByRole("Provider"));
    }

    // fetchData();
  }, [value, pagination, sortOrder, sortKey, searchVal]);

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        {Client && Client?.readInd === false && Provider && Provider.readInd === false ? (
          "You dont have access to read the content"
        ) : (
          <Tabs value={value} onChange={handleChange} aria-label="tenant child tabs" className="tabs_sections">
            {loggedInUserRole !== 1 ? (
              Client && Client?.readInd === true && <Tab label="Client Admin" {...a11yProps(0)} />
            ) : (
              <Tab label="Client Admin" {...a11yProps(0)} />
            )}
            {loggedInUserRole !== 1 ? (
              Provider && Provider?.readInd === true && <Tab label="Providers" {...a11yProps(1)} />
            ) : (
              <Tab label="Providers" {...a11yProps(1)} />
            )}
          </Tabs>
        )}
      </Box>
      {Client && Client?.readInd === true && (
        <TabPanel value={value} index={0}>
          <TntUsersDetailTable
            selectedTenantId={selectedTenantId}
            tab="client"
            calluser={calluser}
            updatePagination={updatePagination}
            updateSort={updateSort}
            searchVal={searchVal}
            updateSearch={updateSearch}
            handleFilter={handleFilter}
            pagination={pagination}
            setPagination={setPagination}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedTenant={selectedTenant}
            roles={roles}
            sortKey={sortKey}
            sortOrder={sortOrder}
            setTenantRole={setTenantRole}
            setClientTab={setClientTab}
            clientTab={clientTab}
            setTenantId={setTenantId}
          />
        </TabPanel>
      )}
      {Provider && Provider.readInd === true && (
        <TabPanel value={value} index={1}>
          <TntUsersDetailTable
            calluser={calluser}
            selectedTenantId={selectedTenantId}
            tab="provider"
            updatePagination={updatePagination}
            updateSort={updateSort}
            updateSearch={updateSearch}
            searchVal={searchVal}
            handleFilter={handleFilter}
            pagination={pagination}
            setPagination={setPagination}
            setSelectedStatus={setSelectedStatus}
            selectedStatus={selectedStatus}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedTenant={selectedTenant}
            roles={roles}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />
        </TabPanel>
      )}
    </>
  );
}
