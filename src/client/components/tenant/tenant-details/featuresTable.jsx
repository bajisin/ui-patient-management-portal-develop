import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import FailPopup from "../../master-data/failpopup";
import Loader from "../../../utils/Loader";
import Modal from "@mui/material/Modal";
import SuccessPopup from "../../master-data/sucesspopup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { updateFeatures } from "../../../redux/slices/tenantsSlice";

export default function FeaturesTable({ tenantId, roleId, fetchFeatures }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const dispatch = useDispatch();
  const { tenantFeatures, featureStatus, loading } = useSelector((state) => state.tenants);
  const handleClose = () => {
    setOpen(false);
    fetchFeatures();
  };

  useEffect(() => {
    setData(tenantFeatures);
    if (featureStatus.includes("success")) {
      setShowSuccessPopup(true);
    } else if (featureStatus) {
      setShowFailPopup(true);
    }
    // Map selected permissions to features
  }, [tenantFeatures, featureStatus]);

  const [event, setEvent] = useState();
  const [selectedPermissions, setSelectedPermissions] = useState({}); // State to store selected permissions
  useEffect(() => {
    const initialSelectedPermissions = {};

    tenantFeatures.forEach((feature) => {
      const create = event && event[0] === "createInd" ? event[1] : feature.createInd;
      const read = event && event[0] === "readInd" ? event[1] : feature.readInd;
      const update = event && event[0] === "updateInd" ? event[1] : feature.updateInd;
      const deletes = event && event[0] === "deleteInd" ? event[1] : feature.deleteInd;

      // Add the feature with its permissions to the initialSelectedPermissions object
      initialSelectedPermissions[feature.tenantFeaturePrevilageId] = {
        tenantFeaturePrevilageId: feature.tenantFeaturePrevilageId,
        featureId: feature.featureId,
        featureName: feature.featureName,
        assignRoleId: feature.assignRoleId,
        roleId: feature.roleId,
        assignRoleName: feature.assignRoleName,
        createInd: create,
        readInd: read,
        updateInd: update,
        deleteInd: deletes
      };
    });
    setSelectedPermissions(initialSelectedPermissions);
  }, [tenantFeatures, event]);

  const handleCheckboxChange = (e, propertyName, index) => {
    const { checked } = e.target;
    const updatedData = [...data];
    const updatedFeature = { ...updatedData[index] };

    updatedFeature[propertyName] = checked;

    if (propertyName === "createInd" && checked) {
      updatedFeature.readInd = true;
      updatedFeature.updateInd = true;
    }

    // Update the data array with the updated feature object
    updatedData[index] = updatedFeature;

    // Set the updated data array
    setData(updatedData);
  };

  const handleSubmit = async () => {
    const payload = {
      roleId,
      tenantId,
      tenantFeatureRolePrivilegeDTO: data
    };
    dispatch(updateFeatures(payload));
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <TableContainer className="table__wrapper features__table">
            <Table className="table_section">
              <TableHead>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>Features</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((feature, i) => (
                  <TableRow key={i}>
                    <TableCell>{feature.assignRoleName}</TableCell>
                    <TableCell>{feature.featureName}</TableCell>
                    <TableCell>
                      <Checkbox
                        className="me-1"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ padding: 1 }}
                        onChange={(e) => handleCheckboxChange(e, "createInd", i)}
                        checked={feature.createInd} // Determine if the checkbox should be checked based on the feature's createInd property
                      />
                      Create
                      <Checkbox
                        className="ms-3 me-1"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ padding: 1 }}
                        onChange={(e) => handleCheckboxChange(e, "readInd", i)}
                        checked={feature.readInd} // Determine if the checkbox should be checked based on the feature's readInd property
                      />
                      Read
                      <Checkbox
                        className="ms-3 me-1"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ padding: 1 }}
                        onChange={(e) => handleCheckboxChange(e, "updateInd", i)}
                        checked={feature.updateInd} // Determine if the checkbox should be checked based on the feature's updateInd property
                      />
                      Update
                      <Checkbox
                        className="ms-3 me-1"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ padding: 1 }}
                        onChange={(e) => handleCheckboxChange(e, "deleteInd", i)}
                        checked={feature.deleteInd} // Determine if the checkbox should be checked based on the feature's deleteInd property
                      />
                      Delete
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={handleSubmit}
            component="Button"
            className="primary-btn float-right my-3 me-3"
          >
            Save
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="sccessRequest">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Request sent successfully
              </Typography>
              <Typography id="modal-modal-description" className="mt-2">
                User will receive mail with a request link.The link will be active for 24 hrs
              </Typography>
              <Button
                variant="contained"
                onClick={handleClose}
                component="Button"
                className="primary-btn float-right mt-3"
              >
                okay
              </Button>
            </Box>
          </Modal>
          {showSuccessPopup && (
            <SuccessPopup
              onClose={() => {
                setShowSuccessPopup(false);
                window.location.reload();
              }}
            />
          )}
          {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}
        </>
      )}
    </>
  );
}
