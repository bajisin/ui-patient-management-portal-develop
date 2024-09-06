import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import { OrderStatChart, ReportOverviewChart } from "../highCharts";
import React, { useEffect, useState } from "react";
import { Status, Years, roleIds } from "../../_helpers/constants";
import { dashboardReports, dashboardStats } from "@redux/slices/dashboardSlice";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

// import moment from "moment";

export default function OrderStats() {
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(Years[0]); // Initialize with empty values
  const [selectedStatus, setSelectedStatus] = useState(Status[0]); // Initialize with empty values

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    dispatch(
      dashboardStats({
        userId:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? getLoggedInUserId()
            : "",
        roleId: loggedInUser.roleMasterDTO.roleId,
        year: event.target.value.title,
        status: [selectedStatus.title]
      })
    );
  };
  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
    dispatch(
      dashboardStats({
        userId:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? getLoggedInUserId()
            : "",
        roleId: loggedInUser.roleMasterDTO.roleId,
        year: selectedOption.title,
        status: [event.target.value.title]
      })
    );
  };
  useEffect(() => {
    dispatch(
      dashboardStats({
        userId:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? getLoggedInUserId()
            : "",
        roleId: loggedInUser.roleMasterDTO.roleId,
        year: Years[0].title,
        status: Status.map((s) => s.title)
        // status: Status[0].title
      })
    );
  }, []);
  return (
    <Box className="reportsOverview__wrapper me-0 mb-3">
      <Box className="basic__card">
        <Box className="title__wrapper">
          <Box className="title__wrapper--left">
            <Typography variant="h5" component="h5" className="section_title">
              Order Stats
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview all of the order stat
            </Typography>
          </Box>
          {/* <Box className="title__wrapper--right">
            <Typography className="title_right">
              <FormControl className="w-100">

              </FormControl>
            </Typography>
          </Box> */}
          <Box className="title__wrapper--right w-50">
            <Grid container className="w-100 justify-content-end">
              <Grid item xs={12} sm={12} md={6} lg={6} className="me-3">
                <FormControl className="w-100">
                  <Select className="add__select" value={selectedStatus} onChange={handleChangeStatus}>
                    {Status?.map((opt, i) => (
                      <MenuItem key={i} value={opt}>
                        {opt.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl className="w-100">
                  <Select className="add__select" value={selectedOption} onChange={handleChange}>
                    {Years?.map((opt, i) => (
                      <MenuItem key={i} value={opt}>
                        {opt.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Typography component="div" variant="p" className="report-overview-chart-wrapper">
          <OrderStatChart />
        </Typography>
      </Box>
    </Box>
  );
}
