import Box from "@mui/material/Box";
import OrderList from "./orderList";
import PropTypes from "prop-types";
import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

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

export default function OrderDetailsTabComponent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="order details tabs" className="tabs_sections">
          <Tab label="Order Details" {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OrderList />
      </TabPanel>
    </>
  );
}
