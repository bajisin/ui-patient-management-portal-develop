import React, { useState, useEffect, useRef, useCallback } from "react";
import FeatherIcon from "feather-icons-react";
import classNames from "classnames";
import moment from "moment";
import Header from "./Header";
import MonthView from "./MonthView";
import { get } from "lodash";

const DatePicker = ({ label, required, value, onChange, minDate }) => {
  const wrappedRef = useRef();
  const [selectedDay, setSelectDay] = useState(value || moment().toDate());
  const [month, setMonth] = useState(moment(selectedDay).month() + 1);
  const [year, setYear] = useState(moment(selectedDay).year());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOutsideClick = useCallback(
    (e) => {
      if (showDatePicker && !!wrappedRef.current && !wrappedRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    },
    [showDatePicker]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleMonth = (val) => {
    const cur = month + val;
    if (cur > 12) {
      setMonth(1);
      handleYear(1);
    } else if (cur < 1) {
      setMonth(12);
      handleYear(-1);
    } else {
      setMonth(cur);
    }
  };

  const handleYear = (val) => {
    setYear(year + val);
  };

  const handleDateChange = (obj) => {
    if (onChange) onChange(get(obj, "date"));
    setSelectDay(get(obj, "date"));
    setShowDatePicker(false);
  };

  return (
    <React.Fragment>
      <div className="eq-date-text">
        <h2 className="dropdown-label-text mb-2">
          {label}
          {required && <span className="eq-mandatory-text">*</span>}
        </h2>
      </div>
      <div className="eqx-date-picker" ref={wrappedRef}>
        <div className="eqx-date" onClick={() => setShowDatePicker(true)}>
          <p className="input">{moment(selectedDay).format("DD MMM YYYY")}</p>
          <input type="date" />
          <FeatherIcon icon="calendar" />
        </div>
        <div className={classNames("eqx-calendar", { open: showDatePicker })}>
          <Header {...{ handleYear, handleMonth, month, year }} />
          <MonthView {...{ handleDateChange, selectedDay, month, year, minDate }} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DatePicker;

DatePicker.defaultProps = {
  label: "Date",
  required: false,
  value: new Date(),
  onChange: () => {},
  minDate: null
};
