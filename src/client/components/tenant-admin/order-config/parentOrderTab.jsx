import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId, paginationPayload } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import OrderTemplateTab from "./order-template-tab/orderTemplateTab";
import PropTypes from "prop-types";
import TabOrderConfig from "./test-list-tab/tabOrderConfig";
import Tntselecteditems from "./order-config-tab/tntselecteditems";
import { getOrderTemplateDetails } from "@redux/slices/ordertemplateSlice";

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

export default function ParentOrderTab() {
  const tabNameToIndex = {
    0: "order-configuration",
    1: "test-list",
    2: "order-templates"
  };

  const indexToTabName = {
    "order-configuration": 0,
    "test-list": 1,
    "order-templates": 2
  };
  const routeParams = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(indexToTabName[routeParams.tabName]);
  const dispatch = useDispatch();
  const [panels, setPanels] = useState([]);
  const [tests, setTests] = useState([]);
  const { idvTestList, panelList } = useSelector((state) => state.orders);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event, newValue) => {
    setPanels([]);
    setTests([]);
    setValue(newValue);
    setSearchVal("");
    setSortKey("");
    navigate(`/order-config/${tabNameToIndex[newValue]}`);
  };

  const fetchTabTestDetails = () => {
    let filteredResult = [];
    if (panels?.length > 0) {
      const panelIds = panels?.map((panel) => panel?.panelId);
      const panelFilteredResult = panelList?.filter((item) => panelIds?.includes(item?.panelId));
      filteredResult = [...filteredResult, ...panelFilteredResult];
    }

    if (tests?.length > 0) {
      const testIds = tests?.map((test) => test?.testId);
      const testFilteredResult = idvTestList?.filter((item) => testIds?.includes(item?.testId));
      filteredResult = [...filteredResult, ...testFilteredResult];
    }

    return filteredResult;
  };

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };

  const updateSearch = (value) => {
    setSearchVal(value);
  };

  const { ordertestTemplate } = useSelector((state) => state.orders);

  useEffect(() => {
    if (ordertestTemplate?.orderTemplateDetails?.length > 0) {
      setFilteredData(ordertestTemplate?.orderTemplateDetails);
    }
  }, [ordertestTemplate]);

  useEffect(() => {
    if (value === 0 && (panels?.length > 0 || tests?.length > 0)) {
      const testResult = fetchTabTestDetails();
      setFilteredData(testResult);
    }

    if (value === 2) {
      dispatch(
        getOrderTemplateDetails({
          ...paginationPayload({
            pagination,
            sortKey: sortKey || "createAt",
            sortOrder,
            searchVal,
            value
          }),
          roleId: getLoggedInUserRoleId(),
          tenantId: getTenantId()
        })
      );
    }
  }, [value, panels, tests, pagination, sortKey, sortOrder, searchVal, idvTestList, panelList]);
  return (
    <>
      <Box className="tab__wrapper parent-tab">
        <Tabs value={value} onChange={handleChange} aria-label="Order Config Tab" className="tabs_sections">
          <Tab label="Order Configuration" {...a11yProps(0)} />
          <Tab label="Test List" {...a11yProps(1)} />
          <Tab label="Order Templates" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Tntselecteditems
          setPanels={setPanels}
          setTests={setTests}
          panels={panels}
          tests={tests}
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabOrderConfig />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderTemplateTab setValue={setValue} updatePagination={updatePagination} updateSearch={updateSearch} />
      </TabPanel>
    </>
  );
}
