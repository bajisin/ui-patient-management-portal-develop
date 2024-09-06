import { Box, Button, Checkbox, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { deleteTest, getTestList } from "@redux/slices/ordertemplateSlice";
import { getLoggedInUserRoleId, getTenantId, paginationPayload } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@assets/images/ls_svg/delete.svg";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import SuccessPopup from "../../../master-data/sucesspopup";
import warningDeactivate from "../../../../assets/images/svg/warningDeactivate.svg";

export default function TabTestpanelListTable({ updatePagination, updateSort }) {
  const columnsData1 = useMemo(
    () => [
      {
        accessorKey: "testName", // simple recommended way to define a column
        header: "Test Name",
        // renderCell: (data) => data.tests[1].name.join(", "),
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "panelName", // simple recommended way to define a column
        header: "Panel Test",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );

  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("TabTestpanelListTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = ["testName", "panelName"];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("TabTestpanelListTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("TabTestpanelListTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const { panelList, loading, totalCount } = useSelector((state) => state.orders);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [deletePopup, setDeletePopUp] = useState(false);
  const [row, setRow] = useState([]);

  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  // const [rowCount, setRowCount] = useState(0);

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
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleDelete = (row) => {
    setRow(row);
    setDeletePopUp(true);
  };

  const handleClose = () => {
    setDeletePopUp(false);
  };

  const handleSubmit = async () => {
    let action;
    try {
      action = await dispatch(
        deleteTest({
          panelId: row.original?.panelId,
          testCategoryId: row.original?.testCategoryId,
          testCompendiumId: row.original?.testCompendiumId,
          testId: row.original?.testId,
          testCategoryName: row.original?.testCategoryType
        })
      );
      if (deleteTest.fulfilled.match(action)) {
        setShowSuccessPopUp(true);
        setDeletePopUp(false);
        setIsChecked(false);
        setSuccessMessage(action.payload);
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(
      getTestList({
        ...paginationPayload({ pagination, sortKey: "testName" }),
        roleId: getLoggedInUserRoleId(),
        tenantId: getTenantId(),
        testIds: [],
        panelIds: [],
        testCategoryId: [2]
      })
    );
  };
  return (
    <Box className="table__wrapper">
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columnsData1}
          data={panelList}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          onColumnVisibilityChange={setColumnVisibility}
          // enableColumnFilters={false}
          enableFilters={false}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          enableRowActions={true}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          renderRowActions={({ row }) => (
            <IconButton onClick={() => handleDelete(row)}>
              <img src={DeleteIcon} />
            </IconButton>
          )}
          positionActionsColumn="last"
          rowCount={totalCount}
          manualPagination={true}
          manualSorting={true}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
        />
      )}
      {deletePopup && (
        <Modal
          open={setDeletePopUp}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Are You Sure ?
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              Sure you want to delete the list.
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={() => handleSubmit()}
                disabled={!isChecked}
              >
                Yes, I agree
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}
      {showSuccessPopUp && (
        <SuccessPopup
          onClose={() => {
            setShowSuccessPopUp(false);
            window.location.reload();
          }}
          successMessage={successMessage}
          name={"delete"}
        />
      )}
    </Box>
  );
}
