import { Box, Button, Checkbox, IconButton, Modal, Typography } from "@mui/material";
import { CALLTYPES, Speciemen, Test } from "../../_helpers/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  deleteTestCompendiumById,
  getTestCompendiumsList,
  setPopupMessage,
  setShowSuccessPopup
} from "@redux/slices/compendiumSlice";
import {
  fetchOrderableTypes,
  fetchWorkGroup,
  getContainerTypes,
  getInstrumentList,
  getPerformingDept,
  getSpecimentTypes,
  getSpecimenFrozen
} from "@redux/slices/commonAdminApiSlice";
import { useDispatch, useSelector } from "react-redux";

import CompendiumTestEdit from "./compendiumTestEdit";
import DeleteConfirmationDialog from "./delete-confirmation";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

export default function CompendiumTestTable({ updatePagination, updateSort }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "testName", // simple recommended way to define a column
        header: "Test Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "testCode", // simple recommended way to define a column
        header: "Test Code",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "value15mo", // simple recommended way to define a column
        header: "Value-15 mo",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "labCorpSendOut", // simple recommended way to define a column
        header: "Lab Corp Send Out",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "labCorpAlias", // simple recommended way to define a column
        header: "Lab Corp Alias",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "specimenType", // simple recommended way to define a column
        header: "Specimen Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "containerTypeName", // simple recommended way to define a column
        header: "Preferred Container Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },

      {
        accessorKey: "containerdescription", // simple recommended way to define a column
        header: "Preferred Container description",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "alternateContainerName", // simple recommended way to define a column
        header: "Alternative Container Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "alternateContainerDescription", // simple recommended way to define a column
        header: "Alternate Container description",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "compendiumOrderType", // simple recommended way to define a column
        header: "Orderable Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "department", // simple recommended way to define a column
        header: "Performing Dept",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },

      {
        accessorKey: "workGroup", // simple recommended way to define a column
        header: "Work Group",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },

      {
        accessorKey: "instrument", // simple recommended way to define a column
        header: "Instrument",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "tat", // simple recommended way to define a column
        header: "TAT",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "cost", // simple recommended way to define a column
        header: "Cost",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "cptCodes", // simple recommended way to define a column
        header: "CPT Codes",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "loincCode", // simple recommended way to define a column
        header: "LOINC Code",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "specimenId", // simple recommended way to define a column
        header: "Specimen Frozen",
        Cell: ({ cell }) => (
          <span>
            {cell.getValue() === 1
              ? Speciemen[0].description
              : cell.getValue() === 2
              ? Speciemen[1].description
              : Speciemen[2].description}
          </span>
        )
      },
      {
        accessorKey: "loincDescription", // simple recommended way to define a column
        header: "LOINC Description",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "minVol", // simple recommended way to define a column
        header: "Min Vol",
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
          <Box className="d-flex">
            {Test && Test.updateInd === true && (
              <IconButton
                onClick={() => {
                  handleEdit();
                  setOrderRecord(row?.original);
                  setUpdateId(row?.original?.testCompendiumId);
                }}
              >
                <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
              </IconButton>
            )}
            {Test && Test.deleteInd === true && (
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

  const { compendiumList, loading, isLoaded, totalCount, showSuccessPopup, popupMessage } = useSelector(
    (state) => state.compendium
  );
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState([]);
  const [updateId, setUpdateId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  // store pagination state in your own state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [orderRecord, setOrderRecord] = useState({});
  const [testEdit, setTestEdit] = useState(false);
  const [deleteconfirmation, setDeleteConfirmation] = useState(false);
  const [rowDataToDelete, setRowDataToDelete] = useState(null);
  const { orderableTypes, workGroupData, performingData, specimentData, continerTypeData, instrumentList , specimenFrozenType} =
    useSelector((state) => state.commonAdmin);
  const handleDeleteConfirmationOpen = (rowData) => {
    setDeleteConfirmation(true);
    setRowDataToDelete(rowData); // Add this line to store the row data
  };

  useEffect(() => {
    // do something when the pagination state changes
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
      updateSort(sorting ?? []);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);
  useEffect(() => {
    if (orderableTypes.length === 0) {
      dispatch(fetchOrderableTypes());
    }
    if (workGroupData.length === 0) {
      dispatch(fetchWorkGroup());
    }
    if (performingData.length === 0) {
      dispatch(getPerformingDept());
    }
    if (specimentData.length === 0) {
      dispatch(getSpecimentTypes());
    }
    if (continerTypeData.length === 0) {
      dispatch(getContainerTypes());
    }
    if (instrumentList.length === 0) {
      dispatch(getInstrumentList());
    }
  }, []);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setIsChecked(false);
  };
  const handleClosePopup = () => {
    dispatch(setShowSuccessPopup(false)); // Close the popup
    dispatch(setPopupMessage(""));
    handleClose();
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmation(false);
  };
  const handleEdit = () => {
    setTestEdit(true);

    if (orderableTypes.length === 0) {
      dispatch(fetchOrderableTypes());
    }
    if (workGroupData.length === 0) {
      dispatch(fetchWorkGroup());
    }
    if (performingData.length === 0) {
      dispatch(getPerformingDept());
    }
    if (specimentData.length === 0) {
      dispatch(getSpecimentTypes());
    }
    if (continerTypeData.length === 0) {
      dispatch(getContainerTypes());
    }
    if (instrumentList.length === 0) {
      dispatch(getInstrumentList());
    }
    if (specimenFrozenType.length === 0) {
      dispatch(getSpecimenFrozen());
    }
  };

  const handleDelete = async () => {
    try {
      if (rowDataToDelete) {
        await dispatch(deleteTestCompendiumById({ id: rowDataToDelete.testCompendiumId }));
        await dispatch(
          getTestCompendiumsList({
            pagination: {
              pageNo: 0,
              pageSize: 10
            },
            //         // Other parameters for fetching the list
            status: "all",
            searchValue: "",
            sortBy: "",
            sortKey: "lastModifiedDate",
            sortOrder: "DESC"
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
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("compendium")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "testName",
    "testCode",
    "value15mo",
    "labCorpSendOut",
    "labCorpAlias",
    "specimenType",
    "containerTypeName",
    "containerdescription",
    "alternateContainerName",
    "alternateContainerDescription",
    "compendiumOrderType",
    "department",
    "workGroup",
    "instrument",
    "tat",
    "cost",
    "cptCodes",
    "loincCode",
    "loincDescription",
    "minVol",
    "actions"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("compendium", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("compendium", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  return (
    <Box className="table__wrapper">
      {loading && !isLoaded ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={compendiumList}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          enableFilters={false}
          enablePagination={true}
          positionActionsColumn="last"
          manualPagination={true}
          manualSorting={true}
          onColumnVisibilityChange={setColumnVisibility}
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
      {testEdit && (
        <CompendiumTestEdit
          setOpen={setTestEdit}
          open={testEdit}
          setOrderRecord={orderRecord}
          callType={CALLTYPES.Edit}
        />
      )}

      <DeleteConfirmationDialog
        open={deleteconfirmation}
        setOpen={setDeleteConfirmation}
        handleDelete={handleDelete}
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
        setIsChecked={setIsChecked}
      />
      <Modal
        open={false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="success_modal">
          <img src={warningDeactivate} className="modal-success-icon" />
          <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
            Are You Sure ?
          </Typography>
          <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
            Do you really want to delete the data?
          </Typography>
          <Typography variant="div" component="div" className="agree-section">
            <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            <Typography className="agree-statement">Yes, I agree</Typography>
          </Typography>

          <Typography className="modal-buttons-wrapper">
            <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClose}>
              Cancel
            </Button>
            <Button autoFocus type="submit" className="primary-btn" disabled={!isChecked}>
              Update
            </Button>
          </Typography>
        </Box>
      </Modal>
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
      {/* {showSuccessPopup && (
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
      )} */}
    </Box>
  );
}
