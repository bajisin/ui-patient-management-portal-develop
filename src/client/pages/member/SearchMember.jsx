/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import filter from "lodash.filter";
import { getMemberData } from "./mockdata";
import RadioButton from "@components/formcontrols/RadioButton";
import sortIcon from "@assets/images/sort-icon.png";
// import { constants } from "@helpers/constants";

import { useTranslation } from "react-i18next";

const SearchMember = ({ renderingFrom }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchmemberBy, setSearch] = useState("name");
  const [textarea, settextarea] = useState();
  const [memberData, setmemberData] = useState({});
  const [button, setbutton] = useState(false);

  const getTable = (e) => {
    if (!textarea) {
      document.getElementById("searchTerm")?.focus();
    } else {
      const userData = filter(getMemberData, { MemberId: textarea });
      setbutton(true);
      setmemberData(userData);
    }
  };

  // FOR RENDERING THE RADIO OPTION FOR BOOKING PENALTY PAGE & MEMBER PAGE
  const getRadioOptions = () => {
    let radioOptions = [];
    if (renderingFrom && renderingFrom === "bookingPenalty") {
      radioOptions = [
        { name: t("NAME"), key: "name" },
        { name: t("MEMBER_ID"), key: "memberid" },
        { name: t("EMAIL"), key: "email" },
        { name: t("SECURITY_ID"), key: "userSecId" }
      ];
    } else {
      radioOptions = [
        { name: t("NAME"), key: "name" },
        { name: t("MEMBER_ID"), key: "memberid" },
        { name: t("EMAIL"), key: "email" },
        { name: t("SECURITY_ID"), key: "userSecId" },
        { name: t("BARCODE"), key: "barcode" }
      ];
    }
    return radioOptions;
  };
  const onChangeValue = (value) => {
    setSearch(value);
  };
  const onChangeText = (event) => {
    settextarea(event.target.value);
  };
  const handleRedirect = (val) => {
    navigate(`/search-member/${val.MemberId}`);
  };

  const renderSearchByMember = () => {
    return (
      <React.Fragment>
        <h2 className="page-title">{t("SEARCH_FOR_MEMBER")}</h2>
        <form action="" className="eq-search-box">
          {getRadioOptions() &&
            getRadioOptions()?.length &&
            getRadioOptions()?.map((radio, index) => {
              return (
                <RadioButton
                  key={index}
                  name={radio.name}
                  title={radio.name}
                  checked={searchmemberBy === radio.key}
                  value={radio.key}
                  onChange={() => onChangeValue(radio.key)}
                />
              );
            })}
          <div className="search-box">
            <input type="text" id="searchTerm" autoFocus className="search-item" onChange={onChangeText} />
            <button
              onClick={(event) => {
                getTable(event);
              }}
              type="button"
              autoFocus
              className="btn eq-primary-btn"
            >
              {t("SEARCH")}
            </button>
          </div>
        </form>
        {button ? (
          <div className="eq-search-table">
            <div className="eq-table-wrapper ">
              <table className="table table-responsive-md table-striped">
                <thead>
                  <tr>
                    <th scope="col">
                      {t("MEMBER_ID")} <img src={sortIcon} className="img-fluid table-sort-icon" alt="sort-icon" />
                    </th>
                    <th scope="col">
                      {t("FIRST_NAME")} <img src={sortIcon} className="img-fluid table-sort-icon" alt="sort-icon" />
                    </th>
                    <th scope="col">
                      {t("LAST_NAME")} <img src={sortIcon} className="img-fluid table-sort-icon" alt="sort-icon" />
                    </th>
                    <th scope="col">
                      {t("MYEQ_USERNAME_EMAIL")}
                      <img src={sortIcon} className="img-fluid table-sort-icon" alt="sort-icon" />
                    </th>
                    <th scope="col">
                      {t("COUNTRY")} <img src={sortIcon} className="img-fluid table-sort-icon" alt="sort-icon" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {memberData?.map((val) => {
                    return (
                      <tr key={val.MemberId} className="active">
                        <td>
                          <p onClick={() => handleRedirect(val)} className="search-id cursor-pointer">
                            {val.MemberId}
                          </p>
                        </td>
                        <td>{val.FirstName}</td>
                        <td>{val.LastName}</td>
                        <td>{val.EmailAddress}</td>
                        <td>{val.Country}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="pagination-wrapper">
                <nav aria-label="...">
                  <ul className="pagination pagination-sm">
                    <li className="page-item">
                      <a className="page-link active" href="/#" tabIndex="-1">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/#">
                        4
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/#">
                        5
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {renderingFrom === "bookingPenalty" ? (
        <div className="my-4">{renderSearchByMember()}</div>
      ) : (
        <div className="eq-page-view">
          <div className="eq-search-member">
            <div className="card eq-main-page-card">
              <div className="card-body">
                <div className="page-header">{renderSearchByMember()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

SearchMember.propTypes = {
  renderingFrom: PropTypes.string
};

SearchMember.defaultProps = {
  renderingFrom: ""
};

export default SearchMember;
