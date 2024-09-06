import { Box, Chip, Popover, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

import AdvanceSearch from "../../tenant/tenant-details/user-details/advance-search";
import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import SearchComponent from "../../search";
import moment from "moment";
import { useSelector } from "react-redux";

const LabCilentDetailsTable = ({
  updatePagination,
  updateSort,
  updateSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  value
}) => {
  const statusCell = (value) => {
    if (value === "Active") return <Chip className="chip__btn chip__btn--green" label={value} />;
    else if (value === "Inactive") return <Chip className="chip__btn chip__btn--red" label={value} />;
  };
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
        accessorKey: "userId", // simple recommended way to define a column
        header: "Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "emailAddrs", // simple recommended way to define a column //emailAddrs
        header: "Email Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "phoneNumber", // simple recommended way to define a column
        header: "Phone Number",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "address", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "associatedWithDTO", // simple recommended way to define a column
        header: "Associated With",
        Cell: ({ cell }) => (
          <span>{`${cell.getValue()?.associatedUserFirstName} ${cell.getValue()?.associatedUserMiddleName} ${
            cell.getValue()?.associatedUserLastName
          }`}</span>
        ) // optional custom cell render
      },
      {
        accessorKey: "facilityName", // simple recommended way to define a column
        header: "Facility",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "creationDate", // simple recommended way to define a column
        header: "Date",
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
      },
      {
        accessorKey: "statusDTO.statusDesc", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue())
      }
    ],
    []
  );
  //   const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // const { loading: patientLoader, totalCount: patientCount, patientsList } = useSelector((state) => state.tenants);

  const { clientList, loading, totalCount } = useSelector((state) => state.labs);

  // const navigate = useNavigate();
  // if (Object.keys(rowSelection).length > 0) {
  //   navigate(`/labs/lab-parent-Order-Tab/${data[Object.keys(rowSelection)[0]].labId}`);
  // }

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
  };
  // const [rowCount, setRowCount] = useState(0);
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
    <>
      <Box className="table__wrapper positioned-search mt-2">
        <Box className="icons-separted">
          {/* <img
            src={AdvanceFilterIcon}
            alt="advance-filter"
            className="advance__filter-wrapper"
            onClick={() => handleFilter()}
          /> */}
          {/* <Typography
            onClick={() => handleFilter()}
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
                    setSelectedStatus={setSelectedStatus}
                    call="Client Details"
                    selectedStatus={selectedStatus}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    value={value}
                    setSelectedDateRange={setSelectedDateRange}
                    selectedDateRange={selectedDateRange}
                  />
                </Typography>
              </Popover>
            </div>
          </>
          <SearchComponent updateSearch={updateSearch} />
        </Box>
        {loading ? (
          <Loader />
        ) : (
          <MaterialReactTable
            columns={columns}
            data={clientList}
            // data={patientsList || []}
            enableColumnOrdering // enable some features
            enableRowSelection={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            // enableColumnFilters={false}
            enableFilters={false}
            enablePagination={true} // disable a default feature
            onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
            state={{ rowSelection, pagination, sorting }} // manage your own state, pass it back to the table (optional)
            tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
            muiTablePaginationProps={{
              rowsPerPageOptions: [10],
              showFirstButton: true,
              showLastButton: true
            }}
            manualPagination={true}
            manualSorting={true}
            onSortingChange={setSorting}
            onPaginationChange={setPagination}
            rowCount={totalCount}
            //   muiTableBodyRowProps={({ row }) => ({
            //     // implement row selection click events manually
            //     onClick: () =>
            //       setRowSelection((prev) => ({
            //         ...prev,
            //         [row.id]: !prev[row.id]
            //       })),
            //     selected: rowSelection[row.id],
            //     sx: {
            //       cursor: "pointer"
            //     }
            //   })}
          />
        )}
      </Box>
      {/* <AdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        setSelectedStatus={setSelectedStatus}
        call="Client Details"
        selectedStatus={selectedStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        value={value}
      /> */}
    </>
  );
};
export default LabCilentDetailsTable;
