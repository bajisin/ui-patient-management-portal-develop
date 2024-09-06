import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddNewTheme = ({
  isOpen,
  toggleDrawer,
  setIsOpenAddNewTheme,
  primaryColor,
  secondaryColor,
  updateColors,
  selectedTheme,
  localPrimaryColor,
  setLocalPrimaryColor,
  localSecondaryColor,
  setLocalSecondaryColor
}) => {
  const [PrimcolorCode, setPrimColorCode] = useState("");
  const [secColorCode, setSecColorCode] = useState("");

  useEffect(() => {
    setLocalPrimaryColor(selectedTheme?.primMain || primaryColor);
    setLocalSecondaryColor(selectedTheme?.scndryMain || secondaryColor);
  }, [selectedTheme, primaryColor, secondaryColor]);

  const handlePrimaryColorChange = (event) => {
    handleConfirm();
    const newPrimaryColor = event.target.value;
    setPrimColorCode(newPrimaryColor);
    setLocalPrimaryColor(PrimcolorCode);
  };

  const handleSecondaryColorChange = (event) => {
    const newSecondaryColor = event.target.value;
    setSecColorCode(newSecondaryColor);
    setLocalSecondaryColor(secColorCode);
  };

  const handleConfirm = () => {
    // Call the updateColors function from props to update the colors in the parent component
    const themeObj = {
      primMain: localPrimaryColor,
      scndryMain: localSecondaryColor
    };
    updateColors(themeObj);
    // Close the drawer or perform other actions as needed
    toggleDrawer(false);
    setIsOpenAddNewTheme(false);
  };

  return (
    <Box className="basic__drawer" open={isOpen} onClose={toggleDrawer(false)}>
      <Typography component="div" variant="div" className="common__layout--drawer">
        <Typography component="div" variant="div" className="basic__drawer--header">
          <Box className="drawer--title">
            <Typography component="h5" variant="h5">
              Add New Theme
            </Typography>
          </Box>
        </Typography>
        <Grid container spacing={2} className="mt-1 mb-3">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="label" component="label" className="add__label">
              Primary
            </Typography>
            <Box className="add__input--theme">
              <TextField
                type="color"
                className="add__input"
                value={localPrimaryColor}
                onChange={handlePrimaryColorChange}
              />
              <Typography variant="span" component="span" className="add__input--themeValue">
                {localPrimaryColor}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="label" component="label" className="add__label">
              Secondary
            </Typography>
            <Box className="add__input--theme">
              <TextField
                type="color"
                className="add__input"
                value={localSecondaryColor}
                onChange={handleSecondaryColorChange}
              />
              <Typography variant="span" component="span" className="add__input--themeValue">
                {localSecondaryColor}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export default AddNewTheme;
