import React from "react";
import classNames from "classnames";
import moment from "moment";

import { getDatesInMonthDisplay } from "@utils/dateUtils";

const MonthView = ({ minDate, selectedDay, handleDateChange, month, year }) => {
  const changeDate = (e) => {
    handleDateChange(e);
  };

  const datesInMonth = getDatesInMonthDisplay(month, year);

  const monthDates = datesInMonth.map((i, key) => {
    return (
      <div
        className={classNames(`eqx-cal-days`, {
          disabled: !i.currentMonth,
          hide: minDate && !moment(minDate).isBefore(i.date.toString()),
          highlight: moment().isSame(i.date.toString(), "day"),
          "highlight-dark": moment(selectedDay).isSame(i.date.toString(), "day")
        })}
        key={key}
        onClick={() => changeDate(i)}
      >
        <div className="eqx-cal-day">
          <span>{moment(i.date).date()}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="eqx-cal-container">
      <div className="eqx-cal-month">
        <div className="eqx-cal-head">
          {moment.weekdaysShort().map((d, i) => (
            <div key={i} className="eqx-cal-week">
              {d.toUpperCase()}
            </div>
          ))}
        </div>
        <div className="eqx-cal-body">{monthDates}</div>
      </div>
    </div>
  );
};

MonthView.defaultProps = {
  minDate: null,
  selectedDay: null,
  setSelectDay: () => {},
  month: moment().month() + 1,
  year: moment().year()
};

export default MonthView;
