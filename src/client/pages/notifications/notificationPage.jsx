import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import { CALLTYPES, DATE_RANGE_OPTIONS, roleIds } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OrderDetails from "../../components/drawers/orderDetails";
import SearchComponent from "../../components/search";
import dayjs from "dayjs";
import { getNotificationList } from "@redux/slices/notificationListSlice";
import { getOrderDetailsById } from "@redux/slices/tenantsSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function NotificationPage() {
  const { notificationList: data } = useSelector((state) => state.NOTIFICATIONLIST);

  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState(moment().startOf("month").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [some, setSome] = useState([]);
  const itemsPerpage = 10;
  const totalPages = data.totalCount <= 0 ? 1 : Math.ceil(data.totalCount / itemsPerpage - 1);
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(1);
  const dispatch = useDispatch();
  const { orderDetailsById } = useSelector((state) => state.tenants);

  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const navigate = useNavigate();

  const toggleDrawerOrderDetails = (open, row) => (event) => {
    setIsOpenOrderDetails(open);
  };

  const dispatchgetNotificationList = (newStartDate, newEndDate) => {
    dispatch(
      getNotificationList({
        createdBy: getLoggedInUserId(),
        lableId: getLoggedInUserRoleId(),
        notifCtgyId: null,
        notifTypeId: getLoggedInUserRoleId() === roleIds.PATIENT ? 1 : null,
        pageNo: 0,
        pageSize: itemsPerpage,
        searchValue: searchTerm || "",
        sortBy: "",
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        startDate:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? ""
            : startDate === ""
            ? moment(newStartDate).format("YYYY-MM-DD")
            : startDate,

        endDate:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? ""
            : endDate === ""
            ? moment(newEndDate).format("YYYY-MM-DD")
            : endDate
      })
    );
  };

  useEffect(() => {
    handleDateRange("1");
    setSelectedDateRange(1);
  }, []);

  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handlePageChange = (newEndDate, newPage, newStartDate) => {
    dispatch(
      getNotificationList({
        createdBy: getLoggedInUserId(),
        lableId: getLoggedInUserRoleId(),
        notifCtgyId: null,
        notifTypeId: getLoggedInUserRoleId() === roleIds.PATIENT ? 1 : null,
        pageNo: newPage || 0,
        pageSize: itemsPerpage,
        searchValue: "" || searchTerm,
        sortBy: "",
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        startDate:
          // getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
          //   ? ""
          //   : moment().startOf("month").format("YYYY-MM-DD"),
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? ""
            : startDate === ""
            ? moment(newStartDate).format("YYYY-MM-DD")
            : startDate,
        endDate:
          // getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
          //   ? ""
          //   : moment().format("YYYY-MM-DD")
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? ""
            : endDate === ""
            ? moment(newEndDate).format("YYYY-MM-DD")
            : endDate
      })
    );
    setCurrentPage(newPage);
    setSome(data);
  };
  const updateSearch = (val, newPage) => {
    setSearchTerm(val);
    dispatch(
      getNotificationList({
        createdBy: getLoggedInUserId(),
        lableId: getLoggedInUserRoleId(),
        notifCtgyId: null,
        notifTypeId: getLoggedInUserRoleId() === roleIds.PATIENT ? 1 : null,
        pageNo: newPage || 0,
        pageSize: itemsPerpage,
        searchValue: searchTerm,
        sortBy: "",
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        startDate:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? ""
            : moment().startOf("month").format("YYYY-MM-DD"),
        endDate:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? ""
            : moment().format("YYYY-MM-DD")
      })
    );
  };
  const handleDateRange = (value) => {
    switch (value) {
      case "1":
        setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "2":
        setStartDate(moment().subtract(7, "days").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "3":
        setStartDate(moment().subtract(15, "days").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "4":
        setStartDate(moment().startOf("year").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "5":
        setCustomPickerOpen(true);
        break;
      default:
        break;
    }
  };
  const [notificationId, setNotificationId] = useState();
  useEffect(() => {
    if (orderDetailsById && orderDetailsById?.patientId != null && notificationId) {
      setNotificationId();
      navigate(
        `/edit-order/${orderDetailsById?.patientId}/${orderDetailsById?.orderId}?parentId=${notificationId?.id}`
      );
    }
  }, [orderDetailsById, notificationId]);

  const handleChange = (value) => {
    setNotificationId(value);
    if (value?.notifTypeId === 2 && value?.ntfctnCtgyId === 1) {
      dispatch(
        getOrderDetailsById({
          orderId: value?.id,
          roleId: loggedInUser?.roleMasterDTO?.roleId,
          tenantId: value?.tenantId
        })
      );
    }
  };
  const handleCustomDateRange = async () => {
    await dispatchgetNotificationList(startDate, endDate);
    setCustomPickerOpen(true);
  };
  const today = dayjs();
  useEffect(() => {
    if (selectedDateRange === "5" && startDate && endDate) {
      handleCustomDateRange(1);
    } else {
      dispatchgetNotificationList(startDate, endDate);
    }
  }, [startDate, endDate, selectedDateRange]);
  return (
    <Box className="notification__page-wrapper">
      <OrderDetails isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} />
      <Box className="title__wrapper mb-2 ps-4">
        <Box className="title__wrapper--left w-50">
          <Typography variant="h5" component="h5" className="section_title">
            Notifications
          </Typography>
          <Stack spacing={2}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              className="breadcrumb__wrapper"
            >
              <Link
                key="1"
                href={
                  getLoggedInUserRoleId() === 5
                    ? "/home"
                    : getLoggedInUserRoleId() === 3
                    ? "clientDashboard"
                    : getLoggedInUserRoleId() === 4
                    ? "/providerDashboard"
                    : "/dashboard"
                }
              >
                Dashboard
              </Link>
              <Typography key="2">Notifications</Typography>
            </Breadcrumbs>
          </Stack>
        </Box>
        <Box className="title__wrapper--right w-50 notification__datepicker">
          <Grid container className="justify-content-end">
            <Grid item xs={12} sm={12} md={7} lg={7} className="pe-3 position-relative">
              <Select
                className="add__select dateRangePicker"
                value={selectedDateRange}
                onChange={(e) => {
                  setSelectedDateRange(e.target.value);
                  handleDateRange(e.target.value);
                }}
              >
                {DATE_RANGE_OPTIONS?.map((opt, i) => (
                  <MenuItem key={i} value={opt.id}>
                    {opt.title}
                  </MenuItem>
                ))}
              </Select>
              {selectedDateRange === "5" && customPickerOpen && (
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={2}
                  className="title__wrapper--right w-100 justify-content-end ms-0 notification__datepicker--customrange"
                >
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(startDate)}
                        onChange={(newValue) => setStartDate(dayjs(newValue).format("YYYY-MM-DD"))}
                        className="w-100 datetimepicker-control"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(endDate)}
                        onChange={
                          (newValue) => setEndDate(dayjs(newValue).format("YYYY-MM-DD"))
                          // setCustomPickerOpen(false);
                          // handleCustomDateRange();
                        }
                        className="w-100 datetimepicker-control"
                        minDate={dayjs(startDate)}
                        maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <SearchComponent
                className="w-100"
                setSearchTerm={setSearchTerm}
                updateSearch={updateSearch}
                startDate={startDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                endDate={endDate}
                searchTerm={searchTerm}
                callType={CALLTYPES.Notification}
                dispatchgetNotificationList={dispatchgetNotificationList}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className="content__wrapper">
        {data?.data?.map((i, j) => {
          const date = i?.updatedDate?.split("T")[0];
          const [year, month, day] = date?.split("-");
          const formattedDate = `${month}-${day}-${year}`;
          return (
            <Box
              key={j}
              className={`notification-cards mt-0 ${i.notifTypeId === 2 && i?.ntfctnCtgyId === 1 ? "active" : ""}`}
            >
              <Typography className="patient-added" variant="p" component="p">
                {i.notificationTitle}{" "}
                {i.notifTypeId === 2 && i?.ntfctnCtgyId === 1 && (getLoggedInUserRoleId() !== roleIds.PATIENT && 
                getLoggedInUserRoleId() !== roleIds.SUPER_ADMIN) && (
                  <Button variant="contained" className="primary-btn order-button" onClick={() => handleChange(i)}>
                    Order
                  </Button>
                )}
              </Typography>
              <Typography className="patient-description" variant="p" component="p">
                {i.notificationMsg}
              </Typography>
              <Typography variant="div" component="div" className="patient-details">
                <Typography variant="p" component="p">
                  {formattedDate} {i.updatedDate.split("T")[1].substring(1, 5)}
                </Typography>
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Stack spacing={2} className="align-items-end mt-3">
        <Pagination count={totalPages} onChange={handlePageChange} defaultPage={currentPage} />
      </Stack>
    </Box>
  );
}
