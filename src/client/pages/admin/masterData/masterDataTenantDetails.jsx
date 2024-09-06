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
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ContentManagementTab from "../../../components/master-data/contentManagementTab";
import MasterTenantTabComponent from "./masterTenantTab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getTenantsById } from "@redux/slices/tenantsSlice";

export default function MasterDataTenantDetails() {
  const { pathname } = useLocation();
  const tenantId = pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTenantsById(tenantId));
  }, []);

  const { tenantById } = useSelector((state) => state.tenants);
  return (
    <>
      <Box className="content__wrapper">
        <Paper elevation={2} className="header__wrapper--content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={tenantById?.tenantLogo} />
              </Typography>
              <Typography component="h5" variant="h5">
                {tenantById?.tenantName}
                <Stack spacing={2}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    className="breadcrumb__wrapper"
                  >
                    <Link key="1" to="/master-data">
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
                <ListItemText>{`${tenantById?.firstName} ${tenantById?.lastName}`}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                  Email
                </ListItemIcon>
                <ListItemText>{tenantById?.emailAddress}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                  Phone Number
                </ListItemIcon>
                <ListItemText>{tenantById?.phoneNumber === "null" ? "" : tenantById?.phoneNumber}</ListItemText>
              </ListItem>
            </List>
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <ContentManagementTab classes="parent-tab" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
