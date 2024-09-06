import { Autocomplete, Checkbox, FormControl, TextField } from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import React from "react";
import { useSelector } from "react-redux";

/**
 * @author
 * @function PanelDropDown
 **/

export const PanelDropDown = ({ panels, setPanels }) => {
  const { panelList } = useSelector((state) => state.orders);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const newArray = panelList.filter((obj, index, self) => index === self.findIndex((o) => o.panelId === obj.panelId));
  const handleCheckboxChange = (option) => {
    if (panels.some((panel) => panel.panelId === option.panelId)) {
      // Option is already selected, so remove it
      setPanels(panels.filter((panel) => panel.panelId !== option.panelId));
    } else {
      // Option is not selected, so add it
      setPanels([...panels, option]);
    }
  };
  return (
    <FormControl className="w-100 common_checkbox_selection">
      <Autocomplete
        className="permissions--tag"
        multiple
        limitTags={1}
        id="panelIndividualTest"
        options={newArray}
        disableCloseOnSelect
        getOptionLabel={(option) => option.panelName}
        value={panels}
        onChange={(e, newVal) => setPanels(newVal)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ padding: 1, marginRight: 8 }}
              checked={selected || (panels && panels?.some((panel) => panel.panelId === option.panelId))}
              onChange={() => handleCheckboxChange(option)}
            />
            {option.panelName}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="" placeholder={panels?.length > 0 ? "" : "Panels"} />}
      />
    </FormControl>
  );
};
