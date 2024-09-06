import { Autocomplete, Box, Button, Checkbox, FormControl, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import { dsr } from "../../../../../_helpers/constants";
import { useSelector } from "react-redux";

function SetReccurence({
  open,
  setOpen,
  recurring,
  setrecurring,
  setrecurringEventRepeats,
  recurringEventRepeats,
  labDays,
  setLabDays,
  setRecurranceRequestsFor,
  recurranceRequestsFor,
  recurringStartDate,
  recurringEndDate,
  setrecurringStartDate,
  setrecurringEndDate
}) {
  const handleClose = () => {
    setOpen(false);
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { frequency, labDaysByFacility } = useSelector((state) => state.createOrder);
  const week = [
    { id: 1, day: "First" },
    { id: 2, day: "Second" },
    { id: 3, day: "Third" },
    { id: 4, day: "Forth" }
  ];

  const { orderDetailsById } = useSelector((state) => state.tenants);
  const searchParams = new URLSearchParams(location.search);
  const param = searchParams.get("param");
  useEffect(() => {
    if (Object.keys(orderDetailsById).length > 0) {
      if (Object.keys(orderDetailsById?.orderRecurringDto)?.length > 0) {
        const keyArray = Object.keys(orderDetailsById.orderRecurringDto);
        let arrayForCurrentKey = [];
        const prefix = [];
        keyArray.forEach((key) => {
          arrayForCurrentKey = orderDetailsById.orderRecurringDto[key];
          // const prefix = arrayForCurrentKey?.map((evnt) => evnt?.onTheNumber);
          prefix.push(...week.filter((feq) => feq.id.toString() === key));
        });

        const repeatsEvery = arrayForCurrentKey?.map((evnt) => evnt?.repeatsEveryPrefixNumber);
        const preference = arrayForCurrentKey?.map((evnt) => evnt?.preferenceId);
        setrecurring(frequency?.find((feq) => feq?.ordRecFrequencyId === preference[0]));
        setrecurringEventRepeats(repeatsEvery[0]);
        setRecurranceRequestsFor(prefix);
        setrecurringStartDate(orderDetailsById?.recurringEventStartDate);
        setrecurringEndDate(orderDetailsById?.recurringEventEndDate);
        setLabDays(
          labDaysByFacility.filter((obj1) => arrayForCurrentKey.some((obj2) => obj1?.labDayId === obj2?.requestOnDayId))
        );
      }
    }
  }, [orderDetailsById]);
  return (
    <Dialog
      aria-labelledby="Set Recurrence"
      open={open}
      enableResize={true}
      className="commonModal__wrapper setReccurence__wrapper"
    >
      <form>
        <Box className="commonModal__wrapper--dialog">
          <IconButton aria-label="close" onClick={handleClose} className="modalClose">
            <CloseIcon />
          </IconButton>
          <DialogTitle>Set Recurrence</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Perference
                </Typography>
                <FormControl className="w-100">
                  <Autocomplete
                    className="customAutocomplete__input"
                    id="patientNameSearch"
                    disableClearable
                    options={frequency}
                    value={recurring}
                    onChange={(e, newVal) => setrecurring(newVal)}
                    getOptionLabel={(option) => option?.ordRecFrequencyDesc} // Define how to display option labels
                    renderOption={(props, option, { selected }) => <li {...props}>{option?.ordRecFrequencyDesc}</li>}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        InputProps={{
                          ...params.InputProps,
                          type: "search"
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Duration
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(recurringStartDate)}
                        onChange={(date) => setrecurringStartDate(dayjs(date))}
                        className="w-100 datetimepicker-control"
                        minDate={dayjs()}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(recurringEndDate)}
                        onChange={(date) => setrecurringEndDate(dayjs(date))}
                        className="w-100 datetimepicker-control"
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Repeats Every{" "}
                  {recurring?.ordRecFrequencyId === dsr.Weekly
                    ? "(week)"
                    : recurring?.ordRecFrequencyId === dsr.Monthly && "(month)"}
                </Typography>
                <FormControl className="w-100">
                  <TextField
                    className="add__input"
                    value={recurringEventRepeats}
                    onChange={(e) => setrecurringEventRepeats(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="">
                <Typography variant="label" component="label" className="add__label">
                  Requests On
                </Typography>
                {recurring?.ordRecFrequencyId === dsr.Weekly || recurring?.ordRecFrequencyId === dsr.Daily ? (
                  <FormControl className="w-100 common_checkbox_selection">
                    <Autocomplete
                      className="permissions--tag customAutocomplete__input"
                      multiple
                      id="permission-tags"
                      options={labDaysByFacility}
                      value={labDays}
                      onChange={(e, newVal) => setLabDays(newVal)}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option?.labDay}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option?.labDay}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder={
                            labDays?.length > 0 ? "" : recurring?.ordRecFrequencyId === dsr.Weekly ? "Week" : "Daily"
                          }
                        />
                      )}
                    />
                  </FormControl>
                ) : (
                  recurring?.ordRecFrequencyId === dsr.Monthly && (
                    <Grid container>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <FormControl className="w-100 common_checkbox_selection">
                          <Autocomplete
                            className="permissions--tag customAutocomplete__input"
                            multiple
                            id="permission-tags"
                            options={week}
                            value={recurranceRequestsFor}
                            onChange={(e, newValue) => setRecurranceRequestsFor(newValue)}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.day}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ padding: 1, marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.day}
                              </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="" placeholder="Week" />}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={8} lg={8} className="ps-3">
                        <FormControl className="w-100 common_checkbox_selection">
                          <Autocomplete
                            className="permissions--tag customAutocomplete__input"
                            multiple
                            id="permission-tags"
                            options={labDaysByFacility}
                            value={labDays}
                            onChange={(e, newVal) => setLabDays(newVal)}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option?.labDay}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ padding: 1, marginRight: 8 }}
                                  checked={selected}
                                />
                                {option?.labDay}
                              </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="" placeholder="Week" />}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Typography>Please ensure that the recurring order is placed within the lab's specified days.</Typography>
            <Button
              type="button"
              autoFocus
              className="primary-btn ms-4"
              onClick={handleClose}
              disabled={
                recurring?.ordRecFrequencyId === dsr.Monthly
                  ? (recurringEventRepeats === 0 && labDays === undefined) || recurranceRequestsFor?.length <= 0
                  : recurringEventRepeats === 0 && labDays === undefined
              }
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
}

export default SetReccurence;
