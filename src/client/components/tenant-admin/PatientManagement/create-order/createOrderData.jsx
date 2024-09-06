import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { Collection, ORDERS, docIds, dsr, statusIds } from "../../../../_helpers/constants";
import React, { useEffect, useRef, useState } from "react";
import {
  createOrder,
  getFacilityByUserId,
  getLabByUserId,
  getLabDays,
  getOrderFrequncy,
  getPriorityList,
  getScheduleTimeList,
  getTemplateList,
  uploadOcr
} from "@redux/slices/order-slice";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { getNpiDetailsByNumber, getOrderDetailsById, getPatientDetailsById } from "@redux/slices/tenantsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getFacilitiesDetails } from "@redux/slices/facilitiesSlice";

import Comments from "./comments";
import { EligibilityDetails } from "./eligibityDetails/eligibilityDetails";
import FailPopup from "../../../master-data/failpopup";
import Loader from "@utils/Loader";
import Ocr from "../../../tenant-admin/PatientManagement/addPatient/Ocr";
import OrderDetails from "@components/drawers/orderDetails";
import { PatientDetails } from "./patient-details";
import PreviewContent from "./previewDataModal";
import ScrollSpy from "react-ui-scrollspy";
import { TestDetails } from "./test-details";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import dayjs from "dayjs";
import { getNotificationList } from "@redux/slices/notificationListSlice";
import { tntEditOrder } from "@routes/routePaths";
import Label from "../../../drawers/label";

