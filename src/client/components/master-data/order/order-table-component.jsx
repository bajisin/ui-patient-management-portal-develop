import { Box, Button, Checkbox, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { saveGroupData, setShowSuccessPopup } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import Loader from "../../../utils/Loader";
import { Master } from "../../../_helpers/constants";
import MasterDataSearch from "../common/masterdatasearch";
import NewRow from "./new-row";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ThreeRowsTab from "./AddDeleteTableRows";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";

export default function OrderGroupTable(props) {
  const [addRow, setAddRow] = useState(false);
  const [filteredValue, setFilteredValue] = useState("");
  const { title, apis, relationType } = props;

  const { groupData, loading, isLoaded, popupMessage, showSuccessPopup } = useSelector(
    (state) => state.patientsByGroupData
  );
  console.log(popupMessage, "message")
  const [localData, setLocalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Initialize with the initial data
  const [defaultCheck, setDefaultCheck] = useState(false);
  const [successMessage, setSuccessMessage] = useState("")
  const dispatch = useDispatch();
  const deleteTempRow = () => {
    setAddRow(false);
  };
  const saveSuccessUpdate = async () => {
    setAddRow(false);
  };
  useEffect(() => {
    const sortedData = [...groupData].sort((a, b) => {
      const descriptionA = a?.description?.toLowerCase();
      const descriptionB = b?.description?.toLowerCase();
      if (descriptionA < descriptionB) {
        return -1;
      }
      if (descriptionA > descriptionB) {
        return 1;
      }
      return 0;
    });
    setLocalData(sortedData);
    setFilteredData(sortedData);
  }, [groupData]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      const tempData = localData.map((item) => ({
        ...item,
        status: checked,
        ordTypToPrtyId: item.ordTypToPrtyId
      }));
      setLocalData(tempData);
    } else {
      const tempData = localData.map((item) =>
        item.ordTypToPrtyId === parseInt(name)
          ? { ...item, status: checked, ordTypToPrtyId: item.ordTypToPrtyId }
          : item
      );
      setLocalData(tempData);
    }
  };
  const handleChangeForDefault = (e) => {
    const { name, checked } = e.target;
    const tempData = localData.map((item) => {
      if (item.ordTypToPrtyId === parseInt(name) && !defaultCheck) {
        return { ...item, defaultOrderType: !!checked };
      } else {
        return { ...item, defaultOrderType: false };
      }
    });
    setLocalData(tempData);
  };
  const saveAll = async () => {
    const payload = localData.map((item) => ({
      id: item.id,
      status: item.status,
      ordTypToPrtyId: item.ordTypToPrtyId,
      relationType: item.relationType, // Ensure relationType is available in each item
      defaultOrderType: defaultCheck ? false : item.defaultOrderType
    }));

    try {
      await dispatch(
        saveGroupData({
          url: apis[1],
          payload
        })
      );

      dispatch(setShowSuccessPopup(true));

      await dispatch(getPatientsByGroupId(apis[3]));
    } catch (error) {
      // Handle errors if necessary
      console.error("Error saving data or fetching patients:", error);
    }
  };

  const handleSearchChange = (e, ...args) => {
    const searchValue = e;
    const filtered = filteredData.filter((data) => data.description?.includes(searchValue));
    setLocalData(filtered);
    setFilteredValue(searchValue); // Update the search input value
  };
  const handleClose = () => {
    dispatch(setShowSuccessPopup(false));
  };
  return (
    <>
      <Typography component="div" variant="div" className="header-content my-3 px-3">
        <Typography component="h6" variant="h6" className="recordsCount">
          {groupData.length} {title} Found
        </Typography>
        <Typography component="div" variant="div" className="action__items">
          <MasterDataSearch filteredValue={filteredValue} handleSearchChange={handleSearchChange} />
          {Master?.createInd === true && (
            <>
              {" "}
              <Button variant="outlined" className="bordered-icon-btn py-0 px-3" onClick={() => setAddRow(true)}>
                <AddIcon fontSize="small" />
                Add New
              </Button>
              <Button
                variant="contained"
                className="primary-btn p-0"
                onClick={() => {
                  saveAll();
                }}
              >
                Save
              </Button>
            </>
          )}
        </Typography>
      </Typography>
      {loading && !isLoaded ? (
        <Loader />
      ) : (
        <TableContainer className="table__wrapper table__wrapper--patients table__dropdown" component={Paper}>
          <Table className="table_section order_table order_table--type">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="secondary"
                    name="checkAll"
                    onChange={handleChange}
                    checked={localData.filter((item) => item?.status !== true).length < 1}
                  />
                  {title}
                </TableCell>
                <TableCell>Default Check</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addRow && (
                <NewRow
                  name={title}
                  deleteRow={deleteTempRow}
                  saveRowUpdate={saveSuccessUpdate}
                  apis={apis}
                  setAddRow={setAddRow}
                  handleChangeForDefault={handleChangeForDefault}
                  setShowSuccessPopup={setShowSuccessPopup}
                  saveAll={saveAll}
                  setDefaultCheck={setDefaultCheck}
                  defaultCheck={defaultCheck}
                  setSuccessMessage={setSuccessMessage}
                />
              )}
              {localData.length > 0 &&
                localData?.map((data, index) => {
                  return (
                    <ThreeRowsTab
                      key={index}
                      data={data}
                      title={title}
                      handleChange={handleChange}
                      apis={apis}
                      relationType={relationType}
                      setShowSuccessPopup={setShowSuccessPopup}
                      handleChangeForDefault={handleChangeForDefault}
                      saveAll={saveAll}
                    />
                  );
                })}
              {showSuccessPopup && (
                <Modal
                  open={showSuccessPopup}
                  onClose={handleClose} // Close the success popup
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="success_modal">
                    <img src={checkmarkSuccess} className="modal-success-icon" />
                    <Typography id="modal-modal-description" className="modal-modal-description">
                      {popupMessage || successMessage}
                    </Typography>
                    <Button autoFocus type="submit" className="primary-btn" onClick={handleClose}>
                      Okay
                    </Button>
                  </Box>
                </Modal>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
