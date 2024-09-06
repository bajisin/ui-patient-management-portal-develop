import { Box, Button, Grid, Typography } from "@mui/material";
import { Payer, Test } from "../../../_helpers/constants";
import React, { useState } from "react";

import { CompendiumPopUp } from "./compendiumspopup";
import CompendiumTabs from "@components/compendiums/compendiumTabs";

export default function Compendium() {
  const [currentTab, setCurrentTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const getCurrentTabState = (value) => {
    setCurrentTab(value);
  };
  const handleTestOpenPopup = () => {
    setOpen(true);
    setTitle("Test Compendium");
  };
  const handlePayerOpenPopup = () => {
    setOpen(true);
    setTitle("Payer Compendium");
  };
  // Define a function to handle closing the popup
  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Compendiums
            <Typography component="span" variant="span">
              Get an overview of tests and insurance companies
            </Typography>
          </Typography>
          <Typography>
            {currentTab === 0 && Test && Test?.createInd === true ? (
              <Button
                component="button"
                variant="outlined"
                className="primary-btn ms-2"
                onClick={() => handleTestOpenPopup()}
              >
                Add Test Compendium
              </Button>
            ) : currentTab !== 0 && Payer && Payer?.createInd === true ? (
              <Button
                component="button"
                variant="outlined"
                className="primary-btn ms-2"
                onClick={() => handlePayerOpenPopup()}
              >
                Add Payer Compendium
              </Button>
            ) : null}
          </Typography>
        </Typography>
        <Box className="order-config-section">
          <Grid container rowSpacing={2} className="content__wrapper--view">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__view">
                <CompendiumTabs getCurrentTabState={getCurrentTabState} currentTab={currentTab} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {open && (
        <CompendiumPopUp
          currentTab={currentTab}
          open={open}
          title={title}
          setOpen={setOpen}
          // Pass any necessary props to the CompendiumPopUp component
        />
      )}
    </>
  );
}
