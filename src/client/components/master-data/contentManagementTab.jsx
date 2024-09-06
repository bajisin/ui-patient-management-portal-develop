import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AboutUs from "./aboutUs";
import FAQS from "./faq";
import PrivacyPolicy from "./privacyPolicy";
import PropTypes from "prop-types";
import TermsCondition from "./termsConditions";
import { getFAQs } from "../../redux/slices/masterDataSlice";
import { getMasterDataByTenatId } from "@redux/slices/masterDataSlice";
import { getTenantId } from "../../utils/common";
import { roleIds } from "../../_helpers/constants";
import { useDispatch } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`masterTenant-tabpanel-${index}`}
      aria-labelledby={`masterTenant-tab-${index}`}
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
    id: `masterTenant-tab-${index}`,
    "aria-controls": `masterTenant-tabpanel-${index}`
  };
}

export default function ContentManagementTab({ classes }) {
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const { pathname } = useLocation();
  const saTenantId = pathname.split("/")[3];

  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const tenantId = loggedInUserRole === roleIds.SUPER_ADMIN ? saTenantId : getTenantId();
  const tabNameToIndex = {
    0: "about-us",
    1: "faq",
    2: "privacy-policy",
    3: "terms-and-cond"
  };

  const indexToTabName = {
    "about-us": 0,
    faq: 1,
    "privacy-policy": 2,
    "terms-and-cond": 3
  };
  const routeParams = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(indexToTabName[routeParams.tabName] || 0);

  const handleChange = (event, newValue) => {
    if (loggedInUser?.roleMasterDTO?.roleId === roleIds.SUPER_ADMIN)
      navigate(`/master-data/master-tenant-details/${tenantId}/${tabNameToIndex[newValue]}`);
    setValue(newValue);
  };
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(getMasterDataByTenatId(tenantId));
  };

  useEffect(() => {
    // TODO: pass the tenantId
    if (value === 1) dispatch(getFAQs(tenantId));
    else fetchData(loggedInUserRole);
  }, [value]);
  return (
    <>
      <Box className={`tab__wrapper ${classes}`}>
        <Tabs value={value} onChange={handleChange} aria-label="Master Tenant Details" className="tabs_sections">
          <Tab label="About Us" {...a11yProps(0)} />
          <Tab label="FAQ" {...a11yProps(1)} />
          <Tab label="Privacy Policy" {...a11yProps(2)} />
          <Tab label="Terms & Conditions" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AboutUs />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FAQS />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PrivacyPolicy />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TermsCondition />
      </TabPanel>
    </>
  );
}
