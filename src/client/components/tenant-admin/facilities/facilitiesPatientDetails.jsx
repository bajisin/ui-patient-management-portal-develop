import { Box, Popover, Typography } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";

import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import PatientAdvanceSearch from "./PatientAdvanceSearch";
import SearchComponent from "../../search";
import { useSelector } from "react-redux";

const FacilitiespatientDetailsTable = ({ updateSearch, sortOrder, sortKey, pagination, facilityId }) => {
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
        header: "Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
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
        accessorKey: "primaryAddrs", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "associatedWith", // simple recommended way to define a column
        header: "Associated With",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
      // {
      //   accessorKey: "testCount", // simple recommended way to define a column
      //   header: "Test Count",
      //   Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      // }
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);

  const { patientList, loading } = useSelector((state) => state.facilities);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
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
    <>
      <Box className="table__wrapper positioned-search">
        <Box className="icons-separted">
          {/* <Typography
            onClick={handleFilter}
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
                  <PatientAdvanceSearch
                    setFilterOpen={setFilterOpen}
                    filterOpen={filterOpen}
                    data={patientList}
                    sortOrder={sortOrder}
                    sortKey={sortKey}
                    pagination={pagination}
                    facilityId={facilityId}
                    selectedDateRange={selectedDateRange}
                    setSelectedDateRange={setSelectedDateRange}
                  />
                </Typography>
              </Popover>
            </div>
          </>
          <SearchComponent updateSearch={updateSearch} />
        </Box>{" "}
        {loading ? (
          <Loader />
        ) : (
          <MaterialReactTable
            columns={columns}
            data={patientList}
            enableColumnOrdering // enable some features
            enableRowSelection={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableFilters={false}
            enablePagination={true} // disable a default feature
            onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
            state={{ rowSelection }} // manage your own state, pass it back to the table (optional)
            tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
            muiTablePaginationProps={{
              rowsPerPageOptions: [10],
              showFirstButton: true,
              showLastButton: true
            }}
          />
        )}
      </Box>
      {/* <PatientAdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        data={patientList}
        sortOrder={sortOrder}
        sortKey={sortKey}
        pagination={pagination}
        facilityId={facilityId}
      /> */}
    </>
  );
};
export default FacilitiespatientDetailsTable;
