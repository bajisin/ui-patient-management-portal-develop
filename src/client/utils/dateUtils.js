const moment = require("moment");
const totalDatesPerMonthView = 42;

const getPrevMonthYear = (month, year) => {
  if (month === 1) {
    return {
      month: 12,
      year: year - 1
    };
  } else {
    return {
      month: month - 1,
      year
    };
  }
};

const getNextMonthYear = (month, year) => {
  if (month === 12) {
    return {
      month: 1,
      year: year + 1
    };
  } else {
    return {
      month: month + 1,
      year
    };
  }
};

const getSpecificDate = (month, dayOfMonth, year) => {
  return moment(`${month}-${dayOfMonth}-${year}`, "MM-DD-YYYY").toDate();
};

export const getDatesInMonthDisplay = (month, year) => {
  const daysInMonth = moment(`${month}-${year}`, "MM-YYYY").daysInMonth();
  const firstWeekday = moment(`${month}-${year}`, "MM-YYYY").startOf("month").weekday();
  const result = [];

  // Based on index number of firstWeekday, add number of previous month's overflow dates
  const prevMonthYear = getPrevMonthYear(month, year);
  const prevDaysInMonth = moment(`${prevMonthYear.month}-${prevMonthYear.year}`, "MM-YYYY").daysInMonth();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    result.push({
      currentMonth: false,
      date: getSpecificDate(prevMonthYear.month, prevDaysInMonth - i, prevMonthYear.year)
    });
  }

  // Add all current month dates
  for (let j = 1; j <= daysInMonth; j++) {
    result.push({
      currentMonth: true,
      date: getSpecificDate(month, j, year)
    });
  }

  // Overflow dates for next month to meet totalDatesPerMonthView requirement
  if (result.length < totalDatesPerMonthView) {
    const daysToAdd = totalDatesPerMonthView - result.length;
    const nextMonthYear = getNextMonthYear(month, year);
    for (let k = 1; k <= daysToAdd; k++) {
      result.push({
        currentMonth: false,
        date: getSpecificDate(nextMonthYear.month, k, nextMonthYear.year)
      });
    }
  }

  return result;
};

export const getTime = (time) => moment(time).format("hh:mm A");
