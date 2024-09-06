import { Box, Card, Chip, Grid, IconButton, Paper, Typography } from "@mui/material";
import { CALLTYPES, roleIds } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getTenantUserById, getUsersByEmail, getUsersByPhone, getUsersDetailsList } from "@redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

import AddTenantUser from "@components/tenant/tenant-details/add-tenant-user";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Loader from "@utils/Loader";
import { ProfileDetails } from "./profile-details";
import SearchIcon from "@mui/icons-material/Search";
import SuccessPopup from "./SuccessPopup";
import { getPatientDetailsById } from "../../../redux/slices/tenantsSlice";
import { getverifyEmail } from "@redux/slices/tenantSnapshotSlice";
import noUsers from "@assets/images/ls_svg/no-user-found.svg";
import useDebounce from "@utils/useDebounce";

// import axios from "axios";
// import SearchComponent from "@components/search";
const MyProfile = ({ updateSearch }) => {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const tntAssetDetails = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;
  const [open, setOpen] = useState(false);
  const [callType, setCallType] = useState("");
  const [title, setTitle] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [icon, setIcon] = useState(false);
  const [value, setValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const dispatch = useDispatch();
  const { usersDetailsList, loading } = useSelector((state) => state.userDetails);
  const { patientDetailsById } = useSelector((state) => state.tenants);

  // const fetchUserDetailsById = () => {
  //   apiCall({
  //     url: TENANT_USERS.getUserInfoByID(userDetails.id), // Use usersDetailsId here
  //     method: "GET",
  //     xTenantId: getXtenantId()
  //   }).then((response) => {
  //     // setUserData(response.data); // Update the user details state
  //     setIsProfile(true);
  //     setIsLoading(true);
  //   });
  //   setIsLoading(false);
  // };
  const fetchUserProfileById = () => {
    try {
      setIsLoading(true);
      dispatch(getTenantUserById(userDetails.id)).then((res) => {
        setIsLoading(false);
        setUserData(res?.payload);
        setIsProfile(true);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
      // Handle the error as needed, such as displaying a message to the user
    }
  };

  const debounceEmailVal = useDebounce(emailVal, 1000);
  const debouncePhnVal = useDebounce(phoneVal, 1000);

  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      if (debounceEmailVal !== "" && debounceEmailVal !== userData?.email) dispatch(getUsersByEmail(debounceEmailVal));
      if (debouncePhnVal !== "" && debouncePhnVal !== userData?.phoneNumber) dispatch(getUsersByPhone(debouncePhnVal));
    } else {
      if (debounceEmailVal !== "") dispatch(getUsersByEmail(debounceEmailVal));
      if (debouncePhnVal !== "") dispatch(getUsersByPhone(debouncePhnVal));
    }
  }, [debounceEmailVal, debouncePhnVal]);

  const handleClickOpen = (callType, id) => {
    // setShowSuccessPopup(false);
    setOpen(true);
    // fetchUserDetailsById();
    fetchUserProfileById();
    setCallType(callType);
    if (callType === CALLTYPES.Add) setTitle("Add Super Admin");
    else if (callType === CALLTYPES.Edit) setTitle("Edit Super Admin");
  };

  const currentRole = userDetails?.roleMasterDTO?.roleId;
  const tntProfileClass =
    currentRole === roleIds.TENANT_ADMIN || roleIds.CLIENT_ADMIN || roleIds.PROVIDER ? "tntAdmin__profile" : "";

  useEffect(() => {
    fetchUserProfileById();
    // fetchUserDetailsById();
    dispatch(getUsersDetailsList());
    dispatch(
      getPatientDetailsById({
        roleId: userDetails?.roleMasterDTO?.roleId,

        tenantId: tntAssetDetails,
        patientId: "",

        patientLoginUserId: userDetails?.id
      })
    );
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchString = searchQuery.trim().toLowerCase();

  const searchWords = searchString.split(" ");

  const filteredSuperadmins = usersDetailsList?.filter((superadmin) => {
    const firstName = superadmin?.firstName?.toLowerCase();
    const middleName = superadmin?.middleName?.toLowerCase();
    const lastName = superadmin?.lastName?.toLowerCase();
    const email = superadmin?.email?.toLowerCase();
    const id = superadmin?.id?.toLowerCase();

    // Check if all words in the search query are found in any of the fields
    return searchWords.every((word) => {
      return (
        firstName?.includes(word) ||
        middleName?.includes(word) ||
        lastName?.includes(word) ||
        email?.includes(word) ||
        id?.includes(word)
      );
    });
  });

  const handleAdminClick = (adminId) => {
    dispatch(
      getverifyEmail({
        userEmail: adminId.email
      })
    ).then((r) => (r?.type.includes("fulfilled") ? setShowSuccessPopup(true) : setShowSuccessPopup(false)));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box className={`${tntProfileClass} admin__profile myProfile__wrapper content__wrapper`}>
          <Typography component="h2" variant="h2" className="mt-2">
            Profile Details
          </Typography>
          <Typography component="p" variant="p" className="mb-3">
            Overview of personal details
          </Typography>
          <Card>
            <Grid container rowSpacing={2} columnSpacing={2} className="details-section">
              {isProfile && (
                <ProfileDetails
                  currentRole={currentRole}
                  handleClickOpen={handleClickOpen}
                  callType={callType}
                  userDetails={userData}
                  isLoading={isLoading}
                  patientDetailsById={patientDetailsById}
                />
              )}
              {currentRole === roleIds.SUPER_ADMIN && (
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography component="div" variant="div" className="other-admin-list p-3">
                    <Box className="title__wrapper">
                      <Typography component="h5" variant="h5">
                        Other Super Admin List
                      </Typography>
                      <Button
                        variant="outlined"
                        className="bordered-icon-btn px-3"
                        onClick={() => handleClickOpen("add")}
                      >
                        {"Add Super Admin"}
                      </Button>
                    </Box>
                    {/* If there is no data then make it visible */}
                    <Box className="noDataAvailable d-none">
                      <img src={noUsers} alt="No Data Available" className="mb-3" />
                      <Typography component="h4" variant="h4" className="my-4">
                        No User Found
                      </Typography>
                      <Typography component="p" variant="p" className="mt-2">
                        Currently there are no super admin found. Create a tenant to proceed further
                      </Typography>
                    </Box>
                    <Box className="adminList-scroll">
                      <Box className="title__wrapper mt-3">
                        <Typography variant="label" component="label">
                          {filteredSuperadmins?.length} Users Found
                          {/* {calculateApiDataLength()} Users Found */}
                        </Typography>
                        {/* <SearchComponent /> */}
                        <Paper className="search__wrapper" component="form">
                          <InputBase
                            placeholder="Search here..."
                            inputProps={{ "aria-label": "Search here..." }}
                            value={searchQuery}
                            onChange={handleSearch}
                            type="search"
                          />

                          <IconButton type="button" aria-label="search">
                            {!icon ? (
                              <SearchIcon
                                onClick={() => {
                                  updateSearch(value.toLowerCase());
                                  setIcon(!icon);
                                }}
                              />
                            ) : (
                              <Typography
                                component="span"
                                variant="span"
                                className="ls-close secondaryIcon"
                                onClick={() => {
                                  updateSearch("");
                                  setIcon(!icon);
                                  setValue("");
                                }}
                              ></Typography>
                            )}
                          </IconButton>
                        </Paper>
                        {/* <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search by name" /> */}
                      </Box>
                      <Box className="adminList--grid">
                        {filteredSuperadmins?.map((admin) => (
                          <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            className="gridList__wrapper--card gridList__wrapper--cardDetails"
                            key={admin.id}
                            onClick={() => handleAdminClick(admin)}
                          >
                            <Box className="profile-details p-3">
                              <Typography component="div" variant="div" className="profile-wrap">
                                <Typography component="div" variant="div" className="profilePic">
                                  <Typography component="h6" variant="h6">
                                    {`${Array?.from(admin?.firstName)[0]}${Array?.from(admin?.lastName)[0]}`}
                                  </Typography>
                                </Typography>
                                <Typography component="div" variant="div">
                                  <Typography component="h5" variant="h5">
                                    {`${admin?.firstName} ${admin?.lastName}`}
                                  </Typography>
                                  <Typography component="p" variant="p">
                                    <Typography component="span" variant="span">
                                      {`${admin?.id}`}
                                    </Typography>
                                  </Typography>
                                </Typography>
                              </Typography>
                              <Chip className="chip__btn chip__btn--green" label="Active" />
                              {admin?.statusId === 1 && (
                                <Chip label="Reshare Link" clickable variant="outlined" color="primary" />
                              )}
                            </Box>
                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                              <Grid item lg={8} md={8} sm={8} xs={12}>
                                <Typography component="label" variant="label">
                                  Email Address
                                </Typography>
                                <Typography component="b" variant="b">
                                  {admin.email}
                                </Typography>
                              </Grid>
                              <Grid item lg={4} md={4} sm={4} xs={12}>
                                <Typography component="label" variant="label">
                                  Phone Number
                                </Typography>
                                <Typography component="b" variant="b">
                                  {admin.phoneNumber}
                                </Typography>
                              </Grid>
                              <Grid item lg={6} md={6} sm={6} xs={12}>
                                <Typography component="label" variant="label">
                                  Location Address
                                </Typography>
                                <Typography component="b" variant="b">
                                  {`${admin?.address}`}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Box>
                    </Box>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Card>
          {showSuccessPopup && (
            <SuccessPopup
              onClose={() => {
                window.location.reload();
                setShowSuccessPopup(false);
                setOpen(false);
              }}
            />
          )}
          {open && (
            <AddTenantUser
              setOpen={setOpen}
              open={open}
              showSuccessPopup={showSuccessPopup}
              setShowSuccessPopup={setShowSuccessPopup}
              user={"super admin"}
              userData={userData}
              callType={callType}
              title={title}
              setEmailVal={setEmailVal}
              setPhoneVal={setPhoneVal}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default MyProfile;
