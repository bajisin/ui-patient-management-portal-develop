import React, { useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { MaterialReactTable } from "material-react-table";

const FacilitiesInActiveCilentDetailsTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName", // simple recommended way to define a column
        header: "First Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "lastName", // simple recommended way to define a column
        header: "Last Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "id", // simple recommended way to define a column
        header: "Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "emailAddress", // simple recommended way to define a column
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "phoneNo", // simple recommended way to define a column
        header: "Phone Number",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "address", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "associatedWith", // simple recommended way to define a column
        header: "Associated With",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "facility", // simple recommended way to define a column
        header: "Facility",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "date", // simple recommended way to define a column
        header: "Date",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "status", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);

  return (
    <Box className="table__wrapper">
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnOrdering // enable some features
        enableRowSelection={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableFilters={false}
        enablePagination={true} // disable a default feature
        onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
        state={{ rowSelection }} // manage your own state, pass it back to the table (optional)
        tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
        muiTablePaginationProps={{
          rowsPerPageOptions: [10],
          showFirstButton: true,
          showLastButton: true
        }}
      />
    </Box>
  );
};
export default FacilitiesInActiveCilentDetailsTable;
