import { Accordion, AccordionSummary, Box, Button, Checkbox, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  addPatientDetails,
  deleteCareGiver,
  deleteInsuranceandGurantor,
  getEthinicList,
  getGenderList,
  getPlanType,
  getRaceList,
  getRelationList,
  updatePatientDetails
} from "@redux/slices/order-slice";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { patientObj, statusIds } from "../../../../_helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../../utils/Loader"

import AddNewPatient from "../addNewPatient";
import Caregiver from "./careGiver";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FailPopup from "../../../master-data/failpopup";
import { IdentityDetails } from "./identity-details/indentity-details";
import InsuranceGurantor from "./insurance-gurantor";
import Modal from "@mui/material/Modal";
import OrderDetails from "@components/drawers/orderDetails";
import { PatientPersonalDetails } from "./patient-personal-details";
import PropTypes from "prop-types";
import ScrollSpy from "react-ui-scrollspy";
import SuccessPopup from "@components/master-data/sucesspopup";
import checkmarkSuccess from "../../../../assets/images/svg/checkmarkSuccess.svg";
import dayjs from "dayjs";
import { getPatientDetailsById } from "@redux/slices/tenantsSlice";
import { getPayerCompendiumsList } from "@redux/slices/compendiumSlice";
import { useForm } from "react-hook-form";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
function Tabpanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`guarentor-tabpanel-${index}`}
      aria-labelledby={`guarentor-tab-${index}`}
      {...other}
    >
      {value === index && <Box> {children}</Box>}
    </div>
  );
}

Tabpanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `guarentor-tab-${index}`,
    "aria-controls": `guarentor-tabpanel-${index}`
  };
}

