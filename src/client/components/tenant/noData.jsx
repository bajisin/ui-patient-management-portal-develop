import * as React from "react";
import noData from "@assets/images/svg/noDataFound.svg";
import { Box, Button, Typography } from "@mui/material";
const NoData = () => {
  return (
    <Box className="noDataAvailable">
      <img src={noData} alt="No Data Available" className="mt-3" />
      <Typography component="h4" variant="h4" className="my-3">
        No Data Found
      </Typography>
      <Typography component="p" variant="p" className="mt-2">
        The tenant haven't approved the request yet
      </Typography>
      <Button component="button" variant="contained" className="primary-btn mt-3">
        Re-share Link
      </Button>
    </Box>
  );
};
export default NoData;
