import { Box, Button, Checkbox, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { saveGroupData, setShowSuccessPopup } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import Loader from "../../../utils/Loader";
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

export default function ContainerGroupTable(props) {
  const [addRow, setAddRow] = useState(false);
  const [filteredValue, setFilteredValue] = useState("");
  const { title, apis, relationType } = props;

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
      const descriptionA = a.description?.toLowerCase();
      const descriptionB = b.description?.toLowerCase();
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
      dispatch(
        saveGroupData({
          url: apis[1],
          payload: changed.map(({ id, status }) => ({ id, status }))
        })
      );
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e;
    const filtered = filteredData.filter((data) => data.description.includes(searchValue));
    setFilteredValue(searchValue); // Update the search input value
    setLocalData(filtered);
  };
  const handleclose = () => {
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
        </Typography>
      </Typography>
      {loading && !isLoaded ? (
        <Loader />
      ) : (
        <TableContainer className="table__wrapper" component={Paper}>
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
                <TableCell>Description</TableCell>
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
                  setShowSuccessPopup={setShowSuccessPopup} // Pass the prop here
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
                      setShowSuccessPopup={setShowSuccessPopup} // Pass the prop here
                    />
                  );
                })}
              {showSuccessPopup && (
                <Modal
                  open={showSuccessPopup}
                  onClose={handleclose} // Close the success popup
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="success_modal">
                    <img src={checkmarkSuccess} className="modal-success-icon" />
                    <Typography id="modal-modal-description" className="modal-modal-description">
                      {popupMessage}
                    </Typography>
                    <Button autoFocus type="submit" className="primary-btn" onClick={handleclose}>
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
