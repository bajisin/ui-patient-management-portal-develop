import React from "react";
import { Box, Typography } from "@mui/material";

export default function PriorityTab() {
  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Priority Tab Data
            <Typography component="span" variant="span">
              Get an overview of priority data
            </Typography>
          </Typography>
        </Typography>
      </Box>
    </>
  );
}
