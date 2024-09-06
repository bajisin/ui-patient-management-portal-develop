import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import { Chip } from "@mui/material";
import { Lab } from "../../../_helpers/constants";
import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import { useAuth0 } from "@auth0/auth0-react"

const LabsDetailsTable = ({ updatePagination, updateSort }) => {
  const statusCell = (value) => {
    if (value === "Active") return <Chip className="chip__btn chip__btn--green" label={value} />;
    else if (value === "Inactive") return <Chip className="chip__btn chip__btn--red" label={value} />;
  };
  const columns = useMemo(
    () => [
      // {
      //     accessorKey: "labId", // simple recommended way to define a column
      //     header: "Lab Id",
      //     muiTableHeadCellProps: { sx: { color: "green" } }, // optional custom props
      //     Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      //   },
      {
        accessorKey: "labName", // simple recommended way to define a column
        header: "Lab Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "city", // simple recommended way to define a column
        header: "Loaction",
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
      // {
      //   accessorKey: "tests", // simple recommended way to define a column
      //   header: "Services",
      //   Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      // },
      {
        accessorKey: "statusDTO.statusDesc", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue())
        // Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );
  //   const [data, setData] = useState([]);

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  // const [rowCount, setRowCount] = useState(0);
  useEffect(() => {
    // do something when the pagination state changes
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

  const { data, loading, totalCount } = useSelector((state) => state.labs);
  const navigate = useNavigate();
  if (Object.keys(rowSelection).length > 0) {
    navigate(`/labs/lab-details/${data[Object.keys(rowSelection)[0]].labId}/client-details`);
  }

  return (
    <Box className="table__wrapper">
      {loading ? (
        <Loader />
      ) : (
        <>
          {Lab.readInd === true ? (
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
              state={{ rowSelection, pagination, sorting }} // manage your own state, pass it back to the table (optional)
              tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
              muiTablePaginationProps={{
                rowsPerPageOptions: [10],
                showFirstButton: true,
                showLastButton: true
              }}
              rowCount={totalCount}
              muiTableBodyRowProps={({ row }) => ({
                // implement row selection click events manually
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
              manualPagination={true}
              manualSorting={true}
              onSortingChange={setSorting}
              onPaginationChange={setPagination}
            />
          ) : (
            "You dont have access to read the content"
          )}
        </>
      )}
    </Box>
  );
};
export default LabsDetailsTable;
