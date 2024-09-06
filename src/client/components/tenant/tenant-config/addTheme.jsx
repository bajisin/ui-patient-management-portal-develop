import { Box, FormGroup, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CALLTYPES } from "../../../_helpers/constants";

const AddNewTheme = ({
  primaryColor,
  secondaryColor,
  updateColors,
  selectedTheme,
  localPrimaryColor,
  setLocalPrimaryColor,
  localSecondaryColor,
  setLocalSecondaryColor,
  tenantById,
  callType
}) => {
  const [PrimcolorCode, setPrimColorCode] = useState("");
  const [secColorCode, setSecColorCode] = useState("");

  useEffect(() => {
    if (callType !== CALLTYPES.Edit) {
      setLocalPrimaryColor(selectedTheme?.primMain || primaryColor);
      setLocalSecondaryColor(selectedTheme?.scndryMain || secondaryColor);
    }
  }, [selectedTheme, primaryColor, secondaryColor, callType]);

  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      setLocalPrimaryColor(tenantById?.primMain);
      setLocalSecondaryColor(tenantById?.scndryMain);
    }
  }, [tenantById, callType]);

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
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Typography variant="label" component="label" className="add__label">
          Primary
        </Typography>
        <FormGroup className="add__input--theme flex-row">
          <TextField
            type="color"
            className="add__input"
            value={localPrimaryColor}
            onChange={handlePrimaryColorChange}
          />
          <Typography variant="span" component="span" className="add__input--themeValue">
            {localPrimaryColor}
          </Typography>
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
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
    </>
  );
};

export default AddNewTheme;
