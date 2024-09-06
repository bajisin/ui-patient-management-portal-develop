import React, { useEffect, useState } from "react";
import dropdownIcon from "@assets/images/svg/dropdown-icon.svg";

const MemberIdInfo = () => {
  return (
    <div className="eq-page-view">
      <div className="eq-search-member-id-info">
        <div className="eq-edit-session-info">
          <div className="eq-memberInfo">
            <h2 className="search-header">Roshan Aslam</h2>
            <button className="btn btn-sm eq-back-btn" type="button" id="button-addon2"></button>
          </div>
          <div className="card eq-main-page-card">
            <div className="card-body">
              <nav>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active nav-tab-btn ms-4"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      General Info
                    </button>
                  </div>
                </nav>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active eq-general-tap"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="eq-general-info">
                    <h3 className="info-heading text-dark">Member Information</h3>
                    <div className="general-info">
                      <div className="row">
                        <div className="col-lg-3 mb-">
                          <div className="search-info-list-item">
                            <h6 className="member-heading">PT Auto Purchase</h6>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="session-wrapper">
                            <div className="session-heading">
                              <div className="row">
                                <div className="col-lg-3 mb-5">
                                  <span className="session-title">
                                    30 Minute Pack Size
                                    <span className="eq-mandatory-text">*</span>
                                  </span>
                                </div>
                                <div className="col-lg-9">
                                  <div className="dropdown eq-date-picker-box">
                                    <button
                                      className="btn eq-btn text-start"
                                      type="button"
                                      id="minPackSizeButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded=" false"
                                    >
                                      0 Sessions - Off
                                      <span className="eq-dropdown-icon">
                                        <img src={dropdownIcon} className="dropdown-icon" />
                                      </span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="minPackSizeButton1">
                                      <li>0 Sessions - Off</li>
                                      <li>1 Sessions</li>
                                      <li>8 Sessions</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-3 mb-5">
                                  <span className="session-title">
                                    60 Minute Pack Size
                                    <span className="eq-mandatory-text">*</span>
                                  </span>
                                </div>
                                <div className="col-lg-9">
                                  <div className="dropdown eq-date-picker-box">
                                    <button
                                      className="btn eq-btn text-start"
                                      type="button"
                                      id="minPackSizeButton2"
                                      data-bs-toggle="dropdown"
                                      aria-expanded=" false"
                                    >
                                      0 Sessions - Off
                                      <span className="eq-dropdown-icon">
                                        <img src={dropdownIcon} className="dropdown-icon" />
                                      </span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="minPackSizeButton2">
                                      <li>0 Sessions - Off</li>
                                      <li>1 Sessions</li>
                                      <li>8 Sessions</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-wrapper">
                                <button type="submit" className="btn eq-secondary-btn">
                                  Cancel
                                </button>
                                <button type="submit" className="btn eq-primary-btn">
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pilates-auto-purchase">
                      <div className="row">
                        <div className="col-lg-3 mb-5">
                          <div className="search-info-list-item">
                            <h6 className="member-heading">Pilates Auto Purchase</h6>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="session-wrapper">
                            <div className="session-heading">
                              <div className="row">
                                <div className="col-lg-3 mb-5">
                                  <span className="session-title">
                                    Private Pack Size
                                    <span className="eq-mandatory-text">*</span>
                                  </span>
                                </div>
                                <div className="col-lg-9">
                                  <div className="dropdown eq-date-picker-box">
                                    <button
                                      className="btn eq-btn text-start"
                                      type="button"
                                      id="privatePackSizeButton"
                                      data-bs-toggle="dropdown"
                                      aria-expanded=" false"
                                    >
                                      0 Sessions - Off
                                      <span className="eq-dropdown-icon">
                                        <img src={dropdownIcon} className="dropdown-icon" />
                                      </span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="privatePackSizeButton">
                                      <li>0 Sessions - Off</li>
                                      <li>1 Sessions</li>
                                      <li>8 Sessions</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-3 mb-5">
                                  <span className="session-title">
                                    Duet Pack Size
                                    <span className="eq-mandatory-text">*</span>
                                  </span>
                                </div>
                                <div className="col-lg-9">
                                  <div className="dropdown eq-date-picker-box">
                                    <button
                                      className="btn eq-btn text-start"
                                      type="button"
                                      id="duetPackSize"
                                      data-bs-toggle="dropdown"
                                      aria-expanded=" false"
                                    >
                                      0 Sessions - Off
                                      <span className="eq-dropdown-icon">
                                        <img src={dropdownIcon} className="dropdown-icon" />
                                      </span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="duetPackSize">
                                      <li>0 Sessions - Off</li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-lg-3 mb-2">
                                  <span className="session-title">
                                    Semi-Private <br />
                                    Pack Size
                                    <span className="eq-mandatory-text">*</span>
                                  </span>
                                </div>
                                <div className="col-lg-9">
                                  <div className="dropdown eq-date-picker-box">
                                    <button
                                      className="btn eq-btn text-start"
                                      type="button"
                                      id="semiPrivatePack"
                                      data-bs-toggle="dropdown"
                                      aria-expanded=" false"
                                    >
                                      0 Sessions - Off
                                      <span className="eq-dropdown-icon">
                                        <img src={dropdownIcon} className="dropdown-icon" />
                                      </span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="semiPrivatePack">
                                      <li>0 Sessions - Off</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="btn-wrapper">
                                <button type="submit" className="btn eq-secondary-btn">
                                  Cancel
                                </button>
                                <button type="submit" className="btn eq-primary-btn">
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="reminder-email-popup">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="search-info-list-item">
                            <h6 className="member-heading">PT Session Confirmation Email</h6>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="session-wrapper">
                            <div className="session-heading">
                              <div className="row">
                                <div className="col-lg-8">
                                  <span className="confirmation-title">
                                    Receive an email notification when your session is coming up.
                                  </span>
                                </div>
                                <div className="col-lg-2">
                                  <button type="submit" className="btn eq-secondary-btn">
                                    Cancel
                                  </button>
                                </div>
                                <div className="col-lg-2">
                                  <button type="submit" className="btn eq-primary-btn">
                                    Save
                                  </button>
                                </div>
                                <label className="v-align">
                                  <input type="checkbox" id="ptSessionConfirmationsOptOut" />
                                  <span className="confirmation-title">Turn On</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="reminder-email-popup">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="search-info-list-item">
                            <h6 className="member-heading">Pilates Reminder Email</h6>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="session-wrapper">
                            <div className="session-heading">
                              <div className="row">
                                <div className="col-lg-8">
                                  <span className="confirmation-title">
                                    Receive an email notification when your session is coming up.
                                  </span>
                                </div>
                                <div className="col-lg-2">
                                  <button type="submit" className="btn eq-secondary-btn">
                                    Cancel
                                  </button>
                                </div>
                                <div className="col-lg-2">
                                  <button type="submit" className="btn eq-primary-btn">
                                    Save
                                  </button>
                                </div>
                                <label className="v-align">
                                  <input type="checkbox" id="ptSessionConfirmationsOptOut" />
                                  <span className="confirmation-title">Turn On</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="reminder-email-popup">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="search-info-list-item">
                            <h6 className="member-heading">Pilates Inventory Email</h6>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="session-wrapper">
                            <div className="session-heading">
                              <div className="row">
                                <div className="col-lg-8">
                                  <span className="confirmation-title">
                                    Receive an email notification when you run out of inventory.
                                  </span>
                                </div>
                                <div className="col-lg-2">
                                  <button type="submit" className="btn eq-secondary-btn">
                                    Cancel
                                  </button>
                                </div>
                                <div className="col-lg-2">
                                  <button type="submit" className="btn eq-primary-btn">
                                    Save
                                  </button>
                                </div>
                                <label className="v-align">
                                  <input type="checkbox" id="ptSessionConfirmationsOptOut" />
                                  <span className="confirmation-title">Turn On</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberIdInfo;
