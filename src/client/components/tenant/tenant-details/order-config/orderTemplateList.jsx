import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import OrderTemplatePopUp from "./orderTemplatePopUp";
import { useSelector } from "react-redux";

export default function OrderTemplateList({ updatePagination, updateSort }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "orderTemplateName", // simple recommended way to define a column
        header: "Template Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderTemplateCreateByDTO", // simple recommended way to define a column
        header: "Created By",
        Cell: ({ cell }) => {
          const { firstName, middleName, lastName } = cell.getValue(); // Access the properties
          return <span>{`${firstName} ${middleName} ${lastName}`}</span>; // Display the values
        }
      },
      {
        accessorKey: "createAt", // simple recommended way to define a column
        header: "Create Date",
        Cell: ({ cell }) => <span>{cell.getValue().replace(/T.*/, "")}</span> // optional custom cell render
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("OrderTemplateList")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = ["createAt", "orderTemplateCreateByDTO", "orderTemplateName"];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("OrderTemplateList", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("OrderTemplateList", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const { tenantTemplate: data, orderTemplateList, loading } = useSelector((state) => state.tenants);

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [orderRecord, setOrderRecord] = useState({});
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const toggleDrawerOrderDetails = (open) => (event) => {
    setIsOpenOrderDetails(open);
  };

  // store pagination state in your own state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });

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

  return (
    <Box className="table__wrapper positioned-search">
      {isOpenOrderDetails && (
        <OrderTemplatePopUp
          isOpen={isOpenOrderDetails}
          orderData={orderRecord}
          toggleDrawer={toggleDrawerOrderDetails}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={orderTemplateList}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          onColumnVisibilityChange={setColumnVisibility}
          enableFilters={false}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }}
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          manualPagination={true}
          manualSorting={true}
          onSortingChange={setSorting}
          rowCount={data?.totalCount}
          onPaginationChange={setPagination}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setIsOpenOrderDetails(true);
              setOrderRecord(row.original);
            }
          })}
        />
      )}
    </Box>
  );
}
