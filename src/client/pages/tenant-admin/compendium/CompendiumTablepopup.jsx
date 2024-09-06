import { Box, Button, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import Tooltip from '@mui/material/Tooltip';

import ErrorIcon from "@mui/icons-material/Error";
import { MaterialReactTable } from "material-react-table";
import Modal from "@mui/material/Modal";
import checkmarkSuccess from "../../../assets/images/svg/checkmarkSuccess.svg";
import { saveExcelFile } from "@redux/slices/compendiumSlice";
import { useDispatch } from "react-redux";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

export default function CompendiumTablepopup({ onClose, testResponse, isOpen, setOpen, setShowFailurePopup }) {
  const [warning, setWarning] = useState(false);
  const columns = useMemo(
    () => [
      {
        accessorKey: "test.testDescription", // simple recommended way to define a column
        header: "Test Description",
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
                  {row.original.test.testDescription}
                </span>
              ) : (
                row.original.test.testDescription
              )}
            </span>
          );
        }
      },
      {
        accessorKey: "test.orderCode", // simple recommended way to define a column
        header: "Order Code",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "test.labCorpSendOut", // simple recommended way to define a column
        header: "Lab Corp Send Out",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "test.labCorpAlias", // simple recommended way to define a column
        header: "Lab Corp Alias",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "specimenType.description", // simple recommended way to define a column
        header: "Specimen Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "prefContainerType.name", // simple recommended way to define a column
        header: "Container Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },

      {
        accessorKey: "prefContainerType.description", // simple recommended way to define a column
        header: " Container description",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "alternateContainerType.name", // simple recommended way to define a column
        header: "Alternate Container Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "alternateContainerType.description", // simple recommended way to define a column
        header: "Description",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderType.description", // simple recommended way to define a column
        header: "Orderable Type ",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "dept.description", // simple recommended way to define a column
        header: "Performing Dept",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "workGroup.description", // simple recommended way to define a column
        header: "Work Group",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },

      {
        accessorKey: "instrument.description", // simple recommended way to define a column
        header: "Instrument",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "test.tat", // simple recommended way to define a column
        header: "TAT",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "test.cost", // simple recommended way to define a column
        header: "Cost",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "testCompendium.cptCodes", // simple recommended way to define a column
        header: "CPT Codes",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "testCompendium.loincCode", // simple recommended way to define a column
        header: "LOINC Code",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "testCompendium.loincDescription", // simple recommended way to define a column
        header: "LOINC Description",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "testCompendium.minVol", // simple recommended way to define a column
        header: "Min Vol",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      }
    ],
    []
  );

  const getErrorMessage = (rowValue) => {
    let messages = [];
    if (rowValue.testCompendium?.repeatedExcelStatus) {
      messages.push(rowValue.testCompendium?.repeatedExcelMessage);
    }
    
    if (rowValue.testCompendium?.spcmnCntnrOrdrbleDeptWorkgrpInstrmentExist) {
      messages.push(rowValue.testCompendium?.specimenTypeId?.message);
    }
  
    if (rowValue.testCompendium?.testCodeDescExits) {
      messages.push(rowValue.testCompendium?.testCodeDescExistMessage);
    }
    if(rowValue.testCompendium?.mandatoryFieldStatus){
      messages.push("Please fill Mandator fields");
    }
    if(rowValue.testCompendium?.repeatedExcelStatus || rowValue.testCompendium?.spcmnCntnrOrdrbleDeptWorkgrpInstrmentExist
      || rowValue.testCompendium?.testCodeDescExits || rowValue.testCompendium?.mandatoryFieldStatus){
        setWarning(true);
      }
      else{
        setWarning(false);
      }
  
    return messages.filter(Boolean).join(", ");
  };
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("CompendiumTablepopup")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "testCompendium.minVol",
    "testCompendium.loincDescription",
    "testCompendium.loincCode",
    "testCompendium.cptCodes",
    "test.cost",
    "test.tat",
    "instrument.description",
    "workGroup.description",
    "orderType.description",
    "dept.description",
    "alternateContainerType.description",
    "alternateContainerType.name",
    "prefContainerType.description",
    "prefContainerType.name",
    "specimenType.description",
    "test.labCorpAlias",
    "test.labCorpSendOut",
    "test.orderCode",
    "test.testDescription"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("CompendiumTablepopup", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("CompendiumTablepopup", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const dispatch = useDispatch();
  const tableInstanceRef = useRef(null);
  const [rowSelection, setRowSelection] = useState({});
  const [formattedData, setFormattedData] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setPopupMessage] = useState("");
  useEffect(() => {
    // Format your data and setFormattedData when testResponse changes
    const formattedData = testResponse.map((item) => ({
      test: item.testCode,
      specimenType: item.specimenTypeId,
      prefContainerType: item.prefContainerType,
      alternateContainerType: item.alternateContainerType,
      orderType: item.orderableTypeId,
      dept: item.deptId,
      workGroup: item.workGroupId,
      instrument: item.instrumentId,
      testCompendium: item,
      specimenFrozenId: item.specimenFrozenId
    }));
    setFormattedData(formattedData);
  }, [testResponse]);
  const handleSubmit = async () => {
    const payload = {
      createdBy: getLoggedInUserId(),
      roleId: getLoggedInUserRoleId(),
      testCompendiumValidationResponseDTO: formattedData

        ?.map((item) => {
          if (
            !(
              item?.testCompendium?.nullValueExist ||
              item?.testCompendium?.spcmnCntnrOrdrbleDeptWorkgrpInstrmentExist ||
              item?.testCompendium?.testCodeDescExits ||
              item?.testCompendium?.repeatedExcelStatus
            )
          ) {
            return {
              testCompendiumId: item?.testCompendium?.testCompendiumId,
              testCode: {
                testId: item?.test?.testId,
                testDescription: item?.test?.testDescription,
                orderCode: item?.test?.orderCode,
                labCorpSendOut: item?.test?.labCorpSendOut,
                labCorpAlias: item?.test?.labCorpAlias,
                tat: item?.test?.tat,
                cost: item?.test?.cost
              },
              specimenTypeId: {
                id: item?.specimenType?.id,
                description: item?.specimenType?.description,
                recDelInd: item?.specimenType?.recDelInd,
                status: item?.specimenType?.status,
                roleId: item?.specimenType?.roleId,
                message: item?.specimenType?.message,
                spcimenTypeToBeInsertedInMasterTable: item?.specimenType?.spcimenTypeToBeInsertedInMasterTable
              },
              prefContainerType: {
                id: item?.prefContainerType?.id,
                description: item?.prefContainerType?.description,
                name: item?.prefContainerType?.name,
                roleId: item?.prefContainerType?.roleId,
                recDelInd: item?.prefContainerType?.recDelInd,
                status: item?.prefContainerType?.status,
                createdBy: item?.prefContainerType?.createdBy,
                containerTypeToBeInsertedInMasterTable: item?.prefContainerType?.containerTypeToBeInsertedInMasterTable,
                containerTypeMessage: item?.prefContainerType?.containerTypeMessage
              },
              alternateContainerType: {
                id: item?.alternateContainerType?.id,
                description: item?.alternateContainerType?.description,
                name: item?.alternateContainerType?.name,
                roleId: item?.alternateContainerType?.roleId,
                recDelInd: item?.alternateContainerType?.recDelInd,
                status: item?.alternateContainerType?.status,
                createdBy: item?.alternateContainerType?.createdBy,
                containerTypeToBeInsertedInMasterTable:
                  item?.alternateContainerType?.containerTypeToBeInsertedInMasterTable,
                containerTypeMessage: item?.alternateContainerType?.containerTypeMessage
              },
              orderableTypeId: {
                id: item?.orderType?.id,
                description: item?.orderType?.description,
                roleId: item?.orderType?.roleId,
                recDelInd: item?.orderType?.recDelInd,
                status: item?.orderType?.status7,
                orderableTypeToBeInsertedInMasterTable: item?.orderType?.orderableTypeToBeInsertedInMasterTable,
                message: item?.orderType?.message
              },
              deptId: {
                id: item?.dept?.id,
                description: item?.dept?.description,
                roleId: item?.dept?.roleId,
                recDelInd: item?.dept?.recDelInd,
                status: item?.dept?.status,
                departmentToBeInsertedInMasterTable: item?.dept?.departmentToBeInsertedInMasterTable,
                message: item?.dept?.message
              },
              workGroupId: {
                id: item?.workGroup?.id,
                description: item?.workGroup?.description,
                roleId: item?.workGroup?.roleId,
                recDelInd: item?.workGroup?.recDelInd,
                status: item?.workGroup?.status,
                workGroupToBeInsertedInMasterTable: item?.workGroup?.workGroupToBeInsertedInMasterTable,
                message: item?.workGroup?.message
              },
              specimenFrozenId: {
                id: item?.specimenFrozenId?.id,
                description: item?.specimenFrozenId?.description,
                roleId: item?.specimenFrozenId?.roleId,
                recDelInd: item?.specimenFrozenId?.recDelInd,
                status: item?.specimenFrozenId?.status,
                spcimenTypeToBeInsertedInMasterTable: item?.specimenFrozenId?.frozenToBeInsertedInMasterTable,
                message: item?.specimenFrozenId?.message
              },
              instrumentId: {
                id: item?.instrument?.id,
                description: item?.instrument?.description,
                roleId: item?.instrument?.roleId,
                recDelInd: item?.instrument?.recDelInd,
                status: item?.instrument?.status,
                instrumentToBeInsertedInMasterTable: item?.instrument?.instrumentToBeInsertedInMasterTable,
                message: item?.instrument?.message
              },
              cptCodes: item?.testCompendium?.cptCodes,
              minVol: item?.testCompendium?.minVol,
              val15mo: item?.testCompendium?.val15mo,
              loincCode: item?.testCompendium?.loincCode,
              loincDescription: item?.testCompendium?.loincDescription,
              // roleId: item?.testCompendium?.roleId,
              mandatoryFieldStatus: item?.testCompendium?.mandatoryFieldStatus,
              repeatedExcelStatus: item?.testCompendium?.repeatedExcelStatus,
              testCodeDescExits: item?.testCompendium?.testCodeDescExits,
              nullValueExist: item?.testCompendium?.nullValueExist,
              spcmnCntnrOrdrbleDeptWorkgrpInstrmentExist:
                item?.testCompendium?.spcmnCntnrOrdrbleDeptWorkgrpInstrmentExist,
              specimenFrozen: item?.testCompendium?.specimenFrozen,
              nullExistMessage: item?.testCompendium?.nullExistMessage,
              repeatedExcelMessage: item?.testCompendium?.repeatedExcelMessage,
              testCodeDescExistMessage: item?.testCompendium?.testCodeDescExistMessage
            };
          }
        })
        .filter((item) => item)
    };
    let action;
    if (payload?.testCompendiumValidationResponseDTO?.length > 0) {
      try {
        action = await dispatch(saveExcelFile(payload));
        if (saveExcelFile.fulfilled.match(action)) {
          setShowSuccessPopup(true);
          setPopupMessage(action?.payload);
        }
      } catch (error) {}
    }
  };
  const handleClose = () => {
    setShowSuccessPopup(false);
    onClose();
    setOpen(false);
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
          <IconButton aria-label="close" onClick={onClose} className="modalClose">
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>

          <Typography component="h4" variant="h4">
            Test Compendiums
          </Typography>
          {warning && <div style={{ color: "#FF0000", marginTop: "10px" }}>All records in the File contains errors. Please review and correct the data before proceeding.
           </div>}
          <DialogContent>
            <MaterialReactTable
              columns={columns}
              data={formattedData}
              enableColumnOrdering // enable some features
              enableRowSelection={false}
              enableFullScreenToggle={false}
              enableDensityToggle={false}
              // enableColumnFilters={false}
              enableFilters={false}
              enablePagination={true} // disable a default feature
              // enableRowActions={true}
              positionActionsColumn="last"
              // manualPagination={true}
              // manualSorting={true}
              onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
              state={{ rowSelection }} // manage your own state, pass it back to the table (optional)
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
                <b>Please upload valid excel file </b>
              </Typography>
              <Button autoFocus type="submit" className="primary-btn" onClick={() => setShowFailurePopup(false)}>
                Okay
              </Button>
            </Box>
          </Modal>
        )} */}
      </Dialog>
    </>
  );
}
