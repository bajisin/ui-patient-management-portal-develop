import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUsersByEmail, getUsersByPhone } from "@redux/slices/usersSlice";

import AddTenant from "@components/tenant/tenant-config/add-tenant";
import Tab from "@components/tenant/tenant-config/tab";
import { useDispatch } from "react-redux";
import useDebounce from "@utils/useDebounce";
import { CALLTYPES } from "../../../_helpers/constants";

// import { useAuth0 } from "@auth0/auth0-react";

const TenantConfig = () => {
  const [open, setOpen] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const debounceEmailVal = useDebounce(emailVal, 1000);
  const debouncePhnVal = useDebounce(phoneVal, 1000);

  useEffect(() => {
    if (debounceEmailVal !== "") dispatch(getUsersByEmail(debounceEmailVal));
    if (debouncePhnVal !== "") dispatch(getUsersByPhone(debouncePhnVal));
  }, [debounceEmailVal, debouncePhnVal]);
  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Tenant Configuration
            <Typography component="span" variant="span">
              Get an overview of tenants
            </Typography>
          </Typography>
          <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
            Add Tenant
          </Button>
        </Typography>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <Tab />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {open && (
        <AddTenant
          setOpen={setOpen}
          open={open}
          user={"tenant"}
          setEmailVal={setEmailVal}
          setPhoneVal={setPhoneVal}
          callType={CALLTYPES.Add}
          title="Add Tenant"
        />
      )}
    </>
  );
};

export default TenantConfig;
