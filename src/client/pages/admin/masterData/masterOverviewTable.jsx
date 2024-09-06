import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import { useAuth0 } from "@auth0/auth0-react";

const MasterOverviewTable = ({ updatePagination, updateSort }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "tenantLogo", // simple recommended way to define a column
        header: "Logo",
        enableSorting: false,
        Cell: ({ cell }) => <img src={cell.getValue()} alt="logo" /> // optional custom cell render
      },
      {
        accessorKey: "tenantName", // simple recommended way to define a column
        header: "Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantId", // simple recommended way to define a column
        header: "Tenant ID",
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
  //   const [data, setData] = useState([]);
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("MasterOverviewTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = ["tenantLogo", "tenantName", "tenantId", "emailAddress", "phoneNumber"];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("MasterOverviewTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("MasterOverviewTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const navigate = useNavigate();
  const { tenantList, loading, totalCount } = useSelector((state) => state.tenants);
  const [sorting, setSorting] = useState([]);

  // store pagination state in your own state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [pagenationUpdated, setPaginationUpdated] = useState(false);

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

  if (Object.keys(rowSelection).length > 0) {
    navigate(`/master-data/master-tenant-details/${tenantList[Object.keys(rowSelection)[0]].tenantId}/about-us`);
  }

  return (
    <Box className="table__wrapper">
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={tenantList}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          onColumnVisibilityChange={setColumnVisibility}
          // enableColumnFilters={false}
          enableFilters={false}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
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
          rowCount={totalCount}
          onPaginationChange={setPagination}
        />
      )}
    </Box>
  );
};

export default MasterOverviewTable;
