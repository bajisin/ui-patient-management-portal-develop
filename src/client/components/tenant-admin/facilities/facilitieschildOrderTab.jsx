import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";

import FacilitiesClientDetailsTable from "./facilitiesCilentDetailsTable";
import PropTypes from "prop-types";
import { statusIds } from "../../../_helpers/constants";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orderConfig-tabpanel-${index}`}
      aria-labelledby={`orderConfig-tab-${index}`}
      {...other}
    >
      {value === index && <Box> {children}</Box>}
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
    id: `orderConfig-${index}`,
    "aria-controls": `orderConfig-tabpanel-${index}`
  };
}

export default function FacilitiesChildOrderTab({
  updatePagination,
  updateSort,
  setStatus,
  updateSearch,
  sortOrder,
  sortKey,
  pagination,
  facilityId
}) {
  const [value, setValue] = useState(0);
  const { facilitiesOverviewOrder } = useSelector((state) => state.facilities);

  useEffect(() => {
    if (value === 0) setStatus([statusIds.ACTIVE, statusIds.IN_ACTIVE]);
    if (value === 1) setStatus([statusIds.ACTIVE]);
    if (value === 2) setStatus([statusIds.IN_ACTIVE]);
  }, [value]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredData =
    facilitiesOverviewOrder && facilitiesOverviewOrder.length > 0
      ? facilitiesOverviewOrder.filter((order) => order.status === "Active")
      : [];
  const filteredInData =
    facilitiesOverviewOrder && facilitiesOverviewOrder.length > 0
      ? facilitiesOverviewOrder.filter((order) => order.status === "Inactive")
      : [];

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="Tenant Details Tab" className="tabs_sections">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Active" {...a11yProps(1)} />
          <Tab label="Inactive" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FacilitiesClientDetailsTable
          updateSearch={updateSearch}
          updatePagination={updatePagination}
          updateSort={updateSort}
          sortOrder={sortOrder}
          sortKey={sortKey}
          pagination={pagination}
          facilityId={facilityId}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FacilitiesClientDetailsTable
          updateSearch={updateSearch}
          data={filteredData}
          updatePagination={updatePagination}
          updateSort={updateSort}
          sortOrder={sortOrder}
          sortKey={sortKey}
          pagination={pagination}
          facilityId={facilityId}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FacilitiesClientDetailsTable
          updateSearch={updateSearch}
          data={filteredInData}
          updatePagination={updatePagination}
          updateSort={updateSort}
          sortOrder={sortOrder}
          sortKey={sortKey}
          pagination={pagination}
          facilityId={facilityId}
        />
      </TabPanel>
    </>
  );
}
