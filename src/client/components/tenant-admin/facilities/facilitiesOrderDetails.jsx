import { Box, Chip, Popover, Typography } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";

import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import OrderAdvanceSearch from "./OrderAdvanceSearch";
import SearchComponent from "../../search";
import moment from "moment";
import { statusIds } from "../../../_helpers/constants";
import { useSelector } from "react-redux";

const FacilitiesOrderDetailsTable = ({ updateSearch, sortOrder, sortKey, pagination, facilityId }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "tenantAdmin", // simple recommended way to define a column
        header: "tenant Admin",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "clientAdmin", // simple recommended way to define a column
        header: "Client Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "provider", // simple recommended way to define a column
        header: "Provider Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderId", // simple recommended way to define a column
        header: "Order Id",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "globalPatientId", // simple recommended way to define a column
        header: "Patient Id",
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
        accessorKey: "creationDate", // simple recommended way to define a column
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
        accessorKey: "prtyDesc", // simple recommended way to define a column
        header: "Priority Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "orderTypeDesc", // simple recommended way to define a column
        header: "Order Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "createdBy", // simple recommended way to define a column
        header: "Created By",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "testCount", // simple recommended way to define a column
        header: "Test Count",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "statusDTO.statusId", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue(), cell.row.original.statusDTO.statusDesc) // optional custom cell render
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

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [selectedDateRange, setSelectedDateRange] = useState("");

  const { orderList: data, loading } = useSelector((state) => state.facilities);
  const [selectedStatus, setSelectedStatus] = useState([]);

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
                  <OrderAdvanceSearch
                    setFilterOpen={setFilterOpen}
                    filterOpen={filterOpen}
                    data={data}
                    sortKey={sortKey}
                    sortOrder={sortOrder}
                    pagination={pagination}
                    facilityId={facilityId}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
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
            data={data}
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
      {/* <OrderAdvanceSearch
        setFilterOpen={setFilterOpen}
        filterOpen={filterOpen}
        data={data}
        sortKey={sortKey}
        sortOrder={sortOrder}
        pagination={pagination}
        facilityId={facilityId}
      /> */}
    </>
  );
};
export default FacilitiesOrderDetailsTable;
