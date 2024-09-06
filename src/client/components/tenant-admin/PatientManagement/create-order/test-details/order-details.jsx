import { Autocomplete, Box, FormControl, Grid, TextField, Typography, setRef } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import React, { useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InformationIcon from "@assets/images/ls_svg/info_icon.svg";
import { ORDERS } from "../../../../../_helpers/constants";
import SetReccurence from "./set-recurrence";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * @author
 * @function OrderDetails
 **/

export const OrderDetails = ({
  priorityCode,
  setPriorityCode,
  alignment,
  handleChange,
  recurring,
  setrecurring,
  labDays,
  setLabDays,
  setRecurringOrder,
  setrecurringEventRepeats,
  recurringEventRepeats,
  recurranceRequestsFor,
  setRecurranceRequestsFor,
  orderType,
  setOrderType,
  recurringStartDate,
  recurringEndDate,
  setrecurringStartDate,
  setrecurringEndDate,
  oneTimeOrderDate,
  oneTimeOrderTime,
  setOneTimeOrderDate,
  setOneTimeOrderTime
}) => {
  const { priorityTypes, orderTypes } = useSelector((state) => state.createOrder);
  const [openRecurring, setOpenRecurring] = React.useState(false);
  const [showDateTime, setShowDateTime] = React.useState(false);
  const { orderDetailsById } = useSelector((state) => state.tenants);
  const location = useLocation();
  const { pathname } = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentId = queryParams.get("parentId");
  const type = pathname.split("/")[1];
  const filteredOrderType = orderTypes?.filter(
    (item) => item?.ordTypDesc?.replace(/-/g, "")?.trim()?.toLowerCase() === "onetime"
  );
  useEffect(() => {
    if (orderType?.id === 2) {
      setShowDateTime(true);
      setOpenRecurring(false);
      setLabDays();
      setRecurranceRequestsFor();
      setrecurringEventRepeats();
      setrecurringEndDate();
      setrecurringStartDate();
    }
  }, [orderType]);
  useEffect(() => {
    if (Object.keys(orderDetailsById).length > 0) {
      if (orderDetailsById?.orderType?.orderTypeDescription !== "Recurring") {
        setShowDateTime(true);
        setOpenRecurring(false);
        setrecurring();
        setLabDays([]);
        setRecurranceRequestsFor([]);
        setrecurringEventRepeats();
        setrecurringEndDate();
        setrecurringStartDate();
      }

      // if (Object.keys(orderDetailsById?.orderRecurringDto)?.length > 0) {

      // }
    }
  }, [orderDetailsById]);
  const handleOrderType = (newVal) => {
    if (newVal?.ordTypDesc === "Recurring") {
      setRecurringOrder(true);
      setOpenRecurring(true);
      setShowDateTime(false);
    } else {
      setShowDateTime(true);
      setOpenRecurring(false);
      setLabDays();
      setRecurranceRequestsFor();
      setrecurringEventRepeats();
      setrecurringEndDate();
      setrecurringStartDate();
    }
  };
  const handleEditClick = () => {
    setOpenRecurring(true);
  };

  useEffect(() => {
    // Set default priority type when priorityTypes changes
    const defaultType = priorityTypes.find((type) => type.defaultOrderType === true);
    if (defaultType) {
      setPriorityCode(defaultType);
    }
  }, [priorityTypes]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3} className="multiSelect_control">
          <Typography variant="label" component="label" className="add__label required">
            Order Type
          </Typography>
          <FormControl className="w-100 common_checkbox_selection">
            <Autocomplete
              className="permissions--tag"
              id="patientNameSearch"
              disableClearable
              options={parentId ? filteredOrderType : orderTypes}
              value={orderType}
              onChange={(e, newVal) => {
                setOrderType(newVal);
                handleOrderType(newVal);
                defaultPriorityType();
              }}
              getOptionLabel={(option) => option?.ordTypDesc || ""} // Define how to display option labels
              renderOption={(props, option, { selected }) => <li {...props}>{option?.ordTypDesc}</li>}
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
        <Grid item xs={12} sm={12} md={4} lg={3} className="multiSelect_control">
          <Typography variant="label" component="label" className="add__label required">
            Priority Type
          </Typography>
          <FormControl className="w-100 common_checkbox_selection">
            <Autocomplete
              className="permissions--tag"
              id="patientNameSearch"
              disableClearable
              options={priorityTypes || []}
              value={priorityCode}
              onChange={(e, newVal) => {
                setPriorityCode(newVal);
              }}
              getOptionLabel={(option) => option?.ordPrtyDesc || option?.priorityDesc || ""} // Define how to display option labels
              renderOption={(props, option, { selected }) => (
                <li {...props}>{option?.ordPrtyDesc || option?.priorityDesc}</li>
              )}
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

        {showDateTime && (
          <>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Typography variant="label" component="label" className="add__label required">
                Date
              </Typography>
              <FormControl className="w-100">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(oneTimeOrderTime)}
                    onChange={(date) => setOneTimeOrderTime(dayjs(date))}
                    className="w-100 datetimepicker-control"
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={3}>
              <Typography variant="label" component="label" className="add__label required">
                Time
              </Typography>
              <FormControl className="w-100">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    className="datetimepicker-control timePickerIcon w-100"
                    value={dayjs(oneTimeOrderTime)}
                    onChange={(newValue) => setOneTimeOrderTime(newValue)}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </>
        )}

        {openRecurring && (
          <SetReccurence
            setOpen={setOpenRecurring}
            open={openRecurring}
            user={"tenant"}
            title="Set Recurrence"
            recurring={recurring}
            setrecurring={setrecurring}
            labDays={labDays}
            setLabDays={setLabDays}
            setrecurringEventRepeats={setrecurringEventRepeats}
            recurringEventRepeats={recurringEventRepeats}
            recurranceRequestsFor={recurranceRequestsFor}
            setRecurranceRequestsFor={setRecurranceRequestsFor}
            recurringStartDate={recurringStartDate}
            setrecurringStartDate={setrecurringStartDate}
            recurringEndDate={recurringEndDate}
            setrecurringEndDate={setrecurringEndDate}
          />
        )}
      </Grid>
      <Box className="note-msg mt-4">
        <Box className="toaster-content d-flex align-items-center">
          <img src={InformationIcon} alt="notificationIcon" className="notification-icon" />
          <Box className="toaster-text">
            <Typography className="maintanence-text">
              Recurring Order: monthly event scheduled for the first Monday of each month over a duration of six months.
              {((type === "edit-order" && orderType?.ordTypDesc !== "One-Time") ||
                (type === "create-order" && orderType?.ordTypId === ORDERS.orderType)) && (
                <Typography variant="span" className="edit-text ms-3" onClick={handleEditClick}>
                  <Typography component="span" variant="span" className="ls-edit primaryIcon me-2 fs-16"></Typography>
                  Edit
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
