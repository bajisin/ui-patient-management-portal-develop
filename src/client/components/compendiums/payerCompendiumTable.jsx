import { Box, Button, Checkbox, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  deletePayerCompendium,
  getLabList,
  getMneumonicList,
  getPayerCompendiumsList,
  getRelationList,
  setShowSuccessPopup
} from "@redux/slices/compendiumSlice";
import { useDispatch, useSelector } from "react-redux";

import CompendiumPayerEdit from "./compendiumPayerEdit";
import DeleteConfirmationDialog from "./delete-confirmation";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { Payer } from "../../_helpers/constants";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import warningDeactivate from "../../assets/images/svg/warningDeactivate.svg";

export default function PayerCompendiumTableComp({ updatePagination, updateSort }) {
  const [payerEdit, setPayerEdit] = React.useState(false);
  const [deleteconfirmation, setDeleteConfirmation] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [rowDataToDelete, setRowDataToDelete] = useState(null);
  const handleDeleteConfirmationOpen = (rowData) => {
    setDeleteConfirmation(true);
    setRowDataToDelete(rowData); // Add this line to store the row data
  };

  const handleDelete = async () => {
    try {
      if (rowDataToDelete) {
        await dispatch(deletePayerCompendium({ id: rowDataToDelete.insuranceId }));
        await dispatch(
          getPayerCompendiumsList({
            pagination: {
              pageNo: 0,
              pageSize: 10
            },
            sortKey: "lastModifiedDate",
            sortOrder: "DESC",
            searchValue: ""
          })
        );
      }
      handleDeleteConfirmationClose();
      setShowSuccessPopup(true);
    } catch (error) {
      // Handle error
      console.error("Error deleting:", error);
    }
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation(false);
  };
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setConfirmationPopup(false);
  };
  const handleClosePopup = () => {
    dispatch(setShowSuccessPopup(false));
    window.location.reload();
    handleClose();
  };

  const renderCellValue = (value) => {
    if (value?.length >= 0) return <span>{value?.map((val, i) => val?.labName).join(", ")}</span>;
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "insuranceCompanyName", // simple recommended way to define a column
        header: "Insurance Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "mnemonicId", // simple recommended way to define a column
        header: "Mnemonic",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "payerCode", // simple recommended way to define a column
        header: "Code",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "primaryAddress", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "secondaryAddress", // simple recommended way to define a column
        header: "Home address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "city", // simple recommended way to define a column
        header: "City",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "state", // simple recommended way to define a column
        header: "State",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "zipCode", // simple recommended way to define a column
        header: "Zip Code",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "country", // simple recommended way to define a column
        header: "Country",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "defaultLab", // simple recommended way to define a column
        header: "Default Lab",
        Cell: ({ cell }) => (
          <span>
            {
              cell.getValue() ? renderCellValue(cell.getValue()) : "N/A" // Display a fallback text when 'defaultLab' is null
            }
          </span>
        )
      },
      {
        accessorKey: "relationship", // simple recommended way to define a column
        header: "Relationship",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "subscriberId", // simple recommended way to define a column
        header: "Subscriber ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "groupId", // simple recommended way to define a column
        header: "Group ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "actions", // simple recommended way to define a column
        header: " ",
        enableSorting: false,
        enableColumnOrdering: false,
        enableColumnActions: false,
        grow: false, //don't allow this column to grow to fill in remaining space - new in v2.8
        size: 50, //small co
        Cell: ({ row }) => (
          <Box>
            {Payer && Payer.updateInd === true && (
              <IconButton
                onClick={() => {
                  setPayerEdit(true);
                  setPayerRecord(row?.original);
                  dispatch(getLabList());
                  dispatch(getMneumonicList());
                  dispatch(getRelationList(2));
                }}
              >
                <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
              </IconButton>
            )}
            {Payer && Payer.deleteInd === true && (
              <IconButton onClick={() => handleDeleteConfirmationOpen(row?.original)}>
                <Typography component="span" variant="span" className="ls-delete deleteRedIcon fs-16"></Typography>
              </IconButton>
            )}
          </Box>
        )
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("payerCompendium")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "insuranceCompanyName",
    "mnemonicId.mneumonicDescription",
    "payerCode",
    "primaryAddress",
    "secondaryAddress",
    "city",
    "state",
    "zipCode",
    "country",
    "defaultLab",
    "relationship",
    "subscriberId",
    "groupId",
    "actions"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("payerCompendium", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("payerCompendium", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const { payerCompendiumList, loading, isLoaded, totalCount, popupMessage, showSuccessPopup } = useSelector(
    (state) => state.compendium
  );
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [payerRecord, setPayerRecord] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (pagination.pageSize !== 10) {
      setPaginationUpdated(true);
    }
    if (pagination.pageIndex > 0) {
      updatePagination(pagination);
      setPaginationUpdated(true);
    }

    if (pagenationUpdated) {
      updatePagination(pagination);
    }
    if (sorting.length > 0) {
      if (sorting[0].id === "defaultLab") {
        sorting[0].id = "labName";
      }
      updateSort(sorting ?? []);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleFailPopupClose = async () => {
    handleClose(); // Close the first popup
  };
  return (
    <Box className="table__wrapper">
      {loading && !isLoaded ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={payerCompendiumList}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          onColumnVisibilityChange={setColumnVisibility}
          enableFilters={false}
          enablePagination={true}
          positionActionsColumn="last"
          manualPagination={true}
          manualSorting={true}
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          enablePinning
          initialState={{ columnPinning: { right: ["actions"] } }}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          rowCount={totalCount}
        />
      )}
      {payerEdit && (
        <CompendiumPayerEdit
          payerEdit={payerEdit}
          setPayerEdit={setPayerEdit}
          payerRecord={payerRecord}
          showSuccessPopup={showSuccessPopup}
          setShowSuccessPopup={setShowSuccessPopup}
        />
      )}
      <DeleteConfirmationDialog
        open={deleteconfirmation}
        setOpen={setDeleteConfirmation}
        handleDelete={handleDelete} // Pass the function directly
        handleCheckboxChange={handleCheckboxChange}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      {confirmationPopup && (
        <Modal
          open={confirmationPopup}
          setOpen={setConfirmationPopup}
          onClose={() => setShowSuccessPopup(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Are You Sure ?
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              Do you really want to update the data?
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button
                autoFocus
                type="submit"
                className="primary-outline-btn"
                onClick={() => {
                  setShowSuccessPopup(false);
                  setIsChecked(false);
                }}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={() => {
                  handleFailPopupClose();
                  setPayerEdit(false);
                  setShowSuccessPopup(true);
                }}
                disabled={!isChecked}
              >
                Update
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}
      {showSuccessPopup && (
        <Modal
          open={showSuccessPopup}
          onClose={handleClosePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-description" className="modal-modal-description">
              {popupMessage}
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleClosePopup}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
