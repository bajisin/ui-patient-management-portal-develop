import { Box, Chip } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../utils/Loader";
import MaterialReactTable from "material-react-table";
import OrderReports from "@components/drawers/orderReports";
import { getOrderDetailsById } from "@redux/slices/tenantsSlice";
import { statusIds } from "../../../_helpers/constants";

export default function BasicTable({ updatePagination, updateSort, filteredData }) {
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const { totalCount, loading } = useSelector((state) => state.tenants);

  const [rowSelection, setRowSelection] = useState({});
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [sorting, setSorting] = useState([]);
  const dispatch = useDispatch();

  const tableInstanceRef = useRef(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
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

  const statusCell = (value, statusDescription) => {
    if (value === statusIds.IN_PROGRESS)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.DRAFT)
      return <Chip className="chip__btn chip__btn--orange" label={statusDescription} />;
    else if (value === statusIds.ON_HOLD)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.COMPLETED)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.CANCELLED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
    else if (value === statusIds.COMPLETED_IN_PROGRESS_ORDER)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.COMPLETED_CORRECTED_ORDER)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.REJECTED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
    else if (value === statusIds.IN_ACTIVE)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.ACTIVE)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.ERRORED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "orderId", // simple recommended way to define a column
        header: "Order ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "createdBy", // simple recommended way to define a column
        header: "Created By",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "provider", // simple recommended way to define a column
        header: "Provider",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "statusId", // simple recommended way to define a column
        header: "Result Status",
        Cell: ({ cell }) => statusCell(cell.getValue(), cell.row.original.statusDescription)
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("BasicTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = ["provider", "orderId", "createdBy", "statusId"];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("BasicTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("BasicTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const openDrawers = (open) => (event) => {
    setOpenDrawer(false);
  };
  return (
    <Box className="table__wrapper">
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={filteredData || ""}
          enableColumnOrdering
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          enableFilters={false}
          enablePagination={true}
          onRowSelectionChange={setRowSelection}
          onColumnVisibilityChange={setColumnVisibility}
          state={{ rowSelection, pagination, sorting, columnVisibility }}
          tableInstanceRef={tableInstanceRef}
          rowCount={totalCount}
          muiTableBodyRowProps={({ row }) => ({
            // implement row selection click events manually
            onClick: () => {
              setRowSelection((prev) => ({
                ...prev,
                [row.id]: !prev[row.id]
              }));
              // setOpenDrawer(true);
              dispatch(
                getOrderDetailsById({
                  orderId: row?.original?.orderId,
                  roleId: getLoggedInUserRoleId(),
                  tenantId: getTenantId()
                })
              );
              setIsOpenOrderDetails(true);
            },
            selected: rowSelection[row.id],
            sx: {
              cursor: "pointer"
            }
          })}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          manualPagination={true}
          manualSorting={true}
        />
      )}

      {isOpenOrderDetails && (
        <OrderReports
          isOpen={isOpenOrderDetails}
          toggleDrawer={openDrawers}
          setIsOpenOrderDetails={setIsOpenOrderDetails}
        />
      )}
    </Box>
  );
}
