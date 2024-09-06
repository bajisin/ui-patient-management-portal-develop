import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import PatientDetails from "../../../drawers/patientDetails";
import SearchComponent from "../../../search";
import { getPatientDetailsById } from "../../../../redux/slices/tenantsSlice";
import { useLocation } from "react-router-dom";

export default function PatientDetailsTable({ updateSearch, updatePagination, updateSort, dataType }) {
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
        accessorKey: "globalPatientId", // simple recommended way to define a column
        header: "ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "emailAddress", // simple recommended way to define a column
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "phoneNumber", // simple recommended way to define a column
        header: "Phone No.",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "primaryAddrs", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "associatedWith.userName", // simple recommended way to define a column
        header: "Associated With",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("PatientDetailsTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "firstName",
    "lastName",
    "patientId",
    "emailAddress",
    "phoneNumber",
    "primaryAddrs",
    "associatedWith.userName"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("PatientDetailsTable", JSON.stringify(columnVisibility));
    }
    if (!allTrue) {
      sessionStorage.setItem("PatientDetailsTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const { patientList, loading: loadingLab, totalCount: labCount } = useSelector((state) => state.labs);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const { patientsList, loading: patientLoader, totalCount: patientCount } = useSelector((state) => state.tenants);
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
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

  const [isOpenPatientDetails, setIsOpenPatientDetails] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const tenantId = pathname.split("/")[3];
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));

  const toggleDrawerPatientDetails = (open) => (event) => {
    setIsOpenPatientDetails(open);
  };

  return (
    <Box className="table__wrapper positioned-search testListSearch__wrapper">
      <Box className="list__header px-3 position-relative order-report-title list__header--height">
        <Typography component="h5" variant="h5">
          {patientCount} Users found
        </Typography>
        <SearchComponent updateSearch={updateSearch} />
      </Box>
      {isOpenPatientDetails && (
        <PatientDetails isOpen={isOpenPatientDetails} toggleDrawer={toggleDrawerPatientDetails} />
      )}
      {patientLoader || loadingLab ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={dataType === "lab" ? patientList : patientsList}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          onColumnVisibilityChange={setColumnVisibility}
          enableDensityToggle={false}
          enableFilters={false}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          manualPagination={true}
          manualSorting={true}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          rowCount={dataType === "lab" ? labCount : patientCount}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setIsOpenPatientDetails(true);
              dispatch(
                getPatientDetailsById({
                  roleId: loggedInUser.roleMasterDTO.roleId,
                  tenantId,
                  patientId: row?.original?.patientId
                })
              );
            }
          })}
        />
      )}
    </Box>
  );
}
