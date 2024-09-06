import { Box, Grid, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "../../utils/common";
import { getOrderDetails, getTenants } from "@redux/slices/tenantsSlice";
import { useDispatch, useSelector } from "react-redux";

import ReconciliationAdvanceSearch from "@components/tenant-admin/Reconciliation/reconciliationAdvanceSearch";
import ReconciliationTable from "@components/tenant-admin/Reconciliation/reconciliationTable";
import SearchComponent from "@components/search/index";
import { getReconciliationCounts } from "../../redux/slices/tenantsSlice";

// import AdvanceFilterIcon from "@assets/images/ls_svg/advance-filter.svg";

// import FacilitiesTabsAdvancefilter from "../../components/tenant-admin/facilities/ClientAdvanceSearch";

const Reconciliation = (orderData) => {
  const { data, reconciliationCounts } = useSelector((state) => state.tenants);
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPriorityType, setSelectedPriorityType] = useState([]);
  const [selectedOrderType, setSelectedOrderType] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchKeys, setSearchKeys] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [selectedserviceDesc, setSelectedserviceDesc] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [customPickerOpen, setCustomPickerOpen] = useState(false);

  // const { reconciliationCounts, loading } = useSelector((state) => state.tenants);
  const fetchData = (data) => {
    dispatch(getReconciliationCounts(data.totalOrders, data.inProgress, data.completed, data.errored));
    // dispatch an action for gettenants
    dispatch(getTenants(data));
  };
  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };
  useEffect(() => {
    if (data.length === 0) {
      fetchData("all");
    }
  }, []);
  const updateSearch = (value) => {
    dispatch(
      getOrderDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "ASC",
        searchValue: value,
        searchKeys,
        sortKey: sortKey || "lastModifiedDate",
        sortBy: "",
        orderStatus: [],
        orderType: selectedOrderType,
        priorityType: selectedPriorityType,
        roleId: getLoggedInUserRoleId(),
        startDate,
        endDate,
        tenantId: getTenantId()
      })
    );
    setSearchVal(value);
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
  };
  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
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
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Reconciliation <br />
            <Typography component="span" variant="span">
              Get an overview of orders and their details
            </Typography>
          </Typography>
        </Typography>
        <Box className="activityOverview__wrapper">
          <Box className="activity-cards mt-0 mb-4">
            <Grid container spacing={2} className="mt-0">
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Box className="overview__card overview__card--purple">
                  <Typography
                    component="span"
                    variant="span"
                    className="ls-tenants_db whiteIcon whiteIcon--bg"
                  ></Typography>
                  <Typography component="p" variant="p" className="activity-count">
                    {reconciliationCounts?.totalOrders}
                    <Typography component="p" variant="p" className="activity-title">
                      Total Orders
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Box className="overview__card overview__card--green">
                  <Typography
                    component="span"
                    variant="span"
                    className="ls-tenants_db whiteIcon whiteIcon--bg"
                  ></Typography>
                  <Typography component="p" variant="p" className="activity-count">
                    {reconciliationCounts?.completed}
                    <Typography component="p" variant="p" className="activity-title">
                      Resulted Orders
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Box className="overview__card overview__card--orange">
                  <Typography
                    component="span"
                    variant="span"
                    className="ls-inprogress-order whiteIcon whiteIcon--bg"
                  ></Typography>
                  <Typography component="p" variant="p" className="activity-count">
                    {reconciliationCounts?.inProgress}
                    <Typography component="p" variant="p" className="activity-title">
                      Submitted Orders
                    </Typography>
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Box className="overview__card overview__card--red">
                  <Typography
                    component="span"
                    variant="span"
                    className="ls-cancel-order whiteIcon whiteIcon--bg"
                  ></Typography>
                  <Typography component="p" variant="p" className="activity-count">
                    {reconciliationCounts?.errored}
                    <Typography component="p" variant="p" className="activity-title">
                      Errored Orders
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__header px-3 pb-3">
              <Typography component="h5" variant="h5">
                Overview
              </Typography>
              <Box className="icons-separted">
                {/* <img
                  src={AdvanceFilterIcon}
                  alt="advance-filter"
                  className="advance__filter-wrapper"
                  onClick={handleFilter}
                /> */}
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
                        <ReconciliationAdvanceSearch
                          filterOpen={filterOpen}
                          setFilterOpen={setFilterOpen}
                          sortOrder={sortOrder}
                          sortKey={sortKey}
                          pagination={pagination}
                          startDate={startDate}
                          searchKeys={searchKeys}
                          searchVal={searchVal}
                          endDate={endDate}
                          setEndDate={setEndDate}
                          setStartDate={setStartDate}
                          selectedOrderType={selectedOrderType}
                          selectedPriorityType={selectedPriorityType}
                          setSelectedserviceDesc={setSelectedserviceDesc}
                          selectedserviceDesc={selectedserviceDesc}
                          selectedDateRange={selectedDateRange}
                          setSelectedDateRange={setSelectedDateRange}
                          customPickerOpen={customPickerOpen}
                          setCustomPickerOpen={setCustomPickerOpen}
                        />
                      </Typography>
                    </Popover>
                  </div>
                </>
                <SearchComponent updateSearch={updateSearch} />
              </Box>
            </Box>
            {/* <TenantDetailsTable /> */}
            <ReconciliationTable
              searchKeys={searchKeys}
              searchVal={searchVal}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortKey={sortKey}
              setSortKey={setSortKey}
              pagination={pagination}
              setPagination={setPagination}
              updateSort={updateSort}
              updatePagination={updatePagination}
              setSelectedserviceDesc={setSelectedserviceDesc}
              selectedserviceDesc={selectedserviceDesc}
            />
          </Grid>
        </Grid>
      </Box>
      {/* <ReconciliationAdvanceSearch
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        sortOrder={sortOrder}
        sortKey={sortKey}
        pagination={pagination}
        startDate={startDate}
        searchKeys={searchKeys}
        searchVal={searchVal}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        selectedOrderType={selectedOrderType}
        selectedPriorityType={selectedPriorityType}
        setSelectedserviceDesc={setSelectedserviceDesc}
        selectedserviceDesc={selectedserviceDesc}
      /> */}
    </>
  );
};

export default Reconciliation;
