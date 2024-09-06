import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTenantTemplateDetails, getTenantTestDetails } from "@redux/slices/tenantsSlice";
import { useDispatch, useSelector } from "react-redux";

import OrderTemplate from "./orderTemplate";
import OrderTemplateList from "./orderTemplateList";
import PropTypes from "prop-types";
import SearchComponent from "@components/search";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { getLoggedInUserRoleId } from "@utils/common";
import { useParams } from "react-router-dom";

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
    id: `orderConfig-tab-${index}`,
    "aria-controls": `orderConfig-tabpanel-${index}`
  };
}

export default function OrderConfigurationTabComponent() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const routeParams = useParams();
  const { tenantId } = routeParams;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const fetchTemplateDetails = (data) => {
    dispatch(getTenantTemplateDetails(data));
  };
  const fetchTestDetails = (data) => {
    dispatch(
      getTenantTestDetails({
        sortKey: data?.sortKey || "lastModifiedDate",
        pagination: data?.pagination || pagination || { pageIndex: 0, pageSize: 10 },
        sortOrder: data?.sortOrder || "DESC",
        sortBy: "testDescription",
        searchValue: data?.searchValue || "",
        tenantId,
        roleId: getLoggedInUserRoleId(),
        testIds: [],
        panelIds: [],
        testCategory: ""
      })
    );
  };
  const handleChange = (e, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      fetchTemplateDetails({ pagination, tenantId });
    }
    if (newValue === 1) {
      fetchTestDetails();
    }
  };
  const updatePagination = (paginationProp) => {
    fetchTemplateDetails({ pagination: paginationProp, tenantId });
  };
  const updateTestPagination = (paginationProp) => {
    fetchTestDetails({ pagination: paginationProp });
  };
  const updateSort = (val) => {
    if (val[0] !== "tenantLogo") {
      setSortKey(val[0].id);
      setSortOrder(val[0].desc ? "DESC" : "asc");
      fetchTemplateDetails({ pagination, sortKey: val[0].id, sortOrder: val[0].desc ? "DESC" : "ASC", tenantId });
    }
  };
  const updateTestSort = (val) => {
    if (val[0] !== "tenantLogo") {
      setSortKey(val[0].id);
      setSortOrder(val[0].desc ? "DESC" : "asc");
      fetchTestDetails({
        pagination,
        sortKey: val[0].id,
        sortOrder: val[0].desc ? "DESC" : "ASC",
        sortBy: "testDescription",
        tenantId
      });
    }
  };
  const updateSearch = (val) => {
    fetchTemplateDetails({
      pagination,
      sortKey,
      sortOrder,
      searchValue: val,
      tenantId
    });
  };
  const updateTestSearch = (val) => {
    fetchTestDetails({
      searchValue: val,
      tenantId
    });
  };
  const { tenantTemplate } = useSelector((state) => state.tenants);
  useEffect(() => {
    fetchTemplateDetails({ pagination, tenantId, roleId: getLoggedInUserRoleId() });
    fetchTestDetails();
    setPagination({
      pageIndex: 0,
      pageSize: 10
    });
  }, []);
  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="order configuration tabs" className="tabs_sections">
          <Tab label="Order Template" {...a11yProps(0)} />
          <Tab label="Test List" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className="">
        <Box className="table__wrapper positioned-search">
          <Box className="list__header px-3 position-relative order-report-title list__header--height">
            <Typography component="h5" variant="h5">
              {tenantTemplate?.totalCount} Templates found
            </Typography>
            <Box className="icons-separted">
              <SearchComponent updateSearch={updateSearch} />
            </Box>
          </Box>
          <OrderTemplateList updatePagination={updatePagination} updateSort={updateSort} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderTemplate
          updatePagination={updateTestPagination}
          updateSort={updateTestSort}
          updateTestSearch={updateTestSearch}
        />
      </TabPanel>
    </>
  );
}
