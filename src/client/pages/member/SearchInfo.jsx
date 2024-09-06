import React, { useEffect, useState } from "react";
import find from "lodash.find";
import editLogo from "@assets/images/svg/editing.svg";
import backIcon from "@assets/images/back-icon.png";
import { getMemberData } from "./mockdata";
import { useParams } from "react-router-dom";
import RadioButton from "../../components/formcontrols/RadioButton";
import { genderConstants } from "../../_helpers/constants";
const SearchInfo = () => {
  const { memberId } = useParams();
  const [memberData, setmemberData] = useState({});
  const [showconfirmationEmail, setShowConfirmationEmail] = useState(false);
  const [showReminderEmail, setShowReminderEmail] = useState(false);
  const [showInventoryEmail, setShowInventoryEmail] = useState(false);
  const [show, setShow] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const [checked, setChecked] = useState(true);
  const [textConfirmationEmail, setTextConfirmationEmail] = useState("Turned On");
  const [textreminderEmail, setTextReminderEmail] = useState("Turned On");
  const [textInventoryEmail, setTextInventoryEmail] = useState("Turned On");
  const [radioShow, setradioShow] = useState(false);
  const [selected, setSelected] = useState();
  const [textradio, setTextradio] = useState("Female");

  useEffect(() => {
    const userData = find(getMemberData, { MemberId: memberId });
    setmemberData(userData);
  }, [memberId]);
  const radioOptions = [
    { genderType: genderConstants.male, key: 1 },
    { genderType: genderConstants.female, key: 2 }
  ];

  return (
    <div className="eq-page-view">
      <div className="eq-search-member-id-info">
        <div className="eq-memberInfo">
          <h2 className="search-header" key={memberData?.MemberId}>
            {memberData?.FirstName}
          </h2>

          <button className="btn btn-sm eq-back-btn" type="button" id="button-addon2">
            <img src={backIcon} alt="img-fluid" /> Back
          </button>
        </div>
        <div className="card eq-main-page-card">
          <div className="card-body">
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
                      <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="search-info-list">
                          <h6 className="member-heading">Member ID :</h6>
                          <span className="member-info-label">{memberData?.MemberId}</span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="search-info-list">
                          <h6 className="member-heading">Barcode ID :</h6>

                          <span className="member-info-label" key={memberData?.MemberId}>
                            {memberData?.BarcodeId}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="search-info-list">
                          <h6 className="member-heading">Mobile Phone :</h6>
                          <span className="member-info-label"> 7668909875 </span>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="search-info-list">
                          <h6 className="member-heading">Card on File :</h6>
                          <span className="member-info-label"> No </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">PT Auto Purchase :</h6>
                          <span className="member-info-label">
                            Yes
                            <button onClick={() => setShow(!show)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                            {show && <p> Hello </p>}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">PT - Preferred 30 Min Pack Size :</h6>
                          <span className="member-info-label"> Session </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">PT - Preferred 60 Min Pack Size :</h6>
                          <span className="member-info-label"> Session </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Pilates Auto Purchase :</h6>
                          <span className="member-info-label">
                            Yes
                            <button onClick={() => setShow(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Pilates - Private Pack Size :</h6>
                          <span className="member-info-label"> Session </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Pilates - Duet Pack Size :</h6>
                          <span className="member-info-label"> Session </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Pilates - Semi-Private Pack Size :</h6>
                          <span className="member-info-label"> Session </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">PT Session Confirmation Email :</h6>
                          <span className="member-info-label">
                            <p>{textConfirmationEmail}</p>
                            <button onClick={() => setShowConfirmationEmail(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                            {showconfirmationEmail && (
                              <p>
                                Receive an email confirmation when your trainer creates, reschedules or cancels training
                                sessions.
                                <div>
                                  <input
                                    type="checkbox"
                                    onChange={(event) => setChecked(event.currentTarget.checked)}
                                    checked={checked}
                                  />
                                  <span> Turn On </span>
                                </div>
                                <div>
                                  <p
                                    onClick={() => setShowConfirmationEmail(false)}
                                    className="search-id cursor-pointer"
                                  >
                                    Cancel
                                  </p>
                                  <span>
                                    {checked ? (
                                      <button
                                        className="btn eq-primary-btn"
                                        onClick={() => {
                                          setShowConfirmationEmail(false);
                                          setTextConfirmationEmail("Turned On");
                                        }}
                                      >
                                        Save
                                      </button>
                                    ) : (
                                      <button
                                        className="btn eq-primary-btn"
                                        onClick={() => {
                                          setShowConfirmationEmail(false);
                                          setTextConfirmationEmail("Turned Off");
                                        }}
                                      >
                                        Save
                                      </button>
                                    )}
                                  </span>
                                </div>
                              </p>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Pilates Reminder Email :</h6>
                          <span className="member-info-label">
                            <p>{textreminderEmail}</p>
                            <button onClick={() => setShowReminderEmail(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                            {showReminderEmail && (
                              <p>
                                Receive an email notification when your session is coming up.
                                <div>
                                  <input
                                    type="checkbox"
                                    onChange={(event) => setChecked(event.currentTarget.checked)}
                                    checked={checked}
                                  />
                                  <span> Turn On </span>
                                </div>
                                <div>
                                  <p onClick={() => setShowReminderEmail(false)} className="search-id cursor-pointer">
                                    Cancel
                                  </p>
                                  <span>
                                    {checked ? (
                                      <button
                                        className="btn eq-primary-btn"
                                        onClick={() => {
                                          setShowReminderEmail(false);
                                          setTextReminderEmail("Turned On");
                                        }}
                                      >
                                        Save
                                      </button>
                                    ) : (
                                      <button
                                        className="btn eq-primary-btn"
                                        onClick={() => {
                                          setShowReminderEmail(false);
                                          setTextReminderEmail("Turned Off");
                                        }}
                                      >
                                        Save
                                      </button>
                                    )}
                                  </span>
                                </div>
                              </p>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Pilates Inventory Email :</h6>
                          <span className="member-info-label">
                            <p>{textInventoryEmail}</p>
                            <button onClick={() => setShowInventoryEmail(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                            {showInventoryEmail && (
                              <p>
                                Receive an email notification when you run out of inventory.
                                <div>
                                  <input
                                    type="checkbox"
                                    onChange={(event) => setChecked(event.currentTarget.checked)}
                                    checked={checked}
                                  />
                                  <span> {textInventoryEmail} </span>
                                </div>
                                <div>
                                  <p onClick={() => setShowInventoryEmail(false)} className="search-id cursor-pointer">
                                    Cancel
                                  </p>
                                  <span>
                                    {checked ? (
                                      <button
                                        className="btn eq-primary-btn"
                                        onClick={() => {
                                          setShowInventoryEmail(false);
                                          setTextInventoryEmail("Turned On");
                                        }}
                                      >
                                        Save
                                      </button>
                                    ) : (
                                      <button
                                        className="btn eq-primary-btn"
                                        onClick={() => {
                                          setShowInventoryEmail(false);
                                          setTextInventoryEmail("Turned Off");
                                        }}
                                      >
                                        Save
                                      </button>
                                    )}
                                  </span>
                                </div>
                              </p>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <h3 className="info-heading text-dark">Online Account Information</h3>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="search-info-list">
                          <h6 className="member-heading">User Security ID :</h6>
                          <span className="member-info-label" key={memberData?.MemberId}>
                            {memberData?.UserSecId}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="search-info-list">
                          <h6 className="member-heading">Spa Biz ID :</h6>
                          <span className="member-info-label"> ---- </span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="search-info-list">
                          <h6 className="member-heading">Gender :</h6>
                          <span className="member-info-label">
                            <p>{textradio}</p>
                            <button onClick={() => setradioShow(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                            {radioShow && (
                              <div>
                                {radioOptions.map((gender, index) => (
                                  <RadioButton
                                    name={gender.genderType}
                                    title={gender.genderType}
                                    key={index}
                                    checked={selected === gender.key}
                                    value={gender.key}
                                    onChange={(e) => setSelected(gender.key)}
                                  />
                                ))}
                                <span>
                                  <p onClick={() => setradioShow(false)} className="search-id cursor-pointer">
                                    Cancel
                                  </p>
                                </span>
                                {selected === 1 ? (
                                  <button
                                    className="btn eq-primary-btn"
                                    onClick={() => {
                                      setradioShow(false);
                                      setTextradio("Male");
                                    }}
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    className="btn eq-primary-btn"
                                    onClick={() => {
                                      setradioShow(false);
                                      setTextradio("Female");
                                    }}
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list">
                          <h6 className="member-heading" key={memberData?.MemberId}>
                            Username/Email :
                          </h6>
                          <span className="member-info-label">
                            {memberData?.UserName}

                            <button onClick={() => setShowUserName(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>

                            {showUserName && (
                              <span>
                                To improve security and convenience we are consolidating username and email. Please
                                enter an new email which will be the members username to sign in. This will send an
                                email to the new address specified.
                                <div>
                                  New Email <input type="text" />
                                  <br />
                                  Confrim Email <input type="text" />
                                  <div>
                                    <input type="checkbox" /> Bypass Email Verification
                                    <p onClick={() => setShowUserName(false)} className="search-id cursor-pointer">
                                      Cancel
                                    </p>
                                    <button
                                      className="btn eq-primary-btn"
                                      onClick={() => {
                                        setShowUserName(false);
                                      }}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Password :</h6>
                          <span className="member-info-label">
                            ******
                            <button onClick={() => setShow(!show)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                            {show && <p></p>}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Connected Code & Pin :</h6>
                          <span className="member-info-label">
                            / ****
                            <button onClick={() => setShow(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Status :</h6>
                          <span className="member-info-label">
                            New Registration But Not Verified
                            <button onClick={() => setShow(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Connected to Facebook :</h6>
                          <span className="member-info-label"> No </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Timezone :</h6>
                          <span className="member-info-label">
                            Eastern Standard Time
                            <button onClick={() => setShow(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">Billing Opt-out :</h6>
                          <span className="member-info-label">
                            0 Sessions - Off
                            <button onClick={() => setShow(true)}>
                              <img className="edit-icon" src={editLogo} />
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="search-info-list-item">
                          <h6 className="member-heading">User Activation Status :</h6>
                          <span className="member-info-label">Active</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="admin-info">
                      <h3 className="info-heading text-dark">Admin Option</h3>
                      <div className="container">
                        <form action="" className="eq-search-box">
                          <div className="reg-member-form">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group search-group">
                                  <label htmlFor="inputUser">
                                    Impersonate User <span className="eq-mandatory-text">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control input-user-search"
                                    id="inputBarcodeId"
                                    aria-describedby="nameHelp"
                                    placeholder="Enter Password"
                                  />
                                </div>
                                <div className="search-box">
                                  <button type="button" className="btn eq-primary-btn">
                                    Login
                                  </button>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group search-group">
                                  <label htmlFor="inputUser">
                                    V5 User Token
                                    <span className="eq-mandatory-text">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control input-user-search"
                                    id="inputBarcodeId"
                                    aria-describedby="nameHelp"
                                    placeholder="Enter Password"
                                  />
                                </div>
                                <div className="search-box">
                                  <button type="button" className="btn eq-primary-btn">
                                    Get Token
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
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

export default SearchInfo;
