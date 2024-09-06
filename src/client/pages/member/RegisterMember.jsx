import React from "react";
import { useForm } from "react-hook-form";
import { errorMessage } from "@config/app-config";
import { updateRegisterMember } from "@redux/slices/registerMember";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
const RegisterMember = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updateRegisterMember(data));
  };

  return (
    <div className="eq-page-view">
      <div className="eq-reg-member">
        <div className="card eq-main-page-card">
          <div className="card-body">
            <div className="page-header">
              <h2 className="page-title">{t("REGISTER_MEMBER")}</h2>
              <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="eq-search-box">
                  <div className="reg-member-form">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group search-group">
                          <label htmlFor="inputBarcodeId">{`${t("BARCODE")}  ${t("ID")}`}</label>
                          <input
                            type="text"
                            className="form-control input-search-reg"
                            placeholder={`${t("ENTER", { BARCODE: t("BARCODE") })}`}
                            {...register("barcode", {
                              required: { value: true, message: errorMessage.Required }
                            })}
                          />
                          {errors.barcode && <span className="text-danger fs-6">{errors.barcode.message}</span>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group search-group">
                          <label htmlFor="inputLastName">{t("LAST_NAME")}</label>
                          <input
                            type="text"
                            className="form-control input-search-reg"
                            placeholder={`${t("ENTER", { BARCODE: t("LAST_NAME") })}`}
                            {...register("lastname", {
                              required: { value: true, message: errorMessage.Required },
                              pattern: { value: /^[A-Za-z]+$/i, message: errorMessage.validLastName }
                            })}
                          />
                          {errors.lastname && <span className="text-danger fs-6">{errors.lastname.message}</span>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group search-group">
                          <label htmlFor="inputEmailId">{t("EMAIL")}</label>
                          <input
                            type="email"
                            className="form-control input-search-reg"
                            placeholder={`${t("ENTER", { BARCODE: t("EMAIL") })}`}
                            {...register("email", {
                              required: { value: true, message: errorMessage.Required },
                              pattern: {
                                value: /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
                                message: errorMessage.validEmail
                              }
                            })}
                          />

                          {errors.email && <span className="text-danger fs-6">{errors.email.message}</span>}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group search-group">
                          <label htmlFor="inputPassword">{t("PASSWORD")}</label>
                          <input
                            type="password"
                            className="form-control input-search-reg"
                            placeholder={`${t("ENTER", { BARCODE: t("PASSWORD") })}`}
                            {...register("password", {
                              required: { value: true, message: errorMessage.Required },
                              pattern: {
                                value: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                                message: errorMessage.validPassword
                              }
                            })}
                          />

                          {errors.password && <span className="text-danger fs-6">{errors.password.message}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="search-box">
                    <button type="submit" className="btn eq-primary-btn">
                      {t("REGISTER")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterMember;
