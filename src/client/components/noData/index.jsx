import * as React from "react";
import noOrders from "@assets/images/ls_svg/patient-management/noOrders.svg";
import { Box, Typography } from "@mui/material";
const NoData = () => {
  return (
    <Box className="noDataAvailable">
      <img src={noOrders} alt="No Data Available" className="mb-3 mt-4" />
      <Typography component="h4" variant="h4" className="my-4">
        No Orders Found
      </Typography>
      <Typography component="p" variant="p" className="mt-2">
        Currently there are no orders available. Book an Order with the physician to proceed further
      </Typography>
    </Box>
  );
};
export default NoData;
