import { Box, Chip, Grid, Popover, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { roleIds, statusIds } from "../../../../_helpers/constants";
import { useDispatch, useSelector } from "react-redux";

import AdvanceSearch from "./advance-search";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import OrderReports from "../../../drawers/orderReports";
import SearchComponent from "@components/search";
import { getOrderDetailsById } from "../../../../redux/slices/tenantsSlice";
import { getTenantId } from "../../../../utils/common";
import moment from "moment";
import { useLocation } from "react-router-dom";

export default function OrderList({
  updateSearch,
  updatePagination,
  updateSort,
  setPriorityType,
  priorityType,
  setSelectedStatus,
  selectedStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedType,
  setSelectedType
}) {
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
        accessorKey: "orderId", // simple recommended way to define a column
        header: "Order Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderTypeDescription", // simple recommended way to define a column
        header: "Order Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "priorityDesc", // simple recommended way to define a column
        header: "Priority Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderDate", // simple recommended way to define a column
        header: "Order Date",
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
      },
      {
        accessorKey: "emailAddrs", // simple recommended way to define a column
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "phoneNumber", // simple recommended way to define a column
        header: "Phone Number",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "globalPatientId", // simple recommended way to define a column
        header: "Patient ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "tenantAdmin", // simple recommended way to define a column
        header: "Tenant Admin",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "clientAdmin", // simple recommended way to define a column
        header: "Client Admin",
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
        accessorKey: "createdBy", // simple recommended way to define a column
        header: "Created By",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorFn: (row) => row.statusDTO?.statusId || row.statusId, // smple recommended way to define a column
        header: "Status",
        // Cell: ({ cell }) => <span>{<Chip className="chip__btn chip__btn--yellow" label={cell.getValue()} />}</span> // optional custom cell render
        Cell: ({ cell }) =>
          statusCell(cell.getValue(), cell.row.original.statusDescription || cell.row.original.statusDTO.statusDesc)
      }
    ],
    []
  );

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
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("OrderList")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "firstName",
    "lastName",
    "orderId",
    "orderTypeDescription",
    "priorityDesc",
    "orderDate",
    "emailAddr",
    "phoneNumber",
    "globalPatientId",
    "tenantAdmin",
    "clientAdmin",
    "provider",
    "testCount",
    "createBy",
    "statusDescription"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("OrderList", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("OrderList", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const { loading, totalCount, orderList, orderDetails } = useSelector((state) => state.tenants);
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const saTenantId = pathname.split("/")[3];
  const tenantId = loggedInUser?.roleMasterDTO?.roleId === roleIds.SUPER_ADMIN ? saTenantId : getTenantId();
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [customPickerOpen, setCustomPickerOpen] = useState(false);

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

  const [filterOpen, setFilterOpen] = useState(false);
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);

  const toggleDrawerOrderDetails = (open) => (event) => {
    setIsOpenOrderDetails(open);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFilter = () => {
    setFilterOpen(true);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box className="table__wrapper positioned-search">
      {isOpenOrderDetails && <OrderReports isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} setIsOpenOrderDetails={setIsOpenOrderDetails}
 />}
      <Box className="list__header px-3 position-relative order-report-title list__header--height">
        <Typography component="h5" variant="h5">
          {totalCount} Orders found
        </Typography>
        <Box className="icons-separted">
          {/* <Typography
            onClick={() => setFilterOpen(true)}
            component="span"
            variant="span"
            className="ls-advance-filter advance__filter-wrapper"
          ></Typography> */}
          <>
            <Typography
              onClick={handleClick}
              aria-describedby={id}
              component="span"
              variant="span"
              className="ls-advance-filter advance__filter-wrapper"
            ></Typography>
            <div>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleFilter}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
              >
                <Typography sx={{ p: 2 }} className="advance-filter--popover">
                  <AdvanceSearch
                    setFilterOpen={setFilterOpen}
                    filterOpen={filterOpen}
                    setPriorityType={setPriorityType}
                    priorityType={priorityType}
                    setSelectedStatus={setSelectedStatus}
                    selectedStatus={selectedStatus}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    customPickerOpen={customPickerOpen}
                    setCustomPickerOpen={setCustomPickerOpen}
                    selectedDateRange={selectedDateRange}
                    setSelectedDateRange={setSelectedDateRange}
                  />
                </Typography>
              </Popover>
            </div>
          </>
          <SearchComponent updateSearch={updateSearch} />
        </Box>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={orderList?.length ? orderList : orderDetails}
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
          manualPagination={true}
          manualSorting={true}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          rowCount={totalCount}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setRowSelection((prev) => ({
                ...prev,
                [row.id]: !prev[row.id]
              }));
              setIsOpenOrderDetails(true);
              dispatch(
                getOrderDetailsById({
                  orderId: row?.original?.orderId,
                  roleId: loggedInUser.roleMasterDTO.roleId,
                  tenantId
                })
              );
            },
            selected: rowSelection[row.id],
            sx: {
              cursor: "pointer"
            }
          })}
        />
      )}
      {/* <AdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        setPriorityType={setPriorityType}
        priorityType={priorityType}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      /> */}
    </Box>
  );
}
