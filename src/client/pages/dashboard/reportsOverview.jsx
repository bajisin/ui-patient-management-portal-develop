import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

import { ReportOverviewChart } from "../highCharts";
import { Years, roleIds } from "../../_helpers/constants";
import { dashboardReports } from "@redux/slices/dashboardSlice";
import { useDispatch } from "react-redux";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";

export default function ReportsOverview() {
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  // const [years, setYears] = useState("2003");
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(Years[0]); // Initialize with empty values

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Store them in the state
    dispatch(
      dashboardReports({
        roleId: loggedInUser.roleMasterDTO.roleId,
        year: event.target.value.title,
        userId:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? getLoggedInUserId()
            : ""
      })
    );
  };
  return (
    <Box className="reportsOverview__wrapper me-0 mb-3">
      <Box className="basic__card">
        <Box className="title__wrapper">
          <Box className="title__wrapper--left">
            <Typography variant="h5" component="h5" className="section_title">
              Reports Overview
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview of all the order stat
            </Typography>
          </Box>
          <Box className="title__wrapper--right">
            <Typography className="title_right">
              <FormControl className="w-100">
                <Select className="add__select" value={selectedOption} onChange={handleChange}>
                  {Years?.map((opt, i) => (
                    <MenuItem key={i} value={opt}>
                      {opt.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography>
          </Box>
        </Box>

        <Typography component="div" variant="p" className="report-overview-chart-wrapper">
          <ReportOverviewChart />
        </Typography>
      </Box>
    </Box>
  );
}
