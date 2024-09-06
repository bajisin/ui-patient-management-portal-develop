import { Box, Button, Chip, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddNewFacilities from "@pages/tenant-admin/addNewFacilities";
import { CALLTYPES } from "../../../_helpers/constants";
import Loader from "../../../utils/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getFacilityGrid } from "@redux/slices/facilitiesSlice";
import noData from "@assets/images/svg/noDataFound.svg";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1)
}));
const FacilitiesGridList = ({ updateFormValue }) => {
  const dispatch = useDispatch();

  const { facilityGrid: data, loading } = useSelector((state) => state.facilities);
  const { facilitiesById } = useSelector((state) => state.facilities);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFacility, setEditedFacility] = useState(null);
  const [facilityName, setFacilityName] = useState("");
  const [services, setServices] = useState([]);
  const [managementGroup, setManagementGroup] = useState();
  const [facilityType, setFacilityType] = useState();
  const [address, setaddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const { managementGrpData } = useSelector((state) => state.commonAdmin);

  useEffect(() => {
    if (isEditing) {
      setFacilityName(updateFormValue?.facilityName);

      setaddress(updateFormValue?.address);
      setphoneNumber(updateFormValue?.phoneNumber);
      setEmailAddress(updateFormValue?.emailAddress);
      setManagementGroup(updateFormValue?.managementGroupId);
      setFacilityType(updateFormValue?.facilityTypeDesc);
      setServices(updateFormValue?.services);
    }
  }, [isEditing, managementGrpData]);
  const [currentPage, setCurrentPage] = useState(0);
  const [some, setSome] = useState([]);
  const currentPageData = data?.data;
  const totalPages = data.totalCount <= 0 ? 1 : Math.ceil(data.totalCount / 10 - 1);
  const handlePageChange = (e, newPage) => {
    dispatch(
      getFacilityGrid({
        pageNo: newPage || 0,

        pageSize: 10,

        searchValue: "",

        sortKey: "creationDate",

        sortOrder: "DESC"
      })
    );
    setCurrentPage(newPage);
    setSome(data);
  };
  const navigate = useNavigate();
  const openEditModal = (facilityData) => {
    if (facilityData?.facilityId) {
      // Construct the URL for the details page using the facility ID
      const detailsURL = `/facilities/facilities-parent-Order-Tab/${facilityData.facilityId}`;

      // Navigate to the details page
      navigate(detailsURL);
    }
    // setEditedFacility(facilityData);

    // setIsEditing(true);
    // dispatch(getManagementGrpData());
    // dispatch(getServiceList());
    // dispatch(getFacilityList());
    // dispatch(getDaysLab());
    // dispatch(
    //   getTenantUsers({
    //     pagination: {
    //       pageNo: 0,
    //       pageSize: 99999
    //     },
    //     sortKey: "lastModifiedDate",
    //     sortOrder: "DESC",
    //     searchValue: "",
    //     tenantId,
    //     roleId: [roleIds.CLIENT_ADMIN],
    //     role: loggedInUserRole
    //   })
    // );
    // dispatch(getFacilitiesById(facilityData?.facilityId));
  };
  useEffect(() => {
    handlePageChange();
  }, []);
  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2} className="mt-0 px-3">
          {currentPageData?.length > 0 ? (
            ""
          ) : (
            <Grid style={{ position: "relative", left: "35%" }}>
              <img src={noData} alt="No Data Available" className="mb-3" />
              <span> NO data found </span>
            </Grid>
          )}

          {currentPageData?.map((facility, index) => (
            <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
              <Item className="gridList__wrapper--card">
                <Box className="basic__drawer--header">
                  <Typography component="div" variant="div" className="gridList__header d-flex align-items-center">
                    <Typography component="h6" variant="h6" className="profilePic">
                      {facility.facilityName[0]}
                    </Typography>
                    <Typography component="h5" variant="h5" className="profile--title profile--title--status">
                      {facility.facilityName}
                      <br></br>
                      <Chip className="chip__btn chip__btn--green" label={facility.statusMaster?.statussDescription} />

                      <Typography component="p" variant="p">
                        <Typography component="span" variant="span" className="ls-phone secondaryIcon"></Typography>
                        Phone No.
                        <Typography component="span" vatiant="span">
                          {facility.phoneNumber}
                        </Typography>
                      </Typography>
                    </Typography>
                  </Typography>
                  <Typography component="div" variant="div" className="gridList__itemsCount">
                    <Typography component="p" variant="p" className="dflex">
                      No. of Patients
                      <Typography component="b" variant="b">
                        {facility.totalPatients}
                      </Typography>
                    </Typography>
                    <Typography component="p" variant="p" className="dflex">
                      No. of Providers
                      <Typography component="b" variant="b">
                        {facility.totalOrders}
                      </Typography>
                    </Typography>
                    <Typography component="p" variant="p" className="dflex">
                      No. of Clients
                      <Typography component="b" variant="b">
                        {facility.totalClients}
                      </Typography>
                    </Typography>
                  </Typography>
                </Box>
                <Button
                  component="button"
                  variant="text"
                  className="downloadBtn-text float-start mt-2"
                  onClick={() => openEditModal(facility)}
                >
                  View Details
                </Button>
                <Box>
                  <IconButton onClick={() => openEditModal(facility)}>
                    <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                  </IconButton>
                </Box>
              </Item>
            </Grid>
          ))}
          <Grid
            style={{
              position: "sticky",
              top: "10px",
              zIndex: 1,
              paddingLeft: "70%"
            }}
          >
            <Stack spacing={2}>
              <Pagination count={totalPages} onChange={handlePageChange} defaultPage={currentPage} />
            </Stack>
          </Grid>
        </Grid>
      )}
      {isEditing && (
        <AddNewFacilities
          isEditing={isEditing}
          open={isEditing}
          setOpen={setIsEditing}
          facilitiesById={facilitiesById}
          updateFormValue={editedFacility}
          // id={labById?.labId}
          callType={CALLTYPES.Edit}
        />
      )}
    </Box>
  );
};

export default FacilitiesGridList;
