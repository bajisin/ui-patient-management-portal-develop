import React, { useEffect, useState } from "react";
import { getIdvTestList, getPanelList, getTestList } from "@redux/slices/ordertemplateSlice";
import { getLoggedInUserRoleId, getTenantId, paginationPayload } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import SearchComponent from "../../../search";
import Tab from "@mui/material/Tab";
import TabTestindividualListTable from "./tabTestindividualList";
import TabTestpanelListTable from "./tabTestpanelList";
import Tabs from "@mui/material/Tabs";
import TestTabsTable from "./testTabsTable";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`config-child-tabpanel-${index}`}
      aria-labelledby={`config-child-tab-${index}`}
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
    id: `config-child-tab-${index}`,
    "aria-controls": `config-child-tabpanel-${index}`
  };
}

export default function TabOrderConfig() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { totalCount } = useSelector((state) => state.orders);
  useEffect(() => {
    const payload = {
      ...paginationPayload({ pagination, sortKey: "testName", sortOrder, searchVal }),
      roleId: getLoggedInUserRoleId(),
      tenantId: getTenantId(),
      testIds: [],
      panelIds: []
    };

    if (value === 0) {
      dispatch(getTestList(payload));
    }

    // Fetch data for the first dropdown
    if (value === 1) {
      dispatch(
        getPanelList({
          ...payload,
          testCategoryId: [2]
        })
      );
    }

    if (value === 2) {
      dispatch(
        getIdvTestList({
          ...payload,
          testCategoryId: [1]
        })
      );
    }
  }, [value, pagination, sortKey, sortOrder, searchVal]);

  const updateTestPagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const updateTestSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };

  const updateTestSearch = (value) => {
    setSearchVal(value);
  };
  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="tenant child tabs" className="tabs_sections">
          <Tab label="All Tests" {...a11yProps(0)} />
          <Tab label="Panel Tests" {...a11yProps(1)} />
          <Tab label="Individual Tests" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box className="list__header px-3 p-3">
          <Typography variant="h5" component="h5" className="section_title">
            {totalCount} Tests Found
          </Typography>
          <SearchComponent updateSearch={updateTestSearch} />
        </Box>
        <TestTabsTable
          updatePagination={updateTestPagination}
          updateSort={updateTestSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
          searchVal={searchVal}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className="list__header px-3 p-3">
          <Typography variant="h5" component="h5" className="section_title">
            {totalCount} Panel Tests Found
          </Typography>
          <SearchComponent updateSearch={updateTestSearch} />
        </Box>
        <TabTestpanelListTable updatePagination={updateTestPagination} updateSort={updateTestSort} />
      </TabPanel>
      <TabPanel className="test_list-subtitle" value={value} index={2}>
        <Box className="list__header px-3 p-3">
          <Typography variant="h5" component="h5" className="section_title">
            {totalCount} Individual Tests Found
          </Typography>
          <SearchComponent updateSearch={updateTestSearch} />
        </Box>
        <TabTestindividualListTable updatePagination={updateTestPagination} updateSort={updateTestSort} />
      </TabPanel>
    </>
  );
}
