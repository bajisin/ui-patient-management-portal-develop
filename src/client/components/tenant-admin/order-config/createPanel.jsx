import { Box, Button, FormControl, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createPanel, duplicateCheck, getPanelList, getTestList } from "@redux/slices/ordertemplateSlice";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId, paginationPayload } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { IdvTestDropDown } from "./order-config-tab/ind-test-dropdown";
import Modal from "@mui/material/Modal";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import useDebounce from "@utils/useDebounce";

const CreatePanel = ({ setOpen, open }) => {
  const [testPanel, setTestPanel] = useState("");
  const [testPanelErr, setTestPanelErr] = useState("");
  const [cptCode, setCptCode] = useState("");
  const [cptCodeErr, setCptCodeErr] = useState("");
  const [tests, setTests] = useState([]);
  const [panelsErr, setPanelsErr] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const debounceVal = useDebounce(testPanel, 1000);

  useEffect(() => {
    if (debounceVal !== "") dispatch(duplicateCheck(debounceVal));
  }, [debounceVal]);
  const dispatch = useDispatch();

  // const { popupMessage, showSuccessPopup } = useSelector((state) => state.orders);
  const [existingPanelNames, setExistingPanelNames] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const { panelList } = useSelector((state) => state.orders);

  const [sortOrder, setSortOrder] = useState("");
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    // Fetch data from the local JSON API
    const payload = {
      ...paginationPayload({ pagination, sortKey: "testName", sortOrder, searchVal }),
      roleId: getLoggedInUserRoleId(),
      tenantId: getTenantId(),
      testIds: [],
      panelIds: []
    };

    dispatch(getTestList(payload));

    const fetchedPanelNames = dispatch(
      getPanelList({
        pageNo: 0,
        pageSize: 99999,
        searchValue: "",
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        roleId: getLoggedInUserRoleId(),
        tenantId: getTenantId(),
        testIds: [],
        panelIds: [],
        testCategoryId: [1]
      })
    );
    setExistingPanelNames(panelList.panelName);
  }, []);

  const { panelDuplicateCheck } = useSelector((state) => state.orders);

  const handleClose = () => {
    setShowSuccessPopup(false);
    setPopupMessage("");
    setOpen(false);
  };
  const validateForm = () => {
    let valid = true;
    // if (testPanel.trim() === "") {
    //   valid = false;
    //   setTestPanelErr("This field is required");
    // } else if (testPanel.length > 100) {
    //   setTestPanelErr("Text should not exceed 100 characters");
    //   valid = false;
    // } else setTestPanelErr("");
    if (testPanel.trim() === "") {
      valid = false;
      setTestPanelErr("This field is required");
    } else if (testPanel.length > 100) {
      setTestPanelErr("Text should not exceed 100 characters");
      valid = false;
    } else if (panelDuplicateCheck?.length > 0) {
      setTestPanelErr("Panel name already exists");
      valid = false;
    } else {
      setTestPanelErr("");
    }
    // Validate other fields as before
    // if (cptCode.trim() === "") {
    //   valid = false;
    //   setCptCodeErr("This field is required");
    // } else {
    //   setCptCodeErr("");
    // }

    if (tests.length === 0) {
      valid = false;
      setPanelsErr("This field is required");
    } else {
      setPanelsErr("");
    }

    return valid;
  };
  const handleSubmit = async () => {
    const panelDTO = tests.map((p) => ({ testCompendiumId: p?.testCompendiumId }));
    const payload = {
      panelDescription: testPanel,
      cptCodes: cptCode,
      createdBy: getLoggedInUserId(),
      roleId: getLoggedInUserRoleId(),
      panelTestMasterDTO: panelDTO
    };

    if (validateForm()) {
      let action;
      if (createPanel.fulfilled) {
        action = await dispatch(createPanel(payload));
        setShowSuccessPopup(true);
        setPopupMessage(action.payload);
      }
    }
    showSuccessPopup(false);
  };

  return (
    <>
      <Dialog
        aria-labelledby="Create Panel"
        open={open}
        enableResize={true}
        className="commonModal__wrapper createPanel__wrapper"
      >
        <form>
          <Box className="commonModal__wrapper--dialog">
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
            <DialogTitle>Create Panel</DialogTitle>
            <DialogContent>
              <Box className="formcontrol__wrapper">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="label" component="label" className="add__label required">
                      Test Panel Name
                    </Typography>
                    <TextField
                      variant="outlined"
                      className="add__input"
                      placeholder="Test Name"
                      value={testPanel}
                      onChange={(e) => {
                        setTestPanel(e.target.value);
                        if (e.target.value.length > 100) {
                          setTestPanelErr("Text should not exceed 100 characters");
                        } else {
                          setTestPanelErr("");
                        }
                      }}
                      error={testPanelErr !== ""}
                      helperText={testPanelErr}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} className="select_test">
                    <Typography variant="label" component="label" className="add__label required">
                      Select Tests
                    </Typography>
                    <FormControl className="w-100" error={Boolean(setPanelsErr)}>
                      <IdvTestDropDown setTests={setTests} tests={tests} />
                      <FormHelperText>{panelsErr}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label">
                      CPT Codes
                    </Typography>
                    <TextField
                      variant="outlined"
                      className="add__input"
                      placeholder="CPT Code"
                      value={cptCode}
                      onChange={(e) => setCptCode(e.target.value)}
                      // error={Boolean(cptCodeErr)}
                      // helperText={cptCodeErr}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" autoFocus className="primary-btn" onClick={handleSubmit}>
                Create Panel
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
      {showSuccessPopup && (
        <Modal
          open={showSuccessPopup}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Successfully Created
            </Typography>
            <Typography id="modal-modal-description" className="modal-modal-description" variant="p" component="p">
              {popupMessage}
            </Typography>
            <Button
              variant="contained"
              onClick={handleClose}
              component="Button"
              className="primary-btn float-right mt-3"
            >
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CreatePanel;
