import { Autocomplete, Button, Checkbox, FormControl, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrderTypes, getPriorityList, getScheduleTimeList } from "@redux/slices/order-slice";
import { getPatientsByGroupId, saveGroupData } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch, useSelector } from "react-redux";

import SaveIcon from "@mui/icons-material/BookmarkBorder";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getLoggedInUserRoleId } from "@utils/common";

export default function NewRow(props) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [sclTime, setSclTime] = useState("");
  const [orderName, setOrderName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false);
  const [sclTimeError, setSclTimeError] = useState(false);
  const [orderNameError, setOrderNameError] = useState(false);
  const [orderPriority, setOrderPriority] = useState("");
  const [orderType, setOrderType] = useState("");
  const [priorityType, setPriorityType] = useState("");
  const [scheduleType, setScheduleType] = useState("");
  const [schdValue, setSchdValue] = useState();

  const {
    deleteRow,
    saveRowUpdate,
    apis,
    setShowSuccessPopup,
    saveAll,
    setDefaultCheck,
    defaultCheck,
    handleChangeForDefault,
    setSuccessMessage
  } = props;
  useEffect(() => {
    setGroupNameError(groupName.trim() === "");
    setSclTimeError(sclTime.trim() === "");
    setOrderNameError(orderName.trim() === "");
  }, [groupName, sclTime, orderName]);

  const { priorityTypes, orderTypes, scheduleTimeList } = useSelector((state) => state.createOrder);
  useEffect(() => {
    dispatch(getOrderTypes());
    dispatch(getPriorityList());
    dispatch(getScheduleTimeList({ orderTypeId: "", priorityId: "" }));
  }, []);

  useEffect(() => {
    setGroupNameError(groupName.trim() === "");
    setSclTimeError(sclTime.trim() === "");
    setOrderNameError(orderName.trim() === "");
  }, [groupName, sclTime, orderName]);
  const saveGroup = async (e) => {
    await dispatch(
      saveGroupData({
        url: apis[0],
        payload: {
          orderTypeDTO: {
            ordTypId: orderType?.ordTypId || "",
            ordTypDesc: orderType?.ordTypDesc || orderType
          },
          ordPrtyId: priorityType?.ordPrtyId,
          schdlTime: scheduleType?.schduleTime || parseInt(schdValue),
          roleId: getLoggedInUserRoleId(),
          status: true,
          defaultOrderType: defaultCheck
        }
      })
    ).then((res)=> setSuccessMessage(res?.payload))
    saveAll();
    await dispatch(getPatientsByGroupId(apis[3]));
    await dispatch(setShowSuccessPopup(true));
    saveRowUpdate();
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Autocomplete
            className={`add__input ${groupNameError ? "error" : ""}`}
            disablePortal
            freeSolo={true}
            options={orderTypes}
            getOptionLabel={(option) => option?.ordTypDesc} // Define how to display option labels
            renderOption={(props, option) => <li {...props}>{`${option?.ordTypDesc}`}</li>}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                placeholder="select order types"
                onChange={(e, newValue) => {
                  if (e && e) {
                    setOrderType(e.target.value); // S.target.valuet the custom name
                  } else {
                    setOrderType(e.target.value);
                  }
                }}
                value={orderType && orderType?.ordTypDesc}
              />
            )}
            onChange={(e, newValue) => {
              if (e && e) {
                setOrderType(newValue); // S.target.valuet the custom name
              } else {
                setOrderType(newValue);
              }
            }}
          />
        </TableCell>
        <TableCell>
          {
            <Checkbox
              color="secondary"
              onChange={(e) => {
                setDefaultCheck(e.target.checked);
                handleChangeForDefault(e);
              }}
              checked={defaultCheck}
            />
          }
        </TableCell>
        <TableCell>
          <FormControl className="w-100">
            <Autocomplete
              className={`add__input ${groupNameError ? "error" : ""}`}
              disablePortal
              freeSolo={true}
              options={priorityTypes}
              getOptionLabel={(option) => option?.ordPrtyDesc} // Define how to display option labels
              renderOption={(props, option) => <li {...props}>{`${option?.ordPrtyDesc}`}</li>}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  placeholder="select priority type"
                  value={priorityType && priorityType?.ordPrtyDesc}
                />
              )}
              onChange={(event, newValue) => {
                if (newValue && newValue) {
                  setPriorityType(newValue); // Set the custom name
                } else {
                  setPriorityType(newValue);
                }
              }}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl className="w-100">
            <Autocomplete
              className={`add__input ${groupNameError ? "error" : ""}`}
              disablePortal
              freeSolo={true}
              options={scheduleTimeList}
              getOptionLabel={(option) => option?.schduleTime} // Define how to display option labels
              renderOption={(props, option) => <li {...props}>{`${option?.schduleTime}`}</li>}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  placeholder="select schedule time"
                  value={scheduleType && scheduleType?.schduleTime}
                  onChange={(e) => setSchdValue(e.target.value)}
                />
              )}
              onChange={(event, newValue) => {
                setSchdValue(event.target.value);
                if (newValue && newValue) {
                  setScheduleType(newValue); // Set the custom name
                } else {
                  setScheduleType(newValue);
                }
              }}
            />
          </FormControl>
        </TableCell>
        <TableCell className="action__items">
          <Button className="primaryTextButton" variant="text" startIcon={<SaveIcon />} onClick={(e) => saveGroup(e)}>
            Save
          </Button>
          <Button
            className="errorTextButton"
            variant="text"
            startIcon={
              <Typography component="span" variant="span" className="ls-delete deleteRedIcon fs-16"></Typography>
            }
            onClick={() => deleteRow()}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
