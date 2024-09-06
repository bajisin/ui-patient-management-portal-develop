import { Box, Popover, Tab, Tabs, Typography } from "@mui/material";
import { Payer, Test } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import {
  fetchOrderableTypes,
  fetchWorkGroup,
  getPerformingDept,
  getSpecimentTypes
} from "@redux/slices/commonAdminApiSlice";
import { getPayerCompendiumsList, getTestCompendiumsList } from "@redux/slices/compendiumSlice";
import { useDispatch, useSelector } from "react-redux";

import CompendiumAdvanceFilter from "./index";
import CompendiumTestTable from "./compendiumTestTable";
import PayerCompendiumTableComp from "./payerCompendiumTable";
import PropTypes from "prop-types";
import SearchComponent from "@components/search";
import { getContainerTypes } from "../../redux/slices/commonAdminApiSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`compendium-tabpanel-${index}`}
      aria-labelledby={`compendium-tab-${index}`}
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
    id: `compendium-${index}`,
    "aria-controls": `compendium-tabpanel-${index}`
  };
}

export default function CompendiumTabs({ getCurrentTabState }) {
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();
  const handleSearchChange = (event) => {
    setSearchValue(event);
    dispatch();
  };

  const fetchData = (data) => {
    const filteredData =
      data.status === "Test Compendium"
        ? data?.data?.testCompendiumData.filter(
            (item) =>
              (item.orderCode && item.orderCode.toLowerCase().includes(searchValue.toLowerCase())) ||
              (item.specimenType && item.specimenType.toLowerCase().includes(searchValue.toLowerCase()))
          )
        : data?.data?.payerCompendiumData.filter(
            (item) =>
              (item.orderCode && item.orderCode.toLowerCase().includes(searchValue.toLowerCase())) ||
              (item.specimenType && item.specimenType.toLowerCase().includes(searchValue.toLowerCase()))
          );

    if (data.status === "Test Compendium") {
      dispatch(
        getTestCompendiumsList({
          ...data,
          searchValue,
          filteredData
        })
      );
    } else {
      dispatch(getPayerCompendiumsList({ ...data, searchValue, filteredData }));
    }
  };

  useEffect(() => {
    fetchData({ pagination, ...getCurrentStateTab(), searchValue });
  }, [searchValue]);

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
    fetchData({
      pagination: paginationProp,
      alternateContainerType: data[5],
      departmentId: data[0],
      orderTypeId: data[1],
      preferredContainerType: data[4],
      specimenTypeId: data[2],
      workGroupId: data[3],
      searchValue: searchValue || "",
      sortKey: "lastModifiedDate",
      sortOrder: "DESC",
      ...getCurrentStateTab()
    });
  };
  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      fetchData({ pagination, ...{ status: "Test Compendium" } });
    }
    if (newValue === 1) {
      fetchData({ pagination, ...{ status: "Payer Compendium" } });
    }
    setValue(newValue);
    getCurrentTabState(newValue);
  };
  const getCurrentStateTab = () => {
    switch (value) {
      case 0:
        return { status: "Test Compendium" };
      case 1:
        return { status: "Payer Compendium" };
    }
  };
  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "DESC" : "ASC");
    fetchData({ pagination, ...getCurrentStateTab(), sortKey: val[0].id, sortOrder: val[0].desc ? "DESC" : "ASC" });
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const [data, setData] = useState("");
  const { orderableTypes, workGroupData, performingData, specimentData, continerTypeData } = useSelector(
    (state) => state.commonAdmin
  );

  const handleFilter = () => {
    if (orderableTypes.length === 0) {
      dispatch(fetchOrderableTypes());
    }
    if (workGroupData.length === 0) {
      dispatch(fetchWorkGroup());
    }
    if (continerTypeData.length === 0) {
      dispatch(getContainerTypes());
    }
    setFilterOpen(true);
    if (performingData.length === 0) {
      dispatch(getPerformingDept());
    }
    if (specimentData.length === 0) {
      dispatch(getSpecimentTypes());
    }
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
      {Test?.readInd === false && Payer?.readInd === false ? (
        "You dont have access to read the content"
      ) : (
        <>
          <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
            <Typography component="h5" variant="h5">
              Overview
            </Typography>
            <Box className="icons-separted">
              {value === 0 && (
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
                        <CompendiumAdvanceFilter
                          setFilterOpen={setFilterOpen}
                          filterOpen={filterOpen}
                          data={data}
                          setData={setData}
                        />
                      </Typography>
                    </Popover>
                  </div>
                </>
              )}

              <SearchComponent updateSearch={handleSearchChange} />
            </Box>
          </Box>
          <Box className="tab__wrapper parent-tab">
            <Tabs value={value} onChange={handleChange} aria-label="compendium Tab" className="tabs_sections">
              {<Tab label="Test Compendium" {...a11yProps(0)} />}
              {<Tab label="Payer Compendium" {...a11yProps(1)} />}
            </Tabs>
          </Box>
          {Test?.readInd === true && (
            <TabPanel value={value} index={0}>
              <CompendiumTestTable updatePagination={updatePagination} updateSort={updateSort} />
            </TabPanel>
          )}
          {Payer?.readInd === true && (
            <TabPanel value={value} index={1}>
              <PayerCompendiumTableComp updatePagination={updatePagination} updateSort={updateSort} />
            </TabPanel>
          )}
          {/* <CompendiumAdvanceFilter
            setFilterOpen={setFilterOpen}
            filterOpen={filterOpen}
            data={data}
            setData={setData}
          /> */}
        </>
      )}
    </>
  );
}
