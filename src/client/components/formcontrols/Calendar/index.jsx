import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Badge, Box, Typography } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import moment from "moment";

export default function Calendar({ orderData }) {
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(moment().toDate());

  React.useEffect(() => {
    const orderCreatedAt = [];
    orderData.map((o) => orderCreatedAt.push(moment(o.orderDate).format("DD/MM/YYYY")));
    setHighlightedDays(orderCreatedAt);
  }, [orderData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const dotClass = (type) => {
    switch (type) {
      case 1:
        return <Typography component="span" variant="span" className="stat_dots stats"></Typography>;
      case 2:
        return <Typography component="span" variant="span" className="stat_dots routine"></Typography>;
      case 3:
        return <Typography component="span" variant="span" className="stat_dots recurring"></Typography>;
    }
  };

  const renderDayInPicker = (day, _value, DayComponentProps) => {
    const isSelected = !DayComponentProps.outsideCurrentMonth && highlightedDays.indexOf(day.format("DD/MM/YYYY")) >= 0;
    const orderObj = orderData.find((o) => moment(o.orderDate).format("DD/MM/YYYY") === day.format("DD/MM/YYYY"));
    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            <Typography component="div" variant="div">
              <Typography component="p" variant="p">
                {dotClass(orderObj?.orderTypeDto?.id)}
              </Typography>
            </Typography>
          ) : undefined
        }
      >
        <PickersDay {...DayComponentProps} />
      </Badge>
    );
  };

  return (
    <Box className="calendar_datepicker">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box className="title__wrapper">
          <Box className="title__wrapper--left">
            <Typography variant="h5" component="h5" className="section_title">
              Upcoming Orders
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview of all the orders
            </Typography>
          </Box>
          <Box className="title__wrapper--right">
            <Typography className="title_right">View Details</Typography>
          </Box>
        </Box>
        <Box className="calendar_section">
          <StaticDatePicker
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            renderDay={renderDayInPicker}
          />
          <Typography component="div" variant="div" className="orderTypes">
            <Typography component="p" variant="p">
              <Typography component="span" variant="span" className="stat_dots stats"></Typography>
              Stat Order
            </Typography>

            <Typography component="p" variant="p">
              <Typography component="span" variant="span" className="stat_dots routine"></Typography>
              Routine Order
            </Typography>

            <Typography component="p" variant="p">
              <Typography component="span" variant="span" className="stat_dots recurring"></Typography>
              Recurring Order
            </Typography>
          </Typography>
        </Box>
      </LocalizationProvider>
    </Box>
  );
}
