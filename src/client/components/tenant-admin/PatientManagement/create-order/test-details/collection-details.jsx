import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import dayjs from "dayjs";

/**
 * @author
 * @function CollectionDetails
 **/

export const CollectionDetails = ({
  collectedBy,
  collectionDate,
  toggleCollection,
  setCollectedBy,
  setCollectionDate,
  setToggleCollection,
  setCollectedTime,
  collectedTime,
  bill,
  setBill,
  paymentTypes
}) => {
  return (
    <>
      <Box className="collectionDetailsToggle">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography component="h6" variant="h6">
            Add Collection Details
          </Typography>
          {/* <AntSwitch defaultChecked /> */}
          <Typography component="label" className="switch theme-switch" for="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              checked={toggleCollection}
              onChange={() => setToggleCollection(!toggleCollection)}
            />
            <Typography component="div" className="slider round"></Typography>
          </Typography>
        </Stack>
        {/* <Typography variant="p" component="p" className="w-100 mt-1 mb-3">
        Note: Collection will be only for Draw Orders.
      </Typography> */}
        {toggleCollection && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Date
                </Typography>
                <FormControl className="w-100">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(collectionDate)}
                      onChange={(date) => setCollectedTime(dayjs(date))}
                      className="w-100 datetimepicker-control"
                      minDate={dayjs()}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Time
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    className="datetimepicker-control timePickerIcon w-100"
                    value={dayjs(collectedTime)}
                    onChange={(newValue) => setCollectedTime(newValue)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Typography variant="label" component="label" className="add__label">
                  Collected By
                </Typography>
                <FormControl className="w-100">
                  <TextField
                    className="add__input"
                    value={collectedBy}
                    onChange={(e) => setCollectedBy(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* <Typography variant="p" component="p" className="w-100 mt-2">
              Note: Samples will be collected only for tests that require them and will be taken from the provided
              communication address.
            </Typography> */}
          </>
        )}
        <RadioGroup
          aria-labelledby=""
          value={bill}
          name="radio-buttons-group"
          onChange={(e) => {
            setBill(e.target.defaultValue);
          }}
          className="theme__wrapper d-block"
        >
          {paymentTypes.map((paymentType) => (
            <FormControlLabel
              key={paymentType.id}
              value={paymentType.id}
              control={<Radio />}
              label={paymentType.paymentType}
            />
          ))}
        </RadioGroup>
      </Box>
    </>
  );
};
