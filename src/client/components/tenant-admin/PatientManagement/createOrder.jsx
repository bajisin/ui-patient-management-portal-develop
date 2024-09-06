import { Box, Breadcrumbs, Link, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useLocation, useNavigate } from "react-router-dom";

import ArrowActive from "@assets/images/ArrowActive.svg";
import ArrowDefault from "@assets/images/ArrowDefault.svg";
import Avatar from "@mui/material/Avatar";
import CreateOrderData from "./create-order/createOrderData";
import GreenCheckIcon from "@assets/images/Greencheck_icon.svg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { PatientSearch } from "./addPatient/patient-search";
import { getPatientDetails } from "@redux/slices/tenantsSlice";
import { tntPatientSearch } from "../../../routes/routePaths";
import { useDispatch } from "react-redux";
import { getLoggedInUserId } from "../../../utils/common";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { pathname } = useLocation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("param");
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramValue === "createOrder" || paramValue === "editOrder") {
      setStep1Complete(false);
      setStep2Complete(false);
      setStep3Complete(false);
    }
  }, []);

  useEffect(() => {
    const searchVal = selectedPatient?.firstName || selectedPatient?.lastName || selectedPatient;

    dispatch(
      getPatientDetails({
        pageNo: 0,
        pageSize: 99999,
        sortOrder: "DESC",
        searchValue: searchVal || "",
        sortKey: "lastModifiedDate",
        role: getLoggedInUserRoleId(),
        tenantId: getTenantId(),
        // userId: getLoggedInUserId()
      })
    );
  }, [selectedPatient]);

  const scrollToStep = (stepNumber) => {
    const stepId = `step${stepNumber}`;
    const stepElement = document.getElementById(stepId);
    if (stepElement) {
      stepElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleStepClick = (stepNumber) => {
    scrollToStep(stepNumber);
  };

  return (
    <Box className="content__wrapper createOrderSteps">
      {paramValue === "createOrder" || paramValue === "editOrder" ? (
        <Paper component="div" variant="div" className="content__wrapper--header basic__card">
          <Typography component="div" variant="div" className="header__wrapper--title">
            <Typography component="h4" variant="h4">
              Patient Management
              <Stack gap={2}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                  className="breadcrumb__wrapper"
                >
                  <Link key="1" onClick={() => navigate("/patientManagement")}>
                    Patient Overview
                  </Link>
                  <Typography key="2">Create Order</Typography>
                </Breadcrumbs>
              </Stack>
            </Typography>
          </Typography>
          <Box className="stepProcess__wrapper">
            <List className="stepProcess__wrapper--steps createOrder__steps">
              <ListItem
                className={step1Complete ? "stepCompleted" : "stepDefault"}
                data-step-id="step1"
                onClick={() => handleStepClick(1)}
              >
                <ListItemAvatar>
                  {step1Complete ? (
                    <Avatar>
                      <img src={GreenCheckIcon} />
                    </Avatar>
                  ) : (
                    <Avatar>
                      <Typography variant="span" component="span">
                        01
                      </Typography>
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText primary="Patient Details" />
              </ListItem>
              <ListItem className="arrowIndicator">
                <img className="mt-2" src={step1Complete ? ArrowActive : ArrowDefault} />
              </ListItem>
              <ListItem
                className={step2Complete ? "stepCompleted" : "stepDefault"}
                data-step-id="step2"
                onClick={() => handleStepClick(2)}
              >
                <ListItemAvatar>
                  {step2Complete ? (
                    <Avatar>
                      <img src={GreenCheckIcon} />
                    </Avatar>
                  ) : (
                    <Avatar>
                      <Typography variant="span" component="span">
                        02
                      </Typography>
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText primary="Test Details" />
              </ListItem>
              <ListItem className="arrowIndicator">
                <img className="mt-2" src={step2Complete ? ArrowActive : ArrowDefault} />
              </ListItem>
              <ListItem
                className={step3Complete ? "stepCompleted" : "stepDefault"}
                data-step-id="step3"
                onClick={() => handleStepClick(3)}
              >
                <ListItemAvatar>
                  {step3Complete ? (
                    <Avatar>
                      <img src={GreenCheckIcon} />
                    </Avatar>
                  ) : (
                    <Avatar>
                      <Typography variant="span" component="span">
                        03
                      </Typography>
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText primary="Eligibility Details" />
              </ListItem>
              <ListItem className="arrowIndicator">
                <img className="mt-2" src={ArrowDefault} />
              </ListItem>
              <ListItem className="stepDefault" data-step-id="step4" onClick={() => handleStepClick(4)}>
                <ListItemAvatar>
                  <Avatar>
                    <Typography variant="span" component="span">
                      04
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Submit" />
              </ListItem>
            </List>
          </Box>
        </Paper>
      ) : (
        <Paper component="div" variant="div" className="content__wrapper--header basic__card">
          <Typography component="div" variant="div" className="header__wrapper--title">
            <Typography component="h4" variant="h4">
              Patient Management
              <Stack gap={2}>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                  className="breadcrumb__wrapper"
                >
                  <Link key="1" to="/patientManagement">
                    Patient Overview
                  </Link>
                  {/* <Link key="2" to="/createOrder">
                    Create Order
                  </Link> */}
                  {paramValue != null ? (
                    <Typography key="2">Add Patient</Typography>
                  ) : (
                    <Typography key="2">Create Order</Typography>
                  )}
                </Breadcrumbs>
              </Stack>
            </Typography>
          </Typography>
          <Box className="stepProcess__wrapper">
            <List className="stepProcess__wrapper--steps">
              <ListItem className="stepDefault" data-step-id="step1">
                <ListItemAvatar>
                  <Avatar>
                    <Typography variant="span" component="span">
                      01
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="add-patient-titles" primary="Personal Details" />
              </ListItem>
              <ListItem className="arrowIndicator">
                <img src={ArrowDefault} className="arrow-style" />
              </ListItem>
              <ListItem className="stepDefault" data-step-id="step2">
                <ListItemAvatar>
                  <Avatar>
                    <Typography variant="span" component="span">
                      02
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="add-patient-titles" primary="Identity Details" />
              </ListItem>
              <ListItem className="arrowIndicator">
                <img src={ArrowActive} className="arrow-style" />
              </ListItem>
              <ListItem className="stepDefault" data-step-id="step3">
                <ListItemAvatar>
                  <Avatar>
                    <Typography variant="span" component="span">
                      03
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="stepper--titles" primary="Insurance & Guarantor Details" />
              </ListItem>
              <ListItem className="arrowIndicator">
                <img src={ArrowDefault} className="arrow-style" />
              </ListItem>
              <ListItem className="stepDefault" data-step-id="step4">
                <ListItemAvatar>
                  <Avatar>
                    <Typography variant="span" component="span">
                      04
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="add-patient-titles" primary="Caregiver Details" />
              </ListItem>
            </List>
          </Box>
        </Paper>
      )}
      <Paper className="content__wrapper--view content__new_patient basic__card">
        {pathname?.split("/")[1] === tntPatientSearch ? (
          <PatientSearch selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />
        ) : (
          // pathname?.split("/")[1] === tntCreateOrder?.split("/")[0]  && (
          <CreateOrderData
            setStep1Complete={setStep1Complete}
            setStep2Complete={setStep2Complete}
            setStep3Complete={setStep3Complete}
          />
          // )
        )}
      </Paper>
    </Box>
  );
};

export default CreateOrder;
