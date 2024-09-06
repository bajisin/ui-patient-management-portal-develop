import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
function createData(insuranceCompanyName, medicaidNo, medicareNo, policyNo, insGroupName, insGroupNo) {
  return { insuranceCompanyName, medicaidNo, medicareNo, policyNo, insGroupName, insGroupNo };
}
const rows = [
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345"),
  createData("Blue Cross Blue Shield", "RGSF12345", "RGSF12345", 12345678, "Blue Cross Blue Shield", "RGSF12345")
];
const AddInsurance = ({ setOpen, open }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog aria-labelledby="Add Insurance" open={open} enableResize={true} className="commonModal__wrapper">
      <DialogTitle>
        Add Insurance
        <IconButton aria-label="close" onClick={handleClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>
          <TableContainer className="table__wrapper" component={Paper}>
            <Table className="table_section">
              <TableHead>
                <TableRow>
                  <TableCell>Insurance Company Name</TableCell>
                  <TableCell>Medicaid No.</TableCell>
                  <TableCell>Medicare No.</TableCell>
                  <TableCell>Policy No.</TableCell>
                  <TableCell>INS. Group Name</TableCell>
                  <TableCell>INS. Group No.</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.insuranceCompanyName}>
                    <TableCell>{row.insuranceCompanyName}</TableCell>
                    <TableCell>{row.medicaidNo}</TableCell>
                    <TableCell>{row.medicareNo}</TableCell>
                    <TableCell>{row.policyNo}</TableCell>
                    <TableCell>{row.insGroupName}</TableCell>
                    <TableCell>{row.insGroupNo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddInsurance;
