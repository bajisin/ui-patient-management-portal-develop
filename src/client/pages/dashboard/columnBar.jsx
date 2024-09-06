import { Box, Typography } from "@mui/material";
import React from "react";

import { ColumnBarChart } from "../highCharts";

export default function ColumnBar() {
  return (
    <Box className="reportsOverview__wrapper me-0 mb-3">
      <Box className="basic__card">
        <Box className="title__wrapper">
          <Box className="title__wrapper--left">
            <Typography variant="h5" component="h5" className="section_title">
              Column Bar Graph
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview all of the column bar chart
            </Typography>
          </Box>
        </Box>

        <Typography component="div" variant="p" className="report-overview-chart-wrapper">
          <ColumnBarChart />
        </Typography>
      </Box>
    </Box>
  );
}
