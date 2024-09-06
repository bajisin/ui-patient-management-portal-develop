import React from "react";
import { Box, Typography } from "@mui/material";

export default function SchedularTab() {
  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Schedular Tab Data
            <Typography component="span" variant="span">
              Get an overview of master data
            </Typography>
          </Typography>
        </Typography>
      </Box>
    </>
  );
}