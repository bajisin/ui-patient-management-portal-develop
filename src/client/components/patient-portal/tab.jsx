import { Box, FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrderDetails, getPatientList } from "@redux/slices/tenantsSlice";
import { statusIds, tabLabels } from "../../_helpers/constants";
import { useDispatch, useSelector } from "react-redux";

import BasicTable from "./Table/table";
import GridList from "./Table/grid-view";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
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

export default function TabComponent({ listView, searchVal, filteredData, setFilteredData }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.id;
  const { patientList } = useSelector((state) => state.tenants);

  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [tenantValue, setTenantValue] = useState("");
  const [data, setData] = useState(
    loggedInUserRole !== "" ? loggedInUserRole : patientList.length > 0 ? patientList[0].tenantId : ""
  );

  // const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    dispatch(getPatientList(loggedInUserRole)).then((r) => {
      //     console.log(r.payload.data[0].tenantId);
      setData(r?.payload?.data[0]?.tenantId);
      //     if (value === 1) {
      //       dispatch(
      //         getOrderDetails({
      //           pageNo: pagination.pageIndex,
      //           pageSize: pagination.pageSize,
      //           sortOrder: sortOrder.toUpperCase() || "ASC",
      //           searchValue: searchVal,
      //           searchKeys: [],
      //           sortKey: sortKey || "lastModifiedDate",
      //           sortBy: "",
      //           orderStatus: [statusIds.IN_PROGRESS, statusIds.ON_HOLD],
      //           orderType: [],
      //           priorityType: [],
      //           roleId: getLoggedInUserRoleId(),
      //           startDate: "",
      //           endDate: "",
      //           userId: loggedInUserRole,
      //           tenantId: data
      //         })
      //       ).then((response) => {
      //         // Handle the response here
      //         setFilteredData(response?.payload?.data);

      //         // You can store the response in state or perform any other actions
      //       });
      //     } else if (value === 2) {
      //       dispatch(
      //         getOrderDetails({
      //           pageNo: pagination.pageIndex,
      //           pageSize: pagination.pageSize,
      //           sortOrder: sortOrder.toUpperCase() || "ASC",
      //           searchValue: searchVal,
      //           searchKeys: [],
      //           sortKey: sortKey || "lastModifiedDate",
      //           sortBy: "",
      //           orderStatus: [statusIds.COMPLETED, statusIds.CANCELLED],
      //           orderType: [],
      //           priorityType: [],
      //           roleId: getLoggedInUserRoleId(),
      //           startDate: "",
      //           endDate: "",
      //           userId: loggedInUserRole,

      //           tenantId: data
      //         })
      //       ).then((response) => {
      //         // Handle the response here
      //         setFilteredData(response?.payload?.data);
      //         // You can store the response in state or perform any other actions
      //       });
      //     }
      //   });
    });
  }, []);

  useEffect(() => {
    if (value === 1) {
      dispatch(
        getOrderDetails({
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sortOrder: sortOrder.toUpperCase() || "ASC",
          searchValue: searchVal,
          searchKeys: [],
          sortKey: sortKey || "lastModifiedDate",
          sortBy: "",
          orderStatus: [statusIds.IN_PROGRESS, statusIds.ON_HOLD],
          orderType: [],
          priorityType: [],
          roleId: getLoggedInUserRoleId(),
          startDate: "",
          endDate: "",
          userId: loggedInUserRole,
          tenantId: data
        })
      ).then((response) => {
        // Handle the response here
        setFilteredData(response?.payload?.data);

        // You can store the response in state or perform any other actions
      });
    } else if (value === 2) {
      dispatch(
        getOrderDetails({
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sortOrder: sortOrder.toUpperCase() || "ASC",
          searchValue: searchVal,
          searchKeys: [],
          sortKey: sortKey || "lastModifiedDate",
          sortBy: "",
          orderStatus: [statusIds.COMPLETED, statusIds.CANCELLED],
          orderType: [],
          priorityType: [],
          roleId: getLoggedInUserRoleId(),
          startDate: "",
          endDate: "",
          userId: loggedInUserRole,
          tenantId: data
        })
      ).then((response) => {
        setFilteredData(response?.payload?.data);
      });
    } else if (value === 0) {
      if (data !== loggedInUserRole) {
        dispatch(
          getOrderDetails({
            pageNo: pagination.pageIndex,
            pageSize: pagination.pageSize,
            sortOrder: sortOrder.toUpperCase() || "ASC",
            searchValue: searchVal,
            searchKeys: [],
            sortKey: sortKey || "lastModifiedDate",
            sortBy: "",
            orderStatus: [statusIds.IN_PROGRESS, statusIds.ON_HOLD, statusIds.COMPLETED, statusIds.CANCELLED],
            orderType: [],
            priorityType: [],
            roleId: getLoggedInUserRoleId(),
            startDate: "",
            endDate: "",
            userId: loggedInUserRole,
            tenantId: tenantValue || data
          })
        ).then((response) => {
          setFilteredData(response?.payload?.data);
        });
      }
    }
  }, [data, searchVal, value]);

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };
  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };

  return (
    <>
      <Box className="tab__wrapper w-100">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs_sections">
          {tabLabels.map((l, i) => (
            <Tab key={i} label={l} {...a11yProps(i)} />
          ))}
          <FormControl className="tenantList__dropdown">
            <Select
              className="add__select"
              value={data}
              onChange={(e) => {
                setData(e.target.value);
                setTenantValue(e.target.value);
              }}
            >
              {patientList.map((opt, i) => (
                <MenuItem key={i} value={opt.tenantId}>
                  {opt.tenantName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {!listView ? (
          <BasicTable updatePagination={updatePagination} updateSort={updateSort} filteredData={filteredData} />
        ) : (
          <GridList updatePagination={updatePagination} updateSort={updateSort} filteredData={filteredData} />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BasicTable updatePagination={updatePagination} updateSort={updateSort} filteredData={filteredData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BasicTable updatePagination={updatePagination} updateSort={updateSort} filteredData={filteredData} />
      </TabPanel>
    </>
  );
}
