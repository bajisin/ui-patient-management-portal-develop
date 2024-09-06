import { Autocomplete, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";

import AddNewPatientImage from "@assets/images/svg/AddNewPatient.svg";
import Loader from "@utils/Loader";
import PatientManagementTable from "../patientManagementTable";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * @author
 * @function PatientSearch
 **/

export const PatientSearch = ({ selectedPatient, setSelectedPatient }) => {
  const { patientsList, loading } = useSelector((state) => state.tenants);
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={12} md={8} lg={8} className="position-relative">
      <Divider orientation="vertical" variant="middle" flexItem className="vertical--divider" />
      <Typography variant="h6" component="h6" className="w-100">
        Patient
      </Typography>
      <Autocomplete
        className="customAutocomplete__input mb-2"
        disablePortal
        // id="combo-box-demo"
        freeSolo={true}
        options={patientsList} // Use the modified options array
        value={selectedPatient}
        getOptionLabel={(option) => (option?.firstName ? `${option?.firstName} ${option?.lastName}` : selectedPatient)} // Define how to display option labels
        renderOption={(props, option, { selected }) => <li {...props}>{`${option?.firstName} ${option?.lastName}`}</li>}
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            placeholder="Search for a patient"
            // Display the custom value if it exists
            value={selectedPatient && selectedPatient?.name}
          />
        )}
        onChange={(event, newValue) => {
          // Check if the user selected an option or entered a custom name
          if (newValue && newValue.inputValue) {
            setSelectedPatient({ name: newValue.inputValue }); // Set the custom name
          } else {
            setSelectedPatient(newValue);
          }
        }}
      />
      {selectedPatient && (
        <>
          <Typography variant="h6" component="h6" className="w-100 mt-3">
            Search Results
          </Typography>
          {loading ? (
            <Loader />
          ) : (
            <>
              {patientsList.length > 0 ? (
                <Box className="list__view">
                  <PatientManagementTable />
                  <Button
                    component="button"
                    variant="outlined"
                    className="primary-outline-btn mt-3"
                    onClick={() => {
                      navigate(`/addPatient`);
                    }}
                  >
                    Add New Patient
                  </Button>
                </Box>
              ) : (
                <Box className="list__view">
                  <Typography component="div" variant="div" className="addNewPatient__wrapper">
                    <img src={AddNewPatientImage} alt="Add New Patient" />
                    <Typography component="label" variant="label">
                      This patient is not available in the data base you can add a new patient by clicking
                      <Typography component="b" variant="b">
                        &nbsp; Add New Patient
                      </Typography>{" "}
                      &nbsp; button
                    </Typography>
                    <Button
                      component="button"
                      variant="outlined"
                      className="primary-outline-btn mt-3"
                      onClick={() => {
                        navigate(`/addPatient`);
                      }}
                    >
                      Add New Patient
                    </Button>
                  </Typography>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Grid>
  );
};
