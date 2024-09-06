import { Box, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { getOrderTemplateById } from "../../../../redux/slices/ordertemplateSlice";

export default function OrderTemplatePopUp({ isOpen, orderData, toggleDrawer, updatePagination }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "testName", // simple recommended way to define a column
        header: "Test Name",
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

  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("OrderTemplatePopUp")) || {};

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
      sessionStorage.setItem("OrderTemplatePopUp", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("OrderTemplatePopUp", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const { ordertestTemplate: data, loading } = useSelector((state) => state.orders);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orderData) {
      dispatch(
        getOrderTemplateById({
          tenantId: getTenantId(),
          roleId: getLoggedInUserRoleId(),
          orderTemplateId: orderData?.orderTemplateId
        })
      );
    }
  }, [orderData]);
  const handleBack = () => {
    toggleDrawer(false)();
  };

  return (
    <Dialog aria-labelledby="Add Tenants" open={isOpen} enableResize={true} className="commonModal__wrapper">
      <Box className="commonModal__wrapper--dialog tenantTemplate">
        <IconButton aria-label="close" className="modalClose">
          <CloseIcon onClick={handleBack} />
        </IconButton>
        <DialogTitle>{orderData?.orderTemplateName}</DialogTitle>
        <DialogContent>
          <Box className="table__wrapper">
            {loading ? (
              <Loader />
            ) : (
              <MaterialReactTable
                columns={columns}
                onColumnVisibilityChange={setColumnVisibility}
                data={data?.orderTemplateDetails}
                enableColumnOrdering // enable some features
                enableRowSelection={false}
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableFilters={false}
                enablePagination={true} // disable a default feature
                onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
                state={{ rowSelection, columnVisibility }} // manage your own state, pass it back to the table (optional)
                tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
                muiTablePaginationProps={{
                  rowsPerPageOptions: [10],
                  showFirstButton: true,
                  showLastButton: true
                }}
              />
            )}
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
