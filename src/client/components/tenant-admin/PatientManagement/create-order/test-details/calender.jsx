import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Typography } from "@mui/material";
import { getOrderDetailsByDate } from "@redux/slices/order-slice";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import OrderHistoryDetails from "./orderHistoryDetails";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs();

function ServerDay(props) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    getOrderDetails,
    setOrderPopup,
    setTests,
    setOrderDataKey,
    setDate,
    date,
    ...other
  } = props;
  const dateKey = day.format("YYYY-MM-DD");
  let colorCode;
  if (getOrderDetails[dateKey]) {
    setDate(Object.keys(getOrderDetails)[0]);
    const orderTypeid = getOrderDetails[dateKey];
    const orderTypeIdKey = Object.keys(getOrderDetails[dateKey])[0];
    colorCode = orderTypeIdKey.split("-")[2] ? orderTypeIdKey.split("-")[2] : orderTypeIdKey.split("-")[1];
    const orderData = orderTypeid[orderTypeIdKey];
    const orderDataKey = Object.keys(orderData)[0];
    setOrderDataKey(orderDataKey);
    setTests(orderData[orderDataKey]);
  }
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        <div>
          {date && colorCode === "8" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots oneTime"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
          {date && colorCode === "7" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots oneTime"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
          {date && colorCode === "6" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots oneTime"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
          {date && colorCode === "5" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots oneTime"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
          {date && colorCode === "4" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots oneTime"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
          {date && colorCode === "3" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots routine"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
          {date && colorCode === "2" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots recurring"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
          {date && colorCode === "1" && (
            <Tooltip title={`Test Performed: ${colorCode?.length}`} arrow placement="top" {...getOrderDetails}>
              <Typography
                component="span"
                variant="span"
                className="stat_dots stats"
                onClick={() => setOrderPopup(true)}
              ></Typography>
            </Tooltip>
          )}
        </div>
      }
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const { patientDetailsById } = useSelector((state) => state?.tenants);
  const { getOrderDetails } = useSelector((state) => state.createOrder);
  const [orderPopup, setOrderPopup] = useState(false);
  const [orderDataKey, setOrderDataKey] = useState();
  const [tests, setTests] = useState([]);
  const dispatch = useDispatch();
  const currentDate = dayjs();
  const PreviousDate = currentDate.subtract(3, "month");
  const [date, setDate] = useState();

  const fetchOrderHistory = (data) => {
    // dispatch an action for getusertenants
    if (data) {
      dispatch(
        getOrderDetailsByDate({
          patientId: patientDetailsById?.patientId,
          fromDate: data?.fromDate.format("YYYY-MM-DD"),
          toDate: data?.toDate.format("YYYY-MM-DD")
          // fromDate: "2023-10-23",
          // toDate: "2023-10-23"
        })
      );
    } else {
      const currentDate = dayjs(); // Get the current date
      const fromDate = currentDate.startOf("month"); // First day of the current month
      const toDate = currentDate.endOf("month"); // Last day of the current month

      const fromDatePreviousMonth = fromDate.subtract(1, "month").startOf("month"); // First day of the previous month
      const toDateNextMonth = toDate.add(1, "month").endOf("month"); // Last day of the next month

      dispatch(
        getOrderDetailsByDate({
          patientId: patientDetailsById?.patientId,
          fromDate: fromDatePreviousMonth.format("YYYY-MM-DD"),
          toDate: toDateNextMonth.format("YYYY-MM-DD")
          // fromDate: "2023-10-23",
          // toDate: "2023-10-23"
        })
      );
    }
  };
  useEffect(() => {
    if (patientDetailsById?.patientId) {
      fetchOrderHistory();
    }
  }, [patientDetailsById?.patientId]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (date) {
      const currentDate = dayjs(date); // Get the current date
      const fromDate = currentDate.startOf("month"); // First day of the current month
      const toDate = currentDate.endOf("month"); // Last day of the current month

      const fromDatePreviousMonth = fromDate.subtract(1, "month").startOf("month"); // First day of the previous month
      const toDateNextMonth = toDate.add(1, "month").endOf("month"); // Last day of the next month

      fetchOrderHistory({
        fromDate: fromDatePreviousMonth,
        toDate: toDateNextMonth
      });
    }

    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay
          }}
          slotProps={{
            day: {
              highlightedDays,
              getOrderDetails,
              setOrderPopup,
              setTests,
              setOrderDataKey,
              setDate,
              date
            }
          }}
        />
      </LocalizationProvider>
      {orderPopup && (
        <OrderHistoryDetails
          individualTest={tests["Individal Test"]}
          isOpen={orderPopup}
          setOrderPopup={setOrderPopup}
          tests={tests["Panel Test"]}
          orderDataKey={orderDataKey}
          date={date}
        />
      )}
    </>
  );
}
