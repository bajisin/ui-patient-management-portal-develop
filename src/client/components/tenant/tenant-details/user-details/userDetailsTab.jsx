import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TenantAdminTable from "./table";
import { getLoggedInUserRoleId } from "../../../../utils/common";
import { roleIds } from "../../../../_helpers/constants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`child-tabpanel-${index}`}
      aria-labelledby={`child-tab-${index}`}
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
    id: `child-tab-${index}`,
    "aria-controls": `child-tabpanel-${index}`
  };
}

export default function UserDetailsTabComponent({
  fetchData,
  updatePagination,
  updateSort,
  updateSearch,
  setRoles,
  roles,
  setRenderParent,
  setTenantRole,
  sortKey,
  sortOrder,
  searchVal,
  setSelectedTenant,
  setTenantId,
  pagination,
  setPaginations,
  setSortKey,
  setSortOrder,
  setSearchVal,
  setSelectedStatus,
  selectedStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setUserId,
  setClientTab
}) {
  const [value, setValue] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  useEffect(() => {
    if (value === 0) {
      setRoles([roleIds.TENANT_ADMIN, roleIds.CLIENT_ADMIN, roleIds.PROVIDER]);
    }
    if (getLoggedInUserRoleId() === 1) {
      fetchData({ roleId: roles });
    } else fetchData({ roleId: [roleIds.TENANT_ADMIN, roleIds.CLIENT_ADMIN, roleIds.PROVIDER] });
  }, [value, pagination, sortKey, sortOrder, searchVal]);
  const handleChange = (event, newValue) => {
    setSortKey("");
    setSortOrder("");
    setSearchVal("");
    setValue(newValue);
    setUserId(newValue);
    setPaginations({ pageIndex: 0, pageSize: 10 });
    if (newValue === 0) {
      setRoles([roleIds.TENANT_ADMIN, roleIds.CLIENT_ADMIN, roleIds.PROVIDER]);
    }
    if (newValue === 1) {
      setRoles([roleIds.TENANT_ADMIN]);
    }
    if (newValue === 2) {
      setRoles([roleIds.CLIENT_ADMIN]);
    }
    if (newValue === 3) {
      setRoles([roleIds.PROVIDER]);
    }
  };

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="tenant child tabs" className="tabs_sections">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Tenant Admin" {...a11yProps(1)} />
          <Tab label="Client Admin" {...a11yProps(2)} />
          <Tab label="Providers" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TenantAdminTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          roles={roles}
          setSelectedStatus={setSelectedStatus}
          setRenderParent={setRenderParent}
          setTenantRole={setTenantRole}
          selectedStatus={selectedStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setSelectedDateRange={setSelectedDateRange}
          selectedDateRange={selectedDateRange}
          setTenantId={setTenantId}
          fetchData={fetchData}
          pagination={pagination}
          sortOrder={sortOrder}
          searchVal={searchVal}
          setClientTab={setClientTab}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TenantAdminTable
          value={value}
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          roles={roles}
          setRenderParent={setRenderParent}
          setTenantRole={setTenantRole}
          setSelectedTenant={setSelectedTenant}
          setSelectedStatus={setSelectedStatus}
          selectedStatus={selectedStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setSelectedDateRange={setSelectedDateRange}
          selectedDateRange={selectedDateRange}
          setTenantId={setTenantId}
          fetchData={fetchData}
          sortKey={sortKey}
          sortOrder={sortOrder}
          searchVal={searchVal}
          setClientTab={setClientTab}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TenantAdminTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          roles={roles}
          value={value}
          setRenderParent={setRenderParent}
          setTenantRole={setTenantRole}
          sortKey={sortKey}
          sortOrder={sortOrder}
          searchVal={searchVal}
          setRoles={setRoles}
          setSelectedStatus={setSelectedStatus}
          selectedStatus={selectedStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setSelectedDateRange={setSelectedDateRange}
          selectedDateRange={selectedDateRange}
          setTenantId={setTenantId}
          fetchData={fetchData}
          setClientTab={setClientTab}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TenantAdminTable
          value={value}
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          setRenderParent={setRenderParent}
          roles={roles}
          setSelectedStatus={setSelectedStatus}
          selectedStatus={selectedStatus}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setSelectedDateRange={setSelectedDateRange}
          selectedDateRange={selectedDateRange}
          fetchData={fetchData}
          sortKey={sortKey}
          sortOrder={sortOrder}
        />
      </TabPanel>
    </>
  );
}
