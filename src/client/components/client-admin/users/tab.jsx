import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { roleIds, statusIds } from "../../../_helpers/constants";

import PropTypes from "prop-types";
import TntUsersDetailTable from "../../users/tntUserDetailsTable";
import { getTenantUsers } from "@redux/slices/tenantsSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Provider } from "../../../_helpers/constants";

/**
 * @author
 * @function ClientAdminTabComponent
 **/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tntUsersDetail-tabpanel-${index}`}
      aria-labelledby={`tntUsersDetail-tab-${index}`}
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
    id: `tntUsersDetail-tab-${index}`,
    "aria-controls": `tntUsersDetail-tabpanel-${index}`
  };
}

export const ClientAdminTabComponent = ({ searchVal, updateSearch, handleFilter, selectedStatus }) => {
  const indexToTabName = {
    all: 0,
    active: 1,
    "in-active": 2,
    pending: 3
  };

  const routeParams = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(indexToTabName[routeParams.tabName] || 0);
  const tenantId = getTenantId();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState([statusIds.ACTIVE, statusIds.IN_ACTIVE, statusIds.PENDING]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) setStatus([statusIds.ACTIVE, statusIds.IN_ACTIVE, statusIds.PENDING]);
    else if (newValue === 1) setStatus([statusIds.ACTIVE]);
    else if (newValue === 2) setStatus([statusIds.IN_ACTIVE]);
    else if (newValue === 3) setStatus([statusIds.PENDING]);
  };

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };
  const userDetailsString = sessionStorage.getItem("userDetails");

  const userDetails = JSON.parse(userDetailsString);
  const userId = userDetails.id;
  const fetchTenantUserData = (data) => {
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize
        },
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder.toUpperCase() || "DESC",
        searchValue: searchVal || "",
        tenantId,
        roleId: [roleIds.PROVIDER],
        role: getLoggedInUserRoleId(),
        userId: [userId],
        statusId: selectedStatus?.length === 0 ? status : selectedStatus.map((s) => s.id)
      })
    );
  };
  React.useEffect(() => {
    fetchTenantUserData();
  }, [value, sortOrder, sortKey, searchVal, pagination]);

  return (
    <>
      {Provider?.readInd === true ? (
        <Box className="tab__wrapper admin-tabs">
          <Tabs value={value} onChange={handleChange} aria-label="Tenant Users Detail Table" className="tabs_sections">
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Active" {...a11yProps(1)} />
            <Tab label="Inactive" {...a11yProps(2)} />
          </Tabs>
        </Box>
      ) : (
        "You don't have access to read the data"
      )}
      {Provider?.readInd && (
        <>
          <TabPanel value={value} index={0}>
            <TntUsersDetailTable
              tab="provider"
              updatePagination={updatePagination}
              updateSort={updateSort}
              updateSearch={updateSearch}
              handleFilter={handleFilter}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TntUsersDetailTable
              tab="provider"
              updatePagination={updatePagination}
              updateSort={updateSort}
              updateSearch={updateSearch}
              handleFilter={handleFilter}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TntUsersDetailTable
              tab="provider"
              updatePagination={updatePagination}
              updateSort={updateSort}
              updateSearch={updateSearch}
              handleFilter={handleFilter}
              pagination={pagination}
              setPagination={setPagination}
            />
          </TabPanel>
        </>
      )}
    </>
  );
};
