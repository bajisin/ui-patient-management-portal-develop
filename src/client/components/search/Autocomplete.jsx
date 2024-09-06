import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

export default function ComboBox({ tenantById, onClick, onChange }) {
  const { tenantUsers } = useSelector((state) => state.tenants);
  const { control } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    onChange();
  }, []);
  return (
    <Controller
      control={control}
      name={"spoc"}
      render={({ field }) => (
        <Autocomplete
          className="customAutocomplete__input mb-2"
          disablePortal
          id="combo-box-demo"
          options={tenantUsers}
          getOptionLabel={(option) => option?.userEmail} // Define how to display option labels
          renderOption={(props, option, { selected }) => (
            <li {...props}>{`${option?.userFirstName} ${option?.userLastName}`}</li>
          )}
          renderInput={(params) => <TextField {...params} label="" value={tenantById?.emailAddress} />}
          onChange={(newValue) => {
            onClick && onClick(newValue);
          }}
        />
      )}
    />
  );
}
