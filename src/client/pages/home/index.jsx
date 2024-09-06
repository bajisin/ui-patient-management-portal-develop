import { Box, Card, Grid, Popover, Typography } from "@mui/material";
import React, { useState } from "react";

import AdvanceFilter from "../../components/advance-filter/index";
import Notification from "../notifications";
import SearchComponent from "../../components/search/index";
import Tab from "../../components/patient-portal/tab";
import noNotifications from "@assets/images/ls_svg/patient-management/noNotifications.svg";

const Home = () => {
  const [listView, setListView] = React.useState(false);
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const [searchVal, setSearchVal] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const updateSearch = (value) => {
    setSearchVal(value);
  };
  const [filterOpen, setFilterOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box className="home__wrapper">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
        <Grid item xs={12} sm={12} md={8} lg={9} className="title__wrapper--left">
          <Card className="basic__card mb-3">
            <Typography variant="h5" component="h5" className="section_title">
              Hello, {userDetails.firstName}
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              {"Have a nice day and don't forget to take of your health"}
            </Typography>
          </Card>

          <Card className="basic__card order_details">
            <Box className="title__wrapper mb-3">
              <Box className="title__wrapper--left">
                <Typography variant="h5" component="h5" className="section_title">
                  Order Details
                </Typography>
                <Typography variant="span" component="span" className="overview_text">
                  Get an overview of all the orders
                </Typography>
              </Box>
              <Box className="title__wrapper--right d-flex gap20">
                <Box className="icons-separted">
                  {/* <Typography
                    onClick={() => handleFilter()}
                    component="span"
                    variant="span"
                    className="ls-advance-filter advance__filter-wrapper me-0"
                  ></Typography> */}
                  <>
                    <Typography
                      onClick={handleClick}
                      aria-describedby={id}
                      component="span"
                      variant="span"
                      className="ls-advance-filter advance__filter-wrapper"
                    ></Typography>
                    <div>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        onClick={handleFilter}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right"
                        }}
                      >
                        <Typography sx={{ p: 2 }} className="advance-filter--popover">
                          <AdvanceFilter
                            setFilterOpen={setFilterOpen}
                            filterOpen={filterOpen}
                            filteredData={filteredData}
                            setFilteredData={setFilteredData}
                            selectedDateRange={selectedDateRange}
                            setSelectedDateRange={setSelectedDateRange}
                            start={start}
                            setStart={setStart}
                            end={end}
                            setEnd={setEnd}
                            setCustomPickerOpen={setCustomPickerOpen}
                            customPickerOpen={customPickerOpen}
                          />
                        </Typography>
                      </Popover>
                    </div>
                  </>
                </Box>
                <SearchComponent updateSearch={updateSearch} />
                {/* <ToggleComponent setListView={setListView} listView={listView} /> */}
                {/* <ToggleComponent setListView={setListView} listView={listView} /> */}
              </Box>
            </Box>
            <Tab
              listView={listView}
              searchVal={searchVal}
              filteredData={filteredData}
              setFilteredData={setFilteredData}
            />
          </Card>
        </Grid>

        {/* Right side section */}
        <Grid item xs={12} sm={12} md={4} lg={3} className="home__wrapper--right">
          {/* <Card className="basic__card calendar_wrapper mb-3"> <Calendar orderData={data} /> </Card> */}
          <Card className="notification_wrapper">
            <Notification className="mb-0" />
            <Box className="noDataAvailable d-none">
              <img src={noNotifications} alt="No Notifications Yet" />
              <Typography component="h4" variant="h4" className="my-3 fs-16">
                No Notifications Yet
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
