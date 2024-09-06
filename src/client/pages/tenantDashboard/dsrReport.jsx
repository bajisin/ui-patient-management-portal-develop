import { Box, Button, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import AdvanceFilter from "../../components/advance-filter/index";
import { CSVLink } from "react-csv";
import MaterialReactTable from "material-react-table";
import dayjs from "dayjs";
import { dsrReports } from "@redux/slices/dashboardSlice";
import { getLoggedInUserRoleId } from "@utils/common";
import { useDispatch } from "react-redux";

const DSRReport = ({ data }) => {
  const dispatch = useDispatch();
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customPickerOpen, setCustomPickerOpen] = useState(false);

  const columns = [
    { header: "Tenant Id", accessorKey: "tenantId" },
    { header: "Tenant Name", accessorKey: "tenantName" },
    { header: "Tenant Admin Name", accessorKey: "tenantAdmin" },
    { header: "Client Admin Name", accessorKey: "clientAdmin" },
    { header: "Provider Name", accessorKey: "provider" },
    { header: "Order Id", accessorKey: "orderId" },
    { header: "Test Names", accessorKey: "testDescription" },
    { header: "Order Created By", accessorKey: "createdBy" },
    { header: "Order status", accessorKey: "statusDescription" },
    {
      header: "Order Created Date",
      accessorKey: "createTs",
      Cell: ({ cell }) => {
        return <span>{dayjs(cell.getValue()).format("YYYY-MM-DD HH:mm:ss")}</span>; // Modify date value here
      }
    },
    { header: "Order Type", accessorKey: "orderTypeDescription" },
    { header: "Priority Code", accessorKey: "priorityDesc" },
    { header: "Patient Name", accessorKey: "firstName" },
    {
      header: "Patient DOB",
      accessorKey: "birthDate",
      Cell: ({ cell }) => {
        return <span>{dayjs(cell.getValue()).format("YYYY-MM-DD")}</span>;
      }
    },
    { header: "Patient Id", accessorKey: "patientId" }
  ];

  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("DSRReport")) || {};
  const tenantId = JSON.parse(sessionStorage.getItem("userDetails"))?.tenantId;

  // Define a default value function
  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  // Define an array of column keys
  const columnKeys = [
    "tenantId",
    "tenantName",
    "tenantAdmin",
    "clientAdmin",
    "provider",
    "orderId",
    "testDescription",
    "createdBy",
    "statusDescription",
    "createTs",
    "orderTypeDescription",
    "priorityDesc",
    "firstName",
    "birthDate",
    "patientId"
  ];

  // Create an object with column visibility settings
  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("DSRReport", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("DSRReport", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);
  const [reportsRes, setreportsRes] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilter = () => {
    setFilterOpen(true);
  };

  useEffect(() => {
    dispatch(
      dsrReports({
        pageNo: 0,
        pageSize: 99999,
        searchValue: "",
        sortKey: "lastModifiedDate",
        sortOrder: "ASC",
        tenantId,
        roleId: getLoggedInUserRoleId()
      })
    ).then((r) => {
      setreportsRes(r.payload.data.data);
    });
  }, []);
  let csvData = [];
  if (reportsRes) {
    csvData = [
      [
        "Tenant Id",
        "Tenant Name",
        "Tenant Admin Name",
        "Client Admin Name",
        "Provider Name",
        "Order Id",
        "Test Names",
        "Order Created By",
        "Order status",
        "Order Created Date",
        "Order Type",
        "Priority Code",
        "Patient Name",
        "Patient DOB",
        "Patient Id"
      ],
      ...reportsRes.map(
        ({
          tenantId,
          tenantName,
          tenantAdmin,
          clientAdmin,
          provider,
          orderId,
          testDescription,
          createdBy,
          statusDescription,
          createTs,
          orderTypeDescription,
          priorityDesc,
          firstName,
          birthDate,
          patientId
        }) => [
          tenantId,
          tenantName,
          tenantAdmin,
          clientAdmin,
          provider,
          orderId,
          testDescription,
          createdBy,
          statusDescription,
          createTs,
          orderTypeDescription,
          priorityDesc,
          firstName,
          birthDate,
          patientId
        ]
      )
    ];
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setFilterOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box className="content__wrapper">
      <Typography component="div" variant="div" className="content__wrapper--header mb-0">
        <Typography component="h4" variant="h4">
          Daily Service Report <br />
          <Typography component="span" variant="span">
            Get an overview of orders
          </Typography>
        </Typography>
        <Box className="d-flex align-items-center">
          <Button contained="text" className="downloadBtn-text me-2">
            <CSVLink data={csvData} filename={"daily_service_report.csv"}>
              Export
            </CSVLink>
          </Button>
          <Box className="title__wrapper--right d-flex gap20">
            <Box className="icons-separted">
              {/* <Typography
                onClick={() => handleFilter()}
                component="span"
                variant="span"
                className="ls-advance-filter advance__filter-wrapper me-0"
              ></Typography> */}
              <>
                <Typography
                  onClick={handleClick}
                  aria-describedby={id}
                  component="span"
                  variant="span"
                  data-cy="AdvanceFilter"
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
                      <AdvanceFilter
                        setFilterOpen={setFilterOpen}
                        filterOpen={filterOpen}
                        list="dsr"
                        setSelectedDateRange={setSelectedDateRange}
                        selectedDateRange={selectedDateRange}
                        setStart={setStart}
                        start={start}
                        end={end}
                        setEnd={setEnd}
                        setStartDate={setStartDate}
                        startDate={startDate}
                        setEndDate={setEndDate}
                        endDate={endDate}
                        setCustomPickerOpen={setCustomPickerOpen}
                        customPickerOpen={customPickerOpen}
                        setreportsRes={setreportsRes}
                      />
                    </Typography>
                  </Popover>
                </div>
              </>
            </Box>
          </Box>
          {/* <AdvanceFilter setFilterOpen={setFilterOpen} filterOpen={filterOpen} list="dsr" /> */}
        </Box>
      </Typography>

      {data === null ? (
        ""
      ) : (
        <MaterialReactTable
          columns={columns}
          data={reportsRes}
          onColumnVisibilityChange={setColumnVisibility}
          state={{ columnVisibility }}
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableFilters={false}
          enableDensityToggle={false}
          enablePagination={false} // disable a default feature
        />
      )}
    </Box>
  );
};

export default DSRReport;
