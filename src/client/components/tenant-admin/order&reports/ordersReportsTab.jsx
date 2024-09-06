import * as React from "react";

import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

import OrderReportsTable from "./orderReportsTable";
import PropTypes from "prop-types";
import { getOrderDetails } from "@redux/slices/tenantsSlice";
import { orderDetailsPayload } from "@pages/payload/usersPayload";
import { statusIds } from "../../../_helpers/constants";
import { useDispatch } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orderReports-tabpanel-${index}`}
      aria-labelledby={`orderReports-tab-${index}`}
      {...other}
    >
      {value === index && <Box> {children} </Box>}
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
    id: `orderReports-tab-${index}`,
    "aria-controls": `orderReports-tabpanel-${index}`
  };
}

export default function ReportsTabComponent({
  searchKeys,
  searchVal,
  endDate,
  startDate,
  setSelectedOrderStatus,
  sortOrder,
  setSortOrder,
  sortKey,
  setSortKey,
  pagination,
  setPagination,
  recurring,
  setRecurring,
  selectedOrderStatus,
  selectedOrderType,
  selectedPriorityType,
  setTabStatus,
  value,
  setValue
}) {
  const [status, setStatus] = useState([
    statusIds.COMPLETED_IN_PROGRESS_ORDER,
    statusIds.ACTIVE,
    statusIds.IN_PROGRESS,
    statusIds.DRAFT,
    statusIds.CANCELLED,
    statusIds.COMPLETED,
    statusIds.ERRORED,
    statusIds.ON_HOLD,
    statusIds.COMPLETED_CORRECTED_ORDER,
    statusIds.REJECTED
  ]);
  const dispatch = useDispatch();
  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };
  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };
  const fetchData = () => {
    // dispatch an action for gettenants
    const orderStatus = selectedOrderStatus.map((t) => t.id);
    const mergedStatus = orderStatus;

    dispatch(
      getOrderDetails({
        ...orderDetailsPayload({
          pagination,
          sortOrder,
          sortKey,
          searchVal,
          searchKeys,
          mergedStatus,
          selectedOrderType,
          selectedPriorityType,
          startDate,
          endDate,
          status: pagination?.pageIndex > 0 ? mergedStatus?.length > 0 ? mergedStatus : status : status,
          recurring,
          patientId: value === 6 ? [0] : []
        })
      })
    );
  };
  useEffect(() => {
    setTabStatus(status);
  }, [status]);
  useEffect(() => {
    fetchData(status);
  }, [searchVal, pagination, sortKey, sortOrder, status]);
  const handleChange = (event, newValue) => {
    setSortKey("");
    setSelectedOrderStatus([]);
    setPagination({ pageIndex: 0, pageSize: 10 });
    if (newValue === 0) {
      setStatus([
        statusIds.COMPLETED_IN_PROGRESS_ORDER,
        statusIds.ACTIVE,
        statusIds.IN_PROGRESS,
        statusIds.DRAFT,
        statusIds.CANCELLED,
        statusIds.COMPLETED,
        statusIds.ERRORED,
        statusIds.ON_HOLD,
        statusIds.COMPLETED_CORRECTED_ORDER,
        statusIds.REJECTED,
        statusIds.YetToBeSubmitted
      ]);
    } else if (newValue === 1) {
      setStatus([statusIds.DRAFT]);
      setRecurring(false);
    } else if (newValue === 2) {
      setStatus([statusIds.IN_PROGRESS]);
      setRecurring(false);
    } else if (newValue === 3) {
      setStatus([statusIds.COMPLETED]);
      setRecurring(false);
    } else if (newValue === 4) {
      setRecurring(false);
      setStatus([statusIds.CANCELLED]);
    } else if (newValue === 5) {
      setRecurring(false);
      setStatus([statusIds.REJECTED]);
    } else if (newValue === 6) {
      setRecurring(false);
      setStatus([
        statusIds.COMPLETED_IN_PROGRESS_ORDER,
        statusIds.ACTIVE,
        statusIds.IN_PROGRESS,
        statusIds.DRAFT,
        statusIds.CANCELLED,
        statusIds.COMPLETED,
        statusIds.ERRORED,
        statusIds.ON_HOLD,
        statusIds.COMPLETED_CORRECTED_ORDER,
        statusIds.REJECTED,
        statusIds.YetToBeSubmitted
      ]);
    } else if (newValue === 7) {
      setRecurring(false);
      setStatus([statusIds.COMPLETED_CORRECTED_ORDER]);
    } else if (newValue === 8) {
      setRecurring(false);
      setStatus([statusIds.REJECTED]);
    }
    setValue(newValue);
  };

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="Order Reports tabs" className="tabs_sections">
          <Tab label="All" {...a11yProps(0)} />
          {/* <Tab label="In Progress" {...a11yProps(1)} /> */}
          <Tab label="Drafts" {...a11yProps(1)} />
          <Tab label="Submitted" {...a11yProps(2)} />
          <Tab label="Resulted" {...a11yProps(3)} />
          {/* <Tab label="On Hold" {...a11yProps(3)} />
          <Tab label="Completed" {...a11yProps(4)} /> */}
          <Tab label="Cancelled" {...a11yProps(4)} />
          <Tab label="Rejected" {...a11yProps(5)} />
          {/* <Tab label="Unassigned" {...a11yProps(6)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <OrderReportsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          pagination={pagination}
          setPagination={setPagination}
        />
      </TabPanel>
    </>
  );
}
