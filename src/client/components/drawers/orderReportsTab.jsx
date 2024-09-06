/* eslint-disable react/jsx-key */

import { Box, Button, Card, CardContent, Grid, IconButton, Stack, Typography, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import InsuranceDetails from "../tenant/tenant-details/order-details/insurance-details";
import Label from "./label";
import { OrderReportsTabLabels, statusIds } from "../../_helpers/constants";
import PdfDialog from "@components/drawers/pdfDialog";
import PreviewContent from "../tenant-admin/PatientManagement/create-order/previewDataModal";
import PropTypes from "prop-types";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import dayjs from "dayjs";
import { getPatientDetailsById } from "../../redux/slices/tenantsSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orderDetails-tabpanel-${index}`}
      aria-labelledby={`orderDetails-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `orderDetails-tab-${index}`,
    "aria-controls": `orderDetails-tabpanel-${index}`
  };
}

export default function OrderReportsTabComponent({
  orderDetailsById,
  testDetails,
  indTest,
  insuranceDetails,
  orderDocs
}) {
  const [value, setValue] = React.useState(0);
  const [label, setLabel] = useState(false);
  const [preview, setPreview] = useState(false);
  const [filePath, setFilePath] = useState();
  const [openOrderForm, setOpenOrderForm] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpenOrderForm = (flag) => {
    setOpenOrderForm(flag);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleaccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleClose = () => {
    setPreview(false);
  };
  const handleFileDownload = (doc) => {
    const url = doc?.docUrl; // Replace with the actual file URL
    const link = document.createElement("a");
    link.href = url;
    link.download = doc?.fileName; // Set the desired filename for download
    link.target = "_blank";
    link.click();
  };
  const handleFilePreview = (doc) => {
    setPreview(true);
    setFilePath(doc?.docUrl);
  };
  const close = () => {
    setLabel(false);
  };
  const [priorityCode, setPriorityCode] = useState("");
  const [orderType, setOrderType] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [previewData, setPreviewData] = useState("");
  const [fastingRequired, setFastingRequired] = useState([]);
  const [selectedTests, setSelectedTests] = useState();
  const [collectedTime, setCollectedTime] = useState(dayjs());
  const [oneTimeOrderTime, setOneTimeOrderTime] = useState(dayjs());
  const [npi, setNpi] = useState("");
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  };
  const utcDateTime = new Date(oneTimeOrderTime).toUTCString();
  const utcDateTimeforCollection = new Date(collectedTime).toUTCString();
  const dateParts = utcDateTime.split(" "); // Split the date string into parts
  const datePartsforCollection = utcDateTimeforCollection.split(" "); // Split the date string into parts
  const day = dateParts[1]; // Day part
  const dayforCollection = datePartsforCollection[1]; // Day part
  const month = months[dateParts[2]]; // Month part converted to numerical value
  const monthforCollection = months[datePartsforCollection[2]]; // Month part converted to numerical value
  const year = dateParts[3]; // Year part
  const yearforCollection = datePartsforCollection[3]; // Year part
  const time = dateParts[4];
  const timeforCollection = datePartsforCollection[4];
  const formattedDate = `${year}/${month}/${day}`;
  const formattedDateforCollection = `${yearforCollection}/${monthforCollection}/${dayforCollection}`;
  const { patientDetailsById } = useSelector((state) => state?.tenants);
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const editTests = [];
    if (orderDetailsById?.panel?.length > 0) editTests.push(...orderDetailsById.panel);
    if (orderDetailsById?.individual?.length > 0) editTests.push(...orderDetailsById.individual);
    setSelectedTests(editTests);
    setCollectedTime(orderDetailsById?.collectionTime);

    setPriorityCode({
      ordPrtyId: orderDetailsById?.orderPriorityDto?.orderPriorityId,
      ordPrtyDesc: orderDetailsById?.orderPriorityDto?.orderPriorityDescription
    });
    setOrderType({
      ordPrtyId: orderDetailsById?.orderType?.orderTypePriorityId,
      ordTypDesc: orderDetailsById?.orderType?.orderTypeDescription
    });

    setOneTimeOrderTime(dayjs(orderDetailsById?.oneTimeOrderTime).format(" YYYY-MM-DD HH:mm:ss"));
    if (orderDetailsById?.patientId) {
      dispatch(
        getPatientDetailsById({
          roleId: getLoggedInUserRoleId(),
          tenantId: getTenantId(),
          patientId: orderDetailsById?.patientId
        })
      );
    }
    if (orderDetailsById && Object.keys(orderDetailsById).length > 0) {
      const individual = orderDetailsById?.individual || [];
      const panelTest = orderDetailsById?.panel?.flatMap((panel) => panel.panelTest) || [];
      setSelectedDiagnosisCodes([...individual, ...panelTest]);
      if (selectedDiagnosisCodes) {
        setSelectedDiagnosisCodes((prevData) => {
          return prevData.map((ele) => {
            const newData = {
              ...ele
            };
            if (ele?.panelTest?.length) {
              newData["dgnstcCodes"] = fomattedCodes(
                ele.panelTest[0].diagnosticCode,
                ele.panelTest[0].diagnosticCodeDescription
              );
            }
            if (ele?.diagnosticCode) {
              newData["dgnstcCodes"] = fomattedCodes(ele.diagnosticCode, ele.diagnosticCodeDescription);
            }
            return newData;
          });
        });
      }
    }
  }, [orderDetailsById]);
  const fomattedCodes = (diagnosticCodes, diagnosticCodeDescriptions) => {
    const diagnosticCodesArray = diagnosticCodes ? diagnosticCodes?.split(",") : [];
    const diagnosticCodeDescriptionsArray = diagnosticCodeDescriptions ? diagnosticCodeDescriptions.split(",") : [];
    return diagnosticCodesArray.map((code, index) => ({
      diagnosticCode: code,
      diagnosticDesc: diagnosticCodeDescriptionsArray[index] || ""
    }));
  };
  const statusCell = (value, statusDescription) => {
    if (value === statusIds.IN_PROGRESS || value === statusIds.PENDING)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.DRAFT)
      return <Chip className="chip__btn chip__btn--orange" label={statusDescription} />;
    else if (value === statusIds.ON_HOLD)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.COMPLETED)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.CANCELLED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
    else if (value === statusIds.COMPLETED_IN_PROGRESS_ORDER)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.COMPLETED_CORRECTED_ORDER)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.REJECTED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
    else if (value === statusIds.IN_ACTIVE)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.ACTIVE)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.ERRORED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
  };

  return (
    <>
      <Box className="tab__wrapper rightDrawers-tab mt-4">
        <Tabs value={value} onChange={handleChange} aria-label="order details tabs" className="tabs_sections">
          {OrderReportsTabLabels.map((l, i) => (
            <Tab key={i} label={l} {...a11yProps(i)} />
          ))}
          <Typography component="h6" variant="h6" className="title">
            Test DATE
            <Typography component="b" variant="b">
              {dayjs(orderDetailsById?.processingTime).format("MM/DD/YYYY")}
            </Typography>
          </Typography>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography component="div" variant="div" className="basic__drawer--header name__value--text mt-2">
          <Typography component="b" variant="b" className="d-flex">
            Order Id:
            <Typography component="p" variant="p" className="ps-2">
              {orderDetailsById?.orderId}
            </Typography>
          </Typography>
        </Typography>
        <Typography component="div" variant="div" className="basic__drawer--header name__value--text mt-2">
          <Typography component="b" variant="b" className="d-flex">
            ORM Request Id:
            <Typography component="p" variant="p" className="ps-2">
              {orderDetailsById?.ormReqId}
            </Typography>
          </Typography>
        </Typography>
        <Box className="accordion__wrapper">
          {testDetails?.map((panel) => {
            return (
              <>
                <Typography component="h4" variant="h4">{panel?.panelName}</Typography>
                {panel?.panelTest?.map((test, i) => {
                  return (
                    <Box className="test-performed">
                      <Typography component="h6" variant="h6" className="underlined-title mt-2">
                        {test?.testCode}
                      </Typography>
                      <ul>
                        <li>
                          {i + 1}. {test?.testName} - Specimen Frozen :
                          {test?.specimenFrozenDesc?.length > 0 ? test?.specimenFrozenDesc : "Not Required"}
                          &nbsp; - {test?.statusDesc ? statusCell(test?.statusId, test?.statusDesc) : "No Status"}  
                        </li>
                      </ul>
                    </Box>
                  );
                })}
              </>
            );
          })}
          <Box className="test-performed">
            <Typography component="h4" variant="h4" className="underlined-title mt-2">
              Individual Tests Performed
            </Typography>
            {indTest?.map((test, index) => {
              return (
                <ul>
                  <li>
                    {index + 1}. {test?.testName} - Specimen Frozen :
                    {test?.specimenFrozenDesc?.length > 0 ? test?.specimenFrozenDesc : "Not Required"}  
                    &nbsp; - {test?.statusDesc ? statusCell(test?.statusId, test?.statusDesc) : "No Status"}   
                  </li>
                </ul>
              );
            })}
          </Box>
          <Grid container rowSpacing={2} columnSpacing={2} className="pdf__wrapper">
            {orderDocs?.map((doc) => {
              return (
                <>
                  {(getLoggedInUserRoleId() !== 5 || doc.docType !== "ABN") && (
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Card className="mini__card position-relative">
                        <CardContent>
                          <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                          <Typography component="label" variant="label">
                            {doc.docType}
                            <br />
                          </Typography>
                        </CardContent>
                        <Stack direction="row" spacing={1}>
                          <IconButton aria-label="delete">
                            <VisibilityOutlinedIcon className="viewIcon" onClick={() => handleFilePreview(doc)} />
                          </IconButton>
                          {/* <IconButton aria-label="delete">
                            <SaveAltOutlinedIcon className="downloadIcon" onClick={() => handleFileDownload(doc)} />
                          </IconButton> */}
                        </Stack>
                      </Card>
                    </Grid>
                  )}
                </>
              );
            })}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InsuranceDetails insuranceDetails={insuranceDetails} />
      </TabPanel>
      <Button
        style={{ marginTop: "30px" }}
        className="primary-btn"
        type="button"
        onClick={() => {
          setLabel(true);
        }}
      >
        Generate Label
      </Button>
      <Button
        style={{ marginTop: "30px", marginLeft: "10px" }}
        className="primary-btn"
        type="button"
        onClick={() => {
          setOpenPreview(true);
        }}
      >
        Print Requisition
      </Button>
      <Grid container spacing={1} className="name__value--text mt-3">
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            First Name
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.firstName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Last Name
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.lastName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Phone Number
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.phoneNumber}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Birth Date
          </Typography>
          <Typography component="b" variant="b">
            {dayjs(orderDetailsById?.birthDate).format("MM/DD/YYYY")}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Email Address
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.emailAddress}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Status
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.status?.statusDesc}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Created By
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.createByName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Address
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.address}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            City
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.city}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            State
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.state}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Zip Code
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.zipCode}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Country
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.country}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Alternate Phone Number
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.alternatePhoneNumber}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Gender
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.genderDesc}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            SSNID
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.ssnId}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            NPI Name
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.npiName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Lab
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.labName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Facility Name
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.facilityName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Order Priority
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.orderPriorityDescription}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Order Type
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.orderTypeDescription}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Order Template
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.orderTemplateName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Tenant Name
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.tenantName}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Patient Ethnic Desc
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.patientEthnicDesc}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Patient Race Desc
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.patientRaceDesc}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Comments
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.comments}
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography component="p" variant="p">
            Payment Type
          </Typography>
          <Typography component="b" variant="b">
            {orderDetailsById?.paymentTypeId === 1
              ? "Insurance"
              : orderDetailsById?.paymentTypeId === 2
              ? "Client bill"
              : "Patient pay"}
          </Typography>
        </Grid>
      </Grid>

      {/* )} */}
      {/* </Grid> */}
      {label && <Label open={label} close={close} orderDetailsById={orderDetailsById} />}
      {preview && <PdfDialog open={open} url={filePath} handleClose={handleClose} />}
      {openPreview && (
        <PreviewContent
          setOpen={setOpenPreview}
          open={openPreview}
          previewData={previewData}
          barcode={orderDetailsById?.orderId}
          facilities={orderDetailsById?.facility}
          insuranceId={orderDetailsById?.insuranceDetailsViewDTO}
          labs={orderDetailsById?.lab}
          allTests={selectedTests}
          selectedDiagnosisCodes={selectedDiagnosisCodes}
          fastingRequired={fastingRequired}
          priorityCode={priorityCode}
          orderType={orderType}
          providerSign={orderDetailsById?.orderDocument}
          formattedDateforCollection={formattedDateforCollection}
          timeforCollection={collectedTime}
          npi={orderDetailsById?.npiName}
          orderDetailsById={orderDetailsById}
          title="Preview Order"
        />
      )}
    </>
  );
}
