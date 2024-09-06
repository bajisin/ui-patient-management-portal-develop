import { Box, Button, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

import ErrorIcon from "@mui/icons-material/Error";
import { MaterialReactTable } from "material-react-table";
import Modal from "@mui/material/Modal";
import checkmarkSuccess from "../../../assets/images/svg/checkmarkSuccess.svg";
import { getLoggedInUserRoleId } from "@utils/common";
import { savePayerExcelFile } from "@redux/slices/compendiumSlice";
import { useDispatch } from "react-redux";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";
import Loader from "../../../utils/Loader";
import Tooltip from '@mui/material/Tooltip';

export default function PayerCompendiumTable({ testResponse, isOpen, onClose, setOpen, setPayerTablePopup }) {
  // const renderCellValue = (value) => {
  //   console.log(value,"value")
  //   if (value?.length > 0) return <span>{value?.map((val, i) => val?.labName).join(", ")}</span>;
  // };
  const [warning, setWarning] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "insuranceCompanyName", // simple recommended way to define a column
        header: "Insurance Name",
        Cell: ({ row }) => {
          const errorMessage = getErrorMessage(row.original);
          const hasError = !!errorMessage; // Convert the errorMessage to a boolean
    
  
          return (
            <span>
              {hasError ? (
                <span>
                  <Tooltip title={errorMessage} arrow>
                    <ErrorIcon className="fs-24 error--bright" />
                  </Tooltip>
                  { row.original.insuranceCompanyName}
                </span>
              ) : (
                row.original.insuranceCompanyName
              )}
            </span>
          );
        }


      },
      {
        accessorKey: "mnemonicCode", // simple recommended way to define a column
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
        header: "Alternative Address",
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
        header: "Default Lab Name",
        Cell: ({ cell }) => (
          <span>
            {
              cell?.getValue() ? cell?.getValue() : "N/A" // Display a fallback text when 'defaultLab' is null
            }
          </span>
        )
      },
      {
        accessorKey: "relationship",
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
      }
    ],
    []
  );
  const getErrorMessage = (rowValue) => {
    let messages = [];
    if (rowValue.flag?.length > 0) {
      setWarning(true);
      rowValue.flag.forEach(error => {
        messages.push(error);
      });
    }
    else {
      setWarning(false);

    }
  
    return messages.filter(Boolean).join(", ");
  };
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("PayerCompendiumTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);
  const [loader, setLoader] = useState(false);

  // Define an array of column keys
  const columnKeys = [
    "groupId",
    "subscriberId",
    "relationship",
    "defaultLab",
    "country",
    "zipCode",
    "state",
    "city",
    "secondaryAddress",
    "primaryAddress",
    "mnemonicCode",
    "insuranceCompanyName"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("PayerCompendiumTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("PayerCompendiumTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const dispatch = useDispatch();
  const tableInstanceRef = useRef(null);
  const [rowSelection, setRowSelection] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setPopupMessage] = useState("");
  const [ failedMessage,  setFailedMessage] = useState("")

  const handleClose = () => {
    setShowSuccessPopup(false);
    onClose();
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoader(true);
    const payload = {
      payerCompendiumDTO: testResponse
        ?.map((item) => {
          if (item?.flag && item.flag.length === 0) {
            return {
              // createdBy: getLoggedInUserId(),
              roleId: getLoggedInUserRoleId(),
              insuranceId: item?.insuranceId,
              mnemonicCode: item?.mnemonicCode,
              payerCode: item?.payerCode,
              insuranceCompanyId: item?.insuranceCompanyId,
              insuranceCompanyName: item?.insuranceCompanyName,
              primaryAddress: item?.primaryAddress,
              secondaryAddress: item?.secondaryAddress,
              city: item?.city,
              state: item?.state,
              zipCode: item?.zipCode,
              country: item?.country,
              defaultLab: item?.defaultLab,
              relationship: item?.relationship,
              subscriberId: item?.subscriberId,
              groupId: item?.groupId
            };
          }
        })
        .filter((item) => item)
    };

    let action;
    if (payload?.payerCompendiumDTO?.length > 0) {
      try {
        action = await dispatch(savePayerExcelFile(payload));
        if (savePayerExcelFile.fulfilled.match(action)) {
          setLoader(false);
          setShowSuccessPopup(true);
          setPopupMessage(action.payload);
        }
        // else{
        //   setWarning(true)
        //   setFailedMessage("failed")
        //   setLoader(false);
        // }
      } catch (error) {
        setLoader(false);
      }
    } else {
      setLoader(false);
      setWarning(true);
    }
  };
  return (
    <>
      <Dialog
        aria-labelledby="Add Tenants"
        open={isOpen}
        enableResize={true}
        className="commonModal__wrapper createBroadcastModal"
      >
        <Box className="commonModal__wrapper--dialog">
        {loader && <Loader />}
          <IconButton aria-label="close" onClick={onClose} className="modalClose">
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>
          <Typography component="h4" variant="h4">
            Payer Compendiums
          </Typography>
          {warning && <div style={{ color: "#FF0000", marginTop: "10px" }}>All records in the File contains errors. Please review and correct the data before proceeding.
           </div>}        
             <DialogContent>
            <MaterialReactTable
              columns={columns}
              data={testResponse}
              enableColumnOrdering // enable some features
              enableRowSelection={false}
              enableFullScreenToggle={false}
              enableDensityToggle={false}
              onColumnVisibilityChange={setColumnVisibility}
              // enableColumnFilters={false}
              enableFilters={false}
              enablePagination={true} // disable a default feature
              // enableRowActions={true}
              positionActionsColumn="last"
              // manualPagination={true}
              // manualSorting={true}
              onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
              state={{ rowSelection, columnVisibility }} // manage your own state, pass it back to the table (optional)
              tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
              muiTablePaginationProps={{
                rowsPerPageOptions: [10],
                showFirstButton: true,
                showLastButton: true
              }}
              enablePinning
              initialState={{ columnPinning: { right: ["actions"] } }}
              // onSortingChange={setSorting}
              // onPaginationChange={setPagination}
              // rowCount={totalCount}
            />
          </DialogContent>
          {warning ? <Button component="button" variant="outlined" className="primary-btn ms-2" onClick={handleClose}>
            Close
          </Button> :
           <Button component="button" variant="outlined" className="primary-btn ms-2" onClick={handleSubmit}>
            Ignore and Upload
          </Button>
          } 
        </Box>
        {showSuccessPopup && (
          <Modal
            open={showSuccessPopup}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="success_modal">
              <img src={checkmarkSuccess} className="successImg modal-success-icon" />
              <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
                {successMessage}
              </Typography>
              <Button autoFocus type="submit" onClick={handleClose} className="primary-btn float-right mt-3">
                Okay
              </Button>
            </Box>
          </Modal>
        )}
        {/* {warning && (
          <Modal
            open={warning}
            onClose={() => setWarning(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="success_modal">
              <img src={warningDeactivate} className="successImg modal-success-icon" />
              <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
                {failedMessage?.length > 0 ? <>
                  <p>Some thing went wrong.</p>
                  <p>Please try again.</p>

                </> : <b>Please upload valid excel file </b>}
              </Typography>
              <Button autoFocus type="submit" className="primary-btn" onClick={() => setPayerTablePopup(false)}>
                Okay
              </Button>
            </Box>
          </Modal>
        )} */}
      </Dialog>
    </>
  );
}
