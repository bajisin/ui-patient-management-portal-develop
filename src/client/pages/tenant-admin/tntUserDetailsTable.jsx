import { Box, Chip, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";

import BasicTable from "../../components/Table/table";
import OrderDetails from "../../components/drawers/orderDetails";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

// function createData(logo, name, Id, emailAddress, phoneNo, contractDuration, client, provider, patient, status) {
//   return { logo, name, Id, emailAddress, phoneNo, contractDuration, client, provider, patient, status };
// }
// const rows = [
//   createData(
//     " ",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   ),
//   createData(
//     "",
//     "Lifescan Health",
//     "RH12345677",
//     "example.in@lifescan.com",
//     "(214)673-9788",
//     "02/06/2022 - 02/06/2025",
//     32,
//     232,
//     4721,
//     1,
//     1
//   )
// ];

export default function TenantDetailsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const [orderRecord, setOrderRecord] = useState([]);

  const toggleDrawerOrderDetails = (open, orderRecord) => (event) => {
    setIsOpenOrderDetails(open);

    // setOrderRecord(row);
  };
  useEffect(() => {
    axios.get(`http://localhost:3030/facilities`).then((res) => {
      setOrderRecord(res.data);
    });
  }, []);
  return (
    <>
      <Box>
        <TableContainer className="table__wrapper" component={Paper}>
          <OrderDetails isOpen={isOpenOrderDetails} orderData={orderRecord} toggleDrawer={toggleDrawerOrderDetails} />
          <Table className="table_section">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Contract Duration</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderRecord.map((row) => (
                <TableRow key={row.Name} onClick={toggleDrawerOrderDetails(row)}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.ID}</TableCell>
                  <TableCell>{row.EmailAddress}</TableCell>
                  <TableCell>{row.PhoneNumber}</TableCell>
                  <TableCell>{row.ContractDuration}</TableCell>
                  <TableCell>{row.Client}</TableCell>
                  <TableCell>{row.Provider}</TableCell>
                  <TableCell>{row.Patient}</TableCell>
                  <TableCell>
                    {row.Status === "Active" ? (
                      <Chip className="chip__btn chip__btn--green" label={row.Status} />
                    ) : (
                      <Chip className="chip__btn chip__btn--yellow" label={row.Status} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <BasicTable
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orderRecord.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
