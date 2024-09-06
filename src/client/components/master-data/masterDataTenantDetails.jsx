import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from "@mui/material";

import { Link } from "react-router-dom";
import MasterTenantTabComponent from "./masterTenantTab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React from "react";
import Tenant from "@assets/images/ls_svg/patient-management/tenant1.png";

export default function MasterDataTenantDetails() {
  return (
    <>
      <Box className="content__wrapper">
        <Paper elevation={2} className="header__wrapper--content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={Tenant} />
              </Typography>
              <Typography component="h5" variant="h5">
                Unilab
                <Stack spacing={2}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    className="breadcrumb__wrapper"
                  >
                    <Link key="1" to="/tenant-config">
                      Master Data
                    </Link>
                    <Typography key="2">Tenant Details</Typography>
                  </Breadcrumbs>
                </Stack>
              </Typography>
            </Typography>
          </Typography>
          <Divider className="w-100" />
          <Typography component="div" variant="div" className="header__wrapper--bottom">
            <List>
              <ListItem>
                <ListItemIcon> Tenant Admin</ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
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
                  <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                  Phone Number
                </ListItemIcon>
                <ListItemText>Master Data</ListItemText>
              </ListItem>
            </List>
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <MasterTenantTabComponent />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
