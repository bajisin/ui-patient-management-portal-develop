import { Box, Button, Grid, Popover, Typography } from "@mui/material";
import { CALLTYPES, Facility, roleIds } from "../../../_helpers/constants";
import React, { useCallback, useEffect, useState } from "react";
import { getDaysLab, getFacilityList, getManagementGrpData, getServiceList } from "@redux/slices/commonAdminApiSlice";
import { getFacilitiesDetails, getFacilityGrid, getFacilitiesByUserId } from "@redux/slices/facilitiesSlice";
import { useDispatch, useSelector } from "react-redux";

import AddNewFacilities from "../addNewFacilities";
import FacilitiesAdvanceFilter from "@components/tenant-admin/facilities/facilitiesAdvanceSearch";
import FacilitiesDetailsTable from "@components/tenant-admin/facilities/facilitiesDetailsTable";
import FacilitiesGridList from "@components/tenant-admin/facilities/facilitiesGridView";
import SearchComponent from "@components/search/index";
import ToggleComponent from "../../../components/togglebutton";
import { getLoggedInUserRoleId } from "../../../utils/common";
import { getTenantUsers } from "../../../redux/slices/tenantsSlice";

// import AdvanceFilterIcon from "@assets/images/ls_svg/advance-filter.svg";

// import TenantDetailsTable from "@components/users/tntUserDetailsTable";

