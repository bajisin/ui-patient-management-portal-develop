import { Box, Breadcrumbs, Link, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddPatientData from "./addPatient/addPatientData";
import ArrowActive from "@assets/images/ArrowActive.svg";
import ArrowDefault from "@assets/images/ArrowDefault.svg";
import Avatar from "@mui/material/Avatar";
import GreenCheckIcon from "@assets/images/Greencheck_icon.svg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { getRelationList } from "../../../redux/slices/order-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TenantAddPatient = () => {
  const dispatch = useDispatch();
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);
  const [step4Complete, setStep4Complete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRelationList());
  }, []);

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
    <Box className="content__wrapper patientMngmtSteps">
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
                <Typography key="2">Add Patient</Typography>
              </Breadcrumbs>
            </Stack>
          </Typography>
        </Typography>
        <Box className="stepProcess__wrapper">
          <List className="stepProcess__wrapper--steps">
            {!step1Complete ? (
              <ListItem className="stepDefault" data-step-id="step1" onClick={() => handleStepClick(1)}>
                <ListItemAvatar>
                  <Avatar>
                    <Typography variant="span" component="span">
                      01
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="add-patient-titles" primary="Personal Details" />
              </ListItem>
            ) : (
              <ListItem className="stepCompleted" data-step-id="step1" onClick={() => handleStepClick(1)}>
                <ListItemAvatar>
                  <Avatar>
                    <img src={GreenCheckIcon} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="add-patient-titles" primary="Personal Details " />
              </ListItem>
            )}
            <ListItem className="arrowIndicator">
              <img src={step1Complete ? ArrowActive : ArrowDefault} className="arrow-style" />
            </ListItem>
            <ListItem
              className={step1Complete && step2Complete ? "stepCompleted" : "stepDefault"}
              data-step-id="step2"
              onClick={() => handleStepClick(2)}
            >
              <ListItemAvatar>
                {step1Complete && step2Complete ? (
                  <Avatar>
                    <img src={GreenCheckIcon} alt="Completed" />
                  </Avatar>
                ) : (
                  <Avatar>
                    <Typography variant="span" component="span">
                      02
                    </Typography>
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText className="add-patient-titles" primary="Identity Details" />
            </ListItem>
            <ListItem className="arrowIndicator">
              <img src={step2Complete ? ArrowActive : ArrowDefault} className="arrow-style" />
            </ListItem>
            <ListItem
              className={step3Complete ? "stepCompleted" : "stepDefault"}
              data-step-id="step3"
              onClick={() => handleStepClick(3)}
            >
              <ListItemAvatar>
                {!step3Complete ? (
                  <Avatar>
                    <Typography variant="span" component="span">
                      03
                    </Typography>
                  </Avatar>
                ) : (
                  <ListItemAvatar>
                    <Avatar>
                      <img src={GreenCheckIcon} />
                    </Avatar>
                  </ListItemAvatar>
                )}
              </ListItemAvatar>
              <ListItemText primary="Insurance & Guarantor Detail" />
            </ListItem>
            <ListItem className="arrowIndicator">
              <img src={step3Complete ? ArrowActive : ArrowDefault} className="arrow-style" />
            </ListItem>
            <ListItem className={step4Complete ? "stepCompleted" : "stepDefault"} onClick={() => handleStepClick(4)}>
              <ListItemAvatar>
                {!step4Complete ? (
                  <Avatar>
                    <Typography variant="span" component="span">
                      04
                    </Typography>
                  </Avatar>
                ) : (
                  <Avatar>
                    <img src={GreenCheckIcon} />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText className="add-patient-titles" primary="Caregiver Details" />
            </ListItem>
          </List>
        </Box>
      </Paper>
      <Paper className="content__wrapper--view basic__card">
        <AddPatientData
          setStep1Complete={setStep1Complete}
          setStep2Complete={setStep2Complete}
          setStep3Complete={setStep3Complete}
          setStep4Complete={setStep4Complete}
          step1Complete={step1Complete}
          step2Complete={step2Complete}
          step3Complete={step3Complete}
        />
      </Paper>
    </Box>
  );
};

export default TenantAddPatient;
