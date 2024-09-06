import React, { useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { useSelector } from "react-redux";

const LabProviderDetailsTable = () => {
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
        accessorKey: "phoneNumber", // simple recommended way to define a column
        header: "Phone Number",
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
  //   const [data, setData] = useState([]);

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);

  const { labCilentOrder: data, loading } = useSelector((state) => state.tenants);
  // const navigate = useNavigate();
  // if (Object.keys(rowSelection).length > 0) {
  //   navigate(`/labs/lab-parent-Order-Tab/${data[Object.keys(rowSelection)[0]].labId}`);
  // }

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
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          // enableColumnFilters={false}
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
          //   muiTableBodyRowProps={({ row }) => ({
          //     // implement row selection click events manually
          //     onClick: () =>
          //       setRowSelection((prev) => ({
          //         ...prev,
          //         [row.id]: !prev[row.id]
          //       })),
          //     selected: rowSelection[row.id],
          //     sx: {
          //       cursor: "pointer"
          //     }
          //   })}
        />
      )}
    </Box>
  );
};
export default LabProviderDetailsTable;
