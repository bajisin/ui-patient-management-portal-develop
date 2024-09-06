import React, { useEffect, useMemo, useRef, useState } from "react";

import { Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

export default function CreateOrderTemplateTable({ data }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "testName", // simple recommended way to define a column
        header: "Test Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "panelName", // simple recommended way to define a column
        header: "Panel Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );
  // const { ordersAndReports: data, loading } = useSelector((state) => state.tenants);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  // const { loading } = useSelector((state) => state.orders);
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("CreateOrderTemplateTable")) || {};

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
      sessionStorage.setItem("CreateOrderTemplateTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("CreateOrderTemplateTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  return (
    <Box className="table__wrapper">
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnOrdering // enable some features
        enableRowSelection={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        // enableColumnFilters={false}
        onColumnVisibilityChange={setColumnVisibility}
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
      {/* )} */}
    </Box>
  );
}