const Facilities = ({ alignment }) => {
  const { data } = useSelector((state) => state.tenants);
  const dispatch = useDispatch();

  // dispatch an action for gettenants
  // if (listView === true) {
  //   dispatch(
  //     getFacilitiesDetails({
  //       pageNo: 0,

  //       pageSize: 4,

  //       searchValue: "Active",

  //       sortKey: "address",

  //       sortOrder: "ASC"
  //     })
  //   );
  // } else if (listView === false) {
  //   dispatch(
  //     getFacilitiesDetails({
  //       pageNo: 0,

  //       pageSize: 9,

  //       searchValue: "Active",

  //       sortKey: "address",

  //       sortOrder: "ASC"
  //     })
  //   );
  // }
  const [selectedfacilityTypeDesc, setSelectedfacilityTypeDesc] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedstatusDesc, setSelectedstatusDesc] = useState([]);
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const tenantId = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;
  const handleClickOpen = () => {
    setOpen(true);
    dispatch(getManagementGrpData());
    dispatch(getServiceList());
    dispatch(getFacilityList());
    dispatch(getDaysLab());
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: 0,
          pageSize: 99999
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        searchValue: "",
        tenantId,
        roleId: [roleIds.CLIENT_ADMIN],
        role: loggedInUserRole
      })
    );
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const { facilityList } = useSelector((state) => state.commonAdmin);
  // const facilitiesByUserId = useSelector((state) => state.facilities.facilitiesByUserId);
  const handleFilter = () => {
    // dispatch(getServiceList());
    if (facilityList.length === 0) {
      dispatch(getFacilityList());
      // const data ={
      //   userId,
      //   roleId: getLoggedInUserRoleId()
      // }
      // dispatch(getFacilitiesByUserId(data))
      dispatch(getServiceList());
    }
    setFilterOpen(true);
  };
  const [listView, setListView] = useState(true);
  const [sortKey, setSortKey] = useState("creationDate");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortOrder, setSortOrder] = useState("DESC");
  const [searchValue, setSearchValue] = useState("");
  const clientAdmin = getLoggedInUserRoleId() === 3;
  const userDetailsString = sessionStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsString);
  const userId = userDetails.id;
  useEffect(() => {
    if (data.length === 0) {
      fetchData("");
    }
  }, [searchValue, sortKey, sortOrder]);
  const handleSearch = (value) => {
    if (listView === false) {
      dispatch(
        getFacilitiesDetails({
          searchValue: value,
          sortKey,
          sortOrder: sortOrder.toUpperCase(),
          statusId: [],
          serviceId: [],
          facilityTypeId: [],
          pageNo: 0,
          pageSize: 10
        })
      );
    }
    // else if (listView === true) {
    //   dispatch(
    //     getFacilityGrid({ pageNo: 0, pageSize: 10, searchValue: value, sortKey: "facilityName", sortOrder: "DESC" })
    //   );
    // }
    setSearchValue(value);
  };
  const updatePagination = (paginationProp) => {
    const facilityTypeId = selectedfacilityTypeDesc.map((t) => t.id);
    const serviceId = selectedService.map((t) => t.id);
    const statusId = selectedstatusDesc?.map((t) => t.id);
    setPagination(paginationProp);
    dispatch(
      getFacilitiesDetails({
        // ...{ pageNo: paginationProp.pageIndex, pageSize: paginationProp.pageSize },
        // sortKey,
        // sortOrder,
        // searchValue: "",
        // statusId,
        // serviceId: serviceIds,
        // facilityTypeId
        searchValue: searchValue || "",
        sortKey,
        sortOrder: sortOrder.toUpperCase(),
        statusId,
        serviceId,
        facilityTypeId,
        pageNo: paginationProp.pageIndex,
        pageSize: 10
      })
    );
  };
  const fetchData = (data) => {
    const statusId = selectedstatusDesc?.map((t) => t.id);
    // const commonParams = {
    //   // pagination: {
    //   //   pageNo: 0,
    //   //   pageSize: 10
    //   // },
    //   searchValue: "",
    //   sortKey,
    //   sortOrder: sortOrder.toUpperCase(),
    //   statusId,
    //   serviceId: [],
    //   facilityTypeId: [],
    //   pageNo: 0,
    //   pageSize: 10
    // };

    if (listView === true) {
      dispatch(
        getFacilitiesDetails({
          searchValue,
          sortKey,
          sortOrder: sortOrder.toUpperCase(),
          statusId,
          serviceId: [],
          facilityTypeId: [],
          pageNo: 0,
          pageSize: 10,
          userId: [userId],
          roleId: getLoggedInUserRoleId()
        })
      );
    }
    // else if (listView === false) {
    //   dispatch(getFacilityGrid({ ...commonParams }));
    // }
  };
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
  useEffect(() => {
    if (clientAdmin) {
      setListView(false);
    }
  }, []);

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
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Facilities <br />
            <Typography component="span" variant="span">
              Get an overview of facilities
            </Typography>
          </Typography>
          {clientAdmin || Facility?.createInd === false ? (
            ""
          ) : (
            <Button
              component="button"
              variant="contained"
              className="primary-btn"
              onClick={() => {
                handleClickOpen();
              }}
            >
              Add New Facility
            </Button>
          )}
        </Typography>
        {getLoggedInUserRoleId() !== 3 ? (
          Facility?.readInd === true ? (
            <Grid container rowSpacing={2} className="content__wrapper--view">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className="list__header px-3 pb-3 position-relative order-report-title">
                  <Typography component="h5" variant="h5">
                    Overview
                  </Typography>
                  <Box className="icons-separted">
                    {/* {!clientAdmin && <ToggleComponent setListView={setListView} listView={listView} />} */}
                    {/* <img
              src={AdvanceFilterIcon}
              alt="advance-filter"
              className="advance__filter-wrapper mx-2"
              onClick={() => handleFilter()}
            /> */}
                    {/* <Typography
                      onClick={() => handleFilter()}
                      component="span"
                      variant="span"
                      className="ls-advance-filter advance__filter-wrapper ms-3"
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
                            <FacilitiesAdvanceFilter
                              setFilterOpen={setFilterOpen}
                              filterOpen={filterOpen}
                              selectedstatusDesc={selectedstatusDesc}
                              setSelectedstatusDesc={setSelectedstatusDesc}
                              selectedService={selectedService}
                              setSelectedService={setSelectedService}
                              selectedfacilityTypeDesc={selectedfacilityTypeDesc}
                              setSelectedfacilityTypeDesc={setSelectedfacilityTypeDesc}
                              userId={userId}
                            />
                          </Typography>
                        </Popover>
                      </div>
                    </>
                    <SearchComponent updateSearch={handleSearch} />
                  </Box>
                </Box>
                <Box className="list__view">
                  {listView ? (
                    <FacilitiesDetailsTable updateSort={updateSort} updatePagination={updatePagination} />
                  ) : (
                    <FacilitiesGridList />
                  )}
                </Box>
              </Grid>
            </Grid>
          ) : (
            "You don't have access to read the data"
          )
        ) : (
          <Grid container rowSpacing={2} className="content__wrapper--view">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__header px-3 pb-3 position-relative order-report-title">
                <Typography component="h5" variant="h5">
                  Overview
                </Typography>
                <Box className="icons-separted">
                  {!clientAdmin && <ToggleComponent setListView={setListView} listView={listView} />}
                  {/* <img
            src={AdvanceFilterIcon}
            alt="advance-filter"
            className="advance__filter-wrapper mx-2"
            onClick={() => handleFilter()}
          /> */}
                  {/* <Typography
                    onClick={() => handleFilter()}
                    component="span"
                    variant="span"
                    className="ls-advance-filter advance__filter-wrapper ms-3"
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
                          <FacilitiesAdvanceFilter
                            setFilterOpen={setFilterOpen}
                            filterOpen={filterOpen}
                            selectedstatusDesc={selectedstatusDesc}
                            setSelectedstatusDesc={setSelectedstatusDesc}
                            selectedService={selectedService}
                            setSelectedService={setSelectedService}
                            selectedfacilityTypeDesc={selectedfacilityTypeDesc}
                            setSelectedfacilityTypeDesc={setSelectedfacilityTypeDesc}
                            userId={userId}
                          />
                        </Typography>
                      </Popover>
                    </div>
                  </>
                  <SearchComponent updateSearch={handleSearch} />
                </Box>
              </Box>
              <Box className="list__view">
                {!listView ? (
                  <FacilitiesDetailsTable
                    searchValue={searchValue}
                    updateSort={updateSort}
                    updatePagination={updatePagination}
                  />
                ) : (
                  <FacilitiesGridList />
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      {open && (
        <AddNewFacilities
          setOpen={setOpen}
          open={open}
          user={"tenant"}
          // getFacilitiesById={getFacilitiesById}
          callType={CALLTYPES.Add}
          title="Add New Lab"
        />
      )}
      {/* <FacilitiesAdvanceFilter
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        selectedstatusDesc={selectedstatusDesc}
        setSelectedstatusDesc={setSelectedstatusDesc}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedfacilityTypeDesc={selectedfacilityTypeDesc}
        setSelectedfacilityTypeDesc={setSelectedfacilityTypeDesc}
      /> */}
    </>
  );
};

export default Facilities;
