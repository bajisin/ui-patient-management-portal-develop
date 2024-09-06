import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import AboutUs from "./aboutUs";
import { DEV_BASE_URI } from "../../../../../config/api-config";
import FAQ from "./faq";
import Modal from "@mui/material/Modal";
import PrivacyPolicy from "./privacyPolicy";
import PropTypes from "prop-types";
import Settings from "./settings";
import TermsCondition from "./termsConditions";
import axios from "axios";
import { getMasterDetails } from "@redux/slices/masterOverviewClass";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`masterTenant-tabpanel-${index}`}
      aria-labelledby={`masterTenant-tab-${index}`}
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
    id: `masterTenant-tab-${index}`,
    "aria-controls": `masterTenant-tabpanel-${index}`
  };
}

export default function MasterTenantTabComponent() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const fetchData = (data) => {
    // dispatch an action for getusertenants
    dispatch(getMasterDetails(data));
  };

  // const fetchMasterData = (data) => {
  //   // dispatch an action for getPatientTenants
  //   dispatch(getMasterDetails(data));
  // };
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   if (newValue === 3) {
  //     fetchMasterData("patientData");
  //   }
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await axios.get(`${DEV_BASE_URI}/masterUpdateDetails`); // Replace with your JSON URL
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchResponse();
    fetchData("active");
  }, []);
  return (
    <>
      <Box className="tab__wrapper pb-0 w-100">
        <Tabs value={value} onChange={handleChange} aria-label="Master Tenant Details" className="tabs_sections">
          <Tab label="About Us" {...a11yProps(0)} />
          <Tab label="FAQ" {...a11yProps(1)} />
          <Tab label="Privacy Policy" {...a11yProps(2)} />
          <Tab label="Terms & Conditions" {...a11yProps(3)} />
          <Tab label="Settings" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box className="list__header px-3 pb-3">
          <Typography component="h5" variant="h5">
            Update About Us
          </Typography>
          <Stack direction="row" gap={2} className="header__wrapper--actions">
            <Button component="button" variant="outlined" className="bordered-icon-btn">
              Add FAQ
            </Button>
            <Button className="bordered-icon-btn edit">
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>

            <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
              Update
            </Button>
          </Stack>
        </Box>
        <Box className="list__view px-3 pb-3">
          <AboutUs />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className="list__header px-3 pb-3">
          <Typography component="h5" variant="h5">
            Update FAQ
          </Typography>
          <Stack direction="row" gap={2} className="header__wrapper--actions">
            <Button className="bordered-icon-btn edit">
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
            <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
              Update
            </Button>
          </Stack>
        </Box>
        <Box className="list__view px-3 pb-3">
          <FAQ />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box className="list__header px-3 pb-3">
          <Typography component="h5" variant="h5">
            Update Privacy Policy
          </Typography>
          <Stack direction="row" gap={2} className="header__wrapper--actions">
            <Button className="bordered-icon-btn edit">
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
            <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
              Update
            </Button>
          </Stack>
        </Box>
        <Box className="list__view px-3 pb-3">
          <PrivacyPolicy />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box className="list__header px-3 pb-3">
          <Typography component="h5" variant="h5">
            Update Terms & Conditions
          </Typography>
          <Stack direction="row" gap={2} className="header__wrapper--actions">
            <Button className="bordered-icon-btn edit">
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
            <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
              Update
            </Button>
          </Stack>
        </Box>
        <Box className="list__view px-3 pb-3">
          <TermsCondition />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Box className="list__header px-3 pb-3">
          <Typography component="h5" variant="h5">
            Update Settings
          </Typography>
          <Stack direction="row" gap={2} className="header__wrapper--actions">
            <Button className="bordered-icon-btn edit">
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
            <Button component="button" variant="contained" className="primary-btn" onClick={handleClickOpen}>
              Update
            </Button>
          </Stack>
        </Box>
        <Box className="list__view px-3 pb-3">
          <Settings />
        </Box>
      </TabPanel>
      {open &&
        data.map((item) => (
          <Modal
            open={open}
            onClose={handleClickClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            key={item.id}
          >
            {/* {data.map((item) => ( */}
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {item.title}
              </Typography>
              <Typography id="modal-modal-description" className="mt-2">
                {item.message}
              </Typography>
              <Button
                variant="contained"
                onClick={handleClickClose}
                component="Button"
                className="primary-btn float mt-3"
              >
                okay
              </Button>
            </Box>
          </Modal>
        ))}
    </>
  );
}
