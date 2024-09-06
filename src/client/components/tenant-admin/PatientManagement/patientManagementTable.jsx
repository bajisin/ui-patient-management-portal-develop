import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { Patient } from "../../../_helpers/constants";
import PatientDetails from "../../drawers/patientDetails";
import { getPatientDetailsById } from "../../../redux/slices/tenantsSlice";
import { getTenantId } from "@utils/common";
import { tntPatientSearch } from "../../../routes/routePaths";

export default function PatientManagementTable({ updatePagination, updateSort, dataType }) {
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
        accessorKey: "patientId", // simple recommended way to define a column
        header: "ID",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "birthDate", // simple recommended way to define a column
        header: "Date of Birth",
        Cell: ({ cell }) => {
          const dateParts = cell.getValue() && cell.getValue()?.split("-");
          const formattedDate = dateParts && `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
          return <span>{formattedDate}</span>;
        }
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
        accessorKey: "secondaryAddrs", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "associatedWith.userName", // simple recommended way to define a column
        header: "Associated With",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderCount", // simple recommended way to define a column
        header: "Order Count",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
      // {
      //   accessorKey: "tesstatCount", // simple recommended way to define a column
      //   header: "Status",
      //   Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      // }
    ],
    []
  );
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("PatientManagementTable")) || {};

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "firstName",
    "lastName",
    "patientId",
    "birthDate",
    "emailAddress",
    "phoneNumber",
    "secondaryAddrs",
    "associatedWith.userName",
    "orderCount"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("PatientManagementTable", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("PatientManagementTable", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const { patientList, loading: loadingLab, totalCount: labCount } = useSelector((state) => state.labs);
  const [rowSelection, setRowSelection] = useState({});
  const [isOpenPatientDetails, setIsOpenPatientDetails] = useState(false);
  const tableInstanceRef = useRef(null);
  const { patientsList, loading: patientLoader, totalCount: patientCount } = useSelector((state) => state.tenants);
  const [sorting, setSorting] = useState([]);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const tenantId = getTenantId();

  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [patientId, setPatientId] = useState();

  const toggleDrawerPatientDetails = (open, row) => (event) => {
    setIsOpenPatientDetails(open);
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
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  const dispatch = useDispatch();

  if (Object.keys(rowSelection).length > 0) {
    const queryParams = {
      param: "createOrder"
    };
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/create-order/${patientId}?${queryString}`);
  }
  return (
    <Box className="table__wrapper positioned-search">
      {patientLoader || loadingLab ? (
        <Loader />
      ) : Patient && Patient.readInd ? ( // Applying ternary operator here
        <MaterialReactTable
          columns={columns}
          data={dataType === "lab" ? patientList : patientsList}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          // enableColumnFilters={false}
          enableFilters={false}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          manualPagination={true}
          onColumnVisibilityChange={setColumnVisibility}
          manualSorting={true}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          rowCount={dataType === "lab" ? labCount : patientCount}
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          // muiTableBodyRowProps={({ row }) => ({
          //   // implement row selection click events manually

          //   onClick: () => {
          //     setRowSelection((prev) => ({
          //       ...prev,
          //       [row.id]: !prev[row.id]
          //     }));
          //     setPatientId(row?.original?.patientId);
          //   }
          // })}

          muiTableBodyRowProps={({ row }) => ({
            // implement row selection click events manually

            onClick: () => {
              if (pathname?.split("/")[1] === tntPatientSearch) {
                setRowSelection((prev) => ({
                  ...prev,
                  [row.id]: !prev[row.id]
                }));
                setPatientId(row?.original?.patientId);
              } else {
                setIsOpenPatientDetails(true);
                dispatch(
                  getPatientDetailsById({
                    roleId: loggedInUser.roleMasterDTO.roleId,
                    tenantId,
                    patientId: row?.original?.patientId
                  })
                );
              }
            }
          })}
        />
      ) : (
        "You don't have access to read the data"
      )}
      {isOpenPatientDetails && (
        <PatientDetails isOpen={isOpenPatientDetails} toggleDrawer={toggleDrawerPatientDetails} />
      )}
    </Box>
  );
}
