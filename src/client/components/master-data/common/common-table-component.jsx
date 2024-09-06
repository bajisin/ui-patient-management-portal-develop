import { Box, Button, Checkbox, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPatientsByGroupId, saveGroupData, setShowSuccessPopup } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import { COMMON_MASTER_DATA_APIS } from "@config/api-config";
import Loader from "../../../utils/Loader";
import { Master } from "../../../_helpers/constants";
import MasterDataSearch from "./masterdatasearch";
import NewRow from "./new-row";
import Paper from "@mui/material/Paper";
import RowTab from "./AddDeleteTableRows";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";

export default function CommonGroupTable(props) {
  const [addRow, setAddRow] = useState(false);
  const { title, apis, relationType, tabName } = props;
  const [filteredValue, setFilteredValue] = useState("");
  const { groupData, loading, isLoaded, popupMessage, showSuccessPopup } = useSelector(
    (state) => state.patientsByGroupData
  );
  const [localData, setLocalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Initialize with the initial data
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
    setFilteredData(sortedData);
    setLocalData(sortedData);
  }, [groupData]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "checkAll") {
      const tempData = localData.map((item) => {
        return { ...item, status: checked };
      });
      setLocalData(tempData);
    } else {
      const tempData = localData.map((item) => (item.id === parseInt(name) ? { ...item, status: checked } : item));
      setLocalData(tempData);
    }
  };

  const saveAll = () => {
    const changed = localData.filter(function (p, idx) {
      return Object.keys(p).some(function (prop) {
        return p[prop] !== groupData[idx][prop];
      });
    });
    if (changed.length > 0) {
      if (relationType) {
        dispatch(
          saveGroupData({
            url: apis[1],
            payload: changed.map(({ id, status }) => ({ id, status, relationType }))
          })
        );
        dispatch(setShowSuccessPopup(true));
        dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.raceList()));
        dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.ethinicList()));
      } else {
        dispatch(
          saveGroupData({
            url: apis[1],
            payload: changed.map(({ id, status }) => ({ id, status }))
          })
        );
        dispatch(setShowSuccessPopup(true));
      }
    }
  };
  const handleClose = () => {
    dispatch(setShowSuccessPopup(false));
    window.location.reload();
  };
  const handleSearchChange = (e, ...args) => {
    const searchValue = e;
    const filtered = filteredData.filter((data) => data?.description.includes(searchValue));
    setLocalData(filtered);
    setFilteredValue(searchValue); // Update the search input value
  };

  return (
    <>
      <Typography component="div" variant="div" className="header-content my-3 px-3">
        <Typography component="h6" variant="h6" className="recordsCount">
          {groupData.length} {title} Found
        </Typography>
        <Typography component="div" variant="div" className="action__items">
          <MasterDataSearch filteredValue={filteredValue} handleSearchChange={handleSearchChange} />
          {Master?.createInd && (
            <>
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
        <TableContainer className="table__wrapper table__wrapper--patients" component={Paper}>
          <Table className="table_section">
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
                  tabName={tabName}
                  showSuccessPopup={showSuccessPopup}
                  setShowSuccessPopup={setShowSuccessPopup}
                  relationType={relationType}
                />
              )}
              {localData.length > 0 &&
                localData?.map((data, index) => {
                  return (
                    <RowTab
                      key={index}
                      data={data}
                      title={title}
                      showSuccessPopup={showSuccessPopup}
                      setShowSuccessPopup={setShowSuccessPopup}
                      setAddRow={setAddRow}
                      handleChange={handleChange}
                      apis={apis}
                      popupMessage={popupMessage}
                      setLocalData={setLocalData}
                      relationType={relationType}
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
                    <img src={checkmarkSuccess} className="successImg modal-success-icon" />
                    <Typography id="modal-modal-description" className="modal-modal-description">
                      {popupMessage}
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
