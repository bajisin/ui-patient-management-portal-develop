import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
  Accordion,
  AccordionSummary
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GeoLocationSearch from "../../../tenant/google-location";
import Loader from "@utils/Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { insEligibilityCheck } from "@redux/slices/order-slice";

// import { useSelector } from "react-redux";

const InsuranceGurantor = (props) => {
  const currentDate = dayjs().format("YYYY/MM/DD").trim();

  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      // address: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      identityExpiryDate: "",

      identityIssueDate: "",
      identityNumber: "",
      endorsment: "",
      height: "",
      gender: "",
      identityRestriction: "",
      identityClass: "",
      eyeColour: "",
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
          // address: "",
          city: "",
          coInsurancePercentage: "",
          emergencyContactNumber: "",
          gurantorDetails: {
            firstName: "",
            middleName: "",
            gurantorLastName: "",
            relationId: "",
            birthDate: currentDate,
            employerName: "",
            gurantorEmail: "",
            // gurantorAddress: "",
            phoneNumber: "",
            gurantorAlternatePhoneNumber: ""
          }
        }
      ]
    },

    mode: "onChange"
  });
  const {
    a11yProps,
    Tabpanel,
    patientObj,
    insurenceLocation,
    setInsurenceLocation,
    insurenceLocation1,
    setInsurenceLocation1,
    icon,
    guarantorLocation,
    setGuarantorLocation,
    guarantorLocation1,
    setGuarantorLocation1,
    handleDelete,
    setInsuranceHeader,
    insuranceHeader,
    setStep3Complete,
    ocrInsData,
    insuranceDetails,
    editParam,
    insuranceImg,
    patientDetailsById,
    setDefaultAddress,
    setDefaultAddress1,
    defaultAddress,
    defaultAddress1,
    onSubmit,
    step3Complete,
    setPatientGurantorId1,
    setPatientGurantorId,
    setPatientInsuranceId,
    setPatientInsuranceId1,
    insurance,
    setTabValue,
    value,
    setSelectedPatientAddress,
    selectedPatientAddress,
    firstName,
    lastName,
    middleName,
    email,
    contactNumber,
    perZipCode,
    perCity,
    perAdd,
    gender,
    dateOfBirth,
    ssnId,
    setDateOfBirth1,
    dateOfBirth1,
    setGurantorBirth,
    selectedCompendiumList,
    setSelectedCompendiumList,
    selectedCompendiumList2,
    setSelectedCompendiumList2,
    policyNumber,
    setPolicyNumber

  } = props;
  const [selectedPlanType, setSelectedPlanType] = useState(null);
  const [selectedPlanType2, setSelectedPlanType2] = useState(null);
  const { relationList, genderList, planTypes } = useSelector((state) => state.createOrder);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatient2, setSelectedPatient2] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedGender2, setSelectedGender2] = useState(null);
  const [selectedCheckBox, setSelectedCheckBox] = useState(-1);
  const { payerCompendiumList } = useSelector((state) => state.compendium);
  const [expiryValue, setExpiryValue] = useState(dayjs());
  const [expiryValue1, setExpiryValue1] = useState(dayjs());
  const [issuedDate, setIssuedDate] = useState(dayjs());
  const [issuedDate1, setIssuedDate1] = useState(dayjs());
  const [gurantorDateOfBirth, setDateOfBirth] = useState(dayjs());
  const [index, setIndex] = useState(0);
  const [insuranceId, setInsuranceId] = useState();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldChanged, setFiledChanged] = useState(false);
  const [InsuranceFieldsValid, setInsuranceFieldsValid] = useState();
  const [insurenceLocationFlag, setInsurenceLocationFlag] = useState(false);
  const [gurantorLocFlag, setGurantorLocFlag] = useState(false);
  const [toggleAccordian, setToggleAccordian] = useState(false);

  const checkInsEligibility = async () => {
    if (editParam === "true") setFiledChanged(false);
    // Initialize loader
    setLoader(true);

    try {
      let action;

      if (patientDetailsById) {
        action = await dispatch(
          insEligibilityCheck({
            messageHeader: {
              sequenceNumber: 1,
              userId: "lifescanws",
              orgAlias: "lifescan"
            },
            payload: {
              bypassCache: true,
              clientId: "ABBOT",
              includeEligibilityReportHtml: true,
              includeHumanReadableReport: true,
              insuranceInformation: {
                effectiveDate: "2022-04-28",
                insuredInformation: {
                  dateOfBirth,
                  gender: gender?.genderDesc,
                  name: {
                    firstName,
                    lastName
                  },
                  relationship: "Self",
                  ssn: ssnId,
                  subscriberId: policyNumber
                },
                payorId: "BCBSFL"
              },
              patientInformation: {
                dateOfBirth,
                gender: gender?.genderDesc,
                name: {
                  firstName,
                  lastName
                }
              }
            }
          })
        );
      }

      if (insEligibilityCheck.fulfilled.match(action)) {
        if (action?.payload?.statusFlag === false) {
          setErrorMessage(
            `${action?.payload?.Payload?.PatientEligibility?.EligibilityStatus} - ${action?.payload?.Payload?.PatientEligibility?.EligibilityStatusMessage}`
          );
        } else {
          setMessage(
            `${action?.payload?.Payload?.PatientEligibility?.EligibilityStatus} - ${action?.payload?.Payload?.PatientEligibility?.EligibilityStatusMessage}`
          );
        }
      }
    } catch (error) {
      console.error("An error occurred while checking insurance eligibility:", error);
      // Handle errors if needed
    } finally {
      // Turn off loader
      setLoader(false);
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  let allFieldsFilled;
  let allInsuranceFieldsFilled;
  useEffect(() => {
    if (editParam === "true") {
      if (patientDetailsById.insuranceDetails && patientDetailsById.insuranceDetails.length > 0) {
        if (patientDetailsById?.insuranceDetails[1]?.patientInsuranceId && insuranceHeader < 2) {
          setInsuranceHeader(insuranceHeader + 1);
          setTabValue(value + 1);
        }
        patientDetailsById.insuranceDetails.forEach((insuranceDetail, index) => {
          setValue(`insuranceDetails[${index}].insuranceId`, insuranceDetail?.insuranceId);
          setValue(`insuranceDetails[${index}].insuranceIssueDate`, insuranceDetail?.insuranceIssueDate);
          setValue(`insuranceDetails[${index}].insuranceExpiryDate`, insuranceDetail?.insuranceExpiryDate);
          setValue(`insuranceDetails[${index}].policyHolderName`, insuranceDetail.policyHolderName?.trim());
          setValue(`insuranceDetails[${index}].policyNumber`, insuranceDetail.policyNumber);
          setPolicyNumber(insuranceDetail.policyNumber);
          setValue(`insuranceDetails[${index}].groupNumber`, insuranceDetail.groupNumber?.trim());
          // setValue(`insuranceDetails[${index}].contactNumber`, insuranceDetail.contactNumber?.trim());
          setValue(`insuranceDetails[${index}].networkCommunication`, insuranceDetail.networkCommunication?.trim());
          setValue(`insuranceDetails[${index}].deductableAmount`, insuranceDetail.deductableAmount?.trim());
          setValue(`insuranceDetails[${index}].coPayment`, insuranceDetail.coPayment?.trim());
          setValue(`insuranceDetails[${index}].coInsurancePercentage`, insuranceDetail.coInsurancePercentage?.trim());
          setValue(`insuranceDetails[${index}].coveredIndividuals`, insuranceDetail.coveredIndividuals?.trim());
          setValue(`insuranceDetails[${index}].planType`, insuranceDetail?.planType);
          setValue(`insuranceDetails[${index}].address`, insuranceDetail.patientInsuranceAddress?.trim());
          setValue(`insuranceDetails[${index}].zipCode`, insuranceDetail.patientInsuranceZipCode?.trim());
          setValue(`insuranceDetails[${index}].emergencyContactNumber`, insuranceDetail.emergencyContactNumber?.trim());
          setValue(`insuranceDetails[${index}].city`, insuranceDetail.city?.trim());
          setValue(
            `insuranceDetails[${index}][gurantorDetails].firstName`,
            insuranceDetail?.gurantorDetails.firstName?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].middleName`,
            insuranceDetail?.gurantorDetails.middleName?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].gurantorLastName`,
            insuranceDetail?.gurantorDetails.gurantorLastName?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].gurantorEmail`,
            insuranceDetail?.gurantorDetails.gurantorEmail?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].employerName`,
            insuranceDetail?.gurantorDetails.employerName?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].gurantorAddress`,
            insuranceDetail?.gurantorDetails.gurantorAddress?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].gurantorCity`,
            insuranceDetail?.gurantorDetails.gurantorCity?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].gurantorZipCode`,
            insuranceDetail?.gurantorDetails.gurantorZipCode?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].phoneNumber`,
            insuranceDetail?.gurantorDetails.phoneNumber?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].gurantorAlternatePhoneNumber`,
            insuranceDetail?.gurantorDetails.gurantorAlternatePhoneNumber?.trim()
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].gurantorGenderId`,
            insuranceDetail?.gurantorDetails.gurantorGenderId
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].relationId`,
            insuranceDetail?.gurantorDetails.relationId
          );
          setValue(
            `insuranceDetails[${index}][gurantorDetails].birthDate`,
            dayjs(insuranceDetail?.gurantorDetails.birthDate).format("YYYY/MM/DD")
          );
          if (index === 0) {
            setDefaultAddress(insuranceDetail?.insurancePrimaryIndicator);
          } else {
            setDefaultAddress1(insuranceDetail?.insurancePrimaryIndicator);
          }
        });
      }
      if (insuranceDetails?.length > 0) {
        if (payerCompendiumList?.length > 0) {
          const selectedCompendiumItem = payerCompendiumList.find(
            (item) => item.insuranceId === insuranceDetails[0]?.insuranceId
          );

          setSelectedCompendiumList(selectedCompendiumItem);
          if (insuranceDetails.length >= 1) {
            setInsuranceHeader(insuranceHeader);
            setSelectedCompendiumList2(
              payerCompendiumList.find((item) => item?.insuranceId === insuranceDetails[1]?.insuranceId)
            );
          }
        }
        if (planTypes?.length > 0) {
          setSelectedPlanType(planTypes.find((item) => item?.planTypeId === insuranceDetails[0]?.planType));
          if (planTypes.length >= 1) {
            setSelectedPlanType2(planTypes.find((item) => item?.planTypeId === insuranceDetails[1]?.planType));
          }
        }
        setIssuedDate(dayjs(insuranceDetails[0]?.insuranceIssueDate));
        setIssuedDate1(dayjs(insuranceDetails[1]?.insuranceIssueDate));

        setExpiryValue(dayjs(insuranceDetails[0]?.insuranceExpiryDate));
        setExpiryValue1(dayjs(insuranceDetails[1]?.insuranceExpiryDate));
        setInsurenceLocation({
          city: insuranceDetails[0]?.city,
          state: insuranceDetails[0]?.patientInsuranceState,
          country: insuranceDetails[0]?.patientInsuranceCountry,
          label: insuranceDetails[0]?.patientInsuranceAddress
        });
        setInsurenceLocation1({
          city: insuranceDetails[1]?.patientInsuranceAddress,
          state: insuranceDetails[1]?.patientInsuranceState,
          country: insuranceDetails[1]?.patientInsuranceCountry,
          label: insuranceDetails[1]?.patientInsuranceAddress
        });
        setPatientInsuranceId(insuranceDetails[0]?.patientInsuranceId);
        setPatientInsuranceId1(insuranceDetails[1]?.patientInsuranceId);
      }
      if (relationList?.length > 0 && genderList?.length > 0) {
        if (insuranceDetails && insuranceDetails[0]?.gurantorDetails) {
          setSelectedPatient(
            relationList.find((item) => item?.id === insuranceDetails[0]?.gurantorDetails?.relationId)
          );
          setSelectedGender(
            genderList.find((item) => item?.id === insuranceDetails[0]?.gurantorDetails?.gurantorGenderId)
          );
        }
        if (insuranceDetails && insuranceDetails[1]?.gurantorDetails) {
          setSelectedPatient2(
            relationList.find((item) => item?.id === insuranceDetails[1]?.gurantorDetails?.relationId)
          );
          setSelectedGender2(
            genderList.find((item) => item?.id === insuranceDetails[1]?.gurantorDetails?.gurantorGenderId)
          );
        }
      }
      setGuarantorLocation({
        city: (insuranceDetails && insuranceDetails[0]?.gurantorDetails.gurantorCity) || "",
        state: (insuranceDetails && insuranceDetails[0]?.gurantorDetails.gurantorState) || "",
        country: (insuranceDetails && insuranceDetails[0]?.gurantorDetails.gurantorCountry) || "",
        label: insuranceDetails && insuranceDetails[0]?.gurantorDetails.gurantorAddress
      });
      setGuarantorLocation1({
        city: (insuranceDetails && insuranceDetails[1]?.gurantorDetails.gurantorCity) || "",
        state: (insuranceDetails && insuranceDetails[1]?.gurantorDetails.gurantorState) || "",
        country: (insuranceDetails && insuranceDetails[1]?.gurantorDetails.gurantorCountry) || "",
        label: insuranceDetails && insuranceDetails[1]?.gurantorDetails.gurantorAddress
      });
      setDateOfBirth(dayjs(insuranceDetails && insuranceDetails[0]?.gurantorDetails?.birthDate || patientDetailsById?.birthDate));
      setGurantorBirth(dayjs(insuranceDetails && insuranceDetails[0]?.gurantorDetails?.birthDate));
      setDateOfBirth1(dayjs(insuranceDetails && insuranceDetails[1]?.gurantorDetails?.birthDate || patientDetailsById?.birthDate));
      setPatientGurantorId(insuranceDetails && insuranceDetails[0]?.gurantorDetails?.gurantorId);
      setPatientGurantorId1(insuranceDetails && insuranceDetails[1]?.gurantorDetails?.gurantorId);
    }
    if(relationList?.length){
      setSelectedPatient(relationList[0])
    }
  }, [payerCompendiumList, insuranceDetails, relationList]);

  const [step3Fields, setStep3Fields] = useState({
    insuranceId: "",
    policyHolderName: "",
    policyNumber: ""
    // groupNumber: "",
    // // contactNumber: "",
    // planType: "",
    // networkCommunication: "",
    // deductableAmount: "",
    // coPayment: "",
    // coveredIndividuals: "",
    // // address: "",
    // coInsurancePercentage: "",
    // emergencyContactNumber: "",
    // zipCode: "",
    // firstName: "",
    // gurantorAlternatePhoneNumber: "",
    // gurantorLastName: "",
    // gurantorEmail: "",
    // gurantorGenderId: "",
    // employerName: "",
    // // gurantorAddress: "",
    // gurantorZipCode: ""
    // phoneNumber: ""
  });

  useEffect(() => {
    if (index === 0 && selectedPatientAddress === 0) {
      setValue(`insuranceDetails[0][gurantorDetails].firstName`, firstName);
      setValue(`insuranceDetails[0][gurantorDetails].middleName`, middleName);
      setValue(`insuranceDetails[0][gurantorDetails].gurantorLastName`, lastName);
      setValue(`insuranceDetails[0][gurantorDetails].gurantorEmail`, email);
      setValue(`insuranceDetails[0][gurantorDetails].gurantorAddress`, perAdd);
      setValue(`insuranceDetails[0][gurantorDetails].gurantorZipCode`, perZipCode);
      setValue(`insuranceDetails[0][gurantorDetails].gurantorAlternatePhoneNumber`, contactNumber);
      setValue(`insuranceDetails[0][gurantorDetails].gurantorGenderId`, gender);
      setDateOfBirth(dateOfBirth);
      setGurantorBirth(dateOfBirth);
      setSelectedGender(gender);
      setGuarantorLocation(perCity);
    }
    if (index === 1 && selectedPatientAddress === 1) {
      setValue(`insuranceDetails[1][gurantorDetails].firstName`, firstName);
      setValue(`insuranceDetails[1][gurantorDetails].middleName`, middleName);
      setValue(`insuranceDetails[1][gurantorDetails].gurantorLastName`, lastName);
      setValue(`insuranceDetails[1][gurantorDetails].gurantorEmail`, email);
      setValue(`insuranceDetails[1][gurantorDetails].gurantorAddress`, perAdd);
      setValue(`insuranceDetails[1][gurantorDetails].gurantorZipCode`, perZipCode);
      setValue(`insuranceDetails[1][gurantorDetails].gurantorAlternatePhoneNumber`, contactNumber);
      setValue(`insuranceDetails[1][gurantorDetails].gurantorGenderId`, gender);
      setSelectedGender2(gender);
      setDateOfBirth1(dateOfBirth);
      setGuarantorLocation1(perCity);
    } else {
      // setSelectedGender(null);
      // setSelectedGender2(null);
      // setDateOfBirth1(dayjs());
      // setGuarantorLocation({ city: "", state: "", country: "" });
      // setGuarantorLocation1({ city: "", state: "", country: "" });
      // when unchecks we will clear the form , for now not rewuired
      // setValue(`insuranceDetails[0][gurantorDetails].firstName`, "");
      // setDateOfBirth(dayjs());
    }
  }, [selectedPatientAddress, index, firstName,lastName, middleName, email, dateOfBirth, gender]);

  let insurer = {};

  useEffect(() => {
    setValue("insuranceDetails[0].policyNumber", ocrInsData?.IdNumber?.properties?.Number?.value);
    setValue("insuranceDetails[0].policyHolderName", ocrInsData?.Member?.properties?.Name?.value);
    setValue("insuranceDetails[0].groupNumber", ocrInsData?.GroupNumber?.value);
    setValue("insuranceDetails[0].coPayment", ocrInsData?.Copays?.values[0]?.properties?.Amount?.content);
    setValue("insuranceDetails[0].planType", ocrInsData?.Plan?.properties?.Name?.value);
    insurer = payerCompendiumList.find(
      (payer) => payer?.insuranceCompanyName?.toLowerCase() === ocrInsData?.Insurer?.value?.toLowerCase()
    );
    setSelectedCompendiumList(insurer);
    setValue("insuranceDetails[0].insuranceId", insurer);
    setPolicyNumber(ocrInsData?.IdNumber?.properties?.Number?.value);

    if (ocrInsData) {
      setStep3Fields((prevState) => ({
        ...prevState,
        insuranceId: insurer?.insuranceId,
        policyHolderName: ocrInsData?.Member?.properties?.Name?.value || "",
        policyNumber: ocrInsData?.IdNumber?.properties?.Number?.value || "",
        groupNumber: ocrInsData?.GroupNumber?.value || "",
        coPayment: ocrInsData?.Copays?.values[0]?.properties?.Amount?.content || ""
        // planType: ocrInsData?.Plan?.properties?.Name?.value || ""
      }));
    }
  }, [ocrInsData]);

  useEffect(() => {
    if (index === 0) {
      setInsurenceLocation(insurenceLocation);
    } else if (index === 1) {
      setInsurenceLocation1(insurenceLocation1);
    }
    if (insurenceLocation?.label === "" || insurenceLocation1?.label === "") {
      setInsurenceLocationFlag(true);
    } else {
      setInsurenceLocationFlag(false);
    }
  }, [index, insurenceLocation, insurenceLocation1]);
  useEffect(() => {
    if (index === 0) {
      setGuarantorLocation(guarantorLocation);
    } else if (index === 1) {
      setGuarantorLocation1(guarantorLocation1);
    }
    if (
      guarantorLocation?.label === "" ||
      guarantorLocation1?.label === "" ||
      selectedPatientAddress === 0 ||
      selectedPatientAddress === 1 ||
      selectedPatientAddress === null ||
      selectedPatientAddress === -1
    ) {
      setGurantorLocFlag(true);
    } else {
      setGurantorLocFlag(false);
    }
  }, [index, guarantorLocation, guarantorLocation1]);

  const handleStep3Change = (fieldName, value) => {
    setStep3Fields((prevStep3Fields) => {
      const updatedFields = { ...prevStep3Fields, [fieldName]: value };
      if (editParam === "true") setFiledChanged(true);
      return updatedFields;
    });
    if (editParam === "true") {
      if (patientDetailsById) {
        const updatedStep3Fields = {
          ...step3Fields,
          [fieldName]: value
        };
        const hasNullValues = Object.values(updatedStep3Fields).some(
          (value) => value === null || value === undefined || value === "" || value?.length < 0
        );
        setStep3Complete(hasNullValues);
      } else {
        setStep3Complete(false);
      }
    }
  };
  useEffect(() => {
    const {
      insuranceId,
      policyHolderName,
      policyNumber,
      groupNumber,
      networkCommunication,
      deductableAmount,
      coPayment,
      coveredIndividuals,
      // address,
      coInsurancePercentage,
      emergencyContactNumber,
      // contactNumber,
      // planType,
      zipCode,
      firstName,
      gurantorAlternatePhoneNumber,
      gurantorLastName,
      gurantorEmail,
      gurantorGenderId,
      employerName,
      // gurantorAddress,
      gurantorZipCode
    } = step3Fields || {};
    allFieldsFilled =
      // eslint-disable-next-line react-hooks/exhaustive-deps
      insuranceId !== undefined &&
      policyHolderName !== "" &&
      policyNumber !== "" &&
      // contactNumber !== "" &&
      // groupNumber !== "" &&
      // networkCommunication !== "" &&
      // deductableAmount !== "" &&
      // coPayment !== "" &&
      // coveredIndividuals !== "" &&
      // selectedPlanType !== undefined &&
      // selectedPlanType !== null &&
      // // planType !== undefined &&
      // // address !== "" &&
      // coInsurancePercentage !== "" &&
      // zipCode !== "" &&
      // emergencyContactNumber !== "" &&
      firstName !== "" &&
      // gurantorAlternatePhoneNumber !== "" &&
      // gurantorAlternatePhoneNumber !== undefined &&
      gurantorLastName !== "";
    // gurantorEmail !== "" &&
    // employerName !== "" &&
    // // gurantorAddress !== "" &&
    // gurantorZipCode !== "" &&
    // gurantorZipCode !== undefined &&
    // gurantorGenderId !== undefined &&
    // selectedPatient !== undefined &&
    // guarantorLocation?.city !== "" &&
    // insurenceLocation?.city !== "";
    allInsuranceFieldsFilled = insuranceId !== undefined && policyHolderName !== "" && policyNumber !== "";
    // groupNumber !== "" &&
    // networkCommunication !== "" &&
    // deductableAmount !== "" &&
    // coPayment !== "" &&
    // coveredIndividuals !== "" &&
    // // planType !== undefined &&
    // // address !== "" &&
    // selectedPlanType !== undefined &&
    // selectedPlanType !== null &&
    // coInsurancePercentage !== "" &&
    // zipCode !== "" &&
    // emergencyContactNumber !== "";
    setInsuranceFieldsValid(allInsuranceFieldsFilled);
    setStep3Complete(allFieldsFilled);
  }, [step3Fields, guarantorLocation, insurenceLocation]);

  useEffect(() => {
    const updatedStep3Fields = insuranceDetails?.reduce(
      (acc, value) => {
        // Update acc (accumulator) with the values from value
        return {
          ...acc,
          policyNumber: value?.policyNumber || acc.policyNumber,
          policyHolderName: value?.policyHolderName || acc.policyHolderName,
          insuranceId: value?.insuranceId || acc.insuranceId,
          // groupNumber: value?.groupNumber || acc.groupNumber,
          // // contactNumber: value?.contactNumber || acc.contactNumber,
          // networkCommunication: value?.networkCommunication || acc.networkCommunication,
          // deductableAmount: value?.deductableAmount || acc.deductableAmount,
          // coPayment: value?.coPayment || acc.coPayment,
          // coInsurancePercentage: value?.coInsurancePercentage || acc.coInsurancePercentage,
          // coveredIndividuals: value?.coveredIndividuals || acc.coveredIndividuals,
          // emergencyContactNumber: value?.emergencyContactNumber || acc.emergencyContactNumber,
          // planType: value?.planType || acc.planType,
          // address: value?.primaryAddress || acc.primaryAddress,
          // insurenceLocation: value?.city || acc.city,
          // zipCode: value?.patientInsuranceZipCode || acc.patientInsuranceZipCode,
          // firstName: value?.gurantorDetails?.firstName || acc.gurantorDetails?.firstName,
          // gurantorLastName: value?.gurantorDetails?.gurantorLastName || acc.gurantorDetails?.gurantorLastName,
          // // relationId: value?.gurantorDetails?.relationId || acc.gurantorDetails?.relationId,
          // gurantorZipCode: value?.gurantorDetails?.gurantorZipCode || acc.gurantorDetails?.gurantorZipCode,
          // gurantorGenderId: value?.gurantorDetails?.gurantorGenderId || acc.gurantorDetails?.gurantorGenderId,
          // gurantorAlternatePhoneNumber:
          //   value?.gurantorDetails?.gurantorAlternatePhoneNumber || acc.gurantorDetails?.gurantorAlternatePhoneNumber,
          // gurantorEmail: value?.gurantorDetails?.gurantorEmail || acc.gurantorDetails?.gurantorEmail,
          // phoneNumber: value?.gurantorDetails?.phoneNumber || acc.gurantorDetails?.phoneNumber,
          // gurantorAddress: value?.gurantorDetails?.gurantorAddress || acc.gurantorDetails?.gurantorAddress,
          // gurantorCity: value?.gurantorDetails?.gurantorCity || acc.gurantorDetails?.gurantorCity,
          // employerName: v=alue?.gurantorDetails?.employerName || acc.gurantorDetails?.employerName
        };
      },
      { ...step3Fields }
    );
    setStep3Fields(updatedStep3Fields);
    if (updatedStep3Fields) {
      const hasNullValues = Object.values(updatedStep3Fields).some(
        (value) => value === null || value === undefined || value === ""
      );
      setStep3Complete(hasNullValues);
    }
  }, [insuranceDetails, patientDetailsById]);
  const keys = Object.keys(errors || {});

  const renderInsuranceHeader = () => {
    const tabsList = [];
    for (let i = 0; i < insuranceHeader; i++) {
      tabsList.push(<Tab label={"Insurance and Guarantor " + (i + 1)} {...a11yProps(i)} />);
    }
    return [...tabsList];
  };
  const renderInsurenceContent = () => {
    const tabsList = [];
    for (let i = 0; i < insuranceHeader; i++) {
      tabsList.push(
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <Tabpanel value={value} index={i}>
            <Box className="w-100 dflex align-items-start mt-3">
              <Typography variant="h6" component="h6">
                Identity Information
              </Typography>
              <Typography component="label" variant="label" className="checked--label">
                <Checkbox
                  checked={i === 0 ? defaultAddress : defaultAddress1}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    // If the checkbox being clicked is already selected
                    if (selectedCheckBox === i) {
                      setSelectedCheckBox(null); // Deselect the checkbox
                    } else {
                      setSelectedCheckBox(i); // Select the checkbox
                    }
                    if (i === 0) {
                      setDefaultAddress(isChecked);
                    } else if (i === 1) {
                      setDefaultAddress1(isChecked);
                    }
                  }}
                />
                Mark as default
              </Typography>
            </Box>
            <Grid container spacing={2} className="mt-0">
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <Grid container spacing={2}>
                  {patientObj?.insurenceObj?.map((t, index) => {
                    const id = t.id.replace("index", i);
                    const insuranceerrors = errors?.insuranceDetails;
                    const error =
                      insuranceerrors?.length > 0 ? (insuranceerrors[i] ? insuranceerrors[i][t.name] : "") : "";
                    // const error1 = errors?.careGiverDetails?.map((p) => p?.careGiverCity?.message) ?? [];

                    return (
                      <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Typography
                          variant="label"
                          component="label"
                          className={t.label === "Street Address" || !t.required ? "add__label" : "add__label required"}
                        >
                          {t.label}
                        </Typography>
                        {t.type === "text" ? (
                          <Controller
                            key={id}
                            control={control}
                            name={id}
                            rules={{
                              required:
                                t.required && t.name !== "gurantorAlternatePhoneNumber" && "This field is required.",
                              pattern: {
                                value: t.pattern,
                                message: `Invalid ${t.label.toLowerCase()}.`
                              },
                              maxLength: {
                                value: t?.maxLength,
                                message:
                                  t.name === "zipCode"
                                    ? "Length cannot be more than 5"
                                    : t.name === "emergencyContactNumber"
                                    ? "Length cannot be more than 10"
                                    : "Length cannot be more than 30"
                              },
                              minLength: {
                                value: t.minLength,
                                message: `Length cannot be less than ${t.minLength}`
                              }
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id={id}
                                variant="outlined"
                                className="add__input"
                                placeholder={`Enter ${t.label}`}
                                // value={tenantDetails[t.id]}
                                onChange={(e) => {
                                  if (t.name === "policyNumber") {
                                    setPolicyNumber(e.target.value);
                                  }
                                  handleStep3Change(t.name, e.target.value);
                                  field.onChange(e);
                                }}
                                margin="normal"
                                error={Boolean(error)}
                                helperText={error?.message}
                              />
                            )}
                          />
                        ) : t.type === "select" &&
                          t.label !== "Relation" &&
                          t.name !== "insuranceId" &&
                          t.name !== "planType" ? (
                          (editParam === "true" || editParam === null) &&
                          (insurenceLocation?.label !== "" || insurenceLocation1?.label !== "" ? (
                            <Controller
                              key={id}
                              control={control}
                              name={id}
                              rules={
                                {
                                  // required:
                                  //   insurenceLocation?.city === "" && insurenceLocation1?.city === ""
                                  //     ? "This field is required."
                                  //     : ""
                                }
                              }
                              render={({ field }) => (
                                <div>
                                  {(insurenceLocation?.label !== "" || insurenceLocation1?.label !== "") && (
                                    <GeoLocationSearch
                                      defaultValue={
                                        i === 0 && insurenceLocation?.city !== ""
                                          ? ` ${insurenceLocation.label}`
                                          : i === 1 &&
                                            insurenceLocation1?.city !== "" &&
                                            insurenceLocation1?.city !== undefined
                                          ? `${insurenceLocation1?.label}`
                                          : ""
                                      }
                                      setLocation={(newLocation) => {
                                        if (i === 0) {
                                          if (newLocation?.city !== "") {
                                            setInsurenceLocation(newLocation);
                                            clearErrors(id);
                                          } else {
                                            setInsurenceLocation({ country: "", state: "", city: "", label: "" });
                                          }
                                        } else if (i === 1) {
                                          if (newLocation) {
                                            setInsurenceLocation1(newLocation);
                                            clearErrors(id);
                                          } else {
                                            setInsurenceLocation1({ country: "", state: "", city: "", label: "" });
                                          }
                                        }
                                        setIndex(i);
                                      }}
                                      // location={i === 0 ? careGiverLocation : careGiverLocation1}
                                    />
                                  )}
                                  {error && <Typography className="errorInfo">{error?.message}</Typography>}
                                </div>
                              )}
                            />
                          ) : (
                            insurenceLocationFlag === true && (
                              <Controller
                                key={id}
                                control={control}
                                name={id}
                                rules={
                                  {
                                    // required:
                                    //   insurenceLocation?.city === "" && insurenceLocation1?.city === ""
                                    //     ? "This field is required."
                                    //     : ""
                                  }
                                }
                                render={({ field }) => (
                                  <div>
                                    {(insurenceLocation?.label === "" || insurenceLocation1?.label === "") && (
                                      <GeoLocationSearch
                                        defaultValue={
                                          i === 0 && insurenceLocation?.city !== ""
                                            ? ` ${insurenceLocation.label}`
                                            : i === 1 &&
                                              insurenceLocation1?.city !== "" &&
                                              insurenceLocation1?.city !== undefined
                                            ? `${insurenceLocation1?.label}`
                                            : ""
                                        }
                                        setLocation={(newLocation) => {
                                          if (i === 0) {
                                            if (newLocation?.city !== "") {
                                              setInsurenceLocation(newLocation);
                                              clearErrors(id);
                                            } else {
                                              setInsurenceLocation({ country: "", state: "", city: "", label: "" });
                                            }
                                          }
                                          if (i === 1) {
                                            if (newLocation) {
                                              setInsurenceLocation1(newLocation);
                                              clearErrors(id);
                                            } else {
                                              setInsurenceLocation1({ country: "", state: "", city: "", label: "" });
                                            }
                                          }
                                          setIndex(i);
                                        }}
                                        // location={i === 0 ? careGiverLocation : careGiverLocation1}
                                      />
                                    )}
                                    {error && <Typography className="errorInfo">{error?.message}</Typography>}
                                  </div>
                                )}
                              />
                            )
                          ))
                        ) : t.type === "date" && t.name === "insuranceExpiryDate" ? (
                          <Controller
                            key={id}
                            control={control}
                            name={id}
                            rules={{
                              required: expiryValue1?.length === 0 && "This field is required.",
                              pattern: {
                                value: t.pattern,
                                message: `Invalid ${t.label.toLowerCase()}.`
                              }
                            }}
                            render={({ field }) => (
                              <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    {...field}
                                    value={i === 0 ? expiryValue : expiryValue1}
                                    className="w-100 datetimepicker-control"
                                    onChange={(newValue) => {
                                      if (i === 0) {
                                        field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                                        setExpiryValue(dayjs(newValue));
                                      } else if (i === 1) {
                                        field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                                        setExpiryValue1(dayjs(newValue));
                                      }
                                    }}
                                    minDate={dayjs()}
                                  />
                                </LocalizationProvider>
                              </>
                            )}
                          />
                        ) : t.name === "insuranceIssueDate" ? (
                          <Controller
                            key={id}
                            control={control}
                            name={id}
                            rules={{
                              required: issuedDate1?.length === 0 && "This field is required.",
                              pattern: {
                                value: t.pattern,
                                message: `Invalid ${t.label.toLowerCase()}.`
                              }
                            }}
                            render={({ field }) => (
                              <>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    {...field}
                                    value={i === 0 ? issuedDate : issuedDate1}
                                    className="w-100 datetimepicker-control"
                                    onChange={(newValue) => {
                                      if (i === 0) {
                                        field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                                        setIssuedDate(dayjs(newValue));
                                      } else if (i === 1) {
                                        field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                                        setIssuedDate1(dayjs(newValue));
                                      }
                                    }}
                                    // minDate={dayjs()}
                                  />
                                </LocalizationProvider>
                              </>
                            )}
                          />
                        ) : t.name === "insuranceId" ? (
                          <Controller
                            key={id}
                            control={control}
                            name={id}
                            rules={{
                              required: !selectedCompendiumList && "This field is required."
                            }}
                            render={({ field }) => (
                              <Autocomplete
                                // {...field}
                                className="customAutocomplete__input mb-2"
                                options={payerCompendiumList} // Use the modified options array
                                value={i === 0 ? selectedCompendiumList : selectedCompendiumList2}
                                getOptionLabel={(option) => `${option?.insuranceCompanyName}` || ""} // Define how to display option labels
                                renderOption={(props, option, { selected }) => (
                                  <li {...props}>{`${option?.insuranceCompanyName}`}</li>
                                )}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=""
                                    // Display the custom value if it exists
                                    value={i === 0 ? selectedCompendiumList : selectedCompendiumList2}
                                    error={Boolean(error)}
                                    helperText={error?.message}
                                  />
                                )}
                                onChange={(event, newValue) => {
                                  // Check if the user selected an option or entered a custom name
                                  if (newValue && newValue.insuranceCompanyName) {
                                    if (i === 0) {
                                      setSelectedCompendiumList(newValue);
                                      // field.onChange(newValue.insuranceId.toString()); // Set the custom name
                                      handleStep3Change(t.name, newValue);
                                    } else if (i === 1) {
                                      setSelectedCompendiumList2(newValue);
                                      // field.onChange(newValue.insuranceId.toString()); // Set the custom name
                                    }
                                    field.onChange(newValue);
                                  } else {
                                    setSelectedCompendiumList(null);
                                    setSelectedCompendiumList2(null);
                                  }
                                }}
                              />
                            )}
                          />
                        ) : (
                          t.name === "planType" && (
                            <Controller
                              key={id}
                              control={control}
                              name={id}
                              rules={
                                {
                                  // required: !selectedPlanType && "This field is required."
                                }
                              }
                              render={({ field }) => (
                                <Autocomplete
                                  className="customAutocomplete__input mb-2"
                                  options={planTypes}
                                  getOptionLabel={(option) => option.planTypeDescription || ""} // Define how to display option labels
                                  getOptionSelected={(option, value) =>
                                    option.planTypeDescription === value.planTypeDescription
                                  } // Specify how options are considered selected
                                  // options={planTypes.map((option) => option.planTypeDescription)} // Extracting only the "planTypeDescription" field
                                  value={i === 0 ? selectedPlanType : selectedPlanType2}
                                  // getOptionLabel={(option) => option || ""} // Define how to display option labels
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label=""
                                      error={Boolean(error)}
                                      helperText={error?.message}
                                      value={i === 0 ? selectedPlanType : selectedPlanType2}
                                    />
                                  )}
                                  onChange={(event, newValue) => {
                                    field.onChange(newValue);
                                    if (newValue && newValue.planTypeDescription) {
                                      if (i === 0) {
                                        setSelectedPlanType(newValue);
                                        handleStep3Change(t.name, newValue);
                                      } else if (i === 1) {
                                        setSelectedPlanType2(newValue);
                                      }
                                      field.onChange(newValue);
                                    } else {
                                      setSelectedPlanType(null);
                                      setSelectedPlanType2(null);
                                    }
                                  }}
                                />
                              )}
                            />
                          )
                        )}
                      </Grid>
                    );
                  })}
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Button
                      variant="outlined"
                      className="primary-outline-btn whiteSpace-nowrap check-now"
                      onClick={checkInsEligibility}
                      disabled={!selectedCompendiumList}
                    >
                      Check Now
                    </Button>
                    <Typography component="div" style={{ color: "red" }}>
                      {/* {(!InsuranceFieldsValid) && "please fill all  required fields"} */}
                    </Typography>
                  </Grid>
                  {/* <Button
                    variant="outlined"
                    className="primary-outline-btn ms-3 whiteSpace-nowrap check-now"
                    onClick={checkInsEligibility}
                    disabled={insuranceId === ""}
                  >
                    Check Now
                  </Button> */}
                </Grid>
                {!fieldChanged && message ? (
                  <Typography className="errorInfo">{message}</Typography>
                ) : !fieldChanged ? (
                  <Typography className="errorInfo">{errorMessage}</Typography>
                ) : (
                  ""
                  // <Typography className="errorInfo">{"Click on Check now before saving"}</Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                {i === 0 && insuranceImg && (
                  <div className="previewProfilePic">
                    <img
                      className="playerProfilePic_home_tile"
                      src={insuranceImg || patientDetailsById?.insuranceIdProof?.docURL}
                    />
                  </div>
                )}
                { i === 0 && insurance && !insuranceImg && (
                  <div className="previewProfilePic">
                    <img
                      className="playerProfilePic_home_tile"
                      src={insurance?.docURL || patientDetailsById?.insuranceIdProof?.docURL}
                    />
                  </div>
                )}
              </Grid>
            </Grid>
            <Divider className="fullWidthDivider" />
            <Accordion
              expanded={toggleAccordian}
              className="stepper__accordion mt-3 stepper__accordion--testDetails"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => {
                  setToggleAccordian(!toggleAccordian);
                }}
              >
                <Typography variant="h6" component="h6">
                  Guarantor Information
                </Typography>
              </AccordionSummary>
              <Box className="w-100 dflex align-items-start">
             
            </Box>
            <Grid container spacing={2} className="mt-0">
              {patientObj?.guarantorObj?.map((t, index) => {
                const id = t.id.replace("index", i);
                const insuranceerrors = errors?.insuranceDetails;
                const gurantorError =
                  insuranceerrors?.length > 0 ? (insuranceerrors[i] ? insuranceerrors[i].gurantorDetails : "") : "";
                const error = gurantorError?.[t?.name];
                // const error1 = errors?.careGiverDetails?.map((p) => p?.careGiverCity?.message) ?? [];

                return (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                    {t.required ? (
                      <Typography variant="label" component="label" className="add__label required">
                        {t.label}
                      </Typography>
                    ) : (
                      <Typography variant="label" component="label">
                        {t.label}
                      </Typography>
                    )}
                    {t.type === "text" ? (
                      <Controller
                        key={id}
                        control={control}
                        name={id}
                        rules={{
                          required: t.required && "This field is required.",
                          pattern: {
                            value: t.pattern,
                            message: `Invalid ${t.label.toLowerCase()}.`
                          },
                          maxLength: {
                            value: t?.maxLength,
                            message:
                              t.name === "gurantorZipCode"
                                ? "Length cannot be more than 5"
                                : t.name === "phoneNumber" ||
                                  t.name === "alternatePhoneNumber" ||
                                  t.name === "gurantorAlternatePhoneNumber"
                                ? "Length cannot be more than 10"
                                : "Length cannot be more than 30"
                          },
                          minLength: {
                            value: t.minLength,
                            message: `Length cannot be less than ${t.minLength}`
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id={id}
                            variant="outlined"
                            className="add__input"
                            placeholder={`Enter ${t.label}`}
                            onChange={(e) => {
                              field.onChange(e);
                              handleStep3Change(t.name, e.target.value);
                            }}
                            margin="normal"
                            error={Boolean(error)}
                            helperText={error?.message}
                          />
                        )}
                      />
                    ) : t.type === "select" && t.label !== "Relation" && t.label !== "Gender" ? (
                      (editParam === "true" || editParam === null) &&
                      (guarantorLocation?.city !== "" || guarantorLocation1?.city !== "" ? (
                        <Controller
                          key={id}
                          control={control}
                          name={id}
                          rules={
                            {
                              // required:
                              //   guarantorLocation?.city === "" && guarantorLocation1?.city === ""
                              //     ? "This field is required."
                              //     : ""
                            }
                          }
                          render={({ field }) => (
                            <div>
                              {(guarantorLocation?.city !== "" || guarantorLocation1?.city !== "") && (
                                <GeoLocationSearch
                                  defaultValue={
                                    i === 0 && guarantorLocation?.city !== ""
                                      ? ` ${guarantorLocation?.label}`
                                      : i === 1 &&
                                        guarantorLocation1?.city !== "" &&
                                        guarantorLocation1?.city !== undefined
                                      ? `${guarantorLocation1?.label}`
                                      : ""
                                  }
                                  setLocation={(newLocation) => {
                                    if (i === 0) {
                                      if (newLocation?.city !== "") {
                                        setGuarantorLocation(newLocation);
                                        clearErrors(id);
                                      } else {
                                        setGuarantorLocation({ country: "", state: "", city: "", label: "" });
                                      }
                                    } else if (i === 1) {
                                      if (newLocation) {
                                        setGuarantorLocation1(newLocation);
                                        clearErrors(id);
                                      } else {
                                        setGuarantorLocation1({ country: "", state: "", city: "", label: "" });
                                      }
                                    }
                                    setIndex(i);
                                  }}
                                  // location={i === 0 ? careGiverLocation : careGiverLocation1}
                                />
                              )}
                              {error && <Typography className="errorInfo">{error?.message}</Typography>}
                            </div>
                          )}
                        />
                      ) : (
                        gurantorLocFlag === true && (
                          <Controller
                            key={id}
                            control={control}
                            name={id}
                            rules={
                              {
                                // required:
                                //   guarantorLocation?.city === "" && guarantorLocation1?.city === ""
                                //     ? "This field is required."
                                //     : ""
                              }
                            }
                            render={({ field }) => (
                              <div>
                                {(guarantorLocation?.label === "" ||
                                  guarantorLocation1?.label === "" ||
                                  gurantorLocFlag) && (
                                  <GeoLocationSearch
                                    defaultValue={
                                      i === 0 && guarantorLocation?.city !== ""
                                        ? ` ${guarantorLocation?.label}`
                                        : i === 1 &&
                                          guarantorLocation1?.city !== "" &&
                                          guarantorLocation1?.city !== undefined
                                        ? `${guarantorLocation1?.label}`
                                        : ""
                                    }
                                    setLocation={(newLocation) => {
                                      if (i === 0) {
                                        if (newLocation?.city !== "") {
                                          setGuarantorLocation(newLocation);
                                          clearErrors(id);
                                        } else {
                                          setGuarantorLocation({ country: "", state: "", city: "", label: "" });
                                        }
                                      }
                                      if (i === 1) {
                                        if (newLocation) {
                                          setGuarantorLocation1(newLocation);
                                          clearErrors(id);
                                        } else {
                                          setGuarantorLocation1({ country: "", state: "", city: "", label: "" });
                                        }
                                      }
                                      setIndex(i);
                                    }}
                                    // location={i === 0 ? careGiverLocation : careGiverLocation1}
                                  />
                                )}
                                {error && <Typography className="errorInfo">{error?.message}</Typography>}
                              </div>
                            )}
                          />
                        )
                      ))
                    ) : t.type === "date" ? (
                      <Controller
                        key={id}
                        control={control}
                        name={id}
                        rules={{
                          // required: dayjs(dateOfBirth).format("DD/MM/YYYY") === "Invalid Date" ? "This field is required." : "",
                          validate: {
                            futureDate: (value) => {
                              const selectedDate = dayjs(value) || i === 0 ? gurantorDateOfBirth : dateOfBirth1;
                              const currentDate = dayjs();
                              return selectedDate.isBefore(currentDate) || "Please select previous/current year.";
                            }
                          }
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                {...field}
                                value={i === 0 ? gurantorDateOfBirth : dateOfBirth1}
                                className="w-100 datetimepicker-control"
                                onChange={(newValue) => {
                                  if (i === 0) {
                                    field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                                    setDateOfBirth(dayjs(newValue));
                                    setGurantorBirth(dayjs(newValue).format("YYYY/MM/DD").trim());
                                  } else if (i === 1) {
                                    field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                                    setDateOfBirth1(dayjs(newValue));
                                  }
                                }}
                                maxDate={dayjs()}
                              />
                              {dayjs(gurantorDateOfBirth).format("DD/MM/YYYY") === "Invalid Date" ? (
                                <p style={{ color: "red" }}>This field is required.</p>
                              ) : fieldState.error ? (
                                <p style={{ color: "red" }}>{fieldState.error.message}</p>
                              ) : (
                                ""
                              )}
                            </LocalizationProvider>
                          </>
                        )}
                      />
                    ) : t.label === "Relation" ? (
                      <Controller
                        key={id}
                        control={control}
                        name={id}
                        rules={
                          {
                            // required: !selectedPatient ? "This field is required." : ""
                          }
                        }
                        render={({ field }) => (
                          <Autocomplete
                            className="customAutocomplete__input mb-2"
                            disablePortal
                            // id="combo-box-demo"
                            freeSolo={true}
                            // key={t.id+"-"+i}
                            // name={t.id.replace("index",i)}
                            options={relationList} // Use the modified options array
                            value={i === 0 ? selectedPatient : selectedPatient2}
                            getOptionLabel={(option) => `${option?.description}`} // Define how to display option labels
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>{`${option?.description}`}</li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                // id={t.id}
                                // Display the custom value if it exists
                                value={i === 0 ? selectedPatient?.description : selectedPatient2?.description}
                                error={Boolean(error)}
                                helperText={error?.message}
                              />
                            )}
                            onChange={(event, newValue) => {
                              // Check if the user selected an option or entered a custom name
                              if (newValue && newValue.description) {
                                if (i === 0) {
                                  setSelectedPatient(newValue); // Set the custom name
                                  field.onChange(newValue.id.toString());
                                  handleStep3Change(t.name, newValue);
                                } else if (i === 1) {
                                  setSelectedPatient2(newValue); // Set the custom name
                                  field.onChange(newValue.id.toString());
                                }
                              } else {
                                setSelectedPatient(null);
                                setSelectedPatient2(null);
                              }
                            }}
                          />
                        )}
                      />
                    ) : (
                      t.label === "Gender" && (
                        <Controller
                          key={id}
                          control={control}
                          name={id}
                          rules={
                            {
                              // required: !selectedGender && "This field is required."
                            }
                          }
                          render={({ field }) => (
                            <Autocomplete
                              className="customAutocomplete__input mb-2"
                              disablePortal
                              // id="combo-box-demo"
                              freeSolo={true}
                              // key={t.id+"-"+i}
                              // name={t.id.replace("index",i)}
                              options={genderList} // Use the modified options array
                              value={i === 0 ? selectedGender : selectedGender2}
                              getOptionLabel={(option) => `${option?.description}`} // Define how to display option labels
                              renderOption={(props, option, { selected }) => (
                                <li {...props}>{`${option?.description}`}</li>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label=""
                                  // id={t.id}
                                  // Display the custom value if it exists
                                  value={i === 0 ? selectedGender?.description : selectedGender2?.description}
                                  error={Boolean(error)}
                                  helperText={error?.message}
                                />
                              )}
                              onChange={(event, newValue) => {
                                // Check if the user selected an option or entered a custom name
                                if (newValue && newValue.description) {
                                  if (i === 0) {
                                    setSelectedGender(newValue); // Set the custom name
                                    field.onChange(newValue.id.toString());
                                    handleStep3Change(t.name, newValue);
                                  } else if (i === 1) {
                                    setSelectedGender2(newValue); // Set the custom name
                                    field.onChange(newValue.id.toString());
                                  }
                                } else {
                                  setSelectedGender(null);
                                  setSelectedGender2(null);
                                }
                              }}
                            />
                          )}
                        />
                      )
                    )}
                  </Grid>
                );
              })}
            </Grid>
            </Accordion>
            {/* <Typography component="label" variant="label" className="checked--label mt-4">
              <Checkbox
                icon={icon}
                style={{ marginRight: 4 }}
                checked={selectedPatientAddress === i}
                onChange={(e) => {
                  if (selectedPatientAddress === i) {
                    setSelectedPatientAddress(0);
                  } else {
                    setSelectedPatientAddress(i);
                  }
                }}
              />
              Same as Patient Details
            </Typography> */}
            <Typography className="action__items delete-insurance-guarentor" component="div">
              {insuranceHeader > 0 && (
                <Button
                  variant="text"
                  className="p-0 errorTextButton"
                  onClick={() => handleDelete("Insurance And Guarentor Details", i)}
                >
                  Delete Insurance And Guarantor
                </Button>
              )}
              <Button
                className="primary-btn next-btn" id="step3SubmitButton"
                // disabled={!step3Complete || keys?.length > 0}
                type="submit"
                // onClick={() => step3Submit()}
                // step3Complete &&

                // }}
                // disabled={editParam === "true" ? fieldChanged : !(message.length > 0 || errorMessage.length > 0)}
              >
                Save & Continue
              </Button>
            </Typography>
          </Tabpanel>
        </form>
      );
    }
    return [...tabsList];
  };
  return (
    <Typography variant="div" component="div" className="createOrder__wrapper--content">
      {loader && <Loader />}
      <Box className="tab__wrapper admin-tabs ps-0 w-100">
        <Tabs value={value} onChange={handleChangeTab} aria-label="Guarentor Details" className="tabs_sections">
          {renderInsuranceHeader()}
          {/* {insuranceHeader < 2 ? (
            <Button
              variant="text"
              className="downloadBtn-text p-0 positioned--text"
              onClick={() => setInsuranceHeader(insuranceHeader + 1)}
            >
              Add Insurance And Guarentor
            </Button>
          ) : (
            ""
          )} */}
        </Tabs>
      </Box>
      {renderInsurenceContent()}
    </Typography>
  );
};
export default InsuranceGurantor;
