import { Chip, Popover, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { roleIds, statusIds } from "../../../../_helpers/constants";
import { useDispatch, useSelector } from "react-redux";

import AdvanceSearch from "./advance-search";
import Box from "@mui/material/Box";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import SearchComponent from "@components/search";
import SuccessPopup from "@components/master-data/sucesspopup";
import UpdateStatusDialog from "../updateStatusDialog";
import { getLoggedInUserRoleId } from "@utils/common";
import { getTenantUsers } from "@redux/slices/tenantsSlice";
import { useLocation } from "react-router-dom";

export default function TenantAdminTable({
  updatePagination,
  updateSort,
  updateSearch,
  roles,
  value,
  setRenderParent,
  setTenantRole,
  sortKey,
  sortOrder,
  searchVal,
  setSelectedTenant,
  setRoles,
  setSelectedStatus,
  selectedStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedDateRange,
  setSelectedDateRange,
  setTenantId,
  fetchData,
  setClientTab
}) {
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
        Cell: ({ cell }) => <span>{cell.getValue() !== "null" ? cell.getValue() : ""}</span> // optional custom cell render
      },
      {
        accessorKey: "joiningDate", // simple recommended way to define a column
        header: "Joining Date",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "role.roleName", // simple recommended way to define a column
        header: "Role",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "status", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => {
          if (cell.getValue().statusId === 2 || cell.getValue().statusId === 1) {
            return (
              <>
                {" "}
                <Typography component="label" className="switch" htmlFor="checkboxs">
                  <input type="checkbox" id="checkboxs" checked={cell.getValue().statusId === 1} />
                  <Typography component="div" className="slider round"></Typography>
                </Typography>
                <Typography> {cell.getValue().statusId === 1 ? "Active" : "Inactive"}</Typography>
              </>
            );
          }
        }
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("TenantAdminTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "userFirstName",
    "userLastName",
    "userId",
    "userEmail",
    "userPhoneNo",
    "joiningDate",
    "role.roleName",
    "status"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("TenantAdminTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("TenantAdminTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const { tenantUsers: data, loading, totalCount } = useSelector((state) => state.tenants);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [sorting, setSorting] = useState([]);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const dispatch = useDispatch();

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
  useEffect(() => {
    if (pagenationUpdated === true && value !== undefined && selectedStatus === "") {
      dispatch(
        getTenantUsers({
          pagination: {
            pageNo: pagination.pageIndex,
            pageSize: pagination.pageSize
          },
          sortKey: sortKey || "lastModifiedDate",
          sortOrder: sortOrder.toUpperCase() || "DESC",
          searchValue: searchVal || "",
          tenantId,
          roleId: value === 1 ? [roleIds?.TENANT_ADMIN] : value === 2 ? [roleIds.CLIENT_ADMIN] : [roleIds.PROVIDER],
          role: getLoggedInUserRoleId(),
          userId: []
        })
      );
    } else if (pagenationUpdated === true && value !== undefined) {
      dispatch(
        getTenantUsers({
          pagination: {
            pageNo: pagination.pageIndex,
            pageSize: pagination.pageSize
          },
          sortKey: sortKey || "lastModifiedDate",
          sortOrder: sortOrder.toUpperCase() || "DESC",
          statusId: selectedStatus?.map((s) => s.id),
          startDate,
          endDate,
          searchValue: searchVal || "",
          tenantId,
          roleId: value === 1 ? [roleIds?.TENANT_ADMIN] : value === 2 ? [roleIds.CLIENT_ADMIN] : [roleIds.PROVIDER],
          role: getLoggedInUserRoleId(),
          userId: []
        })
      );
    }
  }, [pagenationUpdated, pagination]);
  const [title, setTitle] = useState("");

  const [filtereddata, setFilteredData] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const { pathname } = useLocation();
  const tenantId = pathname.split("/")[3];
  const renderUserDetails = (selectedUserId, roleId) => { 
    setTenantId(selectedUserId);
    setPagination({ ...pagination, pageIndex: 0 });
    if (roleId == roleIds.TENANT_ADMIN) {
      setRenderParent(false);
      setTenantRole(true);
    } else if (roleId == roleIds.CLIENT_ADMIN) {
      setRenderParent(false);
      setTenantRole(false);
      setClientTab(true);
    }

    if (roles?.length === 1) {
      if (roles[0] === roleIds.TENANT_ADMIN) {
        setTenantRole(true);
        setSelectedTenant(selectedUserId);
      } else if (roles[0] === roleIds.CLIENT_ADMIN) {
        setTenantRole(false);
        setRoles([roleIds?.PROVIDER]);
        dispatch(
          getTenantUsers({
            pagination: {
              pageNo: pagination.pageIndex,
              pageSize: pagination.pageSize
            },
            sortKey: sortKey || "lastModifiedDate",
            sortOrder: sortOrder.toUpperCase() || "DESC",
            searchValue: searchVal || "",
            tenantId,
            roleId: [roleIds?.PROVIDER],
            role: getLoggedInUserRoleId(),
            userId: [selectedUserId]
          })
        );
      }
      setRenderParent(false);
    } else {
      setRenderParent(false);
    }
  };
  const [showActiveSuccessPopup, setShowActiveSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showFailurePopup, setShowFailurePopup] = useState(false);

  useEffect(() => {
    if (getLoggedInUserRoleId() !== roleIds.SUPER_ADMIN) fetchData();
  }, [searchVal, sortOrder, pagination]);
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
      <Box className="list__header px-3 position-relative order-report-title list__header--height">
        <Typography component="h5" variant="h5">
          {data.length === 0 ? 0 : totalCount} Users found
        </Typography>
        <Box className="icons-separted">
          {/* <img
          src={AdvanceFilterIcon}
          alt="advance-filter"
          className="advance__filter-wrapper"
          onClick={() => setFilterOpen(true)}
        /> */}
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
                    roles={roles}
                    call="users"
                    setSelectedStatus={setSelectedStatus}
                    selectedStatus={selectedStatus}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
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
        <Box className="sticky-last-col-table">
          <MaterialReactTable
            columns={columns}
            data={data}
            onColumnVisibilityChange={setColumnVisibility}
            enableColumnOrdering // enable some features
            enableRowSelection={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            onSortingChange={setSorting}
            onPaginationChange={setPagination}
            // enableColumnFilters={false}
            manualPagination={true}
            manualSorting={true}
            rowCount={data?.length > 0 ? totalCount : data?.totalCount}
            enableFilters={false}
            enablePagination={true} // disable a default feature
            onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
            state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
            tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
            // enableRowActions={true}
            enablePinning
            initialState={{ columnPinning: { right: ["status"] } }}
            positionActionsColumn="last"
            muiTablePaginationProps={{
              rowsPerPageOptions: [10],
              showFirstButton: true,
              showLastButton: true
            }}
            muiTableBodyRowProps={({ row }) => ({
              // implement row selection click events manually
              onClick: (event) => {
                event.preventDefault();
                setRowSelection((prev) => ({
                  ...prev,
                  [row.id]: !prev[row.id]
                }));
                if (event.target.classList[2] === "slider") {
                  setRenderParent(true);
                  setOpenLogoutDialog(true);
                  setTitle(
                    `Do you want to ${row?.original?.status?.statusId === 1 ? "inactivate" : "activate"} this User ? `
                  );
                  setFilteredData(row?.original);
                } else if (
                  row?.original?.role?.roleId === roleIds.CLIENT_ADMIN ||
                  row?.original?.role?.roleId === roleIds.TENANT_ADMIN
                )
                  renderUserDetails(row?.original?.userId, row?.original?.role?.roleId);
              },
              selected: rowSelection[row.id],
              sx: {
                cursor: "pointer"
              }
            })}
          />
        </Box>
      )}
      {/* <AdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        roles={roles}
        call="users"
        setSelectedStatus={setSelectedStatus}
        selectedStatus={selectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      /> */}
      {openLogoutDialog && (
        <UpdateStatusDialog
          open={openLogoutDialog}
          setOpen={setOpenLogoutDialog}
          isActive={UpdateStatusDialog}
          title={title}
          filtereddata={filtereddata}
          status={"1"}
          id={"LIF00001"}
          call="Update"
          setShowActiveSuccessPopup={setShowActiveSuccessPopup}
          setSuccessMessage={setSuccessMessage}
          setShowFailurePopup={setShowFailurePopup}
        />
      )}
      {showActiveSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setOpenLogoutDialog(false);
            setShowActiveSuccessPopup(false);
            window.location.reload();
          }}
          successMessage={successMessage}
          call="tenantUser"
        />
      )}
    </Box>
  );
}
