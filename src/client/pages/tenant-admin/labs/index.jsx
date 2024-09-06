import { Box, Button, Grid, Popover, Typography } from "@mui/material";
import { CALLTYPES, Lab } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddNewLabs from "../../../components/tenant-admin/labs/addNewLabs";
import AdvanceSearch from "../../../components/tenant/tenant-details/user-details/advance-search";
import LabsDetailsTable from "@components/tenant-admin/labs/labsDetailsTable";
import SearchComponent from "@components/search/index";
import { getAllLabs } from "@redux/slices/labs-slice";

// import AdvanceFilterIcon from "@assets/images/ls_svg/advance-filter.svg";

// import TenantDetailsTable from "@components/users/tntUserDetailsTable";

const Labs = () => {
  const { data } = useSelector((state) => state.tenants);
  const [searchVal, setSearchVal] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // const formattedStartDate = startDate ? dayjs(startDate).format("YYYY-MM-DD") : "";
  // const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : "";
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const updateSearch = (value) => {
    setSearchVal(value);
  };

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  // const updateSort = (val) => {
  //   setSortKey(val[0].id);
  //   setSortOrder(val[0].desc ? "desc" : "asc");
  // };
  const updateSort = (val) => {
    const sortField = val[0].id; // This is the sort field, e.g., "statusDTO.statusDesc"
    const sortOrder = val[0].desc ? "desc" : "asc"; // This is the sort order, either "asc" or "desc"

    // Here, you can handle the special case where the sortField is "statusDTO.statusDesc"
    // and map it to the actual field name that your API expects.
    let actualSortField = sortField;
    if (sortField === "statusDTO.statusDesc") {
      actualSortField = "statusDesc"; // Replace with the actual field name in your API
    }

    setSortKey(actualSortField);
    setSortOrder(sortOrder);
  };

  const dispatch = useDispatch();
  const fetchData = () => {
    const userstatusId = selectedStatus.map((t) => t.id);
    // dispatch an action for gettenants
    dispatch(
      getAllLabs({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchValue: searchVal || "",
        sortBy: "",
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder.toUpperCase() || "DESC",
        status: userstatusId,
        startDate,
        endDate,
        role: loggedInUser?.roleMasterDTO?.roleId
      })
    );
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, [pagination, searchVal, sortKey, sortOrder]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
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
  const openFilter = Boolean(anchorEl);
  const id = openFilter ? "simple-popover" : undefined;
  return (
    <>
      <Box className="content__wrapper lab_content">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Labs <br />
            <Typography component="span" variant="span">
              Get an overview of labs
            </Typography>
          </Typography>
          {Lab.createInd === true ? (
            <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
              Add New Lab
            </Button>
          ) : (
            ""
          )}
        </Typography>
        {Lab.readInd === true ? (
          <Grid container rowSpacing={2} className="content__wrapper--view">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__header px-3 pb-3 position-relative order-report-title">
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
                        open={openFilter}
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
                          <AdvanceSearch
                            setFilterOpen={setFilterOpen}
                            filterOpen={filterOpen}
                            call="labs"
                            setSelectedStatus={setSelectedStatus}
                            selectedStatus={selectedStatus}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            selectedDateRange={selectedDateRange}
                            setSelectedDateRange={setSelectedDateRange}
                          />
                        </Typography>
                      </Popover>
                    </div>
                  </>
                  <SearchComponent updateSearch={updateSearch} />
                </Box>
              </Box>
              <Box className="list__view">
                <LabsDetailsTable updatePagination={updatePagination} updateSort={updateSort} />
              </Box>
            </Grid>
          </Grid>
        ) : (
          "You dont have access to read the content"
        )}
      </Box>
      {open && <AddNewLabs setOpen={setOpen} open={open} callType={CALLTYPES.Add} title="Add New Lab" />}
      {/* <AdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        call="labs"
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      /> */}
    </>
  );
};

export default Labs;
