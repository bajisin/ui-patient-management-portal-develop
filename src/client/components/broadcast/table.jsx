import { Box, Button, Checkbox, Chip, IconButton, Modal, Typography } from "@mui/material";
import { Broadcast, CALLTYPES, roleIds, statusIds } from "../../_helpers/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { deleteBroadCast, getBroadCastById, setPopupMessage, setShowSuccessPopup } from "@redux/slices/boardCastSlice";
import { useDispatch, useSelector } from "react-redux";

import CreateBroadcast from "./create-broadcast";
import CreateTenantBroadcast from "../tenant-admin/broadcast/create-tenant-broadcast";
import FailPopup from "../master-data/failpopup";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import checkmarkSuccess from "../../assets/images/svg/checkmarkSuccess.svg";
import { getTenants } from "@redux/slices/tenantsSlice";
import moment from "moment";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

export default function BroadcastTable({ updatePagination, updateSort }) {
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const columns = useMemo(
    () => [
      {
        accessorKey: "title", // simple recommended way to define a column
        header: "Title",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "description", // simple recommended way to define a column
        header: "Description",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "catalogBroadcastMasterDTO.broadcastDescription",
        header: "Broadcast Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "fromDate", // simple recommended way to define a column
        header: "Start Date",
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
      },
      {
        accessorKey: "toDate", // simple recommended way to define a column
        header: "End Date",
        muiTableHeadCellProps: { sx: { color: "green" } }, // optional custom props
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
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
            {Broadcast && Broadcast?.updateInd === true && (
              <IconButton
                onClick={() => {
                  if (loggedInUser.roleMasterDTO.roleId === roleIds.SUPER_ADMIN) {
                    setOpen(true);
                    dispatch(
                      getTenants({
                        pagination: {
                          pageIndex: 0,
                          pageSize: 99999
                        },
                        sortKey: "lastModifiedDate",
                        sortOrder: "DESC",
                        status: "All",
                        searchValue: ""
                      })
                    );
                  } else if (loggedInUser.roleMasterDTO.roleId === roleIds.TENANT_ADMIN) setOpenTenant(true);
                  dispatch(getBroadCastById({ id: row?.original?.broadCastId, roleId: loggedInUserRole }));
                }}
              >
                <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
              </IconButton>
            )}
            {Broadcast?.deleteInd === true && (
              <IconButton onClick={() => alertPopup(row?.original?.broadCastId)}>
                <Typography component="span" variant="span" className="ls-delete deleteRedIcon fs-16"></Typography>
              </IconButton>
            )}
          </Box>
        )
      }
    ],
    []
  );
  if (Broadcast && Broadcast?.deleteInd === false && Broadcast?.updateInd === false) {
    columns.pop();
  }

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openTenant, setOpenTenant] = useState(false);
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));

  const handleClose = () => {
    if (loggedInUser.roleMasterDTO.roleId === roleIds.SUPER_ADMIN) setOpen(false);
    else if (loggedInUser.roleMasterDTO.roleId === roleIds.TENANT_ADMIN) setOpenTenant(false);
  };

  const { data, loading, totalCount, showSuccessPopup, popupMessage, action, error } = useSelector(
    (state) => state.broadCasts
  );
  const [deleteId, setDeleteId] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [isChecked, setIsChecked] = useState(false);

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
      updateSort(sorting ?? []);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  const handleClosePopup = () => {
    dispatch(setShowSuccessPopup(false)); // Close the popup
    dispatch(setPopupMessage(""));
    handleClose();
  };
  const handleCloseDeleteConfirmationPopup = () => {
    setOpenLogoutDialog(false); // Close the popup
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false); // Close the popup
    handleClose();
  };
  const alertPopup = (broadCastId) => {
    setOpenLogoutDialog(true);
    setDeleteId(broadCastId);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const deleteBroadcast = async () => {
    const id = deleteId;
    try {
      const response = await dispatch(deleteBroadCast({ id, roleId: loggedInUserRole }));
      if (deleteBroadCast.fulfilled.match(response)) {
        setShowDeletePopup(true);
      }
      const typeParts = response.type.split("/");
      const status = typeParts[typeParts.length - 1].trim();
      setShowDeletePopup(true);
      setOpenLogoutDialog(false);
      setTimeout(() => {
        handleCloseDeletePopup();
      }, 60000);
      if (status === "rejected") {
        setShowFailPopup(true);
      } else {
        setShowDeletePopup(true);
      }
      console.log(response);
    } catch (error) {
      console.log(error, "catch");
      setShowFailPopup(true);
    }
  };
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("broadcastTable")) || {};

  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  const columnKeys = [
    "title",
    "description",
    "catalogBroadcastMasterDTO.broadcastDescription",
    "fromDate",
    "toDate",
    "actions"
  ];

  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));
  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("broadcastTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("broadcastTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  return (
    <Box className="table__wrapper boardcastTable">
      {loading ? (
        <Loader />
      ) : (
        data && (
          <Box className="sticky-last-col-table">
            <MaterialReactTable
              columns={columns}
              data={data}
              enableColumnOrdering // enable some features
              enableRowSelection={false}
              enableFullScreenToggle={false}
              enableDensityToggle={false}
              enableFilters={false}
              onColumnVisibilityChange={setColumnVisibility}
              enablePagination={true} // disable a default feature
              onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
              state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
              tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
              enablePinning
              initialState={{ columnPinning: { right: ["actions"] } }}
              positionActionsColumn="last"
              muiTablePaginationProps={{
                rowsPerPageOptions: [10],
                showFirstButton: true,
                showLastButton: true
              }}
              manualPagination={true}
              manualSorting={true}
              onSortingChange={setSorting}
              onPaginationChange={setPagination}
              rowCount={totalCount}
            />
          </Box>
        )
      )}
      {open && (
        <CreateBroadcast
          open={open}
          handleClose={handleClose}
          callType={CALLTYPES.Edit}
          showSuccessPopup={showSuccessPopup}
          setShowSuccessPopup={setShowSuccessPopup}
        />
      )}
      {openTenant && <CreateTenantBroadcast open={openTenant} handleClose={handleClose} callType={CALLTYPES.Edit} />}

      {openLogoutDialog && (
        <Modal
          open={openLogoutDialog}
          onClose={handleCloseDeleteConfirmationPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Are You Sure ?
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              You want to Delete
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
                onClick={handleCloseDeleteConfirmationPopup}
              >
                No
              </Button>

              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={() => {
                  deleteBroadcast();
                }}
                disabled={!isChecked}
              >
                Yes
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
      {showDeletePopup && (
        <Modal
          open={showSuccessPopup}
          onClose={handleCloseDeletePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-description" className="modal-modal-description">
              {popupMessage}
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleCloseDeletePopup}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}
    </Box>
  );
}
