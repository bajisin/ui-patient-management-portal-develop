import { Box, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect } from "react";

import GridViewIcon from "@mui/icons-material/GridView";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

export default function ToggleComponent({ listView, setListView }) {
  const [alignment, setAlignment] = React.useState("left");

  useEffect(() => {
    setListView(!listView);
  }, [alignment]);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box>
      <ToggleButtonGroup
        className="toggle__buttons"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton className="toggle__buttons--left" value="left" aria-label="left aligned">
          <MenuIcon />
          <Typography className="list_name">List View</Typography>
        </ToggleButton>

        <ToggleButton className="toggle__buttons--right" value="justify" aria-label="justified">
          <GridViewIcon />
          <Typography className="grid_name">Grid View</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleComponent.propTypes = {
  setListView: PropTypes.func,
  listView: PropTypes.bool
};
