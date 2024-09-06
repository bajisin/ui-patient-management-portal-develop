import React from "react";
import moment from "moment";
import FeatherIcon from "feather-icons-react";

const Header = ({ handleYear, handleMonth, month, year }) => {
  return (
    <div className="eqx-calendar-head">
      <div className="eqx-cal-actions" onClick={() => handleYear(-1)}>
        <FeatherIcon className="chevrons" icon="chevrons-left" />
      </div>
      <div className="eqx-cal-actions" onClick={() => handleMonth(-1)}>
        <FeatherIcon className="chevron" icon="chevron-left" />
      </div>
      <div className="eqx-calendar-title">
        <div className="eqx-cal-year">{year}</div>
        <div className="eqx-cal-sub">
          {moment()
            .month(month - 1)
            .format("MMMM")}
        </div>
      </div>
      <div className="eqx-cal-actions" onClick={() => handleMonth(1)}>
        <FeatherIcon className="chevron" icon="chevron-right" />
      </div>
      <div className="eqx-cal-actions" onClick={() => handleYear(1)}>
        <FeatherIcon className="chevrons" icon="chevrons-right" />
      </div>
    </div>
  );
};
export default Header;
