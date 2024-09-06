import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";

import SearchComponent from "../../../components/search";
import { useNavigate } from "react-router-dom";

export default function ChildOrderConfigTab() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checked, setChecked] = React.useState([0]);
  const [open, setOpen] = React.useState(false);
  const [panelTest, setpanelTest] = useState([]);
  const [individualTest, setindividualTest] = useState([]);
  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // Fetch checkbox data from the local JSON API
      try {
        const response = await fetch("http://localhost:3030/orderConfiguration");
        const data = await response.json();
        setpanelTest(data.panelTest);
        setindividualTest(data.individualTest);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleSearch1Change = (e) => {
    setSearchQuery1(e.target.value);
  };

  const handleSearch2Change = (e) => {
    setSearchQuery2(e.target.value);
  };
  const handleSubmit = () => {
    // Prepare the data object to be sent to the JSON API URL
    const selectedCheckbox1Items = panelTest.filter((item) => item.checked);
    const uncheckedCheckbox1Items = panelTest.filter((item) => !item.checked);

    const selectedCheckbox2Items = individualTest.filter((item) => item.checked);
    const uncheckedCheckbox2Items = individualTest.filter((item) => !item.checked);
    navigate("/tnt-Selected-Items", {
      state: {
        selectedCheckbox1Items,
        uncheckedCheckbox1Items,
        selectedCheckbox2Items,
        uncheckedCheckbox2Items
      }
    });
    const data = {
      panelTest: panelTest.filter((item) => item.checked),
      individualTest: individualTest.filter((item) => item.checked),
      searchQuery1,
      searchQuery2
    };

    // POST the data to the JSON API URL
    // Replace 'http://localhost:8000/api/submit-data' with your actual API endpoint
    fetch(" http://localhost:3030/orderConfigurationSubmitData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data successfully submitted:", data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };
  const handleCheckbox1Change = (id) => {
    setpanelTest((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const handleCheckbox2Change = (id) => {
    setindividualTest((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <>
      <Box className="child__order_config_tab">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} className="panel_test">
            <Typography component="h6" variant="h6">
              Panel Test
            </Typography>
            <Card className="panel-card">
              <SearchComponent />
              <List className="w-100" sx={{ maxWidth: 360 }}>
                {/* {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-label-${value}`; */}
                {/* return ( */}
                <>
                  {panelTest.map((item) => (
                    <ListItem
                      // key={value}
                      key={item.id}
                      // secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                      // disablePadding
                    >
                      <ListItemButton role={undefined} onClick={() => handleCheckbox1Change(item.id)} dense>
                        {/* <ListItemIcon> */}
                        {/* <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            /> */}
                        {/* <Checkbox
                        checked={item.checked || false}
                        onChange={(e) =>
                          setpanelTest((prevData) =>
                            prevData.map((i) => (i.id === item.id ? { ...i, checked: e.target.checked } : i))
                          )
                        }
                      /> */}
                        <Checkbox checked={item.checked} />
                        {/* </ListItemIcon> */}
                        {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </>
                {/* ); */}
                {/* })} */}
              </List>
              {/* <TextField
                label="Search Checkbox Group 1"
                value={searchQuery1}
                onChange={(e) => setSearchQuery1(e.target.value)}
              /> */}
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} className="individual_test">
            <Typography component="h6" variant="h6">
              Individual Tests
            </Typography>
            <Card className="individual-card">
              <SearchComponent />
              <List className="w-100" sx={{ maxWidth: 360 }}>
                {/* {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-label-${value}`;
                  return ( */}
                <>
                  {individualTest.map((item) => (
                    <ListItem
                      // key={value}
                      key={item.id}
                      // secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}
                      // disablePadding
                    >
                      <ListItemButton role={undefined} onClick={() => handleCheckbox2Change(item.id)} dense>
                        {/* <ListItemIcon> */}
                        {/* <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            /> */}
                        {/* <Checkbox
                        checked={item.checked || false}
                        onChange={(e) =>
                          setindividualTest((prevData) =>
                            prevData.map((i) => (i.id === item.id ? { ...i, checked: e.target.checked } : i))
                          )
                        }
                      /> */}
                        <Checkbox checked={item.checked} />
                        {/* </ListItemIcon> */}
                        {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </>
                {/* ); */}
                {/* })} */}
              </List>
              {/* <TextField
                label="Search Checkbox Group 2"
                value={searchQuery2}
                onChange={(e) => setSearchQuery2(e.target.value)}
              /> */}
            </Card>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
}
