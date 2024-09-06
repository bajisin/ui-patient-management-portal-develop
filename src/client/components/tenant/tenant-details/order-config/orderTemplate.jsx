import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import SearchComponent from "@components/search";
import { useSelector } from "react-redux";

export default function OrderTemplate({ updatePagination, updateSort, updateTestSearch }) {
  const columnsData = useMemo(
    () => [
      {
        accessorKey: "testName", // simple recommended way to define a column
        header: "Test Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "testCategoryType", // simple recommended way to define a column
        header: "Test Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "panelName", // simple recommended way to define a column
        header: "Test Panel",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("OrderTemplate")) || {};

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
      sessionStorage.setItem("OrderTemplate", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("OrderTemplate", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  useEffect(() => {
    // do something when the pagination state changes
    if (pagination?.pageSize !== 10) {
      setPaginationUpdated(true);
    }
    if (pagination?.pageIndex > 0) {
      updatePagination(pagination);
      setPaginationUpdated(true);
    }
    if (pagenationUpdated) {
      updatePagination(pagination);
    }
    if (sorting?.length > 0) {
      updateSort(sorting ?? []);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  const { tenantLists: tenantOrderTests, loading } = useSelector((state) => state.tenants);

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  return (
    <Box className="table__wrapper positioned-search testListSearch__wrapper">
      <Box className="list__header px-3 position-relative order-report-title list__header--height">
        <Typography component="h5" variant="h5">
          {tenantOrderTests?.totalCount} Tests found
        </Typography>
        <SearchComponent updateSearch={updateTestSearch} />
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columnsData}
          onColumnVisibilityChange={setColumnVisibility}
          data={tenantOrderTests.data}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          enableFilters={false}
          onSortingChange={setSorting}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          manualPagination={true}
          manualSorting={true}
          onPaginationChange={setPagination}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          rowCount={tenantOrderTests?.totalCount}
        />
      )}
    </Box>
  );
}
