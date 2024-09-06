import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getLoggedInUserRoleId } from "@utils/common";
import { getOrderDetails } from "@redux/slices/tenantsSlice";
import { getOrderDetailsPayload } from "./latestOrderPayload";

export default function LatestOrders() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedTenants, setSelectedTenants] = useState([]);
  const { orderDetails: data } = useSelector((state) => state.tenants);
  const tenantIds = selectedTenants?.map((t) => t.tenantId);
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = getOrderDetailsPayload(startDate, endDate, selectedTenants);
    dispatch(getOrderDetails(payload));
  }, [startDate, endDate, selectedTenants]);
  return (
    <Box className="orderStatus__wrapper latest-card-wrapper mb-3">
      <Box className="basic__card order-card mt-0 px-0">
        <Box className="title__wrapper px-3">
          <Box className="title__wrapper--left">
            <Typography variant="h5" component="h5" className="section_title">
              Latest Orders
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview of all the service providers
            </Typography>
          </Box>
          <Box className="title__wrapper--right">
            <Typography className="title_right">{/* Date picker comes here */}</Typography>
          </Box>
        </Box>
        <TableContainer className="table__wrapper" component={Paper}>
          <Table aria-label="" className="table_section">
            <TableHead>
              <TableRow>
                <TableCell>Client ID</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Test Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((order, index) => {
                const date = order?.orderDate?.split("T")[0];
                const [year, month, day] = date?.split("-");
                const formattedDate = `${month}-${day}-${year}`;
                return (
                  <TableRow key={index}>
                    <TableCell>{order?.orderId === null ? "0" : order?.orderId}</TableCell>
                    <TableCell>{order?.globalPatientId === null ? "0" : order?.globalPatientId}</TableCell>
                    <TableCell>{order?.orderDate === null ? "0" : formattedDate}</TableCell>
                    <TableCell>{order?.testCount === null ? "0" : order?.testCount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
