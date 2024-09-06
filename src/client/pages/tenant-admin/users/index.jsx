import { Box, Breadcrumbs, Button, Grid, Paper, Popover, Stack, Typography } from "@mui/material";
import { CALLTYPES, Client, Provider, roleIds } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { getUsersByEmail, getUsersByPhone } from "@redux/slices/usersSlice";

import AddUser from "@components/users/add-user/addUserModal";
import AdvanceSearch from "@components/tenant/tenant-details/user-details/advance-search";
import { ClientAdminTabComponent } from "@components/client-admin/users/tab";
import EditTenant from "@components/tenant/tenant-config/add-tenant";
import SearchComponent from "@components/search";
import UserDetailsTabComponent from "@components/users/tenantUserDetailTabs";
import { getTenantsById } from "@redux/slices/tenantsSlice";
import useDebounce from "@utils/useDebounce";
import { useDispatch } from "react-redux";

export default function Users() {
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [roles, setRoles] = useState([roleIds.CLIENT_ADMIN]);
  const tenant = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const debounceEmailVal = useDebounce(emailVal, 1000);
  const debouncePhnVal = useDebounce(phoneVal, 1000);

  useEffect(() => {
    if (debounceEmailVal !== "") dispatch(getUsersByEmail(debounceEmailVal));
    if (debouncePhnVal !== "") dispatch(getUsersByPhone(debouncePhnVal));
  }, [debounceEmailVal, debouncePhnVal]);

  const handleEditClickOpen = () => {
    dispatch(getTenantsById(tenant.tenantId));
    setOpen(true);
  };
  const updateSearch = (value) => {
    setSearchVal(value);
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setFilterOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openFilter = Boolean(anchorEl);
  const id = openFilter ? "simple-popover" : undefined;
  return (
    <>
      <Box className="content__wrapper">
        <Paper elevation={2} className="header__wrapper--content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={tenant?.tenantLogo} />
              </Typography>
              <Typography component="h5" variant="h5">
                {tenant?.tenantName}
                <Stack spacing={2}>
                  <Breadcrumbs aria-label="breadcrumb" className="breadcrumb__wrapper">
                    <Typography key="1">User Details</Typography>
                  </Breadcrumbs>
                </Stack>
              </Typography>
            </Typography>
            <Stack direction="row" gap={2} className="header__wrapper--actions">
              {getLoggedInUserRoleId() !== roleIds.CLIENT_ADMIN && (
                <Button className="bordered-icon-btn edit" onClick={handleEditClickOpen}>
                  <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                </Button>
              )}
              {getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN && Provider && Provider?.createInd === true ? (
                <Button
                  component="button"
                  variant="contained"
                  className="primary-btn"
                  onClick={() => setOpenUser(true)}
                >
                  Add New Provider
                </Button>
              ) : (
                (Provider?.createInd === true || Client?.createInd === true) && (
                  <Button
                    component="button"
                    variant="contained"
                    className="primary-btn"
                    onClick={() => setOpenUser(true)}
                  >
                    Add New User
                  </Button>
                )
              )}
            </Stack>
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {getLoggedInUserRoleId() === 3
              ? Provider &&
                Provider?.readInd === true && (
                  <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
                    <Typography component="h5" variant="h5">
                      Overview
                    </Typography>
                    <Box className="icons-separted mt-1">
                      {/* <Typography
                        onClick={handleFilter}
                        component="span" // Corrected from componant to component
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
                                call="users"
                                statusId="status"
                                roles={roles}
                                setSelectedStatus={setSelectedStatus}
                                selectedStatus={selectedStatus}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                userId={getLoggedInUserId()}
                                setSelectedDateRange={setSelectedDateRange}
                                selectedDateRange={selectedDateRange}
                              />
                            </Typography>
                          </Popover>
                        </div>
                      </>
                      {/* <img
          src={AdvanceFilterIcon}
          alt="advance-filter"
          className="advance__filter-wrapper"
          onClick={handleFilter}
        /> */}
                      <SearchComponent updateSearch={updateSearch} />
                    </Box>
                  </Box>
                )
              : Client &&
                Client?.readInd === true &&
                Provider &&
                Provider?.readInd === true && (
                  <Box className="list__header px-3 pb-3 mb-2 position-relative order-report-title">
                    <Typography component="h5" variant="h5">
                      Overview
                    </Typography>
                    <Box className="icons-separted mt-1">
                      {/* <Typography
                        onClick={handleFilter}
                        component="span" // Corrected from componant to component
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
                                call="users"
                                statusId="status"
                                roles={roles}
                                setSelectedStatus={setSelectedStatus}
                                selectedStatus={selectedStatus}
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                userId={getLoggedInUserId()}
                                setSelectedDateRange={setSelectedDateRange}
                                selectedDateRange={selectedDateRange}
                              />
                            </Typography>
                          </Popover>
                        </div>
                      </>
                      {/* <img
          src={AdvanceFilterIcon}
          alt="advance-filter"
          className="advance__filter-wrapper"
          onClick={handleFilter}
        /> */}
                      <SearchComponent updateSearch={updateSearch} />
                    </Box>
                  </Box>
                )}

            <Box className="list__view">
              {getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? (
                <ClientAdminTabComponent
                  searchVal={searchVal}
                  updateSearch={updateSearch}
                  handleFilter={handleFilter}
                  setSelectedStatus={setSelectedStatus}
                  selectedStatus={selectedStatus}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              ) : (
                <UserDetailsTabComponent
                  setRoles={setRoles}
                  roles={roles}
                  searchVal={searchVal}
                  updateSearch={updateSearch}
                  handleFilter={handleFilter}
                  setSelectedStatus={setSelectedStatus}
                  selectedStatus={selectedStatus}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openUser && (
        <AddUser
          setOpen={setOpenUser}
          open={openUser}
          user={"tenant"}
          title="Add New User"
          callType={CALLTYPES.Add}
          setEmailVal={setEmailVal}
          setPhoneVal={setPhoneVal}
        />
      )}
      {open && (
        <EditTenant
          setOpen={setOpen}
          open={open}
          user={"tenant"}
          title="Edit Tenant"
          callType={CALLTYPES.Edit}
          disabled={true}
        />
      )}
      {/* <AdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        call="users"
        statusId="status"
        roles={roles}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        userId={getLoggedInUserId()}
        setSelectedDateRange={setSelectedDateRange}
        selectedDateRange={selectedDateRange}
      /> */}
    </>
  );
}
