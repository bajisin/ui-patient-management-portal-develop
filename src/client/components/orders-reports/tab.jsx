import { Box, Popover, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import AdvanceFilter from "@components/advance-filter";
import AdvanceFilterIcon from "@assets/images/ls_svg/advance-filter.svg";
import OrderReportsTable from "./table";
import PropTypes from "prop-types";
import SearchComponent from "@components/search";
import { getOrdersAndReports } from "@redux/slices/tenantsSlice";
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
    id: `orderReports-tab-${index}`,
    "aria-controls": `orderReports-tabpanel-${index}`
  };
}

export default function ReportsTabComponent({ orderData }) {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchData = (data) => {
    dispatch(getOrdersAndReports(data));
  };
  useEffect(() => {
    fetchData({ pagination, ...{ status: "All" } });
  }, []);
  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
    fetchData({ paginationProp, ...getCurrentStateTab() });
  };
  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      fetchData({ pagination, ...{ status: "All" } });
    }
    if (newValue === 1) {
      fetchData({ pagination, ...{ status: "InProgress" } });
    }
    if (newValue === 2) {
      fetchData({ pagination, ...{ status: "completed" } });
    }
    if (newValue === 3) {
      fetchData({ pagination, ...{ status: "rejected" } });
    }

    setValue(newValue);
  };
  const getCurrentStateTab = () => {
    switch (value) {
      case 0:
        return { status: "All" };
      case 1:
        return { status: "InProgress" };
      case 2:
        return { status: "completed" };
      case 3:
        return { status: "rejected" };
    }
  };
  const updateSearch = (val) => {
    setSearchValue(val);
    fetchData({
      pagination,
      ...getCurrentStateTab(),
      sortKey,
      sortOrder,
      searchValue
    });
  };
  const updateSort = (val) => {
    if (val[0] !== "tenantLogo") {
      setSortKey(val[0].id);
      setSortOrder(val[0].desc ? "DESC" : "ASC");
      fetchData({ pagination, ...getCurrentStateTab(), sortKey: val[0].id, sortOrder: val[0].desc ? "DESC" : "ASC" });
    }
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
  };

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
                  <AdvanceFilter setFilterOpen={setFilterOpen} filterOpen={filterOpen} />
                </Typography>
              </Popover>
            </div>
          </>
          <SearchComponent updateSearch={updateSearch} />
        </Box>
      </Box>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="Order Reports tabs example" className="tabs_sections">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="In progress" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
          <Tab label="Rejected" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderReportsTable orderData={orderData} updatePagination={updatePagination} updateSort={updateSort} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderReportsTable updatePagination={updatePagination} updateSort={updateSort} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderReportsTable updatePagination={updatePagination} updateSort={updateSort} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OrderReportsTable updatePagination={updatePagination} updateSort={updateSort} />
      </TabPanel>
      {/* <AdvanceFilter setFilterOpen={setFilterOpen} filterOpen={filterOpen} /> */}
    </>
  );
}
