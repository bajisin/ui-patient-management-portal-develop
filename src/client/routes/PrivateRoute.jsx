import { Navigate, Outlet } from "react-router-dom";

import BaseLayout from "../pages/layout";
import React from "react";

const PrivateRoutes = () => {
  const auth = { token: false };
  if (sessionStorage.getItem("authInfo")) {
    auth.token = true;
  }
  return auth.token ? (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
