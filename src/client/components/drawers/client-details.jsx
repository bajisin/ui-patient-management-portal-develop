import { Box, Chip, Drawer, Grid, IconButton, Stack, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { roleIds, statusIds, CALLTYPES } from "../../_helpers/constants";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import SuccessPopup from "../../pages/admin/profile/SuccessPopup";
import dayjs from "dayjs";
import { getLoggedInUserRoleId } from "@utils/common";
import { getverifyEmail } from "@redux/slices/tenantSnapshotSlice";
import AddUser from "../users/add-user/addUserModal";
const ClientDetailsDrawer = ({
  isOpen,
  toggleDrawer,
  loggedinId,
  setOpenDrawer,
  rowSelection,
  filterdData,
  setIsOpenDetails,
  setRowSelection
}) => {
  const { tenantUserById } = useSelector((state) => state.userDetails);

  const handleBack = () => {
    toggleDrawer(false);
    setIsOpenDetails(false);
    setOpenDrawer(false);
    setRowSelection({});
    setEmpty({});
  };
  const dispatch = useDispatch();
  const [empty, setEmpty] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [callType, setCallType] = useState("");
  const [title, setTitle] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [editVal, setEditVal] = useState("")
  useEffect(() => {
    const keysArray =
      getLoggedInUserRoleId() === roleIds.TENANT_ADMIN || roleIds.CLIENT_ADMIN ? "" : Object?.keys(rowSelection);
    const firstKey = keysArray[0];
    setEmpty(firstKey);
  }, [empty]);

  const handleClickOpen = () => {
    setOpen(true);
    setCallType(CALLTYPES.Edit);
    setTitle("Edit Provider Admin");
    setEditVal("Provider")
  };

  return (
    <>
    <Drawer anchor="right" open={isOpen} onClose={handleBack}>
      {showSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            window.location.reload();
            setShowSuccessPopup(false);
          }}
        />
      )}
      <Box className="basic__drawer">
        <IconButton className="close-drawer">
          <CloseIcon onClick={handleBack}></CloseIcon>
        </IconButton>
        <Typography component="div" variant="div" className="common__layout--drawer">
          <Typography component="div" variant="div" className="basic__drawer--header">
            <Box className="drawer--title">
              <Typography component="div" variant="div" className="profilePic">
                <Typography component="h6" variant="h6">
                  {getLoggedInUserRoleId() === 5
                    ? `${filterdData[empty]?.firstName ? Array.from(filterdData[empty]?.firstName)[0] : ""}${
                        filterdData[empty]?.lastName ? Array.from(filterdData[empty]?.lastName)[0] : ""
                      }`
                    : `${tenantUserById?.firstName ? Array.from(tenantUserById.firstName)[0] : ""}${
                        tenantUserById?.lastName ? Array.from(tenantUserById.lastName)[0] : ""
                      }`}
                </Typography>
              </Typography>
              <Typography component="div" variant="div" className="profileData profileDataPatient">
                <Box className="d-flex align-items-center justify-content-between mb-2">
                  <Typography component="h5" variant="h5">
                    {getLoggedInUserRoleId() === 5
                      ? `${filterdData[empty]?.firstName} ${filterdData[empty]?.lastName}`
                      : `${tenantUserById?.firstName} ${tenantUserById?.lastName}`}
                  </Typography>
                  {/* <Button
                        component="button"
                        variant="outlined"
                        className="primary-outline-btn edit-button"
                        onClick={handleClickOpen}
                      >
                        Edit Provider 
                      </Button> */}
                       <IconButton
                      
                      onClick={handleClickOpen}
                    >
                      <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                    </IconButton>


                  <Stack direction="row" spacing={1} className="mt-0">
                    {tenantUserById?.status?.statusId === statusIds.ACTIVE ? (
                      <>
                        <Chip className="chip__btn chip__btn--green float-end" label="Active" />
                        <Chip
                          label="Reshare Link"
                          clickable
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            dispatch(
                              getverifyEmail({
                                userEmail:
                                  getLoggedInUserRoleId() === 5
                                    ? `${filterdData[empty]?.emailAddr}`
                                    : `${tenantUserById?.email}`
                              })
                            ).then((r) =>
                              r?.type.includes("fulfilled") ? setShowSuccessPopup(true) : setShowSuccessPopup(false)
                            );
                          }}
                        />
                      </>
                    ) : tenantUserById?.status?.statusId === statusIds.PENDING ? (
                      <Chip className="chip__btn chip__btn--yellow float-end" label="Pending" />
                    ) : (
                      tenantUserById?.status?.statusId === statusIds.IN_ACTIVE && (
                        <Chip className="chip__btn chip__btn--red float-end" label="In Active" />
                      )
                    )}
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Typography component="p" variant="p">
                    <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                    Email
                    <Typography component="span" variant="span">
                      {getLoggedInUserRoleId() === 5 ? `${filterdData[empty]?.emailAddr}` : `${tenantUserById?.email}`}
                    </Typography>
                  </Typography>
                  <Typography component="p" variant="p">
                    <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                    Phone Number
                    <Typography component="span" variant="span">
                      {getLoggedInUserRoleId() === 5
                        ? `${filterdData[empty]?.phoneNumber}`
                        : `${tenantUserById?.phoneNumber}`}
                    </Typography>
                  </Typography>
                </Stack>
              </Typography>
            </Box>
          </Typography>
          <Typography component="h6" variant="h6" className="underlined-title mt-3">
            Other Details
          </Typography>
          <hr className="w-100 my-1" />
          <Grid container spacing={1} className="name__value--text mt-0">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                Associated with
              </Typography>
              <Typography component="b" variant="b">
                {getLoggedInUserRoleId() === 5
                  ? filterdData[empty]?.clientAdmin === null
                    ? `${filterdData[empty]?.tenantAdmin}`
                    : `${filterdData[empty]?.clientAdmin}`
                  : `${tenantUserById?.reportingManagerUserId}`}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                Joining Date
              </Typography>
              <Typography component="b" variant="b">
                {dayjs(tenantUserById?.joiningDate).format("MM/DD/YYYY")}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                Address
              </Typography>
              <Typography component="b" variant="b">
                {getLoggedInUserRoleId() === 5
                  ? "No Address Found"
                  : `${tenantUserById?.address}, ${tenantUserById?.zipCode}`}
                {}
              </Typography>
            </Grid>
          </Grid>
          {!loggedinId && (
            <>
              <Typography component="h6" variant="h6" className="underlined-title mt-3">
                General Details
              </Typography>
              <hr className="w-100 my-1" />
              <Grid container spacing={1} className="name__value--text mt-0">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography component="p" variant="p">
                    Facilities assigned: {tenantUserById?.userFacilities?.length}
                  </Typography>
                </Grid>
                {tenantUserById?.userFacilities?.map((facility, i) => (
                  <Grid key={i} item lg={6} md={6} sm={12} xs={12}>
                    <Typography component="b" variant="b">
                      {`${i + 1}. ${facility?.facilityName}`}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={1} className="name__value--text mt-0">
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography component="p" variant="p">
                    Labs assigned: {tenantUserById?.userLabs?.length}
                  </Typography>
                </Grid>
                {tenantUserById?.userLabs?.map((lab, i) => (
                  <Grid key={i} item lg={6} md={6} sm={12} xs={12}>
                    <Typography component="b" variant="b">
                      {`${i + 1}. ${lab?.labName}`}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Typography>
      </Box>
    </Drawer>
    {open && (
        <AddUser
          open={open}
          userData={tenantUserById}
          setOpen={setOpen}
          callType={callType}
          title={title}
          userId={tenantUserById?.userId}
          setEmailVal={setEmailVal}
          setPhoneVal={setPhoneVal}
          editVal={editVal}
        />
      )}
    </>
    
  );
};

export default ClientDetailsDrawer;
