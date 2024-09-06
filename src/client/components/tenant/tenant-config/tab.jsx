import { Box, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTenantList, getTenants } from "@redux/slices/tenantsSlice";
import { useDispatch, useSelector } from "react-redux";

import AdvanceFilter from "../../../components/advance-filter";
import PropTypes from "prop-types";
import SearchComponent from "@components/search";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TenantTable from "./table";
import { getLoggedInUserRoleId } from "@utils/common";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function TabComponent() {
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const { totalCount } = useSelector((state) => state.tenants);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [tenantIds, setTenantIds] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [value, setValue] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState("");
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const dispatch = useDispatch();
  const fetchData = (data) => {
    dispatch(getTenants(data)).then((response) => {
      const responseData = JSON.stringify(response?.payload?.data);
      localStorage.setItem("Response", responseData);
    });
  };
  useEffect(() => {
    const role = getLoggedInUserRoleId();
    const tenantIds = selectedTenants.map((t) => t.tenantId);
    if (value === 0) {
      fetchData({ pagination, ...{ status: "All" }, tenantIds, startDate, endDate, role });
    } else if (value === 1) {
      fetchData({ pagination, ...{ status: "Active" }, tenantIds, startDate, endDate, role });
    } else if (value === 2) {
      fetchData({ pagination, ...{ status: "inActive" }, tenantIds, startDate, endDate, role });
    } else if (value === 3) {
      fetchData({ pagination, ...{ status: "Pending" }, tenantIds, startDate, endDate, role });
    }
  }, [pagination]);

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
    const role = getLoggedInUserRoleId();
    fetchData({ paginationProp, ...getCurrentStateTab(), role });
  };

  const handleChange = (event, newValue) => {
    setPagination({
      pageIndex: 0,
      pageSize: 10
    });
    const role = getLoggedInUserRoleId();

    if (newValue === 0) {
      fetchData({ pagination, ...{ status: "All" }, tenantIds, startDate, endDate, role });
      setStatus("All");
    }
    if (newValue === 1) {
      fetchData({ pagination, ...{ status: "Active" }, tenantIds, startDate, endDate, role });
      setStatus("Active");
    }
    if (newValue === 2) {
      fetchData({ pagination, ...{ status: "inActive" }, tenantIds, startDate, endDate, role });
      setStatus("inActive");
    }
    if (newValue === 3) {
      fetchData({ pagination, ...{ status: "Pending" }, tenantIds, startDate, endDate, role });
      setStatus("Pending");
    }

    setValue(newValue);
  };
  const getCurrentStateTab = () => {
    switch (value) {
      case 0:
        return { status: "All" };
      case 1:
        return { status: "active" };
      case 2:
        return { status: "inActive" };
      case 3:
        return { status: "Pending" };
    }
  };
  const role = getLoggedInUserRoleId();
  const updateSearch = (val) => {
    fetchData({
      pagination,
      ...getCurrentStateTab(),
      sortKey,
      sortOrder,
      searchValue: val,
      role
    });
  };
  const updateSort = (val) => {
    if (val[0] !== "tenantLogo") {
      setSortKey(val[0].id);
      setSortOrder(val[0].desc ? "DESC" : "ASC");
      fetchData({
        pagination,
        ...getCurrentStateTab(),
        sortKey: val[0].id,
        sortOrder: val[0].desc ? "DESC" : "ASC",
        role
      });
    }
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
  };

  useEffect(() => {
    dispatch(getTenantList({ statusIds: [] }));
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
        <Typography component="h5" variant="h5">
          Overview
        </Typography>
        <Box className="icons-separted">
          {/* <Typography
            onClick={handleFilter}
            component="span"
            variant="span"
            className="ls-advance-filter advance__filter-wrapper"
          ></Typography> */}
          <>
            <Typography
              onClick={handleClick}
              aria-describedby={id}
              component="span"
              variant="span"
              className="ls-advance-filter advance__filter-wrapper"
            ></Typography>
            <div>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleFilter}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                <Typography sx={{ p: 2 }} className="advance-filter--popover">
                  <AdvanceFilter
                    setFilterOpen={setFilterOpen}
                    filterOpen={filterOpen}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setFilteredData={setFilteredData}
                    list="tenant"
                    setSelectedDateRange={setSelectedDateRange}
                    selectedDateRange={selectedDateRange}
                    customPickerOpen={customPickerOpen}
                    setCustomPickerOpen={setCustomPickerOpen}
                    setStart={setStart}
                    start={start}
                    setEnd={setEnd}
                    end={end}
                  />
                </Typography>
              </Popover>
            </div>
          </>
          <SearchComponent updateSearch={updateSearch} />
        </Box>
      </Box>
      <Box className="tab__wrapper admin-tabs list__header px-3 pb-3 mb-2 position-relative order-report-title">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs_sections">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Active" {...a11yProps(1)} />
          <Tab label="Inactive" {...a11yProps(2)} />
          <Tab label="Pending" {...a11yProps(3)} />
        </Tabs>
        <Typography component="h5" variant="h5">
          {totalCount} Tenants found
        </Typography>
      </Box>
      <TabPanel value={value} index={0}>
        <TenantTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          value={value}
          setPagination={setPagination}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TenantTable updatePagination={updatePagination} updateSort={updateSort} value={value} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TenantTable updatePagination={updatePagination} updateSort={updateSort} value={value} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TenantTable updatePagination={updatePagination} updateSort={updateSort} value={value} />
      </TabPanel>

      {/* <AdvanceFilter
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        list="tenant"
        setSelectedTenants={setSelectedTenants}
        selectedTenants={selectedTenants}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        status={status}
        setTenantIds={setTenantIds}
      /> */}
    </>
  );
}
