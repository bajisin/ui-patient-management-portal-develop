import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { CALLTYPES, roleIds } from "../../../_helpers/constants";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditTenant from "@components/tenant/tenant-config/add-tenant";
import { TENANT } from "../../../../../config/api-config";
import { getTenantsById } from "@redux/slices/tenantsSlice";
import moment from "moment";
import { useLocation } from "react-router-dom";

export default function SettingsTab() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { tenantById } = useSelector((state) => state.tenants);
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails")).roleMasterDTO?.roleId;
  const tenantId = pathname.split("/")[3];
  const tenantDetails =
    loggedInUserRole === roleIds.SUPER_ADMIN
      ? tenantById
      : loggedInUserRole === roleIds.TENANT_ADMIN &&
        JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;

  const [open, setOpen] = React.useState(false);

  const handleEditClickOpen = () => {
    dispatch(getTenantsById(tenantDetails?.tenantId));
    setOpen(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(TENANT.getTenantById(tenantId)); // Replace with your JSON URL
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tenantId]);

  return (
    <>
      {loggedInUserRole === roleIds?.TENANT_ADMIN && (
        <Box className="list__header p-3">
          <Typography component="h5" variant="h5">
            Update Settings
          </Typography>
          <Stack direction="row" gap={2} className="header__wrapper--actions">
            <Button className="bordered-icon-btn edit" onClick={handleEditClickOpen}>
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
          </Stack>
        </Box>
      )}
      <Grid container spacing={2} className="content__wrapper--view p-4">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Box className="upload__logo upload__logo--successful">
            <img src={tenantDetails.tenantLogo} alt="Upload Logo" />
          </Box>
        </Grid>
        {tenantDetails && tenantDetails?.tenantName && (
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Stack className="settings-info" gap={2}>
              <Typography component="label" variant="label">
                Name
                <br />
                <Typography component="b" variant="b">
                  {tenantDetails?.tenantName}
                </Typography>
              </Typography>
              <Typography component="label" variant="label">
                Address <br />
                <Typography component="b" variant="b">
                  {tenantDetails?.streetAddress}
                </Typography>
              </Typography>
              <Typography component="label" variant="label">
                Email Address <br />
                <Typography component="b" variant="b">
                  {tenantDetails?.emailAddress}
                </Typography>
              </Typography>
              <Typography component="label" variant="label">
                Contract Date <br />
                <Typography component="b" variant="b">
                  {`${moment(tenantDetails?.contractStart).format("MM/DD/YYYY")} - ${moment(
                    tenantDetails?.contractEnd
                  ).format("MM/DD/YYYY")}`}
                </Typography>
              </Typography>
            </Stack>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={6} lg={4} className="settings-theme">
          <Stack className="settings-info" gap={2}>
            <Typography component="label" variant="label">
              Font
              <br />
              <Typography component="b" variant="b">
                Poppins
              </Typography>
            </Typography>
            <Typography component="label" variant="label">
              Theme Color
            </Typography>
            <Typography
              variant="b"
              component="b"
              className="theme__wrapper--btn"
              style={{ backgroundColor: tenantDetails?.primMain }}
            ></Typography>
          </Stack>
        </Grid>
      </Grid>
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
    </>
  );
}
