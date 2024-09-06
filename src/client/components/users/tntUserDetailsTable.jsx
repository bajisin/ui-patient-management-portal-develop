import { Box, Chip, Popover, Typography } from "@mui/material";
import { CALLTYPES, roleIds } from "../../_helpers/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import AdvanceSearch from "../tenant/tenant-details/user-details/advance-search";
import ClientDetailsDrawer from "../drawers/client-details";
import Loader from "../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import SearchComponent from "@components/search";
import dayjs from "dayjs";
import { getTenantUserById } from "@redux/slices/usersSlice";
import { getTenantUsers } from "@redux/slices/tenantsSlice";

// import AdvanceFilterIcon from "@assets/images/ls_svg/advance-filter.svg";

export default function ClientDetailsTable({
  tab,
  calluser,
  updatePagination,
  updateSort,
  handleFilter,
  searchVal,
  selectedTenantId,
  // updateSearch = () => {},
  setSelectedStatus,
  selectedStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedTenant,
  roles,
  usersId,
  pagination: propPagination,
  setPagination: propSetPagination,
  sortKey,
  sortOrder,
  setRenderParent,
  setTenantRole,
  setClientTab,
  clientTab,
  setTenantId
}) {
  const renderFacilities = (value) => {
    if (value?.length >= 0) return <span>{value?.map((val, i) => val?.facilityName).join(", ")}</span>;
  };

  const renderLabs = (value) => {
    if (value?.length >= 0) return <span>{value?.map((val, i) => val?.labName).join(", ")}</span>;
  };
  const statusCell = (value) => {
    if (value === "Active") return <Chip className="chip__btn chip__btn--green" label={value} />;
    else if (value === "Inactive") return <Chip className="chip__btn chip__btn--red" label={value} />;
  };
  // const statusCell = (value) => {
  //   if (value.toLowerCase() === "pending") return <Chip className="chip__btn chip__btn--yellow" label={value} />;
  //   else if (value.toLowerCase() === "completed") return <Chip className="chip__btn chip__btn--green" label={value} />;
  //   else if (value.toLowerCase() === "rejected") return <Chip className="chip__btn chip__btn--red" label={value} />;
  // };
  const columns = useMemo(
    () => [
      {
        accessorKey: "userFirstName", // simple recommended way to define a column
        header: "First Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },

      {
        accessorKey: "userLastName", // simple recommended way to define a column
        header: "Last Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "userId", // simple recommended way to define a column
        header: "ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "userEmail", // simple recommended way to define a column
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "userPhoneNo", // simple recommended way to define a column
        header: "Phone Number",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "userAddress", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "joiningDate", // simple recommended way to define a column
        header: "Date",
        Cell: ({ cell }) => <span>{cell.getValue() && dayjs(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
      },
      {
        accessorKey: "userCity", // simple recommended way to define a column
        header: "City",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "userCountry", // simple recommended way to define a column
        header: "Country",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "userState", // simple recommended way to define a column
        header: "State",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "status.statusDesc", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue())
        // Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );
  // const [searchVal, setSearchVal] = useState("");

  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("ClientDetailsTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "userFirstName",
    "userLastName",
    "userId",
    "userEmail",
    "userPhoneNo",
    "userAddress",
    "joiningDate",
    "userCity",
    "userCountry",
    "userState",
    "status.statusDesc"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("ClientDetailsTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("ClientDetailsTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const { pageIndex: propPageIndex = 0, pageSize: propPageSize = 10 } = propPagination || {};
  const updateSearch = (value) => {
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: pagination.pageIndex,
          pageSize: pagination.pageSize
        },
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder?.toUpperCase() || "DESC",
        searchValue: value || "",
        tenantId: getTenantId(),
        roleId: roles,
        role: getLoggedInUserRoleId(),
        userId: [getLoggedInUserRoleId() === roleIds.TENANT_ADMIN ? usersId : selectedTenantId],
        statusId: [],
        startDate,
        endDate
      })
    );
  };

  // Use state to manage pagination locally
  const [pagination, setPagination] = useState({
    pageIndex: propPageIndex,
    pageSize: propPageSize
  });
  useEffect(() => {
    const userstatusId = selectedStatus?.map((t) => t.id);
    if (
      ((location[0] === "client-admin-users" && pathname === "/tenant-admin-users") || location[0] !== "tenant-config",
      getLoggedInUserRoleId() !== roleIds.TENANT_ADMIN)
    ) {
      dispatch(
        getTenantUsers({
          pagination: {
            pageNo: pagination.pageIndex,
            pageSize: pagination.pageSize
          },
          sortKey: sortKey || "lastModifiedDate",
          sortOrder: sortOrder?.toUpperCase() || "DESC",
          searchValue: searchVal || "",
          tenantId: getTenantId(),
          roleId: roles,
          role: getLoggedInUserRoleId(),
          userId: usersId === undefined ? [selectedTenantId] : [usersId || selectedTenantId],
          statusId: userstatusId,
          startDate,
          endDate
        })
      );
    }
  }, [pagination.pageIndex, sortKey, sortOrder]);

  useEffect(() => {
    if (getLoggedInUserRoleId() === roleIds.TENANT_ADMIN) {
      if (searchVal?.length > 0) {
        dispatch(
          getTenantUsers({
            pagination: {
              pageNo: pagination.pageIndex,
              pageSize: pagination.pageSize
            },
            sortKey: sortKey || "lastModifiedDate",
            sortOrder: sortOrder.toUpperCase() || "DESC",
            searchValue: searchVal || "",
            tenantId: getTenantId(),
            roleId: roles,
            role: getLoggedInUserRoleId(),
            userId: usersId === undefined || usersId === null ? [] : [usersId],
            statusId: [],
            startDate,
            endDate
          })
        );
      }
    }
  }, [searchVal]);

  const dispatch = useDispatch();

  const clientCols = columns;
  const providerCols = columns.filter((col) => col.accessorKey !== "userLabs" && col.accessorKey !== "userFacilities");
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const navigate = useNavigate();
  const { tenantUsers: data, loading, totalCount } = useSelector((state) => state.tenants);
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  // const [rowCount, setRowCount] = useState(0);
  // const [paginations, setPaginations] = useState({
  //   pageIndex: 0,
  //   pageSize: 10 // customize the default page size
  // });
  const renderUserDetails = (selectedUserId, roleId) => {
    setTenantId(selectedUserId);
    if (roleId == roleIds.CLIENT_ADMIN) {
      setClientTab(true);
    }
  };

  const fetchTenantUserData = (data) => {
    // dispatch an action for getusertenants
    const userstatusId = selectedStatus?.map((t) => t.id);
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: getLoggedInUserRoleId() === roleIds.TENANT_ADMIN ? pagination.pageIndex : pagination.pageIndex,
          pageSize: getLoggedInUserRoleId() === roleIds.TENANT_ADMIN ? pagination.pageSize : pagination.pageSize
        },
        sortKey: sortKey || "lastModifiedDate",
        sortOrder: sortOrder?.toUpperCase() || "DESC",
        searchValue: searchVal || "",
        tenantId: getTenantId(),
        roleId: tab === "client" ? [roleIds.CLIENT_ADMIN] : roles,
        role: getLoggedInUserRoleId(),
        userId: [usersId || selectedTenantId],
        statusId: userstatusId,
        startDate,
        endDate
      })
    );
  };
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
  }, [pagination?.pageIndex, pagination?.pageSize, sorting]);

  const [filterOpen, setFilterOpen] = useState(false);
  // useEffect(() => {
  //   if (getLoggedInUserRoleId() === roleIds.TENANT_ADMIN) {
  //     fetchTenantUserData();
  //   }
  // }, []);

  useEffect(() => {
    if (Object.keys(rowSelection).length > 0) {
      if (getLoggedInUserRoleId() === roleIds.TENANT_ADMIN) {
        if (tab === "client") {
          setOpenDrawer(false);

          navigate(`/tenant-admin-users/client-admin/${data[Object.keys(rowSelection)[0]].userId}/user-details`);
        } else if (tab === "provider") {
          setOpenDrawer(true);
        }
      } else if (getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN) {
        navigate(`/client-admin-users/${data[Object.keys(rowSelection)[0]].userId}/order-details`);
      }
    }
  }, [rowSelection, data, navigate]);

  useEffect(() => {
    getLoggedInUserRoleId() === 1
      ? fetchTenantUserData(data)
      : dispatch(
          getTenantUserById(
            data[Object.keys(rowSelection)[0]]?.userId === undefined
              ? data[0]?.userId
              : data[Object.keys(rowSelection)[0]]?.userId
          )
        );
  }, [rowSelection, pagination]);

  const location = useLocation()?.pathname?.slice(1).split("/");
  const { pathname } = useLocation();
  // const userId = selectedTenant || pathname.split("/")[3];
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const openDrawers = (value) => {
    setOpenDrawer(value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box className="table__wrapper positioned-search trail-class">
      {location.length === 4 && (
        <Box className="list__header px-3 position-relative order-report-title list__header--height">
          <Typography component="h5" variant="h5">
            {totalCount} {tab === "client" ? "Client Admins found" : "Provider found"}
          </Typography>
          {/* <img
          src={AdvanceFilterIcon}
          alt="advance-filter"
          className="advance__filter-wrapper"
          onClick={() => setFilterOpen(true)}
        /> */}
          <Box className="icons-separted mt-1">
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
                      calluser={calluser}
                      selectedTenantId={selectedTenantId}
                      setFilterOpen={setFilterOpen}
                      filterOpen={filterOpen}
                      call="users"
                      callType={CALLTYPES.clearUsers}
                      userId={usersId}
                      setSelectedStatus={setSelectedStatus}
                      selectedStatus={selectedStatus}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      roles={roles}
                      setSelectedDateRange={setSelectedDateRange}
                      selectedDateRange={selectedDateRange}
                    />
                  </Typography>
                </Popover>
              </div>
            </>
            <SearchComponent
              updateSearch={updateSearch}
              setStartDate={setStartDate}
              startDate={startDate}
              setEndDate={setEndDate}
              endDate={endDate}
            />
          </Box>
        </Box>
      )}
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={tab === "client" ? clientCols : tab === "provider" && providerCols}
          data={data}
          enableColumnOrdering // enable some features
          enableMultiRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          // enableColumnFilters={false}
          enableFilters={false}
          onColumnVisibilityChange={setColumnVisibility}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={tab === "client" && setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          muiTableBodyRowProps={({ row }) => ({
            // implement row selection click events manually
            onClick: () => {
              setRowSelection((prev) => ({
                ...prev,
                [row.id]: !prev[row.id]
              }));
              renderUserDetails(row?.original?.userId, row?.original?.role?.roleId);
            },
            selected: rowSelection[row.id],
            sx: {
              cursor: "pointer"
            }
          })}
          manualPagination={true}
          manualSorting={true}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          rowCount={totalCount}
        />
      )}
      {/* <AdvanceSearch
        calluser={calluser}
        selectedTenantId={selectedTenantId}
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        call="users"
        callType={CALLTYPES.clearUsers}
        userId={usersId}
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        roles={roles}
      /> */}
      {openDrawer && (
        <ClientDetailsDrawer
          isOpen={openDrawer}
          toggleDrawer={openDrawers}
          setOpenDrawer={setOpenDrawer}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      )}
    </Box>
  );
}
