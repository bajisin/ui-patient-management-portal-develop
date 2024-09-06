/* eslint-disable no-lone-blocks */

import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";
import { ORDERS, Order, statusIds } from "../../../_helpers/constants";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@utils/Loader";
import { MaterialReactTable } from "material-react-table";
import OrderReports from "@components/drawers/orderReports";
import PdfDialog from "@components/drawers/pdfDialog";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { getOrderDetailsById } from "@redux/slices/tenantsSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function OrderReportsTable({ updatePagination, updateSort, fetchData }) {
  let columns = [];
  const navigate = useNavigate();

  const statusCell = (value, statusDescription) => {
    if (value === statusIds.IN_PROGRESS)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.DRAFT)
      return <Chip className="chip__btn chip__btn--orange" label={statusDescription} />;
    else if (value === statusIds.ON_HOLD)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
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
    else if (value === statusIds.YetToBeSubmitted)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
  };
  {
    getLoggedInUserRoleId() !== 3
      ? (columns = useMemo(
          () => [
            {
              accessorKey: "tenantAdmin", // simple recommended way to define a column
              header: "Tenant Admin",
              Cell: ({ cell }) => (
                <span>
                  {cell.getValue()}
                  {cell.row.original.criticalIndicator && <Error style={{ color: "red", marginLeft: 8 }} />}
                </span>
              )
            },
            {
              accessorKey: "clientAdmin", // simple recommended way to define a column
              header: "Client Admin",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "provider", // simple recommended way to define a column
              header: "Provider",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            }, {
              accessorKey: "ormReqId", // simple recommended way to define a column
              header: "ORM Request Id",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "orderId", // simple recommended way to define a column
              header: "Order ID",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "globalPatientId", // simple recommended way to define a column
              header: "Patient ID",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            // {
            //   accessorKey: "paymentTypeId", // simple recommended way to define a column
            //   header: "PaymentType",
            //   Cell: ({ cell }) => (
            //     <span>
            //       {cell.getValue() === 1 ? "Insurance" : cell.getValue() === 2 ? "Client bill" : "Patient pay"}
            //     </span>
            //   ) // optional custom cell render
            // },
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
              accessorKey: "orderDate", // simple recommended way to define a column
              header: "Order Date",
              Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
            },
            {
              accessorKey: "emailAddr", // simple recommended way to define a column
              header: "Email Address",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "phoneNumber", // simple recommended way to define a column
              header: "Phone No.",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "priorityDesc", // simple recommended way to define a column
              header: "Priority Type",
              Cell: ({ cell }) => (
                <span>
                  {cell.getValue().toUpperCase() === "STAT" ? (
                    <Chip className="chip__btn chip__btn--red" label={cell.getValue()} />
                  ) : (
                    <Chip className="chip__btn chip__btn--grey" label={cell.getValue()} />
                  )}
                </span>
              )
            },
            {
              accessorKey: "orderTypeDescription", // simple recommended way to define a column
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
            // {
            //   accessorKey: "reports", // simple recommended way to define a column
            //   header: "Reports",
            //   Cell: ({ cell }) => (
            //     <span>
            //       {
            //         cell?.row?.original?.docUrl?.length > 0 &&
            //         cell?.row?.original?.docUrl &&
            //         cell?.row?.original?.docUrl[0] ? (
            //           <IconButton aria-label="delete">
            //             <VisibilityOutlinedIcon onClick={(e) => handleFilePreview(e)} />
            //           </IconButton>
            //         ) : (
            //           "-"
            //         ) // Display a fallback text when 'defaultreport' is null
            //       }
            //     </span>
            //   )
            //   // optional custom cell render
            // },
            {
              accessorKey: "statusId", // simple recommended way to define a column
              header: "Status",
              Cell: ({ cell }) => statusCell(cell.getValue(), cell.row.original.statusDescription) // optional custom cell render
            },
            {
              accessorKey: "statusId", // simple recommended way to define a column
              header: "Result",
              Cell: ({ row }) => (
                <Box>
                  {row?.original?.orderDocument.find((doc) => doc?.docTypeId === ORDERS.previewDocType) ? (
                    <IconButton>
                      <Typography
                        variant="span"
                        component="span"
                        className="ls-pdf primaryIcon"
                        onClick={() => {
                          setPreviews(true);
                          const API = row?.original?.orderDocument.find(
                            (doc) => doc?.docTypeId === ORDERS.previewDocType
                          );
                          setUrls(API?.docUrl);
                        }}
                      ></Typography>
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Box>
              )
            },
            // {
            //   accessorKey: "Status", // simple recommended way to define a column
            //   header: "Status",
            //   Cell: ({ cell }) =>
            //   <span>{cell?.row?.original?.statusId}</span> // optional custom cell render
            // },
            {
              accessorKey: "actions", // simple recommended way to define a column
              header: " ",
              enableSorting: false,
              enableColumnOrdering: false,
              enableColumnActions: false,
              grow: false, //don't allow this column to grow to fill in remaining space - new in v2.8
              size: 50, //small co
              Cell: ({ row }) => (
                <Box>
                  {/* <IconButton
                    className="viewTextBtn"
                    onClick={() => {
                      setIsOpenOrderDetails(true);
                      setOrderRecord(row.original);
                      dispatch(
                        getOrderDetailsById({
                          orderId: row?.original?.orderId,
                          roleId: getLoggedInUserRoleId(),
                          tenantId: getTenantId()
                        })
                      );
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton> */}
                  {/* {newArray?.length < 0 ? ( */}
                  {/* {row?.original?.orderDocument.find((doc) => doc?.docTypeId === ORDERS.previewDocType) ? (
                    <IconButton>
                      <Typography
                        variant="span"
                        component="span"
                        className="ls-pdf primaryIcon"
                        onClick={() => {
                          setPreviews(true);

                          const API = row?.original?.orderDocument.find(
                            (doc) => doc?.docTypeId === ORDERS.previewDocType
                          );
                          setUrls(API?.docUrl);
                        }}
                      ></Typography>
                    </IconButton>
                  ) : (
                    ""
                  )} */}
                  {/* // ) : ( // "" // )} */}
                  {row.original.hl7queueIndicator ? (
                    "" // Conditionally render edit icon based on the value of 'edit' for the current row
                  ) : (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(row);
                      }}
                    >
                      <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                    </IconButton>
                  )}
                  {/* <IconButton
                    className="viewTextBtn"
                    onClick={() => {
                      const queryParams = {
                        param: "editOrder"
                      };
                      navigate(
                        `/edit-order/${row?.original?.patientId}/${row?.original?.orderId}?${new URLSearchParams(
                          queryParams
                        ).toString()}`
                      );
                    }}
                  >
                    <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                  </IconButton> */}
                </Box>
              )
            }
          ],
          []
        ))
      : (columns = useMemo(
          () => [
            {
              accessorKey: "orderId", // simple recommended way to define a column
              header: "Order ID",
              Cell: ({ cell }) => (
                <span>
                  {cell.getValue()}
                  {cell.row.original.criticalIndicator && <Error style={{ color: "red", marginLeft: 8 }} />}
                </span>
              )
              // Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "globalPatientId", // simple recommended way to define a column
              header: "Patient ID",
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
              accessorKey: "orderDate", // simple recommended way to define a column
              header: "Order Date",
              Cell: ({ cell }) => <span>{moment(cell.getValue()).format("MM-DD-YYYY")}</span> // optional custom cell render
            },
            {
              accessorKey: "emailAddr", // simple recommended way to define a column
              header: "Email Address",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "phoneNumber", // simple recommended way to define a column
              header: "Phone No.",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "priorityDesc", // simple recommended way to define a column
              header: "Priority Type",
              Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
            },
            {
              accessorKey: "orderTypeDescription", // simple recommended way to define a column
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
            // {
            //   accessorKey: "reports", // simple recommended way to define a column
            //   header: "Reports",
            //   Cell: ({ cell }) => (
            //     <span>
            //       {
            //         cell?.row?.original?.docUrl?.length > 0 && cell?.row?.original?.docUrl[0] ? (
            //           <IconButton aria-label="delete">
            //             <VisibilityOutlinedIcon onClick={(e) => handleFilePreview(e)} />
            //           </IconButton>
            //         ) : (
            //           "-"
            //         ) // Display a fallback text when 'defaultreport' is null
            //       }
            //     </span>
            //   )
            //   // optional custom cell render
            // },
            {
              accessorKey: "statusId", // simple recommended way to define a column
              header: "Status",
              Cell: ({ cell }) => statusCell(cell.getValue(), cell.row.original.statusDescription) // optional custom cell render
            },
            {
              accessorKey: "statusId", // simple recommended way to define a column
              header: "Result",
              Cell: ({ row }) => (
                <Box>
                  {row?.original?.orderDocument.find((doc) => doc?.docTypeId === ORDERS.previewDocType) ? (
                    <IconButton>
                      <Typography
                        variant="span"
                        component="span"
                        className="ls-pdf primaryIcon"
                        onClick={() => {
                          setPreviews(true);
                          const API = row?.original?.orderDocument.find(
                            (doc) => doc?.docTypeId === ORDERS.previewDocType
                          );
                          setUrls(API?.docUrl);
                        }}
                      ></Typography>
                    </IconButton>
                  ) : (
                    ""
                  )}
                </Box>
              )
            },

            // {
            //   accessorKey: "Status", // simple recommended way to define a column
            //   header: "Status",
            //   Cell: ({ cell }) =>
            //   <span>{cell?.row?.original?.statusId}</span> // optional custom cell render
            // },
            {
              accessorKey: "actions", // simple recommended way to define a column
              header: " ",
              enableSorting: false,
              enableColumnOrdering: false,
              enableColumnActions: false,
              grow: false, //don't allow this column to grow to fill in remaining space - new in v2.8
              size: 50, //small co
              Cell: ({ row }) => (
                <Box>
                  {/* <IconButton
                    className="viewTextBtn"
                    name="viewIcon"
                    onClick={() => {
                      setIsOpenOrderDetails(true);
                      setOrderRecord(row.original);
                      dispatch(
                        getOrderDetailsById({
                          orderId: row?.original?.orderId,
                          roleId: getLoggedInUserRoleId(),
                          tenantId: getTenantId()
                        })
                      );
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton> */}
                  {row.original.hl7queueIndicator ? (
                    "" // Conditionally render edit icon based on the value of 'edit' for the current row
                  ) : (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(row);
                      }}
                    >
                      <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                    </IconButton>
                  )}
                  {/* {row?.original?.orderDocument.find((doc) => doc?.docTypeId === ORDERS.previewDocType) ? (
                    <IconButton>
                      <Typography
                        variant="span"
                        component="span"
                        className="ls-pdf primaryIcon"
                        onClick={() => {
                          setPreviews(true);
                          const API = row?.original?.orderDocument.find(
                            (doc) => doc?.docTypeId === ORDERS.previewDocType
                          );
                          setUrls(API?.docUrl);
                        }}
                      ></Typography>
                    </IconButton>
                  ) : (
                    ""
                  )} */}
                  {/* <IconButton
                    className="viewTextBtn"
                    onClick={() => {
                      navigate(`/edit-order/${row?.original?.patientId}/${row?.original?.orderId}`);
                    }}
                  >
                    <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                  </IconButton> */}
                </Box>
              )
            }
          ],
          []
        ));
  }
  if (Order && Order?.readInd !== true) columns.pop();
  const { orderDetails: data, loading, totalCount } = useSelector((state) => state.tenants);
  const { orderDetailsById } = useSelector((state) => state.tenants);
  const [urls, setUrls] = useState("");
  const newArray = data?.orderDocument?.find((s) => s?.docTypeId === 1);
  const [loader, setLoader] = useState(false);
  const handleEditClick = (row) => {
    navigate(`/edit-order/${row?.original?.patientId}/${row?.original?.orderId}`);
  };
  const [rowSelection, setRowSelection] = useState({});
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const [orderRecord, setOrderRecord] = useState({});
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  const [sorting, setSorting] = useState([]);
  const tableInstanceRef = useRef(null);
  const [preview, setPreview] = useState(false);
  const [previews, setPreviews] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });

  const url = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantAbtUsPlcyAndTrmsCondsResponseDTO
    ?.termsCondsFilePath;

  const dispatch = useDispatch();
  const toggleDrawerOrderDetails = (open, row) => (event) => {
    setIsOpenOrderDetails(open);
    setOrderRecord(row);
  };
  if (Object.keys(rowSelection).length > 0) {
    console.log(rowSelection);
  }
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

  const handleFilePreview = (e) => {
    // e.preventDefault();
    setIsOpenOrderDetails(false);
    setPreview(true);
  };
  const storedColumnVisibility = JSON.parse(sessionStorage?.getItem("order&results")) || {};

  const defaultValue = (key) => (storedColumnVisibility[key] === false ? storedColumnVisibility[key] : true);

  const columnKeys = [
    "firstName",
    "lastName",
    "tenantAdmin",
    "clientAdmin",
    "provider",
    "orderId",
    "globalPatientId",
    "orderDate",
    "emailAddr",
    "phoneNumber",
    "priorityDesc",
    "orderTypeDescription",
    "createdBy",
    "testCount",
    "actions",
    "statusId"
  ];

  const defaultColumnVisibility = Object.fromEntries(columnKeys.map((key) => [key, defaultValue(key)]));

  const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility);

  useEffect(() => {
    const allTrue = Object.values(columnVisibility).every((value) => value === true);
    if (!allTrue) {
      sessionStorage.setItem("order&results", JSON.stringify(columnVisibility));
    }
    if (allTrue) {
      sessionStorage.setItem("order&results", JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  const handleRowClick = (row, e) => {
    // e.preventDefault()
    setIsOpenOrderDetails(true);
    setOrderRecord(row.original);
  };
  const handleClose = () => {
    setPreview(false);
    setPreviews(false);
  };

  return (
    <Box className="table__wrapper">
      {isOpenOrderDetails && (
        <OrderReports isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} loader={loader} setIsOpenOrderDetails={setIsOpenOrderDetails} />
      )}
      {loader && <Loader />}
      {loading ? (
        <Loader />
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data || []}
          enableColumnOrdering // enable some features
          enableRowSelection={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          onSortingChange={setSorting}
          onPaginationChange={setPagination}
          // enableColumnFilters={false}
          manualPagination={true}
          manualSorting={true}
          rowCount={totalCount}
          enableFilters={false}
          onColumnVisibilityChange={setColumnVisibility}
          enablePagination={true} // disable a default feature
          onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
          state={{ rowSelection, pagination, sorting, columnVisibility }} // manage your own state, pass it back to the table (optional)
          tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
          muiTablePaginationProps={{
            rowsPerPageOptions: [10],
            showFirstButton: true,
            showLastButton: true
          }}
          enablePinning
          initialState={{ columnPinning: { right: ["actions"] } }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              setIsOpenOrderDetails(true);
              setOrderRecord(row.original);
              setLoader(true);
              dispatch(
                getOrderDetailsById({
                  orderId: row?.original?.orderId,
                  roleId: getLoggedInUserRoleId(),
                  tenantId: getTenantId()
                })
              ).then((s) => setLoader(false));
            },
            className: row.original.criticalIndicator === true ? "testcolorgrading" : ""
          })}
          // muiTableBodyRowProps={({ row }) => ({
          //   onClick: (e) => {
          //     setIsOpenOrderDetails(true);
          //     setOrderRecord(row.original);
          //     dispatch(
          //       getOrderDetailsById({
          //         orderId: row?.original?.orderId,
          //         roleId: getLoggedInUserRoleId(),
          //         tenantId: getTenantId()
          //       })
          //     );
          //   },
          //   style: {
          //     backgroundColor: "red"
          //   }
          // })}
        />
      )}
      {preview && <PdfDialog open={open} url={url} handleClose={handleClose} />}
      {previews && <PdfDialog open={open} url={urls} handleClose={handleClose} />}
    </Box>
  );
}