const AddPatientData = ({
  classes,
  setStep1Complete,
  setStep2Complete,
  setStep3Complete,
  setStep4Complete,
  step1Complete,
  step2Complete,
  step3Complete
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { patientDetailsById } = useSelector((state) => state.tenants);
  const searchParams = new URLSearchParams(location.search);
  const editParam = searchParams.get("edit");
  const patientId = searchParams.get("id");
  const [showFailPopup, setShowFailPopup] = useState(false);
  const boxRef = useRef(null);
  const currentDate = dayjs().format("YYYY/MM/DD").trim();
  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      // firstName: "",
      // middleName: "",
      // lastName: "",
      // birthDate: currentDate,
      // permanentAddr: "",
      // communicationAddr: "",
      // zipCode: "",
      // insurance: "",
      // drivingLicense: "",
      // stateId: "",
      insuranceDetails: [
        {
          insuranceId: "",
          policyHolderName: "",
          policyNumber: "",
          groupNumber: "",
          // contactNumber: "",
          networkCommunication: "",
          insuranceIssueDate: currentDate,
          insuranceExpiryDate: currentDate,
          deductableAmount: "",
          coPayment: "",
          coveredIndividuals: "",
          planType: "",
          // city: "",
          coInsurancePercentage: "",
          emergencyContactNumber: "",
          gurantorDetails: {
            firstName: "",
            middleName: "",
            gurantorLastName: "",
            relationId: "",
            // birthDate: currentDate,
            employerName: "",
            // gurantorAddress: "",
            phoneNumber: "",
            gurantorAlternatePhoneNumber: ""
          }
        }
      ],
      careGiverDetails: [
        {
          // relationId: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          userPhoneNo: "",
          careGiverAddress: ""
        }
      ],
      address: "",
      identityNumber: "",
      identityIssueDate: "",
      identityExpiryDate: "",
      identityIssueOfAuthority: "",
      identityClass: "",
      identityRestriction: "",
      endorsment: "",
      height: "",
      eyeColour: "",
      organDonor: "",
      identityIssueState: "",
      identityBarCode: "",
      identitySignature: "",
      gender: ""
    },

    mode: "onChange"
  });
  const setAllValues = (data) => {
    Object.keys(data).forEach((fieldName) => {
      setValue(fieldName, data[fieldName]);
    });
  };

  const initialState = {
    insuranceDetails: [
      {
        insuranceId: "",
        policyHolderName: "",
        policyNumber: "",
        groupNumber: "",
        // contactNumber: "",
        networkCommunication: "",
        insuranceIssueDate: currentDate,
        insuranceExpiryDate: currentDate,
        deductableAmount: "",
        coPayment: "",
        coveredIndividuals: "",
        planType: "",
        // city: "",
        coInsurancePercentage: "",
        emergencyContactNumber: "",
        gurantorDetails: {
          firstName: "",
          middleName: "",
          gurantorLastName: "",
          relationId: "",
          // birthDate: currentDate,
          employerName: "",
          // gurantorAddress: "",
          phoneNumber: "",
          gurantorAlternatePhoneNumber: ""
        }
      }
    ],

    careGiverDetails: [
      {
        // relationId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        userPhoneNo: "",
        careGiverAddress: ""
      }
    ]
  };
  const { relationList, patientList } = useSelector((state) => state.createOrder);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [race, setRace] = useState(null);
  const [gender, setGender] = useState(null);
  const [ethnic, setEthnic] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(dayjs());
  const [perAdd, setPerAdd] = useState("");
  const [perZipCode, setPerZipCode] = useState("");
  const [commZipCode, setCommZIpCode] = useState("");
  const [commAdd, setCommAdd] = useState("");
  const [commCity, setCommCity] = useState({ country: "", state: "", city: "", label: "" });
  const [perCity, setPerCity] = useState({ country: "", state: "", city: "", label: "" });
  const [contactNumber, setContactNumber] = useState("");
  const [loginIndicator, setLoginIndicator] = useState(false);
  const [drivingLicense, setDrivingLicense] = useState();
  const [stateId, setStateId] = useState();
  const [insurance, setInsurance] = useState();
  const [ssnId, setSsnId] = useState("");
  const [email, setEmail] = useState("");
  const [guarantorLocation, setGuarantorLocation] = useState({ country: "", state: "", city: "", label: "" });
  const [insurenceLocation, setInsurenceLocation] = useState({ country: "", state: "", city: "", label: "" });
  const [careGiverLocation, setCareGiverLocation] = useState({ country: "", state: "", city: "", label: "" });
  const [guarantorLocation1, setGuarantorLocation1] = useState({ country: "", state: "", city: "", label: "" });
  const [insurenceLocation1, setInsurenceLocation1] = useState({ country: "", state: "", city: "", label: "" });
  const [careGiverLocation1, setCareGiverLocation1] = useState({ country: "", state: "", city: "", label: "" });
  const [open, setOpen] = useState(false);
  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const [insuranceHeader, setInsuranceHeader] = useState(1);
  const [careGiver, setCareGiver] = useState(1);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [isCheckedModal, setIsCheckedModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [existedMessage, setExistedMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [identityErr, setIdentityErr] = useState("");
  const [insuranceIdErr, setInsuranceIdErr] = useState("");
  const [ocrInsData, setOcrInsData] = useState();
  const [drivingBinary, setDrivingBinaryFile] = useState();
  const [insuranceBinary, setInsuranceBinary] = useState();
  const [insuranceImg, setInsuranceImg] = useState(null);
  const [mandatory, setMandatory] = useState(false);
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const [toggleAccordian1, setToggleAccordian1] = useState(true);
  const [toggleAccordian2, setToggleAccordian2] = useState(true);
  const [toggleAccordian3, setToggleAccordian3] = useState(true);
  const [toggleAccordian4, setToggleAccordian4] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [defaultAddress1, setDefaultAddress1] = useState(false);
  const [patientById, setPatientById] = useState("");
  const [insuranceData, setInsuranceData] = useState([]);
  const [docData, setDocData] = useState([]);
  const [mrn, setMrn] = useState("");
  const [patientLoginUserId, setPatientLoginUserId] = useState([]);
  const [insuranceAndGurantorId, setInsuranceAndGurantorId] = useState();
  const [insuranceAndGurantorId1, setInsuranceAndGurantorId1] = useState();
  const [patientGurantorId, setPatientGurantorId] = useState();
  const [patientGurantorId1, setPatientGurantorId1] = useState();
  const [index, setIndex] = useState();
  const [patientCareGiverId1, setPatientCareGiverId1] = useState();
  const [patientCareGiverId, setPatientCareGiverId] = useState();
  const [patientInsuranceId, setPatientInsuranceId] = useState();
  const [patientInsuranceId1, setPatientInsuranceId1] = useState();
  const [successPopup, setSuccessPopoup] = useState(false);
  const [value, setTabValue] = React.useState(0);
  const [careGiverTab, setCareGiverTab] = useState(0);
  const [selectedPatientAddress, setSelectedPatientAddress] = useState(0);
  const { status } = useSelector((state) => state.createOrder);
  const [dateOfBirth1, setDateOfBirth1] = useState(dayjs());
  const [gurantorBirth, setGurantorBirth] = useState(dayjs());
  const keys = Object.keys(errors || {});
  const [loader, setLoader] = useState(false);
  const [selectedCompendiumList, setSelectedCompendiumList] = useState(null);
  const [selectedCompendiumList2, setSelectedCompendiumList2] = useState(null);
  const [policyNumber, setPolicyNumber] = useState("");
  const [patientLoginCheck, setPatientLoginCheck] = useState(false);
  useEffect(() => {
    if (patientList?.patientId) {
      sessionStorage.setItem("patientId", patientList?.patientId);
      setPatientById(patientList?.patientId);
      setPatientLoginUserId(patientList?.patientLoginUserId);
      setToggleAccordian2(true);
    } else {
      setExistedMessage(patientList?.message);
      setToggleAccordian2(false);
    }
  }, [patientList]);

  const formData = new FormData();
  let action;
  const step1Submit = () => {
    setLoader(true)
    formData.append("firstName", firstName);
    formData.append("middleName", middleName || "");
    formData.append("lastName", lastName);
    formData.append("phoneNumber", contactNumber);
    formData.append("race.id", race?.id || 0);
    formData.append("gender.id", gender?.id || 0);
    formData.append("gender.description", gender?.description || "");
    formData.append("ethenicGroup.id", ethnic?.id || 0);
    formData.append("mrn", mrn || "");
    formData.append("prmtCity", perCity?.city);
    formData.append("prmtCountry", perCity?.country);
    formData.append("prmtState", perCity?.state);
    formData.append("prmtZipcode", perZipCode);
    formData.append("cmcnCity", commCity?.city);
    formData.append("cmcnState", commCity?.state);
    formData.append("cmcnCountry", commCity?.country);
    formData.append("cmcnZipcode", commZipCode);

    formData.append("birthDate", dayjs(dateOfBirth).format("YYYY/MM/DD"));
    formData.append("roleId", "5");
    formData.append("logedInUserRole", getLoggedInUserRoleId());
    if ((editParam === "true" || patientList) && patientDetailsById) {
      formData.append("updateFlag", true);
      formData.append("updatedBy", getLoggedInUserId());
      formData.append("patientId", patientDetailsById?.patientId);
      formData.append("patientLoginUserId", patientDetailsById?.patientLoginUserId);
      formData.append("statusId", patientDetailsById?.statusId);
    } else {
      formData.append("updateFlag", false);
      formData.append("createdBy", getLoggedInUserId());
      formData.append("statusId", statusIds.DRAFT);
    }
    formData.append("permanentAdress", perCity?.label || "");
    formData.append("secondaryAddrs", commCity?.label || "");
    formData.append("loginIndicator", loginIndicator || false);
    formData.append("email", email);
    formData.append("tenantId", getTenantId());
    if (editParam === "true" || patientById) {
      try {
        action = dispatch(updatePatientDetails(formData)).then(()=> setLoader(false) )
        if (updatePatientDetails.fulfilled) {
          // setShowSuccessPopup(true);
          setPopupMessage(action.payload.data);
        }
      } catch {
        console.log(action.type);
        console.log(action);
      }
    } else {
      try {
        action = dispatch(addPatientDetails(formData)).then(()=>setLoader(false))        
        if (addPatientDetails.fulfilled) {
          // setShowSuccessPopup(true);
          setPopupMessage(action.payload.data);
        }
      } catch {
        console.log(action);
        console.log(action.type);
      }
    }
  };
  useEffect(() => {
    if (!editParam && patientList || patientById) {
      dispatch(
        getPatientDetailsById({
          roleId: getLoggedInUserRoleId(),
          tenantId: getTenantId(),
          patientId: patientById || patientList?.patientId
        })
      );
    }
  }, [patientList]);

  const step2Submit = (data) => {
    if(firstName?.length > 0 && lastName?.length >0 && gender){
      setLoader(true)
    setDocData(data);
    setToggleAccordian3(true);
    formData.append("firstName", firstName);
    formData.append("middleName", middleName || "");
    formData.append("lastName", lastName);
    formData.append("phoneNumber", contactNumber);
    formData.append("race.id", race?.id || 0);
    formData.append("gender.id", gender?.id || 0);
    formData.append("gender.description", gender?.description || "");
    formData.append("ethenicGroup.id", ethnic?.id || 0);
    formData.append("birthDate", dayjs(dateOfBirth).format("YYYY/MM/DD"));
    formData.append("roleId", "5");
    formData.append("mrn", mrn || "");
    formData.append("prmtCity", perCity?.city);
    formData.append("prmtCountry", perCity?.country);
    formData.append("prmtState", perCity?.state);
    formData.append("prmtZipcode", perZipCode);
    formData.append("cmcnCity", commCity?.city);
    formData.append("cmcnState", commCity?.state);
    formData.append("cmcnCountry", commCity?.country);
    formData.append("cmcnZipcode", commZipCode);

    formData.append("logedInUserRole", getLoggedInUserRoleId());
    formData.append("patientId", patientById || patientDetailsById?.patientId || "");

    if (editParam === "true" && patientDetailsById) {
      formData.append("updateFlag", true);
      formData.append("updatedBy", getLoggedInUserId());
      formData.append("patientId", patientDetailsById?.patientId);
      formData.append("patientLoginUserId", patientDetailsById?.patientLoginUserId);
      formData.append("statusId", patientDetailsById?.statusId);
    } else {
      formData.append("updateFlag", false);
      formData.append("createdBy", getLoggedInUserId());
      formData.append("updatedBy", getLoggedInUserId());
      formData.append("statusId", statusIds.DRAFT);
      formData.append("patientLoginUserId", patientLoginUserId);
    }
    formData.append("permanentAdress", perAdd || patientDetailsById?.primaryAddrs);
    formData.append("secondaryAddrs", commAdd || patientDetailsById?.secondaryAddrs);
    formData.append("loginIndicator", loginIndicator || false);
    formData.append("email", email);
    formData.append("tenantId", getTenantId());
    formData.append("ssnId", ssnId || "");
    formData.append("address", data?.address || "");
    formData.append("identityNumber", data?.identityNumber || "");
    if (data?.identityIssueDate != "Invalid Date" && data?.identityIssueDate != "") {
      formData.append("identityIssueDate", dayjs(data?.identityIssueDate).format("YYYY/MM/DD"));
    }
    if (data?.identityExpiryDate != "Invalid Date" && data?.identityExpiryDate != "") {
      formData.append("identityExpiryDate", dayjs(data?.identityExpiryDate).format("YYYY/MM/DD"));
    }

    formData.append("identityIssueOfAuthority", data?.identityIssueOfAuthority || "");
    formData.append("identityClass", data?.identityClass || "");
    formData.append("identityRestriction", data?.identityRestriction || "");
    formData.append("endorsment", data?.endorsment || "");
    formData.append("height", data?.height != null ? data?.height : "");
    formData.append("eyeColour", data?.eyeColour || "");
    formData.append("organDonor", data?.organDonor || "");
    formData.append("identityIssueState", data?.identityIssueState || "");
    if (drivingLicense) {
      if (drivingLicense?.docURL) {
        // formData.append("drivingIdProof.document", []);
      } else {
        formData.append("drivingIdProof.document", drivingLicense);
        formData.append("drivingIdProof.documentId", "2");
        formData.append("drivingIdProof.documentType", drivingLicense?.type || drivingLicense?.documentType);
      }
    }
    if (stateId) {
      if (stateId?.docURL) {
        // formData.append("stateIdProof.document", []);
      } else {
        formData.append("stateIdProof.document", stateId);
        formData.append("stateIdProof.documentId", "3");
        formData.append("stateIdProof.documentType", stateId?.type);
      }
    }
    if (insurance) {
      if (insurance?.docURL) {
        // formData.append("insuranceIdProof.document", []);
      } else {
        formData.append("insuranceIdProof.document", insurance);
        formData.append("insuranceIdProof.documentId", "4");
        formData.append("insuranceIdProof.documentType", insurance?.type || insurance?.documentType);
      }
    }
    try {
      action = dispatch(updatePatientDetails(formData)).then(()=> setLoader(false) )
      if (updatePatientDetails.fulfilled) {
        // setShowSuccessPopup(true);
        setPopupMessage(action.payload.data);
      }
    } catch {
      console.log(action);
      console.log(action.type);

      const popUp = action.payload?.type.split("/");
      if (popUp?.includes("rejected")) setShowFailPopup(true);
    }
  }
  };

  const step3Submit = (data) => {
    if(policyNumber && (selectedCompendiumList || selectedCompendiumList2)){
    setLoader(true)
    setInsuranceData(data);
    setToggleAccordian4(true);
    // setToggleAccordian3(true);
    formData.append("firstName", firstName);
    formData.append("middleName", middleName || "");
    formData.append("lastName", lastName);
    formData.append("phoneNumber", contactNumber);
    formData.append("race.id", race?.id || 0);
    formData.append("gender.id", gender?.id || 0);
    formData.append("gender.description", gender?.description || "");
    formData.append("mrn", mrn || "");
    formData.append("prmtCity", perCity?.city);
    formData.append("prmtCountry", perCity?.country);
    formData.append("prmtState", perCity?.state);
    formData.append("prmtZipcode", perZipCode);
    formData.append("cmcnCity", commCity?.city);
    formData.append("cmcnState", commCity?.state);
    formData.append("cmcnCountry", commCity?.country);
    formData.append("cmcnZipcode", commZipCode);
    formData.append("ethenicGroup.id", ethnic?.id || 0);
    formData.append("birthDate", dayjs(dateOfBirth).format("YYYY/MM/DD"));
    formData.append("roleId", "5");
    formData.append("logedInUserRole", getLoggedInUserRoleId());
    formData.append("patientId", patientById || patientDetailsById?.patientId ||"");
    formData.append("address", docData?.address || "");
    formData.append("identityNumber", docData?.identityNumber || "");
    if (data?.identityIssueDate != "Invalid Date" && data?.identityIssueDate != "") {
      formData.append("identityIssueDate", dayjs(data?.identityIssueDate).format("YYYY/MM/DD"));
    }
    if (data?.identityExpiryDate != "Invalid Date" && data?.identityExpiryDate != "") {
      formData.append("identityExpiryDate", dayjs(data?.identityExpiryDate).format("YYYY/MM/DD"));
    }
    formData.append("identityIssueOfAuthority", docData?.identityIssueOfAuthority || "");
    formData.append("identityClass", docData?.identityClass || "");
    formData.append("identityRestriction", docData?.identityRestriction || "");
    formData.append("endorsment", docData?.endorsment || "");
    formData.append("height", docData?.height || "");
    formData.append("eyeColour", docData?.eyeColour || "");
    formData.append("organDonor", docData?.organDonor || "");
    formData.append("identityIssueState", docData?.identityIssueState || "");

    if (editParam === "true" && patientDetailsById) {
      formData.append("updateFlag", true);
      formData.append("updatedBy", getLoggedInUserId());
      formData.append("patientId", patientDetailsById?.patientId);
      formData.append("statusId", patientDetailsById?.statusId);
      formData.append("patientLoginUserId", patientDetailsById?.patientLoginUserId);
      patientDetailsById?.insuranceDetails &&
        patientDetailsById?.insuranceDetails?.map((value, index) => {
          formData.append(`insuranceDetails[${index}].gurantorDetails.gurantorId`, value?.gurantorDetails?.gurantorId);
          formData.append(`insuranceDetails[${index}].patientInsuranceId`, value?.patientInsuranceId || "");
        });
    } else {
      formData.append("statusId", statusIds.DRAFT);
      formData.append("updateFlag", false);
      formData.append("createdBy", getLoggedInUserId());
      formData.append("patientLoginUserId", patientLoginUserId);
      patientDetailsById?.insuranceDetails &&
        patientDetailsById?.insuranceDetails?.map((value, index) => {
          formData.append(`insuranceDetails[${index}].gurantorDetails.gurantorId`, value?.gurantorDetails?.gurantorId);
          formData.append(`insuranceDetails[${index}].patientInsuranceId`, value?.patientInsuranceId || "");
        });
    }
    formData.append("permanentAdress", perAdd ||  patientDetailsById?.primaryAddrs);
    formData.append("secondaryAddrs", commAdd ||  patientDetailsById?.secondaryAddrs) ;
    formData.append("loginIndicator", loginIndicator || false);
    formData.append("email", email);
    formData.append("tenantId", getTenantId());
    formData.append("ssnId", ssnId || "");
    if (drivingLicense) {
      if (drivingLicense?.docURL) {
        // formData.append("drivingIdProof.document", []);
      } else {
        formData.append("drivingIdProof.document", drivingLicense);
        formData.append("drivingIdProof.documentId", "2");
        formData.append("drivingIdProof.documentType", drivingLicense?.type || drivingLicense?.documentType);
      }
    }
    if (stateId) {
      if (stateId?.docURL) {
        // formData.append("stateIdProof.document", []);
      } else {
        formData.append("stateIdProof.document", stateId);
        formData.append("stateIdProof.documentId", "3");
        formData.append("stateIdProof.documentType", stateId?.type);
      }
    }
    if (insurance) {
      if (insurance?.docURL) {
        // formData.append("insuranceIdProof.document", []);
      } else {
        formData.append("insuranceIdProof.document", insurance);
        formData.append("insuranceIdProof.documentId", "4");
        formData.append("insuranceIdProof.documentType", insurance?.type || insurance?.documentType);
      }
    }
    if (data.insuranceDetails) {
      const insurenceData = data.insuranceDetails;
      insurenceData?.forEach((c, i) => {
        const keys = Object.keys(c);
        keys?.forEach((key) => {
          // if (c[key] !== undefined) {
          if (key.includes("gurantorDetails")) {
            const gurantorkeys = Object.keys(c[key]);
            gurantorkeys.forEach((gk) => {
              if (gk === "gurantorCity") {
                if (i === 0) {
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCity`, guarantorLocation.city || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorState`, guarantorLocation.state || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCountry`, guarantorLocation.country || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorAddress`, guarantorLocation.label || "");
                  const birthDate = dayjs(gurantorBirth).format("YYYY/MM/DD");
                  // if (patientDetailsById?.insuranceDetails[0]?.gurantorDetails?.birthDate) {
                  //   birthDate = patientDetailsById.insuranceDetails[0].gurantorDetails.birthDate;
                  // }
                  if (birthDate) {
                    formData.append(`insuranceDetails[${i}].${key}.birthDate`, birthDate);
                  }
                }
                if (i === 1) {
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCity`, guarantorLocation1.city || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorState`, guarantorLocation1.state || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCountry`, guarantorLocation1.country || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorAddress`, guarantorLocation1.label || "");
                  const birthDate = dayjs(dateOfBirth1).format("YYYY/MM/DD");
                  //  ||
                  // patientDetailsById?.insuranceDetails[1]?.gurantorDetails?.birthDate;
                  if (birthDate) {
                    formData.append(`insuranceDetails[${i}].${key}.birthDate`, birthDate);
                  }
                }
              }
              if (gk !== "gurantorCity" && gk !== "birthDate") {
                if (gk === "gurantorGenderId") {
                  if (selectedPatientAddress === 0 || selectedPatientAddress === 1) {
                    formData.append(`insuranceDetails[${i}].${key}.${gk}`, gender?.id || "");
                  } else {
                    formData.append(`insuranceDetails[${i}].${key}.${gk}`, c[key][gk] || "");
                  }
                }
                if (gk !== "gurantorGenderId" && gk !== "gurantorAddress") {
                  formData.append(`insuranceDetails[${i}].${key}.${gk}`, c[key][gk] || "");
                }
              }
            });
          } else {
            if (key === "city") {
              if (i === 0) {
                formData.append(`insuranceDetails[${i}].city`, insurenceLocation.city || "");
                formData.append(`insuranceDetails[${i}].state`, insurenceLocation.state || "");
                formData.append(`insuranceDetails[${i}].country`, insurenceLocation.country || "");
                formData.append(`insuranceDetails[${i}].address`, insurenceLocation.label || "");
                if (editParam === "true" && patientDetailsById?.insuranceDetails) {
                  formData.append(`insuranceDetails[${i}].patientInsuranceId`, patientInsuranceId || "");
                }
              }
              if (i === 1) {
                formData.append(`insuranceDetails[${i}].city`, insurenceLocation1.city || "");
                formData.append(`insuranceDetails[${i}].state`, insurenceLocation1.state || "");
                formData.append(`insuranceDetails[${i}].country`, insurenceLocation1.country || "");
                formData.append(`insuranceDetails[${i}].address`, insurenceLocation1.label || "");
                if (editParam === "true" && patientDetailsById?.insuranceDetails) {
                  formData.append(`insuranceDetails[${i}].patientInsuranceId`, patientInsuranceId1 || "");
                }
              }
            } else if (key === "insuranceId") {
              formData.append(
                `insuranceDetails[${i}].${key}`,
                c[key]?.insuranceId || patientDetailsById?.insuranceDetails[i].insuranceId || ""
              );
              formData.append(
                `insuranceDetails[${i}].insuranceEligibilityStatus`,
                status?.Payload?.PatientEligibility?.EligibilityStatus || ""
              );
              formData.append(
                `insuranceDetails[${i}].insuranceEligibilityStatusMessage`,
                status?.Payload?.PatientEligibility?.EligibilityStatusMessage || ""
              );
            } else if (key === "policyNumber") {
              formData.append(`insuranceDetails[${i}].${key}`, c[key]?.toString() || "");
            } else if (key === "planType") {
              formData.append(
                `insuranceDetails[${i}].${key}`,
                c[key]?.planTypeId || patientDetailsById?.insuranceDetails?.[i]?.planType || 0
              );
            } else if (key === "insuranceIssueDate" || key === "insuranceExpiryDate") {
              if (i === 0) {
                formData.append(
                  `insuranceDetails[${i}].${key}`,
                  dayjs(c[key]).format("YYYY/MM/DD") || patientDetailsById?.insuranceDetails[0]?.key || ""
                );
                formData.append(`insuranceDetails[${i}].insurancePrimaryIndicator`, defaultAddress || false);
              }
              if (i === 1) {
                formData.append(
                  `insuranceDetails[${i}].${key}`,
                  dayjs(c[key]).format("YYYY/MM/DD") || patientDetailsById?.insuranceDetails[1]?.key || ""
                );
                formData.append(`insuranceDetails[${i}].insurancePrimaryIndicator`, defaultAddress1 || false);
              }
            } else if (key !== "address") {
              if (editParam === "true" && key !== "patientInsuranceAddress" && key !== "state" && key !== "country") {
                formData.append(`insuranceDetails[${i}].${key}`, c[key] || "");
              } else {
                formData.append(`insuranceDetails[${i}].${key}`, c[key] || "");
              }
            }
          }
          // }
        });
      });
    }

    try {
      action = dispatch(updatePatientDetails(formData)).then(()=> setLoader(false) )
      if (updatePatientDetails.fulfilled) {
        dispatch(
          getPatientDetailsById({
            roleId: getLoggedInUserRoleId(),
            tenantId: getTenantId(),
            patientId
          })
        );
      }
      if (updatePatientDetails.fulfilled) {
        // setShowSuccessPopup(true);
        setPopupMessage(action.payload.data);
      }
    } catch {
      console.log(action.type);
      const popUp = action.payload?.type.split("/");
      if (popUp?.includes("rejected")) setShowFailPopup(true);
    }
  }
  };

  const onSubmit = (data) => {
    if(firstName?.length > 0 && lastName?.length >0 && gender && policyNumber && (selectedCompendiumList || selectedCompendiumList2)){
    // setToggleAccordian2(true);
    setLoader(true);
    const formData = new FormData();
    if (!drivingLicense && !stateId) setIdentityErr("Uploading either driving license or state ID is mandatory");
    if (!insurance) setInsuranceIdErr("This field is required");
    formData.append("firstName", data?.firstName || firstName);
    formData.append("middleName", data?.middleName || middleName || "");
    formData.append("lastName", data?.lastName || lastName);
    formData.append("phoneNumber", contactNumber);
    formData.append("race.id", race?.id || 0);
    formData.append("gender.id", gender?.id || data?.gender || 0);
    formData.append("gender.description", gender?.description || "");
    formData.append("mrn", mrn || "");
    formData.append("prmtCity", perCity?.city);
    formData.append("prmtCountry", perCity?.country);
    formData.append("prmtState", perCity?.state);
    formData.append("prmtZipcode", perZipCode);
    formData.append("cmcnCity", commCity?.city);
    formData.append("cmcnState", commCity?.state);
    formData.append("cmcnCountry", commCity?.country);
    formData.append("cmcnZipcode", commZipCode);
    formData.append("ethenicGroup.id", ethnic?.id || 0);
    formData.append("birthDate", dayjs(dateOfBirth).format("YYYY/MM/DD"));
    formData.append("roleId", "5");
    formData.append("logedInUserRole", getLoggedInUserRoleId());
    if (editParam === "true" && patientDetailsById) {
      formData.append("updateFlag", true);
      formData.append("updatedBy", getLoggedInUserId());
      formData.append("patientId", patientDetailsById?.patientId || "");
      formData.append("patientLoginUserId", patientDetailsById?.patientLoginUserId);
      patientDetailsById?.insuranceDetails?.map((value, index) => {
        formData.append(`insuranceDetails[${index}].gurantorDetails.gurantorId`, value?.gurantorDetails?.gurantorId);
        formData.append(`insuranceDetails[${index}].patientInsuranceId`, value?.patientInsuranceId || "");
      });
    } else {
      formData.append("updateFlag", false);
      formData.append("createdBy", getLoggedInUserId());
      formData.append("patientLoginUserId", patientLoginUserId);
      patientDetailsById?.insuranceDetails?.map((value, index) => {
        formData.append(`insuranceDetails[${index}].gurantorDetails.gurantorId`, value?.gurantorDetails?.gurantorId);
        formData.append(`insuranceDetails[${index}].patientInsuranceId`, value?.patientInsuranceId || "");
      });
    }
    formData.append("statusId", statusIds.ACTIVE);
    formData.append("permanentAdress", perAdd || patientDetailsById?.primaryAddrs);
    formData.append("secondaryAddrs", commAdd || patientDetailsById?.secondaryAddrs);
    formData.append("loginIndicator", loginIndicator || false);
    formData.append("email", email);
    formData.append("ssnId", ssnId || "");
    formData.append("tenantId", getTenantId());
    formData.append("patientId", patientById || patientDetailsById?.patientId);

    if (drivingLicense) {
      if (drivingLicense?.docURL) {
        // formData.append("drivingIdProof.document", []);
      } else {
        formData.append("drivingIdProof.document", drivingLicense);
        formData.append("drivingIdProof.documentId", "2");
        formData.append("drivingIdProof.documentType", drivingLicense?.type || drivingLicense?.documentType);
      }
    }
    if (stateId) {
      if (stateId?.docURL) {
        // formData.append("stateIdProof.document", []);
      } else {
        formData.append("stateIdProof.document", stateId);
        formData.append("stateIdProof.documentId", "3");
        formData.append("stateIdProof.documentType", stateId?.type);
      }
    }
    if (insurance) {
      if (insurance?.docURL) {
        // formData.append("insuranceIdProof.document", []);
      } else {
        formData.append("insuranceIdProof.document", insurance);
        formData.append("insuranceIdProof.documentId", "4");
        formData.append("insuranceIdProof.documentType", insurance?.type || insurance?.documentType);
      }
    }
    formData.append("address", docData?.address || "");
    formData.append("identityNumber", docData?.identityNumber || "");
    if (data?.identityIssueDate != "Invalid Date" && data?.identityIssueDate != "") {
      formData.append("identityIssueDate", dayjs(data?.identityIssueDate).format("YYYY/MM/DD"));
    }
    if (data?.identityExpiryDate != "Invalid Date" && data?.identityExpiryDate != "") {
      formData.append("identityExpiryDate", dayjs(data?.identityExpiryDate).format("YYYY/MM/DD"));
    }
    formData.append("identityIssueOfAuthority", docData?.identityIssueOfAuthority || "");
    formData.append("identityClass", docData?.identityClass || "");
    formData.append("identityRestriction", docData?.identityRestriction || "");
    formData.append("endorsment", docData?.endorsment || "");
    formData.append("height", docData?.height || "");
    formData.append("eyeColour", docData?.eyeColour || "");
    formData.append("organDonor", docData?.organDonor || "");
    formData.append("identityIssueState", docData?.identityIssueState || "");
    if (mandatory === false) {
      if (data.careGiverDetails) {
        const careGiverData = data.careGiverDetails;
        careGiverData?.forEach((c, i) => {
          const keys = Object.keys(c);
          keys?.forEach((key) => {
            if (c[key] !== undefined || c[key] !== " " || c[key] !== null) {
              if (key === "careGiverCity") {
                if (i === 0 && careGiverLocation?.city) {
                  formData.append(`careGiverDTO[${i}].careGiverCity`, careGiverLocation.city || "");
                  formData.append(`careGiverDTO[${i}].careGiverState`, careGiverLocation.state || "");
                  formData.append(`careGiverDTO[${i}].careGiverCountry`, careGiverLocation.country || "");
                  formData.append(`careGiverDTO[${i}].careGiverAddress`, careGiverLocation.label || "");
                }
                if (i === 1 && careGiverLocation?.city) {
                  formData.append(`careGiverDTO[${i}].careGiverCity`, careGiverLocation1.city || "");
                  formData.append(`careGiverDTO[${i}].careGiverState`, careGiverLocation1.state || "");
                  formData.append(`careGiverDTO[${i}].careGiverCountry`, careGiverLocation1.country || "");
                  formData.append(`careGiverDTO[${i}].careGiverAddress`, careGiverLocation1.label || "");
                }
              }
              if (key !== "careGiverCity") {
                formData.append(`careGiverDTO[${i}].${key}`, c[key] || "");
              }
            }
          });
        });
      }
    }
    if (insuranceData?.insuranceDetails || patientDetailsById?.insuranceDetails?.length > 0) {
      const insurenceData = insuranceData.insuranceDetails || patientDetailsById.insuranceDetails;
      insurenceData?.forEach((c, i) => {
        const keys = Object.keys(c);
        keys?.forEach((key) => {
          // if (c[key] !== undefined) {
          if (key.includes("gurantorDetails")) {
            const gurantorkeys = Object.keys(c[key]);
            gurantorkeys.forEach((gk) => {
              if (gk === "gurantorCity") {
                if (i === 0) {
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCity`, guarantorLocation.city || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorState`, guarantorLocation.state || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCountry`, guarantorLocation.country || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorAddress`, guarantorLocation.label || "");
                  const birthDate = dayjs(gurantorBirth).format("YYYY/MM/DD");
                  // if (patientDetailsById?.insuranceDetails[0]?.gurantorDetails?.birthDate) {
                  //   birthDate = patientDetailsById.insuranceDetails[0].gurantorDetails.birthDate;
                  // }
                  if (birthDate) {
                    formData.append(`insuranceDetails[${i}].${key}.birthDate`, birthDate);
                  }
                }
                if (i === 1) {
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCity`, guarantorLocation1.city || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorState`, guarantorLocation1.state || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorCountry`, guarantorLocation1.country || "");
                  formData.append(`insuranceDetails[${i}].${key}.gurantorAddress`, guarantorLocation1.label || "");
                  const birthDate = dayjs(dateOfBirth1).format("YYYY/MM/DD");
                  //  ||
                  // patientDetailsById?.insuranceDetails[1]?.gurantorDetails?.birthDate;
                  if (birthDate) {
                    formData.append(`insuranceDetails[${i}].${key}.birthDate`, birthDate);
                  }
                }
              }
              if (gk !== "gurantorCity" && gk !== "birthDate") {
                if (gk === "gurantorGenderId") {
                  if (selectedPatientAddress === 0 || selectedPatientAddress === 1) {
                    formData.append(`insuranceDetails[${i}].${key}.${gk}`, gender?.id || "");
                  } else {
                    formData.append(`insuranceDetails[${i}].${key}.${gk}`, c[key][gk] || "");
                  }
                }
                if (gk === "abnIndicator") {
                  formData.append(`insuranceDetails[${i}].${key}.${gk}`, c[key][gk] || false);
                }
                if (
                  gk !== "gurantorGenderId" &&
                  gk !== "abnIndicator" &&
                  gk !== "gurantorAddress" &&
                  gk !== "gurantorState" &&
                  gk !== "gurantorCountry"
                ) {
                  formData.append(`insuranceDetails[${i}].${key}.${gk}`, c[key][gk] || "");
                }
              }
            });
          } else {
            if (key === "city") {
              if (i === 0) {
                formData.append(`insuranceDetails[${i}].city`, insurenceLocation.city || "");
                formData.append(`insuranceDetails[${i}].state`, insurenceLocation.state || "");
                formData.append(`insuranceDetails[${i}].country`, insurenceLocation.country || "");
                formData.append(`insuranceDetails[${i}].address`, insurenceLocation.label || "");
                if (editParam === "true" && patientDetailsById?.insuranceDetails) {
                  formData.append(`insuranceDetails[${i}].patientInsuranceId`, patientInsuranceId || "");
                }
              }
              if (i === 1) {
                formData.append(`insuranceDetails[${i}].city`, insurenceLocation1.city || "");
                formData.append(`insuranceDetails[${i}].state`, insurenceLocation1.state || "");
                formData.append(`insuranceDetails[${i}].country`, insurenceLocation1.country || "");
                formData.append(`insuranceDetails[${i}].address`, insurenceLocation1.label || "");
                if (editParam === "true" && patientDetailsById?.insuranceDetails) {
                  formData.append(`insuranceDetails[${i}].patientInsuranceId`, patientInsuranceId1 || "");
                }
              }
            } else if (key === "insuranceId") {
              formData.append(
                `insuranceDetails[${i}].${key}`,
                c[key]?.insuranceId || patientDetailsById?.insuranceDetails[i].insuranceId || ""
              );
              formData.append(
                `insuranceDetails[${i}].insuranceEligibilityStatus`,
                status?.Payload?.PatientEligibility?.EligibilityStatus || ""
              );
              formData.append(
                `insuranceDetails[${i}].insuranceEligibilityStatusMessage`,
                status?.Payload?.PatientEligibility?.EligibilityStatusMessage || ""
              );
            } else if (key === "policyNumber") {
              formData.append(`insuranceDetails[${i}].${key}`, c[key]?.toString() || "");
            } else if (key === "planType") {
              formData.append(
                `insuranceDetails[${i}].${key}`,
                c[key]?.planTypeId || patientDetailsById?.insuranceDetails?.[i]?.planType || 0
              );
            } else if (
              key === "insuranceIssueDate" ||
              key === "insuranceExpiryDate"
              // key === "insurancePrimaryIndicator"
            ) {
              if (i === 0) {
                formData.append(
                  `insuranceDetails[${i}].${key}`,
                  dayjs(c[key]).format("YYYY/MM/DD") || patientDetailsById?.insuranceDetails[0]?.key || ""
                );
                formData.append(`insuranceDetails[${i}].insurancePrimaryIndicator`, defaultAddress || false);
              }
              if (i === 1) {
                formData.append(
                  `insuranceDetails[${i}].${key}`,
                  dayjs(c[key]).format("YYYY/MM/DD") || patientDetailsById?.insuranceDetails[1]?.key || ""
                );
                formData.append(`insuranceDetails[${i}].insurancePrimaryIndicator`, defaultAddress1 || false);
              }
            } else if (
              key !== "recDelInd" &&
              key !== "patientInsuranceAddress" &&
              key !== "address" &&
              key !== "state" &&
              key !== "country"
            ) {
              formData.append(`insuranceDetails[${i}].${key}`, c[key] || "");
            }
          }
          // }
        });
      });
    }
    try {
      action = dispatch(updatePatientDetails(formData)).then((res)=>{
        if(res?.payload){
          setLoader(false);
          setShowSuccessPopup(true);
          setPopupMessage(res.payload.data);
        }
        
      })
      if (updatePatientDetails.fulfilled) {
        // setShowSuccessPopup(true);
        // setPopupMessage(action.payload.data);
      }
    } catch {
      console.log(action.type);
      console.log(action);
    }
  }
  };

  useEffect(() => {
    if (editParam === "true") {
      dispatch(
        getPatientDetailsById({
          roleId: loggedInUser.roleMasterDTO.roleId,
          tenantId: getTenantId(),
          patientId
        })
      );
    }
  }, [editParam]);

  useEffect(() => {
    const fetchDataSequentially = async () => {
      try {
        await dispatch(getRaceList());

        await dispatch(getGenderList());

        await dispatch(getEthinicList());

        setAllValues(initialState);

        await dispatch(getRelationList());

        await dispatch(getPlanType());

        await dispatch(
          getPayerCompendiumsList({
            pagination: {
              pageNo: 0,
              pageSize: 99999
            },
            sortKey: "lastModifiedDate",
            sortOrder: "DESC",
            searchValue: ""
          })
        );
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchDataSequentially();
  }, [dispatch]);

  useEffect(() => {
    if (editParam === "true") {
      setValue("firstName", patientDetailsById?.firstName);
      setFirstName(patientDetailsById?.firstName?.trim());
      setMiddleName(patientDetailsById?.middleName?.trim());
      setLastName(patientDetailsById?.lastName?.trim());
      setRace(patientDetailsById?.race);
      setGender(patientDetailsById?.gender);
      setEthnic(patientDetailsById?.ethenicGroup);
      setDateOfBirth(dayjs(patientDetailsById?.birthDate));
      setPerAdd(patientDetailsById?.primaryAddrs?.trim());
      setCommAdd(patientDetailsById?.secondaryAddrs?.trim());
      setContactNumber(patientDetailsById?.phoneNumber?.trim());
      setDrivingLicense(patientDetailsById?.drivingIdProof);
      setInsurance(patientDetailsById?.insuranceIdProof);
      setStateId(patientDetailsById?.stateIdProof);
      setSsnId(patientDetailsById?.ssnId);
      setMrn(patientDetailsById?.mrn);
      setEmail(patientDetailsById?.email);
      setValue("middleName", patientDetailsById?.middleName);
      setValue("lastName", patientDetailsById?.lastName);
      setCommZIpCode(patientDetailsById?.cmcnZipcode);
      setPerZipCode(patientDetailsById?.prmtZipcode);
      setPatientLoginCheck(patientDetailsById?.loginIndicator === undefined ? false : patientDetailsById?.loginIndicator);
      setPerCity({
        city: patientDetailsById?.prmtCity,
        state: patientDetailsById?.prmtState,
        country: patientDetailsById?.prmtCountry,
        label: patientDetailsById?.primaryAddrs
      });
      setCommCity({
        city: patientDetailsById?.cmcnCity,
        state: patientDetailsById?.cmcnState,
        country: patientDetailsById?.cmcnCountry,
        label: patientDetailsById?.secondaryAddrs
      });
      sessionStorage.setItem("patientId", patientDetailsById?.patientId);
    }
  }, [editParam, patientDetailsById]);

  const toggleDrawerOrderDetails = (open) => (event) => {
    setIsOpenOrderDetails(open);
  };

  const handleCheckbox = (event) => {
    setIsCheckedModal(event.target.checked);
  };
  const closePopup = () => {
    setSuccessPopoup(false);
  };
  const handleDelete = (message, index) => {
    setShowWarningPopup(true);
    setWarningMessage(message);
    setIndex(index);
  };

  const handleRemove = (warningMessage) => {
    if (warningMessage === "Insurance And Guarentor Details") {
      if (editParam === "true" && index === 0) {
        dispatch(
          deleteInsuranceandGurantor({
            patientInsuranceId,
            patientGurantorId
          })
        );
      } else if (editParam === "true" && index === 1) {
        dispatch(
          deleteInsuranceandGurantor({
            patientInsuranceId: patientInsuranceId1,
            patientGurantorId: patientGurantorId1
          })
        );
      }
      setInsuranceHeader(insuranceHeader - 1);
      setTabValue(insuranceHeader - 2);
    } else {
      if (editParam === "true" && index === 0) {
        dispatch(deleteCareGiver({ patientCareGiverId }));
      } else if (editParam === "true" && index === 1) {
        dispatch(deleteCareGiver({ patientCareGiverId: patientCareGiverId1 }));
      }
      setCareGiver(careGiver - 1);
      setCareGiverTab(careGiver - 2);
    }
    setShowWarningPopup(false);
  };

  const handleClose = async () => {
    setShowWarningPopup(false);
  };
  const [file, setFile] = useState();
  return (
    <>
     {loader && <Loader />}
      <Box className="content__wrapper bottom-space patientMngmt--stepper" ref={boxRef}>
        <OrderDetails isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} />
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <>
          <ScrollSpy parentScrollContainerRef={boxRef}>
            <Box className="createOrder__wrapper create_Ordersection" id="step1">
              <form onSubmit={handleSubmit(step1Submit)}>
                <Accordion
                  expanded={toggleAccordian1}
                  className="stepper__accordion mt-3 stepper__accordion--testDetails"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => setToggleAccordian1(!toggleAccordian1)}
                  >
                    <Typography variant="div" component="div" className="createOrder__wrapper--header">
                      <Typography variant="h6" component="h6">
                        <Typography variant="b" component="b">
                          Step 1
                        </Typography>
                        Personal Details
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                  <PatientPersonalDetails
                    firstName={firstName}
                    setFirstName={setFirstName}
                    middleName={middleName}
                    setMiddleName={setMiddleName}
                    lastName={lastName}
                    setLastName={setLastName}
                    ethnic={ethnic}
                    setEthnic={setEthnic}
                    race={race}
                    setRace={setRace}
                    gender={gender}
                    mrn={mrn}
                    setMrn={setMrn}
                    setGender={setGender}
                    perAdd={perAdd}
                    setPerAdd={setPerAdd}
                    commAdd={commAdd}
                    setCommAdd={setCommAdd}
                    control={control}
                    errors={errors}
                    loginIndicator={loginIndicator}
                    setLoginIndicator={setLoginIndicator}
                    clearErrors={clearErrors}
                    setDateOfBirth={setDateOfBirth}
                    dateOfBirth={dateOfBirth}
                    setStep1Complete={setStep1Complete}
                    editParam={editParam}
                    patientDetailsById={patientDetailsById}
                    setEmail={setEmail}
                    email={email}
                    setContactNumber={setContactNumber}
                    contactNumber={contactNumber}
                    setPerZipCode={setPerZipCode}
                    perZipCode={perZipCode}
                    setCommZIpCode={setCommZIpCode}
                    commZipCode={commZipCode}
                    setCommCity={setCommCity}
                    commCity={commCity}
                    setPerCity={setPerCity}
                    perCity={perCity}
                    setPatientLoginCheck={setPatientLoginCheck}
                    patientLoginCheck={patientLoginCheck}
                  />
                  {existedMessage && <Typography color="error">{existedMessage}</Typography>}
                  <Button
                    id="step1SubmitButton"
                    className="primary-btn next-btn"
                    // disabled={!step1Complete || keys?.length > 0}
                    type="submit"
                    // onClick={step1Submit}
                  >
                    Save & Continue
                  </Button>
                </Accordion>
              </form>
            </Box>

            <Box className="createOrder__wrapper create_Ordersection mt-3" id="step2">
              <Accordion
                expanded={toggleAccordian2}
                className="stepper__accordion mt-3 stepper__accordion--testDetails"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  // disabled={!toggleAccordian2}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    // step1Complete && !existedMessage && 
                    setToggleAccordian2(!toggleAccordian2);
                  }}
                >
                  <Typography variant="div" component="div" className="createOrder__wrapper--header">
                    <Typography variant="h6" component="h6">
                      <Typography variant="b" component="b">
                        Step 2
                      </Typography>
                      Identity Details
                    </Typography>
                  </Typography>
                </AccordionSummary>
                <IdentityDetails
                  drivingLicense={drivingLicense}
                  setDrivingLicense={setDrivingLicense}
                  stateId={stateId}
                  insurance={insurance}
                  setStateId={setStateId}
                  setInsurance={setInsurance}
                  email={email}
                  ssnId={ssnId}
                  setFile={setFile}
                  file={file}
                  setSsnId={setSsnId}
                  setEmail={setEmail}
                  errors={errors}
                  control={control}
                  identityErr={identityErr}
                  setStep2Complete={setStep2Complete}
                  setValue={setValue}
                  setOcrInsData={setOcrInsData}
                  ocrInsData={ocrInsData}
                  editParam={editParam}
                  setInsuranceImg={setInsuranceImg}
                  insuranceImg={insuranceImg}
                  patientDetailsById={patientDetailsById}
                  onSubmit={step2Submit}
                  step2Complete={step2Complete}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  setMiddleName={setMiddleName}
                  middleName={middleName}
                  lastName={lastName}
                  setLastName={setLastName}
                  commAdd={commAdd}
                  setCommAdd={setCommAdd}
                  setSuccessPopoup={setSuccessPopoup}
                />
              </Accordion>
            </Box>

            <Box className="createOrder__wrapper create_Ordersection mt-3" id="step3">
              <Accordion
                expanded={toggleAccordian3}
                className="stepper__accordion mt-3 stepper__accordion--testDetails"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    step2Complete && setToggleAccordian3(!toggleAccordian3);
                  }}
                >
                  <Typography variant="div" component="div" className="createOrder__wrapper--header">
                    <Typography variant="h6" component="h6">
                      <Typography variant="b" component="b">
                        Step 3
                      </Typography>
                      Insurance And Guarantor Details
                    </Typography>
                  </Typography>
                  <Box className="pe-3">
                    {/* <Button
                      variant="text"
                      className="downloadBtn-text p-0"
                      onClick={() => {
                        step3Submit();
                        setToggleAccordian3(false);
                      }}
                    >
                      Skip
                    </Button> */}
                    {insuranceHeader < 2 ? (
                      <Button
                        variant="text"
                        className="downloadBtn-text p-0"
                        onClick={() => setInsuranceHeader(insuranceHeader + 1)}
                      >
                        Add Insurance And Guarantor
                      </Button>
                    ) : (
                      ""
                    )}
                  </Box>
                </AccordionSummary>
                <InsuranceGurantor
                  a11yProps={a11yProps}
                  Tabpanel={Tabpanel}
                  // errors={errors}
                  // control={control}
                  setInsurenceLocation={setInsurenceLocation}
                  insurenceLocation={insurenceLocation}
                  setInsurenceLocation1={setInsurenceLocation1}
                  insurenceLocation1={insurenceLocation1}
                  patientObj={patientObj}
                  icon={icon}
                  setGuarantorLocation={setGuarantorLocation}
                  guarantorLocation={guarantorLocation}
                  setGuarantorLocation1={setGuarantorLocation1}
                  guarantorLocation1={guarantorLocation1}
                  handleDelete={handleDelete}
                  setInsuranceHeader={setInsuranceHeader}
                  insuranceHeader={insuranceHeader}
                  clearErrors={clearErrors}
                  setStep3Complete={setStep3Complete}
                  ocrInsData={ocrInsData}
                  setValue={setValue}
                  insuranceDetails={patientDetailsById?.insuranceDetails}
                  editParam={editParam}
                  insuranceImg={insuranceImg}
                  patientDetailsById={patientDetailsById}
                  setDefaultAddress={setDefaultAddress}
                  setDefaultAddress1={setDefaultAddress1}
                  defaultAddress={defaultAddress}
                  defaultAddress1={defaultAddress1}
                  onSubmit={step3Submit}
                  step3Complete={step3Complete}
                  setInsuranceAndGurantorId1={setInsuranceAndGurantorId1}
                  setInsuranceAndGurantorId={setInsuranceAndGurantorId}
                  setPatientGurantorId1={setPatientGurantorId1}
                  setPatientGurantorId={setPatientGurantorId}
                  setPatientInsuranceId1={setPatientInsuranceId1}
                  setPatientInsuranceId={setPatientInsuranceId}
                  insurance={insurance}
                  value={value}
                  setTabValue={setTabValue}
                  setSelectedPatientAddress={setSelectedPatientAddress}
                  selectedPatientAddress={selectedPatientAddress}
                  firstName={firstName}
                  middleName={middleName}
                  lastName={lastName}
                  email={email}
                  contactNumber={contactNumber}
                  perZipCode={perZipCode}
                  commZipCode={commZipCode}
                  commCity={commCity}
                  perCity={perCity}
                  perAdd={perAdd}
                  gender={gender}
                  dateOfBirth={dateOfBirth}
                  ssnId={ssnId}
                  setDateOfBirth1={setDateOfBirth1}
                  dateOfBirth1={dateOfBirth1}
                  setGurantorBirth={setGurantorBirth}
                  gurantorBirth={gurantorBirth}
                  setSelectedCompendiumList={setSelectedCompendiumList}
                  selectedCompendiumList={selectedCompendiumList}
                  setSelectedCompendiumList2={setSelectedCompendiumList2}
                  selectedCompendiumList2={selectedCompendiumList2}
                  policyNumber={policyNumber}
                  setPolicyNumber={setPolicyNumber}
                />
              </Accordion>
            </Box>

            <Box className="createOrder__wrapper create_Ordersection mt-3" id="step4">
              <Accordion
                expanded={toggleAccordian4}
                className="stepper__accordion mt-3 stepper__accordion--testDetails"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  // disabled={}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    step3Complete && setToggleAccordian4(!toggleAccordian4);
                  }}
                >
                  <Typography variant="div" component="div" className="createOrder__wrapper--header">
                    <Typography variant="h6" component="h6">
                      <Typography variant="b" component="b">
                        Step 4
                      </Typography>
                      Caregiver Details
                    </Typography>
                  </Typography>
                  {/* <Tooltip title="if You Skip it will not mandatory to fill the fields" arrow>
                    <Button variant="text" className="downloadBtn-text p-0" onClick={() => setMandatory(false)}>
                      Skip
                    </Button>
                  </Tooltip> */}
                </AccordionSummary>
                <Caregiver
                  a11yProps={a11yProps}
                  Tabpanel={Tabpanel}
                  errors={errors}
                  control={control}
                  patientObj={patientObj}
                  icon={icon}
                  relationList={relationList}
                  setIsChecked={setIsChecked}
                  isChecked={isChecked}
                  setCareGiverLocation={setCareGiverLocation}
                  careGiverLocation={careGiverLocation}
                  setCareGiverLocation1={setCareGiverLocation1}
                  careGiverLocation1={careGiverLocation1}
                  handleDelete={handleDelete}
                  setCareGiver={setCareGiver}
                  careGiver={careGiver}
                  clearErrors={clearErrors}
                  setStep4Complete={setStep4Complete}
                  careGiverDetails={patientDetailsById?.careGiverDTO}
                  editParam={editParam}
                  setMandatory={setMandatory}
                  mandatory={mandatory}
                  onSubmit={onSubmit}
                  setPatientCareGiverId={setPatientCareGiverId}
                  setPatientCareGiverId1={setPatientCareGiverId1}
                  setCareGiverTab={setCareGiverTab}
                  careGiverTab={careGiverTab}
                />
              </Accordion>
            </Box>
          </ScrollSpy>
        </>

        <Button
          className="primary-btn next-btn float-right my-2"
          disabled={ keys?.length > 0}
          type="submit"
          onClick={() => {
            document.getElementById("step1SubmitButton").click();
            setTimeout(() => {
              document.getElementById("step2SubmitButton").click();
              setTimeout(() => {
                document.getElementById("step3SubmitButton").click();
              }, 500);
              setTimeout(() => {
                document.getElementById("step4SubmitButton").click();
              }, 900); 
            }, 2000); 
          }}
         
        >
          Submit
        </Button>

        {/* </form> */}

        {/* {open && <PreviewContent setOpen={setOpen} open={open} title="Preview Order" />} */}
        <AddNewPatient setOpen={setOpen} open={open} title="New Patient" />
        {/* </Box> */}

        {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}

        {showWarningPopup && (
          <Modal
            open={setShowWarningPopup}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="create-broadcast-publish-modal"
          >
            <Box className="success_modal">
              <img src={warningDeactivate} className="modal-success-icon" />
              <Typography id="modal-modal-title" className="modal-modal-title mb-0" variant="h6" component="h6">
                Are You Sure ?
              </Typography>
              <Typography
                variant="p"
                component="p"
                id="modal-modal-description mb-0"
                className="modal-modal-description"
              >
                Sure you want to delete {warningMessage}.
              </Typography>
              <Typography variant="div" component="div" className="agree-section">
                <Checkbox checked={isCheckedModal} onChange={handleCheckbox} />
                <Typography className="agree-statement">Yes, I agree</Typography>
              </Typography>

              <Typography className="modal-buttons-wrapper mt-4">
                <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClose}>
                  Maybe Later
                </Button>
                <Button
                  autoFocus
                  type="button"
                  className="primary-btn"
                  onClick={() => handleRemove(warningMessage)}
                  disabled={!isCheckedModal}
                >
                  Yes, I agree
                </Button>
              </Typography>
            </Box>
          </Modal>
        )}
        {showSuccessPopup && (
          <SuccessPopup
            onClose={() => {
              setShowSuccessPopup(false);
              navigate("/patientManagement");
              // setSuccessMessage(successMessage);
              // setOpen(false);
            }}
            patientDetailsById={patientDetailsById}
          />
        )}
        {successPopup && (
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              File Uploaded Successfully
            </Typography>
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h4" component="h4">
              {file === "Insurance"
                ? "Insurance section of patient creation does not need to be manually filled out since OCR will fill in the insurance information"
                : "Successfully updated"}
            </Typography>
            <Button autoFocus className="primary-btn float-right mt-3" onClick={closePopup}>
              Okay
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AddPatientData;
