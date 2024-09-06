import { Box, Card, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "../../../../utils/common";

import BarcodeScan from "./barcodeScanner";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PdfDialog from "../../../drawers/pdfDialog";
import ReactToPrint from "react-to-print";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getPatientDetailsById } from "../../../../redux/slices/tenantsSlice";
import { useSelector } from "react-redux";

function createData(testName, tp, description, icdcode, comments) {
  return { testName, tp, description, icdcode, comments };
}
export default function PreviewContent({
  open,
  setOpen,
  previewData,
  barcode,
  insuranceId,
  facilities,
  labs,
  allTests,
  selectedDiagnosisCodes,
  fastingRequired,
  handleSubmit,
  priorityCode,
  orderType,
  providerSign,
  npi,
  formattedDateforCollection,
  timeforCollection,
  orderDetailsById
}) {
  const handleClose = () => {
    setOpenFile(false);
  };
  const handleClosePreview = () => {
    setOpen(false);
  };
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const { patientDetailsById } = useSelector((state) => state?.tenants);
  const currentDate = formattedDateforCollection;
  const formateTime =  String(timeforCollection || orderDetailsById?.collectionTime);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentTime = dayjs.utc(formateTime).tz(userTimeZone).format('hh:mm')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [patientId, setPatientId] = useState("");
  const [submissionTime, setSubmissionTime] = useState();
  const [collectedBy, setCollectedBy] = useState();
  const [fasting, setFasting] = useState("");
  const [file, setFile] = useState("");
  const [openFile, setOpenFile] = useState(false);
  let componentRef = useRef();
  const [finalAge, setFinalAge] = useState(null);
  useEffect(() => {
    if (fastingRequired === false) {
      setFasting("No");
    } else {
      setFasting("Yes");
    }
  }, [fastingRequired]);

  useEffect(() => {
    if (providerSign && !providerSign?.[0]?.docUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = reader.result;
        setFile(data);
        // setOpenFile(true);
      };
      reader?.readAsDataURL(providerSign);
      // setFile(providerSign);
    }
  }, [providerSign]);

  // const handlePreview = () => {
  //   if (providerSign) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const data = reader.result;
  //       setFile(data);
  //       setOpenFile(true);
  //     };
  //     reader.readAsDataURL(providerSign);
  //   }
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    if (previewData) {
      setPatientId(previewData.get("patientId"));
      setSubmissionTime(previewData.get("submissionTime"));
      setCollectedBy(previewData.get("collectedBy"));
    }
  }, [previewData]);
  const handlePrint = () => {
    e.preventDefault();
  };
  const updatedAllTests = allTests.map((test, i) => ({
    ...test,
    selectedDiagnosis: selectedDiagnosisCodes[i] || []
  }));
  useEffect(() => {
    if (patientDetailsById) {
      const parsedBirthDate = dayjs(patientDetailsById?.birthDate);
      const todaysDate = dayjs();
      const age = todaysDate.diff(parsedBirthDate, "year");
      const hasBirthdayOccurred =
        todaysDate.month() > parsedBirthDate.month() ||
        (todaysDate.month() === parsedBirthDate.month() && todaysDate.date() >= parsedBirthDate.date());
      const calculatedFinalAge = hasBirthdayOccurred ? age : age - 1;
      setFinalAge(calculatedFinalAge);
      const dateOfBirth = patientDetailsById?.birthDate?.split("T")[0];
      // const [year, month, day] = dateOfBirth?.split("-");
      // const formattedDateOfBirth = `${month}-${day}-${year}`;
    }
  }, [patientDetailsById]);
  const tenantDetails = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  return (
    <>
      <Dialog aria-labelledby="Preview Data" open={open} enableResize={true} className="commonModal__wrapper">
        <Box className="commonModal__wrapper--dialog">
          <IconButton aria-label="close" onClick={handleClosePreview} className="modalClose">
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>
          <Box className="order-preview-title mb-3">
            <img src={tenantDetails.tenantLogo} alt="Upload Logo" className="printLogo" />
            <DialogTitle className="p-0">Order Preview</DialogTitle>
            <Typography component="div" className="barcodeBlock">
              <BarcodeScan id={barcode} />

              <div style={{ display: "none" }}>
                <ComponentToPrint
                  patientDetailsById={patientDetailsById}
                  patientId={patientId}
                  finalAge={finalAge}
                  facilities={facilities}
                  labs={labs}
                  tenantDetails={tenantDetails}
                  file={file}
                  barcode={barcode}
                  fasting={fasting}
                  priorityCode={priorityCode}
                  orderType={orderType}
                  insuranceId={insuranceId}
                  submissionTime={submissionTime}
                  currentDate={currentDate}
                  currentTime={currentTime}
                  collectedBy={collectedBy}
                  allTests={allTests}
                  orderDetailsById={orderDetailsById}
                  npi={npi}
                  providerSign={providerSign}
                  // ref={componentRef}
                  ref={(el) => (componentRef = el)}
                  updatedAllTests={updatedAllTests}
                />
              </div>
            </Typography>
            {/* </form> */}
          </Box>
          <Divider className="w-100" />
          <DialogContent>
            <Box className="orderPreview__wrapper">
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Personal Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Patient id
                    </Typography>
                    <Typography variant="b" component="b">
                      {patientId || patientDetailsById?.patientId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Patient Name
                    </Typography>
                    <Typography variant="b" component="b">
                      { patientDetailsById?.firstName  + " " + patientDetailsById?.lastName}

                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Date of Birth
                    </Typography>
                    <Typography variant="b" component="b">
                      {patientDetailsById?.birthDate?.split("T")[0]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Age
                    </Typography>
                    <Typography variant="b" component="b">
                      {finalAge}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Biological Gender
                    </Typography>
                    <Typography variant="b" component="b">
                      {patientDetailsById?.gender?.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      permanent address
                    </Typography>
                    <Typography variant="b" component="b">
                      {patientDetailsById?.primaryAddrs}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      communication address
                    </Typography>
                    <Typography variant="b" component="b">
                      {patientDetailsById?.secondaryAddrs}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      social security no.
                    </Typography>
                    <Typography variant="b" component="b">
                      {patientDetailsById?.ssnId}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  User Details
                </Typography>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Client
                    </Typography>
                    <Typography variant="b" component="b">
                      Marques
                    </Typography>
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Physician
                    </Typography>
                    <Typography variant="b" component="b">
                      {npi?.basic?.firstName || npi} {npi?.basic?.lastName || ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Lab
                    </Typography>
                    <Typography variant="b" component="b">
                      {labs?.labName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Facility
                    </Typography>
                    <Typography variant="b" component="b">
                      {facilities?.facilityName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Insurance
                    </Typography>
                    <Typography variant="b" component="b">
                      {insuranceId?.insuranceCompanyName}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Test Details
                </Typography>
                <Box>
                  <TableContainer className="table__wrapper" component={Paper}>
                    <Table className="table_section">
                      <TableHead>
                        <TableRow>
                          <TableCell>Test Name</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>CPT Code</TableCell>
                          <TableCell>DX Code</TableCell>
                          <TableCell>Specimen Type</TableCell>
                          <TableCell>Container Type</TableCell>
                          {/* <TableCell>TP</TableCell> */}
                          {/* <TableCell>Comments</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {updatedAllTests?.map((row) => (
                          <>
                          {console.log(row,"row")}
                            <TableRow key={row?.name}>
                              <TableCell>
                                {row?.testName === null || ""
                                  ? row?.panelName
                                  : row?.testName || row?.panelTest?.flatMap((test) => test.testName)}
                              </TableCell>
                              {/* <TableCell>{row?.selectedDiagnosis}</TableCell>
                               */}
                              <TableCell>
                                {row?.selectedDiagnosis?.dgnstcCodes?.map((diagnosis, index) => (
                                  <div key={index}>
                                    {diagnosis.diagnosticCode} - {diagnosis.diagnosticDesc}
                                  </div>
                                ))}
                              </TableCell>
                              <TableCell>{row?.cptCode || row?.cptCodes || row?.cptCode ||  row?.panelTest?.flatMap((test) => test.cptCode)}</TableCell>
                              <TableCell>{row?.selectedDiagnosis?.dgnstcCodes?.map((diagnosis, index) => (
                                  <div key={index}>
                                    {diagnosis.diagnosticCode}
                                  </div>
                                ))}</TableCell>
                              <TableCell>{row?.specimenFrozenDesc || row?.panelTest?.flatMap((test) => test.specimenFrozenDesc)}</TableCell>
                              <TableCell>{row?.containerTypeName || row?.panelTest?.flatMap((test) => test.containerTypeName) }</TableCell>


                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={allTests?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Order Details
                </Typography>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Fasting
                    </Typography>
                    <Typography variant="b" component="b">
                      {fasting}
                    </Typography>
                  </Grid> */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Priority Type
                    </Typography>
                    <Typography variant="b" component="b">
                      {priorityCode?.ordPrtyDesc}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Order Type
                    </Typography>
                    <Typography variant="b" component="b">
                      {orderType?.ordTypDesc}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      ABN Number
                    </Typography>
                    <Typography variant="b" component="b">
                      {abnDocumentId}
                    </Typography>
                  </Grid> */}
                </Grid>
              </Box>
              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Collection Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Date
                    </Typography>
                    <Typography variant="b" component="b">
                      {currentDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Time
                    </Typography>
                    <Typography variant="b" component="b">
                      {currentTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      collected By
                    </Typography>
                    <Typography variant="b" component="b">
                      {collectedBy || orderDetailsById?.collectionBy}
                    </Typography>
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Submission Type
                    </Typography>
                    <Typography variant="b" component="b">
                      {submissionTime}
                    </Typography>
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Provider&apos;s sign
                    </Typography>
                    <Typography variant="b" component="b">
                      <Card>
                        <iframe
                          src={file || providerSign?.[0]?.docUrl}
                          title="PDF Preview"
                          width="100%"
                          height="100%"
                        />
                      </Card>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Typography component="div" className="d-flex justify-content-end">
              <ReactToPrint
                // trigger={() => (
                //   <button type="submit" className="primary-btn">
                //     Print File{" "}
                //   </button>
                // )}
                // content={() => componentRef.current}
                // content={() => componentRef}
                trigger={() => (
                  <button type="submit" className="primary-btn">
                    Print File{" "}
                  </button>
                )}
                content={() => componentRef}
                bodyClass={"printElement1"}
              />
            </Typography>
          </DialogContent>
        </Box>
        {/* </form> */}
      </Dialog>
      {openFile && <PdfDialog open={open} url={file} handleClose={handleClose} />}
    </>
  );
}
class ComponentToPrint extends React.Component {
  render() {
    const {
      patientDetailsById,
      patientId,
      finalAge,
      facilities,
      labs,
      fasting,
      file,
      barcode,
      priorityCode,
      orderType,
      insuranceId,
      currentDate,
      currentTime,
      tenantDetails,
      submissionTime,
      collectedBy,
      allTests,
      npi,
      updatedAllTests,
      orderDetailsById,
      providerSign
    } = this.props;
    return (
      <div ref={this.props.propsRef}>
        <style>
          {`
          @media print {
            @page {
              size: 215.9mm 279.4mm;
              margin: 1mm;
            }
          }
        `}
        </style>
        {/* <h2 style={{ color: "green" }}>Attendance</h2> */}
        <Box className="printElement1 p-3">
          <Box component="div" className="d-flex justify-content-between align-items-center">
            <img src={tenantDetails.tenantLogo} alt="Upload Logo" className="printLogo" />

            <Typography variant="div" component="div">
              Personal Details
            </Typography>
            <Typography component="div" className="barcodeBlock">
              <BarcodeScan id={barcode} />
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Patient ID
                </Typography>
                <Typography variant="p" component="p">
                  {patientId || patientDetailsById?.patientId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant="label" component="label" className="add__label">
                      Patient Name
                    </Typography>
                    <Typography variant="b" component="b">
                      { patientDetailsById?.firstName  + " " + patientDetailsById?.lastName}

                    </Typography>
                  </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Date of Birth
                </Typography>
                <Typography variant="p" component="p">
                  {patientDetailsById?.birthDate?.split("T")[0]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Age
                </Typography>
                <Typography variant="p" component="p">
                  {finalAge}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Biological Gender
                </Typography>
                <Typography variant="p" component="p">
                  {patientDetailsById?.gender?.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  permanent address
                </Typography>
                <Typography variant="p" component="p">
                  {patientDetailsById?.primaryAddrs}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  communication address
                </Typography>
                <Typography variant="p" component="p">
                  {patientDetailsById?.secondaryAddrs}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  social security no.
                </Typography>
                <Typography variant="p" component="p">
                  {patientDetailsById?.ssnId}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider className="w-100" />
          <Box>
            <Typography variant="h6" component="h6" className="w-100">
              User Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Physician
                </Typography>
                <Typography variant="p" component="p">
                  {npi?.basic?.firstName} {npi?.basic?.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Lab
                </Typography>
                <Typography variant="p" component="p">
                  {labs?.labName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Facility
                </Typography>
                <Typography variant="p" component="p">
                  {facilities?.facilityName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Insurance
                </Typography>
                <Typography variant="p" component="p">
                  {insuranceId?.insuranceCompanyName}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider className="w-100" />
          <Box>
            <Typography variant="h6" component="h6" className="w-100">
              Test Details
            </Typography>
            <Box>
              <TableContainer className="table__wrapper" component={Paper}>
                <Table className="table_section">
                  <TableHead>
                    <TableRow>
                      <TableCell>Test Name</TableCell>
                      {/* <TableCell>TP</TableCell> */}
                      <TableCell>Description</TableCell>
                      <TableCell>CPT Code</TableCell>
                      <TableCell>DX Code</TableCell>
                      <TableCell>Specimen Type</TableCell>
                      <TableCell>Container Type</TableCell>
                      {/* <TableCell>Comments</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {updatedAllTests?.map((row) => (
                      <TableRow key={row?.name}>
                        <TableCell>
                          {row?.testName === null || ""
                            ? row?.panelName
                            : row?.testName || row?.panelTest?.flatMap((test) => test.testName)}
                        </TableCell>

                        {/* <TableCell>{row?.TP}</TableCell> */}
                        <TableCell>
                          {row?.selectedDiagnosis?.dgnstcCodes?.map((diagnosis, index) => (
                            <div key={index}>
                              {diagnosis?.diagnosticCode} - {diagnosis?.diagnosticDesc}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>{row?.cptCodes || row?.cptCodes || row?.cptCode || row?.panelTest?.flatMap((test) => test.cptCode)}</TableCell>
                        {/* <TableCell>{row?.comments}</TableCell> */}
                        <TableCell>{row?.selectedDiagnosis?.dgnstcCodes?.map((diagnosis, index) => (
                                  <div key={index}>
                                    {diagnosis.diagnosticCode }
                                  </div>
                                ))}</TableCell>
                              <TableCell>{row?.specimenFrozenDesc || row?.panelTest?.flatMap((test) => test.specimenFrozenDesc)}</TableCell>
                              <TableCell>{row?.containerTypeName || row?.panelTest?.flatMap((test) => test.containerTypeName) }</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Divider className="w-100" />
          <Box>
            <Typography variant="h6" component="h6" className="w-100">
              Order Details
            </Typography>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Fasting
                </Typography>
                <Typography variant="p" component="p">
                  {fasting}
                </Typography>
              </Grid> */}
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Priority Type
                </Typography>
                <Typography variant="p" component="p">
                  {priorityCode?.ordPrtyDesc}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Order Type
                </Typography>
                <Typography variant="p" component="p">
                  {orderType?.ordTypDesc}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider className="w-100" />
          <Box>
            <Typography variant="h6" component="h6" className="w-100">
              Collection Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Date
                </Typography>
                <Typography variant="p" component="p">
                  {currentDate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Time
                </Typography>
                <Typography variant="p" component="p">
                  {currentTime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  collected By
                </Typography>
                <Typography variant="p" component="p">
                  {collectedBy || orderDetailsById?.collectionBy}
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Submission Type
                </Typography>
                <Typography variant="p" component="p">
                  {submissionTime}
                </Typography>
              </Grid> */}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Provider&apos;s sign
                </Typography>
                <img src={providerSign?.[0]?.docUrl || file} title="PDF Preview" width="150" height="150" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    );
  }
}
// export default PreviewContent;
