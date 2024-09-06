import { Box, Chip, FormControl, Grid, IconButton, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import { getPatientDetailsById } from "../../../redux/slices/tenantsSlice";
import { getPatientList } from "@redux/slices/tenantsSlice";
import { roleIds } from "../../../_helpers/constants";

export const ProfileDetails = ({ currentRole, handleClickOpen, userDetails, callType, patientDetailsById }) => {
  // if (getLoggedInUserRoleId() === roleIds.PATIENT) {
  //   userDetails = patientDetailsById;
  // }
  const dispatch = useDispatch();
  const { patientList } = useSelector((state) => state.tenants);

  const [filterdData, setFilteredData] = useState([]);
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.id;

  const [data, setData] = useState(
    loggedInUserRole !== "" ? loggedInUserRole : patientList.length > 0 ? patientList[0].tenantId : ""
  );
  const tenantId = getTenantId();

  useEffect(() => {
    dispatch(
      getPatientDetailsById({
        roleId: loggedInUser.roleMasterDTO.roleId,
        tenantId,
        // patientId: "",
        patientLoginUserId: userDetails && userDetails?.userId
      })
    ).then((response) => {
      // Handle the response here
      setFilteredData(response?.payload);

      // You can store the response in state or perform any other actions
    });
  }, [data]);

  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  useEffect(() => {
    dispatch(getPatientList(loggedInUserRole)).then((r) => {
      setData(r?.payload?.data[0]?.tenantId);

      //     getPatientDetailsById({
      //       roleId: loggedInUser.roleMasterDTO.roleId,
      //       tenantId,
      //       patientId: tenantId
      //     }).then((response) => {
      //       // Handle the response here
      //       setFilteredData(response?.payload?.data);

      //       // You can store the response in state or perform any other actions
      //     });
    });
  }, []);

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} className="tntprofile__grid--item">
        <Box className="profile-details p-3">
          <Typography component="div" variant="div" className="profile-wrap">
            <Typography component="div" variant="div" className="profilePic">
              {currentRole == roleIds.PROVIDER || currentRole == roleIds.PATIENT ? (
                <Typography component="h6" variant="h6">
                  {`${Array.from(userDetails && userDetails?.firstName)[0]}`}
                </Typography>
              ) : (
                <Typography component="h6" variant="h6">
                  {`${Array.from(userDetails && userDetails?.firstName)[0]}${
                    Array.from(userDetails && userDetails?.lastName)[0]
                  }`}
                </Typography>
              )}
            </Typography>
            <Typography component="div" variant="div">
              <Typography component="h5" variant="h5">
                {`${userDetails && userDetails?.firstName} ${userDetails && userDetails?.lastName}`}
              </Typography>
              <Typography component="p" variant="p">
                {userDetails && userDetails?.userId}
              </Typography>
            </Typography>
          </Typography>
          {currentRole === roleIds.SUPER_ADMIN && (
            <IconButton className="edit-icon p-2 primaryIcon" onClick={() => handleClickOpen("edit")}>
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </IconButton>
          )}
          {currentRole !== roleIds.SUPER_ADMIN &&
            (currentRole === roleIds.TENANT_ADMIN ? (
              <Chip className="chip__btn chip__btn--green" label="Active" />
            ) : currentRole === roleIds.CLIENT_ADMIN ||
              currentRole === roleIds.PROVIDER ||
              (roleIds.PATIENT && userDetails && userDetails?.statusId === 1) ? (
              ""
            ) : (
              // <Chip className="chip__btn chip__btn--green" label="Active" />
              !roleIds.PATIENT && <Chip className="chip__btn chip__btn--red" label="InActive" />
            ))}
        </Box>
        <Box className="personal-information my-3 p-3">
          <Typography component="h5" variant="h5" className="mb-2">
            Personal Information
          </Typography>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            {userDetails && (
              // {superAdminDetails && (
              <>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    First Name
                  </Typography>
                  <Typography component="b" variant="b">
                    {userDetails && userDetails?.firstName}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    Last Name
                  </Typography>
                  <Typography component="b" variant="b">
                    {userDetails.lastName}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    Email Address
                  </Typography>
                  <Typography component="b" variant="b">
                    {userDetails.email}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    Phone Number
                  </Typography>
                  <Typography component="b" variant="b">
                    {userDetails.phoneNumber}
                    {/* {console.log(userDetails.phoneNumber,"userdetails")} */}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    Alternative Phone Number
                  </Typography>
                  <Typography component="b" variant="b">
                    {userDetails.alternativePhoneNumber || "-"}
                    {/* {userDetails.alternativePhoneNumber} */}
                    {/* {console.log(userDetails.alternativePhoneNumber,"alternative details")} */}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        {/* {userDetails?.country || userDetails?.zipCode || userDetails?.city && */}
        <Box className="address-details p-3">
          <Typography component="h5" variant="h5" className="mb-2">
            Address
          </Typography>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            {userDetails && (
              <>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    Country
                  </Typography>
                  <Typography component="b" variant="b">
                    {userDetails.country}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    City/State
                  </Typography>
                  <Typography component="b" variant="b">
                    {/* {`${userDetails.city?:userDetails.city:""}, ${userDetails.state}`} */}
                    {`${userDetails.city ? userDetails.city : "-"} ${userDetails.state ? userDetails.state : ""}`}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Typography component="label" variant="label">
                    Postal ID
                  </Typography>
                  <Typography component="b" variant="b">
                    {userDetails.zipCode}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        {/* } */}
        {getLoggedInUserRoleId() === roleIds.PATIENT ? (
          <>
            <Box className="personal-information my-3 p-3">
              <Typography component="h5" variant="h5" className="mb-2">
                General Details
              </Typography>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                {filterdData && (
                  // {superAdminDetails && (
                  <>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography component="label" variant="label">
                        Race
                      </Typography>
                      <Typography component="b" variant="b">
                        {filterdData && filterdData?.race?.description}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography component="label" variant="label">
                        Gender
                      </Typography>
                      <Typography component="b" variant="b">
                        {filterdData && filterdData?.gender?.description}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography component="label" variant="label">
                        MRN NO.
                      </Typography>
                      <Typography component="b" variant="b">
                        {userDetails.email}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography component="label" variant="label">
                        Permanent Address
                      </Typography>
                      <Typography component="b" variant="b">
                        {filterdData && filterdData?.permanentAdress}
                        {/* {console.log(userDetails.phoneNumber,"userdetails")} */}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Typography component="label" variant="label">
                        Communication Address
                      </Typography>
                      <Typography component="b" variant="b">
                        {(filterdData && filterdData?.secondaryAddrs) || "-"}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
            <Box className="mt-3 w-100 ms-0">
              <FormControl sx={{ width: 200 }}>
                <Select
                  className="add__select"
                  value={data}
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                >
                  {patientList.map((opt, i) => (
                    <MenuItem key={i} value={opt.tenantId}>
                      {opt.tenantName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box className="address-details p-3 w-100 ms-0">
              <Typography component="h5" variant="h5" className="mb-2">
                Insurance Details
              </Typography>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                {filterdData &&
                  filterdData.insuranceDetails &&
                  filterdData.insuranceDetails.map((insurance, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12}>
                        <Typography component="h5" variant="h5" className="mb-2">
                          Insurance Details {index + 1}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          Insurance Details
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance?.insuranceCompanyName) || ""}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          POLICY HOLDER NAME
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.policyHolderName) || ""}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          POLICY NO.
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.policyNumber) || ""}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          INS GROUP NO
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.groupNumber) || ""}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          NETWORK COMMUNICATION
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.networkCommunication) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          ISSUE DATE
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.insuranceIssueDate) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          EXPIRY DATE
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.insuranceExpiryDate) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          DEDUCTIBLE AMOUNT
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.deductableAmount) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          CO PAYMENT
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.coPayment) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          CO INSURANCE
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.coInsurancePercentage) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          COVERED INDIVIDUALS
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.coveredIndividuals) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          PLAN TYPE
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.planTypeDesc) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          ADDRESS
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.primaryAddress) || "-"}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          EMERGENCY CONTACT NO
                        </Typography>
                        <Typography component="b" variant="b">
                          {(insurance && insurance.emergencyContactNumber) || "-"}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
              </Grid>
            </Box>
            <Box className="personal-information my-3 p-3">
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                {filterdData &&
                  filterdData.insuranceDetails &&
                  filterdData.insuranceDetails.map((insurance, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12}>
                        <Typography component="h5" variant="h5" className="mb-2">
                          Gurantor {index + 1}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          NAME
                        </Typography>
                        <Typography component="b" variant="b">
                          {insurance?.gurantorDetails?.firstName}, {insurance?.gurantorDetails?.gurantorLastName}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          RELATION
                        </Typography>
                        <Typography component="b" variant="b">
                          {insurance?.gurantorDetails?.relation}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          DATE OF BIRTH
                        </Typography>
                        <Typography component="b" variant="b">
                          {insurance?.gurantorDetails?.birthDate}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Typography component="label" variant="label">
                          EMPLOYER NAME
                        </Typography>
                        <Typography component="b" variant="b">
                          {insurance?.gurantorDetails?.employerName}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
              </Grid>
            </Box>
          </>
        ) : (
          ""
        )}
      </Grid>
      {/* )} */}
    </>
  );
};
