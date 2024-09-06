import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Loader from "../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MasterOverviewTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "tenantName", // simple recommended way to define a column
        header: "Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantFname", // simple recommended way to define a column
        header: "First Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantLname", // simple recommended way to define a column
        header: "Last Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantId", // simple recommended way to define a column
        header: "ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "emailAddress", // simple recommended way to define a column
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "phoneNumber", // simple recommended way to define a column
        header: "Phone Number",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);

  const { data, loading } = useSelector((state) => state.tenants);
  const navigate = useNavigate();
  if (Object.keys(rowSelection).length > 0) {
    navigate(`/master-data/master-tenant-details/${data[Object.keys(rowSelection)[0]].tenantId}`);
  }
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("masteroverview")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = ["tenantName", "tenantFname", "tenantLname", "tenantId", "emailAddress", "phoneNumber"];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("masteroverview", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("masteroverview", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  return (
    <Box className="table__wrapper">
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          onColumnVisibilityChange={setColumnVisibility}
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
          muiTableBodyRowProps={({ row }) => ({
            onClick: () =>
              setRowSelection((prev) => ({
                ...prev,
                [row.id]: !prev[row.id]
              })),
            selected: rowSelection[row.id],
            sx: {
              cursor: "pointer"
            }
          })}
        />
      )}
    </Box>
  );
};

export default MasterOverviewTable;
