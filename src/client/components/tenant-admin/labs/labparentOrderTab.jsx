import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { clientListByLabId, orderListByLabId, patientListByLabId } from "../../../redux/slices/labs-slice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import LabChildOrderTab from "./labchildOrderTab";
import OrderList from "../../tenant/tenant-details/order-details/orderList";
import PatientDetailsTable from "../../tenant/tenant-details/patient-details/patientDetailsTable";
import PropTypes from "prop-types";
import { statusIds } from "../../../_helpers/constants";
import { useDispatch } from "react-redux";

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

export default function LabParentOrderTab() {
  const tabNameToIndex = {
    0: "client-details",
    1: "patient-details",
    2: "order-details"
  };

  const indexToTabName = {
    "client-details": 0,
    "patient-details": 1,
    "order-details": 2
  };
  const routeParams = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(indexToTabName[routeParams.tabName]);
  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState([statusIds.ACTIVE, statusIds.IN_ACTIVE]);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const labId = pathname.split("/")[3];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleChange = (event, newValue) => {
    navigate(`/labs/lab-details/${routeParams.labId}/${tabNameToIndex[newValue]}`);
    setValue(newValue);
  };
  const handleFilter = () => {
    setFilterOpen(true);
  };
  const handleEditClickOpen = () => {
    setOpen(true);
  };

  const updateSearch = (value) => {
    setSearchVal(value);
  };

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };

  const fetchClientList = () => {
    dispatch(
      clientListByLabId({
        pageNo: pagination.pageIndex,
        labId,
        pageSize: pagination.pageSize,
        searchValue: searchVal || "",
        sortKey: sortKey || "lastName",
        sortOrder: sortOrder.toUpperCase() || "ASC",
        startDate: "",
        endDate: "",
        statusId: status
      })
    );
  };
  const fetchPatientData = () => {
    dispatch(
      patientListByLabId({
        pageNo: pagination.pageIndex,
        labId,
        pageSize: pagination.pageSize,
        searchValue: searchVal || "",
        sortKey: sortKey || "lastName",
        sortOrder: sortOrder.toUpperCase() || "ASC",
        startDate: "",
        endDate: "",
        statusId: []
      })
    );
  };

  const fetchOrderDetailsData = () => {
    dispatch(
      orderListByLabId({
        pageNo: pagination.pageIndex,
        labId,
        pageSize: pagination.pageSize,
        searchValue: searchVal || "",
        sortKey: sortKey || "lastName",
        sortOrder: sortOrder.toUpperCase() || "ASC",
        startDate: "",
        endDate: "",
        statusId: []
      })
    );
  };

  useEffect(() => {
    if (value === 0) {
      fetchClientList();
    }
    if (value === 1) {
      fetchPatientData();
    }
    if (value === 2) {
      fetchOrderDetailsData();
    }
  }, [value, searchVal, pagination, sortKey, sortOrder, status]);
  return (
    <>
      <Box className="tab__wrapper parent-tab">
        <Tabs value={value} onChange={handleChange} aria-label="Tenant Details Tab" className="tabs_sections">
          <Tab label="Client Details" {...a11yProps(0)} />
          <Tab label="Patient Details" {...a11yProps(1)} />
          <Tab label="Order Details" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <LabChildOrderTab
          updateSearch={updateSearch}
          updatePagination={updatePagination}
          updateSort={updateSort}
          setStatus={setStatus}
          dataType="lab"
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        {/* <LabCilentDetailsTable /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <LabpatientDetailsTable /> */}
        <PatientDetailsTable
          updateSearch={updateSearch}
          updatePagination={updatePagination}
          updateSort={updateSort}
          dataType="lab"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <LabOrderDetailsTable />  */}
        <OrderList
          updateSearch={updateSearch}
          updatePagination={updatePagination}
          updateSort={updateSort}
          dataType="lab"
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </TabPanel>
    </>
  );
}
