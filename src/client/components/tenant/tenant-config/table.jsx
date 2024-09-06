import { Box, Chip } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import TenantDefaultLogo from "../../../assets/images/TenantDefaultLogo.png";
import { statusIds } from "../../../_helpers/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TenantTable({ updatePagination, updateSort, value, setPagination }) {
  const statusCell = (value) => {
    if (value?.statusId === statusIds.PENDING)
      return <Chip className="chip__btn chip__btn--yellow" label={value?.statusDesc} />;
    else if (value?.statusId === statusIds.ACTIVE)
      return <Chip className="chip__btn chip__btn--green" label={value?.statusDesc} />;
    else if (value?.statusId === statusIds.IN_ACTIVE)
      return <Chip className="chip__btn chip__btn--red" label={value?.statusDesc} />;
  };
  const [stateImage] = useState(false);
  const columns = useMemo(
    () => [
      {
        accessorKey: "tenantLogo", // simple recommended way to define a column
        header: "Logo",
        enableSorting: false,
        Cell: ({ cell }) => <img src={stateImage ? TenantDefaultLogo : cell.getValue()} />
      },
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
        accessorKey: "emailAddress", // simple recommended way to define a column
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "phoneNumber", // simple recommended way to define a column
        header: "Phone Number",
        Cell: ({ cell }) => <span>{cell.getValue() !== "null" ? cell.getValue() : ""}</span> // optional custom cell render
      },
      {
        accessorKey: "contractStart", // simple recommended way to define a column
        header: "Contract Start",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "contractEnd", // simple recommended way to define a column
        header: "Contract End",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "clientsCount", // simple recommended way to define a column
        header: "Client Count",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "providersCount", // simple recommended way to define a column
        header: "Provider Count",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "patientsCount", // simple recommended way to define a column
        header: "Patient Count",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },

      {
        accessorKey: "country", // simple recommended way to define a column
        header: "Country",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "state", // simple recommended way to define a column
        header: "State",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "city", // simple recommended way to define a column
        header: "City",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "streetAddress", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span>
      },
      {
        accessorKey: "status", // simple recommended way to define a column
        header: "Tenant Status",
        Cell: ({ cell }) => statusCell(cell.getValue())
      }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("TenantTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "tenantLogo",
    "tenantName",
    "tenantId",
    "emailAddress",
    "phoneNumber",
    "contractStart",
    "contractEnd",
    "clientsCount",
    "providersCount",
    "patientsCount",
    "country",
    "state",
    "city",
    "streetAddress",
    "status"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("TenantTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("TenantTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const navigate = useNavigate();
  const { tenantList, loading, totalCount } = useSelector((state) => state.tenants);
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  // store pagination state in your own state
  const [pagination, setPaginations] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });

  useEffect(() => {
    // do something when the pagination state changes

    if (pagination.pageIndex > 0) {
      updatePagination(pagination);
      setPaginationUpdated(true);
    }
    if (pagenationUpdated) {
      updatePagination(pagination);
      setPaginations(pagination);
    }
    if (sorting.length > 0) {
      updateSort(sorting ?? []);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  if (Object.keys(rowSelection).length > 0) {
    navigate(`/tenant-config/tenant-details/${tenantList[Object.keys(rowSelection)[0]].tenantId}/user-details`);
  }
  const UpdatedtenantList = tenantList;
  const formattedTenantList = UpdatedtenantList.map((s) => {
    const startDate = s.contractStart;
    const endDate = s.contractEnd;
    const [startYear, startMonth, startDay] = startDate.split("-");
    const [endYear, endMonth, endDay] = endDate.split("-");
    const formattedStart = `${startMonth}-${startDay}-${startYear}`;
    const formattedEnd = `${endMonth}-${endDay}-${endYear}`;
    return {
      ...s,
      contractStart: formattedStart,
      contractEnd: formattedEnd
    };
  });
  return (
    <Box className="table__wrapper">
      {formattedTenantList?.length >= 10 ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <Box className="sticky-first-col-table">
              <MaterialReactTable
                columns={columns}
                data={formattedTenantList}
                onColumnVisibilityChange={setColumnVisibility}
                enableColumnOrdering // enable some features
                enableMultiRowSelection={false}
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableFilters={false}
                enablePagination={true} // disable a default feature
                manualPagination={true}
                manualSorting={true}
                onSortingChange={setSorting}
                rowCount={totalCount}
                onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
                state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
                tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
                muiTablePaginationProps={{
                  rowsPerPageOptions: [10],
                  showFirstButton: true,
                  showLastButton: true
                }}
                muiTableBodyRowProps={({ row }) => ({
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
                onPaginationChange={(setPagination, setPaginations)}
                enablePinning
                initialState={{ columnPinning: { left: ["tenantLogo"] } }}
              />
            </Box>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <MaterialReactTable
              columns={columns}
              data={formattedTenantList}
              enableColumnOrdering // enable some features
              enableMultiRowSelection={false}
              enableFullScreenToggle={false}
              enableDensityToggle={false}
              onColumnVisibilityChange={setColumnVisibility}
              enableFilters={false}
              enablePagination={true} // disable a default feature
              manualPagination={true}
              manualSorting={true}
              onSortingChange={setSorting}
              rowCount={totalCount}
              onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
              state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
              tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
              muiTablePaginationProps={{
                rowsPerPageOptions: [10],
                showFirstButton: true,
                showLastButton: true
              }}
              muiTableBodyRowProps={({ row }) => ({
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
              onPaginationChange={(setPagination, setPaginations)}
              enablePinning
              initialState={{ columnPinning: { left: ["tenantLogo"] } }}
            />
          )}
        </>
      )}
    </Box>
  );
}
