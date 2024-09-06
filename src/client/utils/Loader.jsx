import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const Loader = () => (
  <Box
    className="loader-wrapper"
    // sx={{
    //   zIndex: 100,
    //   position: "absolute",
    //   top: "50%",
    //   left: "50%",
    //   transform: "translate(-50%, -50%)"
    // }}
  >
    <CircularProgress />
  </Box>
);

export default Loader;
