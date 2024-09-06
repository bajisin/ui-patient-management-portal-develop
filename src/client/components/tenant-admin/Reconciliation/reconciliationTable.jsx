import { Box, Chip } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import OrderReports from "../../drawers/orderReports";
import { getOrderDetails } from "@redux/slices/tenantsSlice";
import { getOrderDetailsById } from "../../../redux/slices/tenantsSlice";
import moment from "moment";
import { statusIds } from "../../../_helpers/constants";

export default function ReconciliationTable({
  updatePagination,
  updateSort,
  searchKeys,
  searchVal,
  startDate,
  endDate,
  sortOrder,
  sortKey,
  setSortKey,
  selectedOrderType,
  selectedPriorityType,
  setSelectedserviceDesc,
  selectedserviceDesc
}) {
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
        header: "Associated With",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "globalPatientId", // simple recommended way to define a column
        header: "Patient ID",
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
        accessorKey: "orderDate", // simple recommended way to define a column
        header: "Created Date and Time",
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
      },
      // {
      //   accessorKey: "process", // simple recommended way to define a column
      //   header: "Processed Date and Time",
      //   Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY HH:mm:ss")}</span> // optional custom cell render
      // },
      {
        accessorKey: "statusId", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue(), cell.row.original.statusDescription)
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("ReconciliationTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "orderId",
    "createBy",
    "provider",
    "globalPatientId",
    "firstName",
    "lastName",
    "orderDate",
    "statusId"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("ReconciliationTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("ReconciliationTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const { orderDetails: data, loading, totalCount } = useSelector((state) => state.tenants);
  const [rowSelection, setRowSelection] = useState({});
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [sorting, setSorting] = useState([]);
  const tableInstanceRef = useRef(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const dispatch = useDispatch();
  const fetchData = () => {
    const statusId = selectedserviceDesc.map((t) => t.id);
    // dispatch an action for gettenants
    dispatch(
      getOrderDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "ASC",
        searchValue: searchVal,
        searchKeys,
        sortKey: sortKey || "lastModifiedDate",
        sortBy: "",
        orderStatus: [statusIds.ERRORED],
        orderType: selectedOrderType,
        priorityType: selectedPriorityType,
        roleId: getLoggedInUserRoleId(),
        startDate,
        endDate,
        tenantId: getTenantId()
      })
    );
  };
  const toggleDrawerOrderDetails = (open, row) => (event) => {
    setIsOpenOrderDetails(open);
  };
  // if (Object.keys(rowSelection).length > 0) {
  //   console.log(rowSelection);
  // }
  useEffect(() => {
    fetchData();
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
    <Box className="table__wrapper">
      {isOpenOrderDetails && <OrderReports isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} setIsOpenOrderDetails={setIsOpenOrderDetails}
/>}
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
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          // enableColumnFilters={false}
          enableFilters={false}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          rowCount={totalCount}
          // enableRowActions={true}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          onColumnVisibilityChange={setColumnVisibility}
          muiTableBodyRowProps={({ row }) => ({
            // implement row selection click events manually

            onClick: () => {
              dispatch(
                getOrderDetailsById({
                  orderId: row?.original?.orderId,
                  roleId: getLoggedInUserRoleId(),

                  tenantId: getTenantId()
                })
              );
              setIsOpenOrderDetails(true);
            }
          })}
          manualPagination={true}
          manualSorting={true}
        />
      )}
    </Box>
  );
}
