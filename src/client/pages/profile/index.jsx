import { Box, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { DEV_BASE_URI } from "../../../../config/api-config";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const [userData, setUserData] = useState({});

  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  useEffect(() => {
    axios.get(`${DEV_BASE_URI}/users?id=${userDetails.id}`).then((res, err) => {
      if (res?.data) setUserData(res?.data[0]);
      else return err;
    });
  }, []);
  return (
    <Box className="home__wrapper myProfile__wrapper">
      <Typography component="div" variant="div">
        <Typography component="h2" variant="h2">
          Profile Details
        </Typography>
        <Typography component="p" variant="p">
          Overview of personal details
        </Typography>
      </Typography>
      <Box className="details-section">
        <Grid container className="basic__card my-3">
          <Grid lg={12} md={12} sm={12} xs={12} className="w-100">
            <Typography component="div" variant="div" className="profile-details flex-row">
              <Typography component="h6" variant="h6" className="profilePic">
                {/* {`${Array.from(userDetails?.firstName)[0]}${Array.from(userDetails?.lastName)[0]}`} */}
              </Typography>
              <Typography component="div" variant="div" className="d-flex flex-column">
                <Typography component="h5" variant="h5">
                  {`${userData?.firstName} ${userData?.lastName}`}
                </Typography>
                <Typography component="div" variant="div" className="header__wrapper--bottom">
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Typography component="span" variant="span" className="ls-id secondaryIcon me-1"></Typography>
                        Patient ID
                      </ListItemIcon>
                      <ListItemText>AM123456789</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                        Email
                      </ListItemIcon>
                      <ListItemText>Tenants</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography
                          component="span"
                          variant="span"
                          className="ls-phone secondaryIcon me-1"
                        ></Typography>
                        Phone Number
                      </ListItemIcon>
                      <ListItemText>Master Data</ListItemText>
                    </ListItem>
                  </List>
                </Typography>
              </Typography>
            </Typography>
            <Divider className="w-100 mt-3" />
            <Typography component="div" variant="div" className="header__wrapper--bottom">
              <List>
                <ListItem>
                  <ListItemIcon>Address 1</ListItemIcon>
                  <ListItemText>15205 North Kierland Blvd. Suite 100. Scottsdale.</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>Address 2</ListItemIcon>
                  <ListItemText>15205 North Kierland Blvd. Suite 100. Scottsdale.</ListItemText>
                </ListItem>
              </List>
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="basic__card">
          <Typography component="h6" variant="h6" className="w-100 mb-2">
            Insurance And Gradian Details
          </Typography>
          <Grid lg={6} md={6} sm={12} xs={12} className="personal-information">
            <Typography component="label" variant="label" className="mb-1">
              Insurance Details
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Insurance Name
                </Typography>
                <Typography component="b" variant="b">
                  Blue Cross Clue Shield
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Medicaid No.
                </Typography>
                <Typography component="b" variant="b">
                  RGS123567
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Medicare No.
                </Typography>
                <Typography component="b" variant="b">
                  RGS123567
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Policy No.
                </Typography>
                <Typography component="b" variant="b">
                  RGS123567
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  INS Group Name
                </Typography>
                <Typography component="b" variant="b">
                  Blue Cross Clue Shield
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  INS Group name
                </Typography>
                <Typography component="b" variant="b">
                  RGS123567
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid lg={6} md={6} sm={12} xs={12} className="address-detail">
            <Typography component="label" variant="label" className="mb-1">
              Guardian Details
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  First Name
                </Typography>
                <Typography component="b" variant="b">
                  Ame
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Middle Name
                </Typography>
                <Typography component="b" variant="b">
                  Marshal
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Last Name
                </Typography>
                <Typography component="b" variant="b">
                  Brew
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Relation
                </Typography>
                <Typography component="b" variant="b">
                  Care Giver
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Phone No.
                </Typography>
                <Typography component="b" variant="b">
                  (555) 555-1234
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography component="label" variant="label">
                  Alternative Phone No.
                </Typography>
                <Typography component="b" variant="b">
                  (555) 555-1234
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
