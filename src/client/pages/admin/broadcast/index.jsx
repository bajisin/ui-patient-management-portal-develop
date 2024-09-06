import { Box, Button, Grid, Popover, Typography } from "@mui/material";
import { CALLTYPES, roleIds } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";

import AdvanceFilter from "../../../components/advance-filter";
import AdvanceSearch from "../../../components/tenant-admin/broadcast/advance-search";
import BroadcastTable from "@components/broadcast/table";
import CreateBroadcast from "../../../components/broadcast/create-broadcast";
import CreateTenantBroadcast from "../../../components/tenant-admin/broadcast/create-tenant-broadcast";
import SearchComponent from "@components/search";
import { getLoggedInUserRoleId } from "../../../utils/common";
import { getTenants } from "@redux/slices/tenantsSlice";
import { getboardCastDetails } from "@redux/slices/boardCastSlice";
import { useDispatch } from "react-redux";

const Broadcast = () => {
  const [open, setOpen] = useState(false);
  const [openTenant, setOpenTenant] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const fetchBroadCastData = (sdate, start, eDate, end) => {
    const tenantIds = selectedTenants?.map((t) => t.tenantId);
    const roleIdlist = selectedStatus?.map((t) => t.id);
    const payload = {
      pageNo: pagination.pageIndex,
      pageSize: pagination.pageSize,
      searchValue: searchVal || "",
      sortKey: sortKey || "lastModifiedDate",
      sortOrder: sortOrder.toUpperCase() || "DESC",
      roleId: loggedInUser.roleMasterDTO.roleId,
      tenantId: tenantIds,
      startDate: startDate || start || sdate,
      endDate: endDate || end || eDate
    };

    const adminPayload = {
      pageNo: pagination.pageIndex,
      pageSize: pagination.pageSize,
      searchValue: searchVal || "",
      sortKey: sortKey || "lastModifiedDate",
      sortOrder: sortOrder.toUpperCase() || "DESC",
      roleId: roleIdlist,
      startDate,
      endDate
    };
    if (loggedInUser?.roleMasterDTO?.roleId === roleIds?.SUPER_ADMIN) dispatch(getboardCastDetails(payload));
    else if (loggedInUser?.roleMasterDTO?.roleId === roleIds?.TENANT_ADMIN) dispatch(getboardCastDetails(adminPayload));
  };

  useEffect(() => {
    fetchBroadCastData();
  }, [searchVal, pagination, sortKey, sortOrder]);

  const handleClickOpen = () => {
    dispatch(
      getTenants({
        pagination: {
          pageIndex: 0,
          pageSize: 99999
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        status: "All",
        searchValue: ""
      })
    );
    if (loggedInUser.roleMasterDTO.roleId === roleIds.SUPER_ADMIN) setOpen(true);
    else if (loggedInUser.roleMasterDTO.roleId === roleIds.TENANT_ADMIN) setOpenTenant(true);
  };
  const handleClickOpenFilter = () => {
    if (loggedInUser.roleMasterDTO.roleId === roleIds.SUPER_ADMIN) {
      // dispatch(
      //   getTenants({
      //     pagination: {
      //       pageIndex: 0,
      //       pageSize: 99999
      //     },
      //     sortKey: "lastModifiedDate",
      //     sortOrder: "DESC",
      //     status: "All",
      //     searchValue: ""
      //   })
      // );
      setFilterOpen(true);
    } else if (loggedInUser.roleMasterDTO.roleId === roleIds.TENANT_ADMIN) setFilterOpenTenant(true);
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOpenTenant, setFilterOpenTenant] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleTenantClose = () => {
    setOpenTenant(false);
  };

  const updateSearch = (val) => {
    setSearchVal(val);
  };

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const updateSort = (val) => {
    if (val[0]?.id === "statusDTO.statussDescription") setSortKey("statusMaster.statussDescription");
    else setSortKey(val[0]?.id);
    setSortOrder(val[0]?.desc ? "desc" : "asc");
  };
  const features = JSON.parse(sessionStorage.getItem("features"));
  const Broadcast = features.filter((s) => s.featureName === "Broadcast");
  const handleFilter = () => {
    setFilterOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    handleClickOpenFilter();
  };

  const openFilter = Boolean(anchorEl);
  const id = openFilter ? "simple-popover" : undefined;
  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Broadcast
            <Typography component="span" variant="span">
              Get an overview of broadcast
            </Typography>
          </Typography>
          {getLoggedInUserRoleId() !== 1 ? (
            Broadcast && Broadcast[0]?.createInd === true ? (
              <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
                Create Broadcast
              </Button>
            ) : (
              ""
            )
          ) : (
            <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
              Create Broadcast
            </Button>
          )}
        </Typography>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          {/* { getLoggedInUserRoleId() !== 1?(
          {Broadcast && Broadcast[0]?.readInd !== true  ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
                <Typography component="h5" variant="h5">
                  Overviews
                </Typography>
                <Box className="icons-separted">
                  {/* <img
                  src={AdvanceFilterIcon}
                  alt="advance-filter"
                  className="advance__filter-wrapper"
                  onClick={handleClickOpenFilter}
                /> /}
                  <Typography
                    onClick={handleClickOpenFilter}
                    component="span"
                    variant="span"
                    className="ls-advance-filter advance__filter-wrapper"
                  ></Typography>
                  <SearchComponent updateSearch={updateSearch} />
                </Box>
              </Box>
              <Box className="list__view">
                <BroadcastTable
                  updatePagination={updatePagination}
                  updateSort={updateSort}
                  fetchBroadCastData={fetchBroadCastData}
                />
              </Box>
            </Grid>
          ) : (
            "You dont have access to read the data"
          )}):""
        } */}
          {getLoggedInUserRoleId() === 1 ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
                <Typography component="h5" variant="h5">
                  Overviews
                </Typography>
                <Box className="icons-separted">
                  {/* <Typography
                    onClick={handleClickOpenFilter}
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
                          <AdvanceFilter
                            setFilterOpen={setFilterOpen}
                            filterOpen={filterOpen}
                            list="broadcast"
                            setSelectedTenants={setSelectedTenants}
                            selectedTenants={selectedTenants}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            pagination={pagination}
                            fetchBroadCastData={fetchBroadCastData}
                            setSelectedDateRange={setSelectedDateRange}
                            selectedDateRange={selectedDateRange}
                            setCustomPickerOpen={setCustomPickerOpen}
                            customPickerOpen={customPickerOpen}
                            start={start}
                            setStart={setStart}
                            end={end}
                            setEnd={setEnd}
                          />
                        </Typography>
                      </Popover>
                    </div>
                  </>
                  <SearchComponent updateSearch={updateSearch} />
                </Box>
              </Box>
              <Box className="list__view">
                <BroadcastTable
                  updatePagination={updatePagination}
                  updateSort={updateSort}
                  fetchBroadCastData={fetchBroadCastData}
                />
              </Box>
            </Grid>
          ) : getLoggedInUserRoleId() !== 1 && Broadcast && Broadcast[0]?.readInd === true ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
                <Typography component="h5" variant="h5">
                  Overviews
                </Typography>
                <Box className="icons-separted">
                  {/* <Typography
                    onClick={handleClickOpenFilter}
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
                            setFilterOpen={setFilterOpenTenant}
                            filterOpen={filterOpenTenant}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                            setSelectedStatus={setSelectedStatus}
                            selectedStatus={selectedStatus}
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
              <Box className="list__view">
                <BroadcastTable
                  updatePagination={updatePagination}
                  updateSort={updateSort}
                  fetchBroadCastData={fetchBroadCastData}
                />
              </Box>
            </Grid>
          ) : (
            "You don't have access to read the data"
          )}
        </Grid>
      </Box>
      {open && <CreateBroadcast open={open} handleClose={handleClose} callType={CALLTYPES.Add} />}
      {openTenant && (
        <CreateTenantBroadcast
          open={openTenant}
          setOpenTenant={setOpenTenant}
          handleClose={handleTenantClose}
          callType={CALLTYPES.Add}
        />
      )}
      {/* <AdvanceFilter
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        list="broadcast"
        setSelectedTenants={setSelectedTenants}
        selectedTenants={selectedTenants}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        pagination={pagination}
        fetchBroadCastData={fetchBroadCastData}
      />
      <AdvanceSearch
        setFilterOpen={setFilterOpenTenant}
        filterOpen={filterOpenTenant}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
      /> */}
    </>
  );
};

export default Broadcast;
