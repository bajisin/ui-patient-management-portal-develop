import {
  Checkbox,
  FormControl,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from "@mui/material";

import React from "react";

function MultiSelect({ multiSelectedErr, selected, setSelected, broadCastOptions }) {
  const isAllSelected = broadCastOptions.length > 0 && selected.length === broadCastOptions.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === broadCastOptions.length ? [] : broadCastOptions.map((bc) => bc));
      return;
    }
    setSelected(value);
  };

  return (
    <>
      <Typography variant="label" component="label" className="add__label required">
        Tenants
      </Typography>
      <FormControl className="w-100 multiselect--scroll" error={Boolean(multiSelectedErr)}>
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          renderValue={(selected) => (
            <Typography component="div" className="overflow--text pe-0">
              {selected?.map((value) => (
                <span key={value}>{`${value.tenantName} `}</span>
              ))}
            </Typography>
          )}
        >
          <MenuItem value="all">
            <ListItemIcon>
              <Checkbox
                style={{ padding: 1, marginRight: 8 }}
                checked={isAllSelected}
                indeterminate={selected.length > 0 && selected.length < broadCastOptions.length}
              />
            </ListItemIcon>
            <ListItemText primary="Select All" />
          </MenuItem>
          {broadCastOptions.map((option) => (
            <MenuItem key={option.tenantId} value={option}>
              <Checkbox
                checked={selected.some((item) => item.tenantId === option.tenantId)}
                style={{ padding: 1, marginRight: 8 }}
              />
              {option.tenantName}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{multiSelectedErr}</FormHelperText>
      </FormControl>
    </>
  );
}

export default MultiSelect;
