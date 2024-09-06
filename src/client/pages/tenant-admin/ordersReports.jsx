import { Box, Button, Grid, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Order } from "../../_helpers/constants";
import OrderDetails from "@components/drawers/orderDetails";
import OrderReportsAdvanceSearch from "@components/tenant-admin/order&reports/orderReportsAdvanceSearch";
import ReportsTabComponent from "@components/tenant-admin/order&reports/ordersReportsTab";
import SearchComponent from "@components/search/index";
import { getOrderDetails } from "@redux/slices/tenantsSlice";
import { orderDetailsPayload } from "@pages/payload/usersPayload";
import { useNavigate } from "react-router-dom";

// import AdvanceFilterIcon from "@assets/images/ls_svg/advance-filter.svg";

// import { useAuth0 } from "@auth0/auth0-react";

// import { orderDetailsPayload } from "@/payload/usersPayload";

// import AdvanceFilter from "../../components/advance-filter";

const TntOrderAndReports = () => {
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState([]);
  const [selectedPriorityType, setSelectedPriorityType] = useState([]);
  const [selectedOrderType, setSelectedOrderType] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchKeys, setSearchKeys] = useState([]);
  const [recurring, setRecurring] = useState(false);
  const [tabStatus, setTabStatus] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const toggleDrawerOrderDetails = (open) => (event) => {
    setIsOpenOrderDetails(open);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  // const handleButtonClick = () => {
  //   navigate("/patient-management"); // Navigate to the '/next' route on button click
  // };
  const updateSearch = (value) => {
    dispatch(
      getOrderDetails({
        ...orderDetailsPayload({
          pagination,
          sortOrder,
          sortKey,
          searchVal: value,
          searchKeys,
          selectedOrderType,
          selectedPriorityType,
          startDate,
          endDate,
          recurring,
          status: []
        })
      })
    );
    setSearchVal(value);
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const [value, setValue] = useState(0);

  // const { OrderDetails } = useSelector((state) => state.orders);
  // console.log(OrderDetails,"hiiiiiiiiiii");

  const handleFilter = () => {
    // if (OrderDetails?.length === 0) {
    // dispatch(
    //   getOrderDetails({
    //     pageNo: pagination.pageIndex,
    //     pageSize: pagination.pageSize,
    //     sortOrder: sortOrder.toUpperCase() || "ASC",
    //     searchValue: searchVal,
    //     searchKeys,
    //     sortKey: sortKey || "lastModifiedDate",
    //     sortBy: "",
    //     orderStatus: [],
    //     orderType: selectedOrderType,
    //     priorityType: selectedPriorityType,
    //     roleId: loggedInUser?.roleMasterDTO?.roleId,
    //     startDate,
    //     endDate,
    //     tenantId
    //   })
    // );
    // }
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
      <Box className="content__wrapper">
        <OrderDetails isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} />
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Orders & Results
            <Typography component="span" variant="span">
              Get an overview of orders and results
            </Typography>
          </Typography>
          {Order && Order?.createInd === true ? (
            <Typography>
              <Button
                component="button"
                variant="outlined"
                className="primary-btn ms-2"
                onClick={() => {
                  navigate(`/patient-search`);
                }}
              >
                Create Order
              </Button>
              {/* <Link to="/createOrder">
              <Button component="button" onClick={handleButtonClick} variant="contained" className="primary-btn">
                Create Order
              </Button>
            </Link> */}
            </Typography>
          ) : (
            ""
          )}
        </Typography>
        {Order && Order?.readInd === true ? (
          <Grid container rowSpacing={2} className="content__wrapper--view">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
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
                  <Typography
                    aria-describedby={id}
                    onClick={handleClick}
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
                        <OrderReportsAdvanceSearch
                          setEndDate={setEndDate}
                          setStartDate={setStartDate}
                          value={value}
                          recurring={recurring}
                          setRecurring={setRecurring}
                          startDate={startDate}
                          endDate={endDate}
                          setFilterOpen={setFilterOpen}
                          filterOpen={filterOpen}
                          selectedOrderStatus={selectedOrderStatus}
                          selectedOrderType={selectedOrderType}
                          selectedPriorityType={selectedPriorityType}
                          setSelectedOrderStatus={setSelectedOrderStatus}
                          setSelectedOrderType={setSelectedOrderType}
                          setSelectedPriorityType={setSelectedPriorityType}
                          sortOrder={sortOrder}
                          setSortOrder={setSortOrder}
                          sortKey={sortKey}
                          setSortKey={setSortKey}
                          pagination={pagination}
                          setPagination={setPagination}
                          searchKeys={searchKeys}
                          searchVal={searchVal}
                          tabStatus={tabStatus}
                          selectedDateRange={selectedDateRange}
                          setSelectedDateRange={setSelectedDateRange}
                          setCustomPickerOpen={setCustomPickerOpen}
                          customPickerOpen={customPickerOpen}
                        />
                      </Typography>
                    </Popover>
                  </div>
                  <SearchComponent updateSearch={updateSearch} />
                </Box>
              </Box>
              <Box className="list__view">
                <ReportsTabComponent
                  searchKeys={searchKeys}
                  value={value}
                  setValue={setValue}
                  searchVal={searchVal}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  recurring={recurring}
                  setRecurring={setRecurring}
                  setEndDate={setEndDate}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  sortKey={sortKey}
                  setSortKey={setSortKey}
                  pagination={pagination}
                  setPagination={setPagination}
                  selectedOrderStatus={selectedOrderStatus}
                  selectedOrderType={selectedOrderType}
                  selectedPriorityType={selectedPriorityType}
                  setSelectedOrderStatus={setSelectedOrderStatus}
                  setTabStatus={setTabStatus}
                />
              </Box>
            </Grid>
          </Grid>
        ) : (
          "You don't have access to read the content"
        )}
      </Box>
      {/* <OrderReportsAdvanceSearch
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        value={value}
        recurring={recurring}
        setRecurring={setRecurring}
        startDate={startDate}
        endDate={endDate}
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        selectedOrderStatus={selectedOrderStatus}
        selectedOrderType={selectedOrderType}
        selectedPriorityType={selectedPriorityType}
        setSelectedOrderStatus={setSelectedOrderStatus}
        setSelectedOrderType={setSelectedOrderType}
        setSelectedPriorityType={setSelectedPriorityType}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortKey={sortKey}
        setSortKey={setSortKey}
        pagination={pagination}
        setPagination={setPagination}
        searchKeys={searchKeys}
        searchVal={searchVal}
        tabStatus={tabStatus}
      /> */}
    </>
  );
};

export default TntOrderAndReports;
