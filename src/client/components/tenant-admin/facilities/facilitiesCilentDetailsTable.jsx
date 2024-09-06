import { Box, Chip, Popover, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FacilitiesTabsAdvancefilter from "./ClientAdvanceSearch";
import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import SearchComponent from "../../search";
import moment from "moment";

const FacilitiesClientDetailsTable = ({
  updateSearch,
  updatePagination,
  updateSort,
  sortOrder,
  sortKey,
  facilityId
}) => {
  const statusCell = (value) => {
    if (value?.toLowerCase() === "pending") return <Chip className="chip__btn chip__btn--yellow" label={value} />;
    else if (value?.toLowerCase() === "active") return <Chip className="chip__btn chip__btn--green" label={value} />;
    else if (value?.toLowerCase() === "inactive") return <Chip className="chip__btn chip__btn--red" label={value} />;
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
        accessorKey: "clientId", // simple recommended way to define a column
        header: "Id",
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
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "address", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "associatedWith", // simple recommended way to define a column
        header: "Associated With",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "facilityId", // simple recommended way to define a column
        header: "Facility",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "creationDate", // simple recommended way to define a column
        header: "Date",
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
      },
      {
        accessorKey: "statusDesc", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue()) // optional custom cell render
      }
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);

  const { clientList, loading, totalCount } = useSelector((state) => state.facilities);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);

  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [selectedserviceDesc, setSelectedserviceDesc] = useState([]);

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
        <Box className="icons-separted mt-2">
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
                  <FacilitiesTabsAdvancefilter
                    setFilterOpen={setFilterOpen}
                    filterOpen={filterOpen}
                    data={clientList}
                    sortOrder={sortOrder}
                    sortKey={sortKey}
                    pagination={pagination}
                    Id={facilityId}
                    setSelectedserviceDesc={setSelectedserviceDesc}
                    selectedserviceDesc={selectedserviceDesc}
                    setSelectedDateRange={setSelectedDateRange}
                    selectedDateRange={selectedDateRange}
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
            data={clientList}
            enableColumnOrdering // enable some features
            enableRowSelection={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
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
          />
        )}
      </Box>
      {/* <FacilitiesTabsAdvancefilter
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        data={clientList}
        sortOrder={sortOrder}
        sortKey={sortKey}
        pagination={pagination}
        Id={facilityId}
      /> */}
    </>
  );
};
export default FacilitiesClientDetailsTable;
