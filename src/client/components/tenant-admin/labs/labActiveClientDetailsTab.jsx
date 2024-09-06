import React, { useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { MaterialReactTable } from "material-react-table";

const LabActiveCilentDetailsTable = ({ data }) => {
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
        accessorKey: "cilentid", // simple recommended way to define a column
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
  //   const [data, setData] = useState([]);

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  //   if (!activeTabsData) {
  //     return <div>Loading...</div>; // or some other loading indicator
  //   }
  //   const activeTabsData = labCilentOrder.filter((tab) => tab.status === "active");
  //   const { labCilentOrder } = useSelector((state) => state.tenants);

  // const navigate = useNavigate();
  // if (Object.keys(rowSelection).length > 0) {
  //   navigate(`/labs/lab-parent-Order-Tab/${data[Object.keys(rowSelection)[0]].labId}`);
  // }
  //   console.log(labCilentOrder);
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
      {/* )} */}
    </Box>
  );
};
export default LabActiveCilentDetailsTable;