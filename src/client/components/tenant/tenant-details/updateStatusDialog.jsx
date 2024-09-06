import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Stack,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { getFacilitiesById, updateFacilityStatus } from "@redux/slices/facilitiesSlice";
import { getLabById, updateLabStatus } from "@redux/slices/labs-slice";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { getTenantUsers, getTenantsById, updateStatus, updateTenantStatusDetails } from "@redux/slices/tenantsSlice";

import { roleIds, statusIds } from "../../../_helpers/constants";
import { updateClientStatusDetails } from "@redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import warningIcon from "@assets/images/svg/warningDeactivate.svg";

const UpdateStatusDialog = ({
  open,
  setOpen,
  handleStatusUpdate,
  title,
  status,
  id,
  call,
  buttons,
  filtereddata,
  setShowActiveSuccessPopup,
  setSuccessMessage,
  setShowFailurePopup
}) => {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const { pathname } = useLocation();

  const tenantId = pathname.split("/")[3];
  const handleClick = async () => {
    if (call !== "Update") {
      handleStatusUpdate();
    }

    if (status) {
      const updatedStatus = status === statusIds.ACTIVE ? statusIds.IN_ACTIVE : statusIds.ACTIVE;
      try {
        let action;
        if (call === "tenantUser") {
          action = await dispatch(
            updateTenantStatusDetails({
              status: updatedStatus,
              tenantId: id,
              role: getLoggedInUserRoleId(),
              createdBy: getLoggedInUserId()
            })
          );

          if (updateTenantStatusDetails.fulfilled.match(action)) {
            setShowActiveSuccessPopup(true);
            setSuccessMessage(action.payload || "Action completed successfully");
          } else {
            setShowFailurePopup(true);
          }
        } else if (call === "clientUser") {
          action = await dispatch(
            updateClientStatusDetails({ status: updatedStatus, userId: id, roleId: getLoggedInUserRoleId() })
          );
          if (updateClientStatusDetails.fulfilled.match(action)) {
            setShowActiveSuccessPopup(true);
            setSuccessMessage(action.payload || "Action completed successfully");
          } else {
            setShowFailurePopup(true);
          }
        } else if (call === "lab") {
          action = await dispatch(updateLabStatus({ status: updatedStatus, labId: id }));

          if (updateLabStatus.fulfilled.match(action)) {
            setShowActiveSuccessPopup(true);
            setSuccessMessage(action.payload || "Action completed successfully");
          } else {
            setShowFailurePopup(true);
          }

          dispatch(getLabById(id));
        } else if (call === "facility") {
          action = await dispatch(updateFacilityStatus({ statusId: updatedStatus, facilityId: id }));
          if (updateFacilityStatus.fulfilled.match(action)) {
            setShowActiveSuccessPopup(true);
            setSuccessMessage(action.payload || "Action completed successfully");
          } else {
            setShowFailurePopup(true);
          }
          dispatch(getFacilitiesById(id));
        } else if (call === "Update") {
          dispatch(
            updateStatus({
              tenantId,
              roleId: getLoggedInUserRoleId(),
              userId: filtereddata.userId,
              statusId: filtereddata.status?.statusId === 1 ? 2 : 1
            })
          ).then((response) => {
            if (response.payload.includes("Successfully")) {
              setShowActiveSuccessPopup(true);
              setSuccessMessage(response.payload || "Action completed successfully");
              dispatch(
                getTenantUsers({
                  pagination: {
                    pageNo: 0,
                    pageSize: 10
                  },
                  sortKey: "lastModifiedDate",
                  sortOrder: "DESC",
                  searchValue: "",
                  tenantId,
                  roleId: [roleIds.TENANT_ADMIN, roleIds.CLIENT_ADMIN, roleIds.PROVIDER],
                  role: getLoggedInUserRoleId(),
                  userId: [],
                  statusId: [],
                  startDate: "",
                  endDate: ""
                })
              );
            }
          });
        }

        // console.log("Action after dispatch:", action);
      } catch (error) {
        // console.error("Error updating tenant status:", error);
        setShowFailurePopup(true);
      }
    }

    dispatch(getTenantsById(tenantId));
    // setShowSuccessPopup(true);
  };
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="update-status" className="logout__wrapper">
        <DialogContent>
          <img className="warningImg" src={warningIcon} />
          <Typography component="h6" variant="h6">
            Are you sure?
          </Typography>
          <Typography component="p" variant="p">
            {title || "You want to perform this action. "}
          </Typography>
          <FormControlLabel control={<Checkbox checked={isChecked} onClick={handleCheck} />} label="Yes, I agree" />
        </DialogContent>
        <DialogActions>
          <Stack direction="row" gap={2}>
            <Button
              className="primary-outline-btn"
              component="button"
              variant="outlined"
              onClick={() => setOpen(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              className="primary-btn"
              component="button"
              variant="contained"
              autoFocus
              onClick={handleClick}
              disabled={!isChecked}
            >
              {(title && title?.includes("inactivate")) || title?.includes("Inactive")
                ? "Inactivate"
                : title
                ? "Activate"
                : "Yes"}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateStatusDialog;
