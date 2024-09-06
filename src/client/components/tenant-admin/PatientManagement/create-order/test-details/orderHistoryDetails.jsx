import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { MaterialReactTable } from "material-react-table";

const OrderHitoryDetails = ({ individualTest, isOpen, setOrderPopup, tests, orderDataKey, date }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "orderId", // simple recommended way to define a column
        header: "Order Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "createByName", // simple recommended way to define a column
        header: "Created By",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "testCategory", // simple recommended way to define a column
        header: "Test Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "diagnosticCode", // simple recommended way to define a column
        header: "Diagnosis Code",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
      //   {
      //     accessorKey: "specimenType.description", // simple recommended way to define a column
      //     header: "Specimen Type",
      //     Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      //   }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("OrderHitoryDetails")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = ["testName", "testCategoryType", "panelName"];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("OrderHitoryDetails", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("OrderHitoryDetails", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const tableInstanceRef = useRef(null);
  const [rowSelection, setRowSelection] = useState({});
  let allTest;
  if (individualTest && tests) {
    allTest = [...individualTest, ...tests];
  } else if (individualTest) {
    allTest = [...individualTest];
  } else if (tests) {
    allTest = [...tests];
  }

  return (
    <Dialog
      aria-labelledby="Add Tenants"
      open={isOpen}
      enableResize={true}
      className="commonModal__wrapper createBroadcastModal"
    >
      <Box className="commonModal__wrapper--dialog">
        <IconButton aria-label="close" className="modalClose" onClick={() => setOrderPopup(false)}>
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <DialogTitle className="orderHistory__modal">
          <Typography component="h6" variant="h6">
            Order History
          </Typography>
          <Typography component="div" variant="div" className="order-details">
            <Typography component="div" variant="div" className="order-id-date">
              <Typography variant="label" component="label" className="add__label">
                Order Id : {orderDataKey}
              </Typography>
              <Typography variant="label" component="label" className="add__label">
                Date : {date}
              </Typography>
            </Typography>

            <Chip className="chip__btn chip__btn--green float-end" label="Completed" />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <MaterialReactTable
            columns={columns}
            data={allTest}
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
      </Box>
    </Dialog>
  );
};

export default OrderHitoryDetails;