const CreateOrderData = ({ classes, setStep1Complete, setStep2Complete, setStep3Complete }) => {
  const { pathname } = useLocation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentId = queryParams.get("parentId");
  const moment = require('moment');

  const patientId = pathname.split("/")[2];
  const type = pathname.split("/")[1];
  const dispatch = useDispatch();
  const { status, abn, orderStatus, orderId, provDocStatus } = useSelector((state) => state.createOrder);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [statusId, setStatusId] = useState();
  const [previewData, setPreviewData] = useState("");
  const navigate = useNavigate();
  const { orderDetailsById } = useSelector((state) => state.tenants);
  const { patientDetailsById, npiArray, npiforInternal } = useSelector((state) => state?.tenants);
  const searchParams = new URLSearchParams(location.search);
  const param = searchParams.get("param");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [res, setRes] = useState({});
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [comment, setComment] = useState(false);
  const [reasonForReject, setReasonForReject] = useState("");
  const [showSuccess, setShowSucces] = useState(false);
  const [label, setLabel] = useState(false);
  const userDetailsString = sessionStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsString);
  const userId = userDetails.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatusId(statusIds.ACTIVE);

        if (pathname.split("/")[1] === tntEditOrder.split("/")[0]) {
          setLoader(true);
          const orderDetailsResponse = await dispatch(
            getOrderDetailsById({
              orderId: pathname.split("/")[3],
              roleId: getLoggedInUserRoleId(),
              tenantId: getTenantId()
            })
          ).then(() => setLoader(false));
          setRes(orderDetailsResponse?.payload.data);
        }
        await dispatch(getLabByUserId(getLoggedInUserId()));
        await dispatch(
          getFacilitiesDetails({
            pageNo: 0,
            pageSize: 99999,
            searchValue: "",
            sortKey: "creationDate",
            statusId: [statusIds.ACTIVE],
            sortOrder: "DESC",
            userId: [userId],
            roleId: getLoggedInUserRoleId()
          })
        );   
        setLoader(true);
        await dispatch(
          getPatientDetailsById({
            roleId: getLoggedInUserRoleId(),
            tenantId: getTenantId(),
            patientId
          })
        ).then(() => setLoader(false));

        await dispatch(getTemplateList());

        await dispatch(getOrderFrequncy());

        // Uncomment the following line if you need to fetch order priority
        // const orderPriorityResponse = await dispatch(getOrderPriority());
        // console.log("Order Priority Response:", orderPriorityResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [template, setTemplate] = useState(
    orderDetailsById !== {} && type === "edit-order"
      ? { orderTemplateId: orderDetailsById?.orderTemplateId, orderTemplateName: orderDetailsById?.orderTemplateName }
      : ""
  );
  // const [selectedTests, setSelectedTests] = useState(
  //   orderDetailsById !== {} && type === "edit-order"
  //     ? { panelId: orderDetailsById?.panel?.map((item)=>item.panelId), panelName: orderDetailsById?.panel((item)=>item?.panelName) }
  //     : ""
  // );

  const [error, setError] = useState("Please enter at least 2 characters for FN/LN");
  const getNpiDetails = (value) => {
    const isNumeric = /^\d+$/.test(value);

    const isAlphabetic = /^[A-Za-z\s]+$/.test(value);
    if (isAlphabetic && value?.length >= 2) {
      setLoader(true);
      dispatch(
        getNpiDetailsByNumber({
          searchValue: internal === true ? "" : value,
          city: internal === true ? "" : city || null,
          internalSearch: internal,
          userId: internal === true ? getLoggedInUserId() : "",
          roleId: internal === true ? getLoggedInUserRoleId() : ""
        })
      ).then((s) => {
        setLoader(false);
        setError("");
      });
      // setError("");
    } else if (isNumeric && value?.length >= 10) {
      setLoader(true);
      dispatch(
        getNpiDetailsByNumber({
          searchValue: internal === true ? "" : value,
          city: internal === true ? "" : city || null,
          internalSearch: internal,
          userId: internal === true ? getLoggedInUserId() : "",
          roleId: internal === true ? getLoggedInUserRoleId() : ""
        })
      ).then((s) => setLoader(false));
      setError("");
    } else {
      setError("Please enter at least 2 characters for FN/LN");
    }
  };
  const [orderType, setOrderType] = useState(
    orderDetailsById !== {} && type === "edit-order"
      ? {
          ordTypId: orderDetailsById?.orderType?.orderTypePriorityId,
          ordTypDesc: orderDetailsById?.orderType?.orderTypeDescription
        }
      : ""
  );
  // const [orderTemplate, setorderTemplate] = useState("");
  const [labs, setlabs] = useState(
    orderDetailsById !== {} && type === "edit-order"
      ? { labId: orderDetailsById?.lab?.labId, labName: orderDetailsById?.lab?.labName }
      : ""
  );
  const [facilities, setfacilities] = useState(
    orderDetailsById !== {} && type === "edit-order"
      ? { facilityId: orderDetailsById?.facility?.facilityId, facilityName: orderDetailsById?.facility?.facilityName }
      : []
  );
  const [priorityCode, setPriorityCode] = useState(
    orderDetailsById !== {} && type === "edit-order"
      ? {
          ordPrtyId: orderDetailsById?.orderPriorityDto?.orderPriorityId,
          priorityDesc: orderDetailsById?.orderPriorityDto?.orderPriorityDescription
        }
      : ""
  );
  const [submissionType, setSubmissionType] = useState(
    orderDetailsById !== {} && type === "edit-order"
      ? {
          scheduleTime: orderDetailsById?.scheduleTime || 0
        }
      : 0
  );
  const { orderPriority, orderTypes } = useSelector((state) => state.createOrder);
  useEffect(() => {
    if (orderPriority) {
      const defaultPriority = orderPriority.find((order) => order.id === 5);
      if (defaultPriority?.id === ORDERS.orderPriority) {
        setPriorityCode(defaultPriority);
      }
    }
  }, [orderPriority]);
  useEffect(() => {
    if (orderTypes) {
      const defaultOrderType = orderTypes.find((order) => order.id === 2);
      if (defaultOrderType?.id === ORDERS.orderType) {
        setOrderType(defaultOrderType);
      } else {
        setOrderType("");
      }
    }
  }, [orderTypes]);
  // const [PatientId, setPatientId] = useState("");
  const [recurring, setrecurring] = useState({
    ordRecFrequencyId: dsr.Weekly,
    ordRecFrequencyDesc: "Weekly"
  });
  const [recurringEventRepeats, setrecurringEventRepeats] = useState(0);
  const [recurringStartDate, setrecurringStartDate] = useState(dayjs());
  const [recurringEndDate, setrecurringEndDate] = useState(dayjs());
  const [recurringEventTime, setrecurringEventTime] = useState("");
  const [insuranceId, setInsuranceId] = useState(() => {
    if (type === "edit-order" && orderDetailsById !== {}) {
      const insuranceIdFromOrder = orderDetailsById?.insuranceDetailsViewDTO?.insuranceId;
      return (
        patientDetailsById?.insuranceDetails?.find((pntIns) => pntIns.insuranceId === insuranceIdFromOrder) || null
      );
    }
    return null;
  });
  const collectedByName = JSON?.parse(sessionStorage?.getItem("userDetails"));
  const fullName = collectedByName?.firstName + " " + collectedByName?.lastName;

  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [providerSign, setProviderSign] = useState(null);
  const [labDays, setLabDays] = useState([]);
  const [recurringOrder, setRecurringOrder] = useState(false);
  // const [selectedPanels, setSelectedPanels] = useState([]);
  const [selectedTests, setSelectedTests] = useState();
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState([]);
  const [recurranceRequestsFor, setRecurranceRequestsFor] = useState([]);
  const [toggleCollection, setToggleCollection] = useState(Collection?.createInd === true);
  const [collectionDate, setCollectionDate] = useState(dayjs());
  const [collectedBy, setCollectedBy] = useState(fullName);
  const [bill, setBill] = useState("");
  const [collectedTime, setCollectedTime] = useState(dayjs());
  const [preAuthCheck, setPreAuthCheck] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null); // Store the data URL of the cropped image
  const [qrCode, setQrCode] = useState(false);
  const [npi, setNpi] = useState(
    npiforInternal?.length > 0 || (npiArray?.length > 0 && type === "edit-order")
      ? npiforInternal[0] || npiArray[0]
      : ""
  );
  const [oneTimeOrderDate, setOneTimeOrderDate] = useState(dayjs());
  const [oneTimeOrderTime, setOneTimeOrderTime] = useState(dayjs());
  const [eligibilityCheck, setEligibilityCheck] = useState(false);
  const [AbnValid, setAbnValid] = useState(true);
  const boxRef = useRef(null);
  const [orderCheck, setOrderCheck] = useState("");
  const [fastingRequired, setFastingRequired] = useState([]);
  useEffect(() => {
    const initialFastingRequired = selectedTests?.map((test) => {
      if (test?.panelId) {
        return test?.panelTest ? test?.panelTest[0]?.specimenFrozen : false;
      } else {
        return test?.specimenFrozen;
      }
    });
    setFastingRequired(initialFastingRequired);
  }, [selectedTests]);

  useEffect(() => {
    if (Object.keys(orderDetailsById)?.length > 0 && type === "edit-order" && !orderCheck) {
      setlabs(orderDetailsById?.lab);
      setfacilities(orderDetailsById?.facility);
      setBill(orderDetailsById?.paymentTypeId === 1 ? "1" : orderDetailsById?.paymentTypeId === 2 ? "2" : "3");
      getNpiDetails(orderDetailsById?.npiNumber);
      const editTests = [];
      if (orderDetailsById?.panel?.length > 0) editTests.push(...orderDetailsById.panel);
      if (orderDetailsById?.individual?.length > 0) editTests.push(...orderDetailsById.individual);
      setSelectedTests(editTests);
      setPriorityCode({
        ordPrtyId: orderDetailsById?.orderPriorityDto?.orderPriorityId,
        priorityDesc: orderDetailsById?.orderPriorityDto?.orderPriorityDescription
      });
      setOrderType({
        ordTypId: orderDetailsById?.orderType?.orderTypePriorityId,
        ordTypDesc: orderDetailsById?.orderType?.orderTypeDescription
      });
      // setOneTimeOrderDate(dayjs(orderDetailsById?.oneTimeOrderTime).format("YYYY-MM-DD"));
      setOneTimeOrderTime(dayjs(orderDetailsById?.oneTimeOrderTime).format(" YYYY-MM-DD HH:mm:ss"));
      setPreAuthCheck(orderDetailsById?.priorAuthCheck);
      setCollectedBy(orderDetailsById?.collectionBy);
      if (orderDetailsById?.collectionBy !== null && orderDetailsById?.collectionTime !== null)
        setToggleCollection(true);
      setCollectionDate(dayjs(orderDetailsById?.collectionTime).format("MM/DD/YYYY"));
      const utcTime = orderDetailsById?.collectionTime;
      const istTime = moment.utc(utcTime).utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss");
      setCollectedTime(istTime);
      // imageUrlToBinary(orderDetailsById?.orderDocument)
      setTemplate({
        orderTemplateId: orderDetailsById?.orderTemplateId,
        orderTemplateName: orderDetailsById?.orderTemplateName
      });
      setSubmissionType({
        scheduleTime: orderDetailsById?.scheduleTime
      });
    }
  }, [orderDetailsById, param, selectedDiagnosisCodes]);

  useEffect(() => {
    if (Object.keys(orderDetailsById)?.length > 0 && type === "edit-order") {
      if (npiArray?.length > 0 || npiforInternal?.length > 0) setNpi(npiArray[0] || npiforInternal[0]);
      setInsuranceId(
        patientDetailsById?.insuranceDetails?.find(
          (pntIns) => pntIns?.insuranceId === orderDetailsById?.insuranceDetailsViewDTO?.insuranceId
        )
      );
    }
  }, [npiArray, orderDetailsById, patientDetailsById, param]);

  useEffect(() => {
    if (facilities) dispatch(getLabDays(facilities?.facilityId));
  }, [facilities]);

  useEffect(() => {
    if (orderType && priorityCode) {
      dispatch(getScheduleTimeList({ orderTypeId: orderType?.ordTypId, priorityId: priorityCode?.ordPrtyId }));
    }
  }, [orderType, priorityCode]);
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  };
  useEffect(() => {
    if (orderType?.ordTypId) {
      dispatch(getPriorityList(orderType?.ordTypId));
    }
  }, [orderType]);

  useEffect(() => {
    setEligibilityCheck(status?.statusFlag);
  }, [status]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const allTests = [];
  const [barcode, setBarcode] = useState("");
  const [requisition, setRequisition] = useState(null);

  const [popupClose, setPopUpClose] = useState(false);
  const utcDateTime = new Date(oneTimeOrderTime).toUTCString();
  const utcDateTimeforCollection = new Date(collectedTime).toUTCString();
  const dateParts = utcDateTime.split(" "); // Split the date string into parts
  const datePartsforCollection = utcDateTimeforCollection.split(" "); // Split the date string into parts
  const day = dateParts[1]; // Day part
  const dayforCollection = datePartsforCollection[1]; // Day part
  const month = months[dateParts[2]]; // Month part converted to numerical value
  const monthforCollection = months[datePartsforCollection[2]]; // Month part converted to numerical value
  const year = dateParts[3]; // Year part
  const yearforCollection = datePartsforCollection[3]; // Year part
  const time = dateParts[4];
  const timeforCollection = datePartsforCollection[4];
  const formattedDate = `${year}/${month}/${day}`;
  const formattedDateforCollection = `${yearforCollection}/${monthforCollection}/${dayforCollection}`;
  // allTests.push(...selectedPanels);
  allTests.push(...(selectedTests || []));
  const mandatoryFields = [
    orderType,
    priorityCode,
    labs?.labId,
    orderType?.ordTypId,
    priorityCode?.ordPrtyId,
    // submissionType?.schduleTimeId,
    insuranceId?.patientInsuranceGuarantorId,
    npi,
    facilities?.facilityId
  ];
  const mandatoryFieldsForEdit = [
    orderDetailsById?.lab?.labId?.length > 0,
    // orderDetailsById?.scheduleTime,
    orderDetailsById?.insuranceDetailsViewDTO?.patientInsuranceGuarantorId,
    orderDetailsById?.npiNumber?.length > 0,
    orderDetailsById?.facility?.facilityId?.length > 0,
    orderDetailsById?.orderType?.orderTypePriorityId,
    orderDetailsById?.orderPriorityDto?.orderPriorityId
  ];
  const isfieldsUndefined = mandatoryFields.includes(undefined || "") || allTests?.length === 0;
  const isEnableSubmitForedit = mandatoryFieldsForEdit.includes(false || undefined || "");
  const handleSubmit = (statusID, statusDesc, qrBool) => {
    setQrCode(qrBool);
    const formData = new FormData();
    if (requisition) {
      formData.append("sysGenReqForm.document", requisition);
      formData.append("sysGenReqForm.documentId", docIds.requisitionForm);
    }
    formData.append(
      "patientName",
      `${patientDetailsById?.firstName} ${patientDetailsById?.middleName} ${patientDetailsById?.lastName}`
    );
    if (parentId) {
      formData.append("parentOrderId", parentId);
    } else {
      if (orderId !== "") formData.append("orderId", orderId);
      else if (pathname.split("/")[3]) formData.append("orderId", pathname.split("/")[3]);
    }

    formData.append("insuranceEligibilityStatus", status?.Payload?.PatientEligibility?.EligibilityStatus || "");
    formData.append("transactionId", status?.Payload?.PatientEligibility?.TransactionId || "");
    formData.append(
      "insuranceEligibilityStatusMessage",
      status?.Payload?.PatientEligibility?.EligibilityStatusMessage || ""
    );
    formData.append("patientId", patientDetailsById?.patientId);
    formData.append("npiId", npi?.number || 0);
    formData.append("npiName", npi?.basic?.name || "");
    formData.append("labId", labs?.labId || 0);
    formData.append("facilityId", facilities?.facilityId || "");
    formData.append("insuranceEligibilityIndex", status?.statusFlag || false);
    formData.append("patientInsuranceGuarantorId", insuranceId?.patientInsuranceGuarantorId || 0);
    formData.append("orderTemplateId", template?.orderTemplateId || 0);
    formData.append(
      "orderTypePriorityId",
      submissionType === 0
        ? priorityCode?.ordTypPrtyId
        : submissionType?.ordTypPrtyId || orderDetailsById?.orderType?.orderTypePriorityId
    );
    if (orderType?.ordTypDesc === "Recurring") {
      formData.append("recurringFromDate", dayjs(recurringStartDate).format("YYYY/MM/DD HH:mm:ss"));
      formData.append("recurringToDate", dayjs(recurringEndDate).format("YYYY/MM/DD HH:mm:ss"));
      formData.append("preferenceId", dsr.Weekly || 0);
      formData.append("repeatsEvery", recurringEventRepeats || 0);
      recurranceRequestsFor?.forEach((req, i) => formData.append(`requestOnPrefix[${i}]`, req?.id || 0));
      labDays?.forEach((labDay, i) => formData.append(`requestsOn[${i}]`, labDay?.labDayId || 0));
    } else {
      formData.append("oneTimeOrderDate", `${formattedDate} ${time}`);
    }
    if (statusDesc === "Rejected") formData.append("comments", reasonForReject);
    else if (statusDesc === "DRAFT") formData.append("comments", "user kept order yet to be drafted");
    else if (statusDesc === "YetToBeSubmitted") formData.append("comments", "user kept order yet to be sbmitted");
    else if (statusDesc === "In-Progress") formData.append("comments", "user submitted the order");
    formData.append("addCollectionDetails", toggleCollection);
    formData.append("priorAuthCheck", preAuthCheck);
    formData.append("abnCheck", abn?.abnRequired || orderDetailsById?.abnCheck || false);
    formData.append("tenantId", getTenantId());
    formData.append("roleId", getLoggedInUserRoleId());
    formData.append("paymentTypeId", bill);
    if (toggleCollection) {
      formData.append("collectedBy", collectedBy || "");

      formData.append("collectionDate", `${formattedDateforCollection} ${timeforCollection} `);
    }
    formData.append("createdBy", getLoggedInUserId());
    formData.append("statusId", statusID || 0);
    formData.append("statusDescription", statusDesc || "");
    formData.append(
      "submissionTime",
      (submissionType?.schduleTimeId || submissionType?.scheduleTime) === undefined
        ? 0
        : submissionType?.schduleTimeId || submissionType?.scheduleTime
    );
    if ((abn?.abnRequired && selectedFile) || (orderDetailsById?.abnCheck && selectedFile)) {
      formData.append("abnDocument.documentId", docIds.abnDocID);
      formData.append("abnDocument.document", selectedFile);
    }
    if (
      res?.orderDocument &&
      res?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.abnDocID)?.patientDocId
    )
      formData.append(
        "abnDocument.patientDocumentId",
        res?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.abnDocID)?.patientDocId
      );

    // if ((croppedImage || providerSign) && (!providerSign || !providerSign.includes("https"))) {
    //   formData.append("digitalSign.documentId", docIds.providerSignDocId);
    //   if (croppedImage) formData.append("digitalSign.document", croppedImage);
    //   else formData.append("digitalSign.document", providerSign);
    // }
    if (croppedImage || providerSign) {
      formData.append("digitalSign.documentId", docIds.providerSignDocId);

      if (croppedImage) {
        formData.append("digitalSign.document", croppedImage);
      } else if (typeof providerSign === "string" && !providerSign.includes("https")) {
        formData.append("digitalSign.document", providerSign);
      } else if (typeof providerSign === "object" && providerSign instanceof File) {
        formData.append("digitalSign.document", croppedImage || providerSign);
      }
    }

    if (
      provDocStatus?.patientDocId ||
      (res?.orderDocument &&
        res?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.providerSignDocId)?.patientDocId)
    )
      formData.append(
        "digitalSign.patientDocumentId",
        provDocStatus?.patientDocId ||
          (res?.orderDocument &&
            res?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.providerSignDocId)?.patientDocId)
      );

    if (uploadFile) {
      formData.append("requsitionForm.documentId", docIds.ocrDocId);
      formData.append("requsitionForm.document", uploadFile);
    }
    allTests?.map((test, i) => {
      const specimenFrozenValue = !!fastingRequired[i] || false;
      formData.append(
        `testDetailsdto[${i}].testCompendiumId`,
        test?.panelId ? 0 : test?.testCompendiumId || test?.testId || 0
      );
      formData.append(`testDetailsdto[${i}].panelId`, test?.panelId || 0);
      formData.append(`testDetailsdto[${i}].specimenFrozen`, specimenFrozenValue);

      const diagnosisCodes = selectedDiagnosisCodes[i] || [];
      if (diagnosisCodes.dgnstcCodes) {
        diagnosisCodes.dgnstcCodes.forEach((code, j) => {
          formData.append(`testDetailsdto[${i}].diagnosticCodes[${j}]`, code.diagnosticCode || "-");
          formData.append(`testDetailsdto[${i}].diagnosticCodesDesc[${j}]`, code.diagnosticDesc || "-");
        });
      }

      return formData;
    });
    let action;
    try {
      if (statusDesc === "PreviewOrder") {
        dispatch(createOrder(formData)).then((r) => {
          if (r.type.split("/")[2].includes("rejected")) {
            setShowFailPopup(true);
          } else {
            setOpen(true);
            setPreviewData(formData);
            setBarcode(r.payload?.data?.split("-")[1]);
          }
        });
      } else {
        dispatch(createOrder(formData))
          .then((r) => {
            const popupData = r.type.split("/");
            // setPopup(popupData);
            setBarcode(r.payload?.data?.split("-")[1]);
            if (popupData && popupData.length >= 3 && popupData[2].includes("rejected")) {
              setShowFailPopup(true);
            }
          })
          .catch((error) => {
            console.error("Error dispatching createOrder:", error);
          });
      }
    } catch {
      console.log(action);
    }
  };
  useEffect(() => {
    if (orderStatus?.status === 200 && !qrCode) {
      if (param !== "editOrder" && showSuccess && popupClose === false) {
        setShowSuccessPopup(true);
        setPopupMessage(orderStatus?.data);
      }
    }
  }, [orderStatus, qrCode]);

  const [alignment, setAlignment] = React.useState("yes");

  // const [stat, setStat] = React.useState("routine");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const toggleDrawerOrderDetails = (open) => (event) => {
    setIsOpenOrderDetails(open);
  };
  // const [showButton, setShowButton] = React.useState(false);
  // const handleClickShowPassword = () => setShowButton((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  // const [value, setValue] = React.useState(0);
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    navigate("/patient-search?param=createOrder");
  };
  const rSubmit = () => {
    setStatusId(statusIds.REJECTED);
    handleSubmit(statusIds.REJECTED, "Rejected");
    setShowSucces(true);
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stopAnalysis, setStopAnalysis] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup1 = () => {
    setIsPopupOpen(false);
    setStopAnalysis(false);
    // setOCRDetails("");
    // if (ocrDetails?.filename?.value === "LABORATORY REQUISITION" && ocrDetails?.subfile?.value === "STAT") {
    //   setOcrDocUrl("");
    //   setModel("");
    // } else if (ocrDetails?.filename?.value === "MOLECULAR TEST REQUISITION" || ocrDetails?.subfile?.value === "STAT") {
    //   setOcrDocUrl("");
    //   setModel("");
    // } else if (ocrDetails?.filename?.value === "TBD") {
    //   setOcrDocUrl("");
    //   setModel("");
    // }
    setModel("FilenameFinal");
    setOcrDocUrl("");
  };
  const [ocrDocUrl, setOcrDocUrl] = useState();

  // const ocrURL = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantConfigurationDTO?.ocrUrl;

  const [model, setModel] = useState("FilenameFinal");
  const analyzeDocument = async (e) => {
    try {
      // Set up the Azure Form Recognizer client
      setLoader(true);
      const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT || "<endpoint>";
      const credential = new AzureKeyCredential(process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY || "<api key>");
      const client = new DocumentAnalysisClient(endpoint, credential);

      // Set the ID of the custom model you want to use
      // const modelId = "Filename" || "Neural" || "Customextractionmodels";

      // Begin the document analysis process
      const poller = await client.beginAnalyzeDocument(model, e);

      // Poll until the document analysis is complete
      const {
        documents: [document]
      } = await poller.pollUntilDone();

      // Check if at least one document was extracted
      if (!document) {
        throw new Error("Expected at least one document in the result.");
      }

      // Print the extracted document information
      // console.log("Extracted document:", document.docType, `(confidence: ${document.confidence || "<undefined>"})`);
      console.log("Fields:", Object.values(document.fields));

      setOCRDetails(document.fields);
      if (Object.values(document.fields)?.length > 2) {
        setIsPopupOpen(false); // to see the list in table enable "true"
      } else {
        setIsPopupOpen(false);
      }

      if (document.fields || stopAnalysis) {
        console.log("Analysis stopped.");
        return;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoader(false);
    }
  };

  // analyzeDocument();
  const checkDocumentUrl = (e) => {
    if (ocrDocUrl) {
      analyzeDocument(e); // Call analyzeDocument function
    } else {
      setTimeout(checkDocumentUrl, 1000); // Check again after 1 second
    }
  };

  // useEffect(() => {
  //   checkDocumentUrl(); // Start checking initially
  // }, [file]);
  const [uploadFile, setUploadedFile] = useState();
  const ocrInput = useRef(null);
  const [ocrDetails, setOCRDetails] = useState();
  const [internal, setInternal] = useState(false);

  const [loader, setLoader] = useState(false);
  const handleClick = (file) => {
    if (file === "OCR") {
      ocrInput.current.click();
    }
  };
  const uploadOCR = async (file) => {
    try {
      const formData = new FormData();
      formData.append("Document", file);
      setLoader(true);
      const response = await dispatch(uploadOcr(formData));
      setOcrDocUrl(response?.payload?.data?.docUrl);
      analyzeDocument(response?.payload?.data?.docUrl);
      if (!response.ok) {
        throw new Error("Failed to upload OCR document");
      }

      // Handle the response data as needed
    } catch (error) {
      console.error("Error uploading OCR document:", error);
      // Handle errors
    }
  };
  const handleFileChange = (e, file, fileType) => {
    checkDocumentUrl();
    uploadOCR(e.target.files[0]);
    setUploadedFile(e.target.files[0]);
  };
  useEffect(
    (e) => {
      if (ocrDetails) {
        if (ocrDetails?.filename?.value === "LABORATORY REQUISITION" && ocrDetails?.subfile?.value === "STAT") {
          setModel("Labstat");
          analyzeDocument(ocrDocUrl);
        } else if (
          ocrDetails?.filename?.value === "MOLECULAR TEST REQUISITION" ||
          ocrDetails?.subfile?.value === "STAT"
        ) {
          setModel("MolecularTest");
          analyzeDocument(ocrDocUrl);
        } else if (
          ocrDetails?.filename?.value === "HEALTH REQUISITION" ||
          ocrDetails?.filename?.value === "TBD HEALTH REQUISITION"
        ) {
          setModel("TBDsheetFinal");
          analyzeDocument(ocrDocUrl);
        }
      }
    },
    [ocrDocUrl, ocrDetails]
  );

  useEffect(() => {
    if (internal === true) {
      setError("");
    }else{
      setError("Please enter at least 2 characters for FN/LN");
    }
  }, [internal])
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let selectedObjects = [];

  if (ocrDetails) {
    selectedObjects = Object.entries(ocrDetails)
      .filter(([key, value]) => value?.value === "selected")
      .map(([key, value]) => ({ key, value }));
  }
  useEffect(() => {
    if (barcode) {
      dispatch(
        getOrderDetailsById({
          orderId: barcode?.trimStart(),
          roleId: getLoggedInUserRoleId(),
          tenantId: getTenantId()
        })
      ).then((r) => {
        setRes(r.payload?.data);
      });
    }
  }, [barcode]);
  const booleanArray = selectedDiagnosisCodes?.map((s) => s?.dgnstcCodes?.length > 0) || [];

  const checkForFalseValues = (arr) => {
    return arr.includes(false) || arr.includes(null) || arr.includes(undefined) || arr.includes("empty");
  };
  const newErrors = [];
  if (checkForFalseValues(booleanArray)) {
    newErrors.push("false");
  }
  return (
    <>
      <Box className="content__wrapper patientMngmt--stepper" ref={boxRef}>
        {loader && <Loader />}

        <OrderDetails isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} />
        <ScrollSpy parentScrollContainerRef={boxRef}>
          <Box className="createOrder__wrapper" id="step1">
            <Typography variant="div" component="div" className="createOrder__wrapper--header position-relative">
              <Typography variant="h6" component="h6">
                <Typography variant="b" component="b">
                  Step 1
                </Typography>
                Patient Details
              </Typography>
              {isPopupOpen ? (
                <>
                  <Modal
                    open={isPopupOpen}
                    onClose={handleClosePopup1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Ocr isOpen={isPopupOpen} onClose={handleClosePopup1} data={ocrDetails} />
                  </Modal>
                </>
              ) : (
                // <Loader />
                ""
              )}

              {/* <Button>
                <Typography component="span" variant="span" className="ls-uploadIcon primaryIcon me-2"></Typography>
                Upload Order Details
              </Button> */}
              {/* <Button
                variant="text"
                className="downloadBtn-text p-0 positioned--text upload--order"
                aria-label="upload"
                onClick={() => handleClick("OCR")}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                // disabled={stateId}
              >
                <Typography component="span" variant="span" className="ls-uploadIcon primaryIcon me-2">
                  Upload
                </Typography>
              </Button> */}
              <input
                className="browseInput"
                type="file"
                id="fileInput"
                accept=".pdf, .jpeg, .jpg, .png"
                style={{ display: "none" }}
                ref={ocrInput} // Use the ref to reference the file input element
                onChange={(e) => handleFileChange(e, "OCR", "OCR1")}
              />
            </Typography>
            <PatientDetails
              getNpiDetails={getNpiDetails}
              error={error}
              setError={setError}
              city={city}
              internal={internal}
              setInternal={setInternal}
              setCity={setCity}
              insuranceId={insuranceId}
              setInsuranceId={setInsuranceId}
              labs={labs}
              setlabs={setlabs}
              facilities={facilities}
              setfacilities={setfacilities}
              setStep1Complete={setStep1Complete}
              npi={npi}
              setNpi={setNpi}
              setMessage={setMessage}
              message={message}
              setErrorMessage={setErrorMessage}
              errorMessage={errorMessage}
              type={type}
            />
          </Box>
          <Box className="createOrder__wrapper mt-3" id="step2">
            <Typography variant="div" component="div" className="createOrder__wrapper--header">
              <Typography variant="h6" component="h6">
                <Typography variant="b" component="b">
                  Step 2
                </Typography>
                Test Details
              </Typography>
            </Typography>
            <TestDetails
              newErrors={newErrors}
              selectedObjects={selectedObjects}
              setrecurringEventRepeats={setrecurringEventRepeats}
              setrecurringEventTime={setrecurringEventTime}
              alignment={alignment}
              handleChange={handleChange}
              recurringEventTime={recurringEventTime}
              recurringEventRepeats={recurringEventRepeats}
              priorityCode={priorityCode}
              setPriorityCode={setPriorityCode}
              recurring={recurring}
              setrecurring={setrecurring}
              template={template}
              setTemplate={setTemplate}
              labDays={labDays}
              setLabDays={setLabDays}
              setRecurringOrder={setRecurringOrder}
              // setSelectedPanels={setSelectedPanels}
              // selectedPanels={selectedPanels}
              selectedTests={selectedTests}
              setSelectedTests={setSelectedTests}
              selectedDiagnosisCodes={selectedDiagnosisCodes}
              setSelectedDiagnosisCodes={setSelectedDiagnosisCodes}
              recurranceRequestsFor={recurranceRequestsFor}
              setRecurranceRequestsFor={setRecurranceRequestsFor}
              orderType={orderType}
              setOrderType={setOrderType}
              recurringStartDate={recurringStartDate}
              setrecurringStartDate={setrecurringStartDate}
              recurringEndDate={recurringEndDate}
              setrecurringEndDate={setrecurringEndDate}
              collectedBy={collectedBy}
              toggleCollection={toggleCollection}
              collectionDate={collectionDate}
              setCollectedBy={setCollectedBy}
              setToggleCollection={setToggleCollection}
              setCollectionDate={setCollectionDate}
              collectedTime={collectedTime}
              setCollectedTime={setCollectedTime}
              fastingRequired={fastingRequired}
              setFastingRequired={setFastingRequired}
              setStep2Complete={setStep2Complete}
              oneTimeOrderDate={oneTimeOrderDate}
              oneTimeOrderTime={oneTimeOrderTime}
              setOneTimeOrderDate={setOneTimeOrderDate}
              setOneTimeOrderTime={setOneTimeOrderTime}
              type={type}
              bill={bill}
              setBill={setBill}
              setOrderCheck={setOrderCheck}
            />
          </Box>
          <Box className="createOrder__wrapper mt-3" id="step3">
            <Typography variant="div" component="div" className="createOrder__wrapper--header">
              <Typography variant="h6" component="h6">
                <Typography variant="b" component="b">
                  Step 3
                </Typography>
                Eligibility and Other Details
              </Typography>
            </Typography>
            <EligibilityDetails
              res={res}
              requisition={requisition}
              setRequisition={setRequisition}
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              setProviderSign={setProviderSign}
              providerSign={providerSign}
              handleClickOpen={handleClickOpen}
              submisionType={submissionType}
              setSubmisionType={setSubmissionType}
              // selectedPanels={selectedPanels}
              selectedTests={selectedTests}
              selectedDiagnosisCodes={selectedDiagnosisCodes}
              preAuthCheck={preAuthCheck}
              setPreAuthCheck={setPreAuthCheck}
              selectedInsurance={insuranceId}
              setCroppedImage={setCroppedImage}
              handleSubmit={handleSubmit}
              setStep3Complete={setStep3Complete}
              setStatusId={setStatusId}
              qrCode={qrCode}
              patientId={patientDetailsById?.patientId}
              eligibilityCheck={eligibilityCheck}
              setAbnValid={setAbnValid}
              type={type}
            />
          </Box>
          <Stack className="action__wrapper p-3 d-flex justify-content-between buttons__wrapper" direction="row">
            <Button
              variant="outlined"
              className="reject-btn primary-outline-btn background-unset"
              disabled={orderDetailsById?.status?.statusId === statusIds.IN_PROGRESS}
              onClick={() => {
                setComment(true);
              }}
            >
              Reject Order
            </Button>
            {/* {orderDetailsById?.hl7queueIndicator === false  && ( */}
            {/* )}x */}
            <Box>
              {/* <Button
                variant="outlined"
                className="primary-outline-btn background-unset"
                onClick={() => {
                  setStatusId(statusIds.YetToBeSubmitted);
                  handleSubmit(statusIds.YetToBeSubmitted, "YetToBeSubmitted");
                }}
              >
                Yet To Submit
              </Button> */}
              <Button
                variant="outlined"
                className="primary-outline-btn background-unset ms-3"
                onClick={() => {
                  handleSubmit(statusIds.DRAFT, "PreviewOrder");
                  setPopUpClose(true);
                }}
                disabled={!orderType || !priorityCode || newErrors?.includes("false")}
              >
                Preview Order
              </Button>
              <Button
                variant="outlined"
                className="primary-outline-btn background-unset ms-3"
                onClick={() => {
                  setStatusId(statusIds.DRAFT);
                  handleSubmit(statusIds.DRAFT, "DRAFT");
                  setPopUpClose(false);
                  setShowSucces(true);
                }}
                disabled={!orderType || !priorityCode || newErrors?.includes("false")}
              >
                Save Draft
              </Button>
              <Button
                variant="contained"
                className="primary-btn ms-3"
                disabled={
                  orderDetailsById !== {} && type === "edit-order"
                    ? isEnableSubmitForedit
                    : // AbnValid === true ||
                      isfieldsUndefined ||
                      // (errorMessage?.length < 1 && message?.length < 1) ||
                      newErrors?.includes("false")
                }
                onClick={() => {
                  setStatusId(statusIds.IN_PROGRESS);
                  handleSubmit(statusIds.IN_PROGRESS, "In-Progress");
                  setPopUpClose(false);
                  setShowSucces(true);
                }}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </ScrollSpy>
      </Box>
      {/* {showFailPopup && (
        <FailPopup errorMessage="please Fill Mandatory Fields" onClose={() => setShowFailPopup(false)} />
      )} */}
      {comment && (
        <Comments
          onClose={() => setComment(false)}
          rSubmit={rSubmit}
          setReasonForReject={setReasonForReject}
          reasonForReject={reasonForReject}
        />
      )}
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}

      {open && (
        <PreviewContent
          setOpen={setOpen}
          open={open}
          previewData={previewData}
          barcode={barcode}
          facilities={facilities}
          insuranceId={insuranceId}
          labs={labs}
          allTests={allTests}
          selectedDiagnosisCodes={selectedDiagnosisCodes}
          fastingRequired={fastingRequired}
          handleSubmit={handleSubmit}
          priorityCode={priorityCode}
          orderType={orderType}
          providerSign={croppedImage}
          formattedDateforCollection={formattedDateforCollection}
          timeforCollection={collectedTime}
          orderDetailsById={orderDetailsById}
          npi={npi}
          title="Preview Order"
        />
      )}

      {label && <Label open={label} close={setLabel} orderDetailsById={orderDetailsById} />}

      {showSuccessPopup && (
        <Modal
          open={showSuccessPopup}
          onClose={handleClosePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            {/* <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
            Successfully
          </Typography> */}
            <Typography id="modal-modal-description" className="modal-modal-description">
              {popupMessage}
            </Typography>

            <Typography>
            <Button
              autoFocus
              type="submit"
              className="primary-btn mx-2"
              onClick={() => {
                handleClosePopup();
                navigate("/tenant-order-reports");
                window.location.reload();
              }}
            >
              Okay
            </Button>
            <Button
              autoFocus
              type="submit"
              className="primary-btn float-right pb-3 mx-2"
              onClick={() => {
                setLabel(true);
              }}
            >
              Generate Label
            </Button>
            <Button
              autoFocus
              type="submit"
              className="primary-btn float-right pb-3"
              onClick={() => {
                setOpen(true);
              }}
            >
              Print Requisition
            </Button>
            </Typography>
            
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CreateOrderData;
