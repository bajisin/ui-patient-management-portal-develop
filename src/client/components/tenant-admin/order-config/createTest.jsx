import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import UploadIcon from "@assets/images/ls_svg/ocrUploadIcon.svg";
import axios from "axios";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";

const CreateTest = ({ setTest, test }) => {
  const [TestPanel, setTestPanel] = useState("");
  const [Diagnosticcode, setDiagnosticcode] = useState("");
  const [TestPanelName, setTestPanelName] = useState("");
  const [Description, setDescription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [file, setFile] = useState([]);

  const handleClose = () => {
    setTest(false);
    setOpen(false);
  };
  useEffect(() => {
    // Fetch data from the local JSON API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/orderConfigurationDiagnositicCode"); // Replace with the actual path to your data.json
        setDropdownOptions(response.data);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };
    fetchData();
  }, []);
  const handleSubmit = () => {
    const data = {
      TestPanel,
      Diagnosticcode,
      TestPanelName,
      Description
    };

    // POST the data to the JSON API URL
    axios
      .post(" http://localhost:3030/orderConfigurationCreateTest", data)
      .then((response) => {
        console.log("Data successfully saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
    setOpen(true);
  };

  const handleFileChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  return (
    <>
      <Dialog
        aria-labelledby="Add Tenants"
        open={test}
        enableResize={true}
        className="commonModal__wrapper createTest__wrapper"
      >
        <IconButton aria-label="close" onClick={handleClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <Box className="commonModal__wrapper--dialog">
          <DialogTitle>Add Test Compendium</DialogTitle>
          <form>
            <DialogContent>
              <Box mt={3} className="formcontrol__wrapper">
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="label" component="label" className="add__label">
                      Upload OCR Document
                    </Typography>
                    <Typography component="div" variant="div" className="upload__logo">
                      <Box className="upload__logo--content">
                        <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: "none" }} />
                        <img onClick={handleClick} src={UploadIcon} alt="Upload Logo" />
                        <Typography component="div" variant="div" className="m-4">
                          <Typography component="p" variant="p" className="dragDrop_title">
                            Drag and drop files to uploador you can select file by
                            <Link href="#" className="clickHere p-1">
                              Clicking here
                            </Link>
                          </Typography>
                          <Typography component="p" variant="p" className="support_files">
                            Supported files : AI, PSD, PDF
                          </Typography>
                        </Typography>
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
                {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label">
                    Test Panel Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    className="add__input"
                    placeholder="Enter test Name"
                    value={TestPanel}
                    onChange={(e) => setTestPanel(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label">
                    Diagnostic code
                  </Typography>

                  <FormControl className="w-100">
                    <Select
                      className="add__select"
                      placeholder="Select the preferred diagnostic code"
                      value={Diagnosticcode}
                      onChange={(e) => setDiagnosticcode(e.target.value)}
                    >
                      {dropdownOptions.map((item) => (
                        // <option key={item.value} value={item.value}>
                        //   {item.label}
                        // </option>
                        <MenuItem key={item.id} value={item}>
                          {" "}
                          {item.Diagnosticcode}
                        </MenuItem>
                        // <MenuItem value="code2">{item.label}</MenuItem>
                        // <MenuItem value="code3">{item.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label">
                    Test Panel Name
                  </Typography>
                  <FormControl className="w-100">
                    <Select
                      className="add__select"
                      placeholder="Select the preferred diagnostic code"
                      value={TestPanelName}
                      onChange={(e) => setTestPanelName(e.target.value)}
                    >
                      {dropdownOptions.map((option) => (
                        <MenuItem key={option.id} value={option}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="label" component="label" className="add__label">
                    Description
                  </Typography>
                  <TextField
                    className="description__wrapper"
                    rows={5}
                    placeholder="State"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></TextField>
                </Grid>
              </Grid> */}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" className="primary-btn" onClick={handleSubmit}>
                Upload
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="success_modal">
          <img src={checkmarkSuccess} className="successImg modal-success-icon" />
          <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
            successfully Created
          </Typography>
          <Typography id="modal-modal-description" className="modal-modal-description" variant="p" component="p">
            Test has been successfully created
          </Typography>
          <Button variant="contained" onClick={handleClose} component="Button" className="primary-btn float-right mt-3">
            okay
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTest;
