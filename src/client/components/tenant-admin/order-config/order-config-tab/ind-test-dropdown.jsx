import { Autocomplete, Checkbox, FormControl, TextField } from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import React from "react";
import { useSelector } from "react-redux";

/**
 * @author
 * @function IdvTestDropDown
 **/

export const IdvTestDropDown = ({ tests, setTests }) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { idvTestList } = useSelector((state) => state.orders);
  const handleCheckboxChange = (option) => {
    if (tests.some((test) => test.testId === option.testId)) {
      // Option is already selected, so remove it
      setTests(tests.filter((test) => test.testId !== option.testId));
    } else {
      // Option is not selected, so add it
      setTests([...tests, option]);
    }
  };
  return (
    <FormControl className="w-100 common_checkbox_selection">
      <Autocomplete
        className="permissions--tag"
        multiple
        limitTags={1}
        id="panelIndividualTest"
        options={idvTestList}
        disableCloseOnSelect
        getOptionLabel={(option) => option.testName}
        value={tests}
        onChange={(e, newVal) => setTests(newVal)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ padding: 1, marginRight: 8 }}
              checked={selected || (tests && tests.some((test) => test.testId === option.testId))}
              onChange={() => {
                handleCheckboxChange(option);
              }}
            />
            {option.testName}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="" placeholder={tests.length > 0 ? "" : "Tests"} />}
      />
    </FormControl>
    // </Grid>
  );
};
