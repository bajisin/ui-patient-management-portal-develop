import { Box, Chip } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Loader from "../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import OrderReports from "@components/drawers/orderReports";
import { useSelector } from "react-redux";

export default function OrderReportsTable({ updatePagination, updateSort }) {
  const statusCell = (value) => {
    if (value.toLowerCase() === "pending") return <Chip className="chip__btn chip__btn--yellow" label={value} />;
    else if (value.toLowerCase() === "completed") return <Chip className="chip__btn chip__btn--green" label={value} />;
    else if (value.toLowerCase() === "rejected") return <Chip className="chip__btn chip__btn--red" label={value} />;
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "tenantName", // simple recommended way to define a column
        header: "Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantId", // simple recommended way to define a column
        header: "ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
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
        accessorKey: "orderId", // simple recommended way to define a column
        header: "Order Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "patientId", // simple recommended way to define a column
        header: "Patient Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderDate", // simple recommended way to define a column
        header: "Date",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantEmail", // simple recommended way to define a column
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantPhoneNumber", // simple recommended way to define a column
        header: "Phone Number",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderTypeDto.name", // simple recommended way to define a column
        header: "Order Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "client", // simple recommended way to define a column
        header: "Cilent",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "provider", // simple recommended way to define a column
        header: "Provider",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "testCount", // simple recommended way to define a column
        header: "Test Count",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderStatusDto.name", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue()) // optional custom cell render
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("OrderReportsTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "firstName",
    "tenantName",
    "lastName",
    "tenantId",
    "orderId",
    "tenantEmail",
    "patientId",
    "provider",
    "orderTypeDto.name",
    "client",
    "tenantPhoneNumber",
    "orderDate",
    "testCount",
    "orderStatusDto.name"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("OrderReportsTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("OrderReportsTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const { ordersAndReports: data, loading } = useSelector((state) => state.tenants);
  const [rowSelection, setRowSelection] = useState({});
  const [orderRecord, setOrderRecord] = useState({});
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const tableInstanceRef = useRef(null);
  const [isOpenOrderReports, setIsOpenOrderReports] = useState(false);
  const toggleDrawerOrderReports = (open, row) => (event) => {
    setIsOpenOrderReports(open);
    setOrderRecord(row);
  };

  useEffect(() => {
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
    <Box className="table__wrapper">
      {isOpenOrderReports && (
        <OrderReports isOpen={isOpenOrderReports} orderData={orderRecord} toggleDrawer={toggleDrawerOrderReports} />
      )}

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
          enableFilters={false}
          onColumnVisibilityChange={setColumnVisibility}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          enableRowActions={false}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setIsOpenOrderReports(true);
              setOrderRecord(row.original);
            }
          })}
        />
      )}
    </Box>
  );
}
