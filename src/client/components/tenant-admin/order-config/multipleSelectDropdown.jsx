import React, { useState } from "react";
import { MenuItem, Select, FormControl, Stack, Chip, Box } from "@mui/material";
import CloseIcon from "../../../assets/images/svg/crossbtn.svg";

const names = ["UDRUG", "PMEUMOSP", "CTGPU", "BASIC", "GPI"];

export default function MultiSelectDropdown() {
  const [selectedNames, setSelectedNames] = useState([]);
  return (
    <Box className="multiple__select-wrapper">
      <FormControl className="m-1" sx={{ width: 500 }}>
        <Select
          multiple
          value={selectedNames}
          onChange={(e) => setSelectedNames(e.target.value)}
          renderValue={(selected) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((value) => (
                <>
                  <Chip key={value} label={value}>
                    <img src={CloseIcon} alt="close"></img>
                  </Chip>
                </>
              ))}
            </Stack>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
