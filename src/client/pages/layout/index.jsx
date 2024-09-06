import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import { getLoggedInUserRoleId } from "../../utils/common";
import { roleIds } from "../../_helpers/constants";
import Header from "@components/header";
import Footer from "@components/footer";
import Sidebar from "@components/sidebar";

export default function BaseLayout(props) {
  const { children } = props;
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const wrapperClass = userDetails?.roleMasterDTO?.roleId !== roleIds.PATIENT && "admin__wrapper";

  return (
    <Box className={`app-container common__layout  ${getLoggedInUserRoleId() === 5 ? "patient__management" : ""}`}>
      <Header setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
      <Typography component="div" variant="div" className={`page__wrapper ${wrapperClass}`}>
        {userDetails?.roleMasterDTO?.roleId !== roleIds.PATIENT && (
          <Sidebar setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} />
        )}
        <Typography component="div" variant="div" className="bodyContent__wrapper">
          {children}
        </Typography>
      </Typography>
      <Footer />
    </Box>
  );
}

BaseLayout.defaultProps = {
  children: [],
  user: {}
};
