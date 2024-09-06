export const REDUX_KEYS = {
  REDUX_USER: "eqx-aux",
  CYCLING_AND_BOOKING_COMMON: "cyc-book",
  PRINT_SIGNUP_CLASSES: "cyc-prt-cls",
  CYCLING_AND_BOOKING_MANAGE_BOOKING: "cyc-mb",
  CYCLING_AND_BOOKING_UPDATE_BOOKING_INFO: "cyc-ubi"
};
export const genderConstants = {
  male: "Male",
  female: "Female"
};
export const dsr = {
  Daily: 1,
  Monthly: 3,
  Weekly: 2
};
export const constants = {
  memberId: "Member ID",
  barcode: "Barcode",
  email: "Email",
  name: "Name",
  securityid: "Security ID"
};

export const logos = {
  lifescan: "https://samplestorageq01.blob.core.windows.net/lifescan/logo.svg",
  mt: "https://samplestorageq01.blob.core.windows.net/mouritech/logo.png"
};
export const SSOKeys = {
  google: "google-oauth2",
  facebook: "facebook",
  twitter: "twitter"
};

export const tabLabels = ["Total Orders", "Upcoming Orders", "Previous Orders"];
export const DrawerTabLabels = ["Order Details", "Insurance Details"];
export const orderStatus = {
  IN_PROGRESS: 2,
  COMPLETED: 1
};
export const ORDERS = {
  orderPriority: 5,
  orderType: 2,
  previewDocType: 1
};

export const orderTableColumns = [
  {
    id: "serviceProvider",
    label: "Service Provider"
  },
  {
    id: "testName",
    label: "Test Name"
  },
  {
    id: "date",
    label: "Date"
  },
  {
    id: "orderId",
    label: "Order ID."
  },
  {
    id: "providerName",
    label: "Provider's Name"
  },
  {
    id: "reports",
    label: "Reports"
  },
  {
    id: "status",
    label: "Result Status"
  }
];

export const roleIds = {
  PATIENT: 5,
  SUPER_ADMIN: 1,
  TENANT_ADMIN: 2,
  CLIENT_ADMIN: 3,
  PROVIDER: 4
};

export const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // Your desired formatting options
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link"]
  ]
};

export const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link"
  // No 'image' format
];

export const tenantobj = [
  {
    id: "firstName",
    label: "First Name",
    pattern: /^[A-Za-z ]+$/,
    type: "text",
    required: true,
    maxLength: 30,
    readOnly: true,
    hide: true,
    role: roleIds.TENANT_ADMIN
  },

  {
    id: "middleName",
    label: "Middle Name",
    pattern: /^[A-Za-z ]+$/,
    type: "text",
    required: false,
    maxLength: 30,
    readOnly: true,
    hide: true,
    role: roleIds.TENANT_ADMIN
  },

  {
    id: "lastName",
    label: "Last Name",
    pattern: /^[A-Za-z ]+$/,
    type: "text",
    required: true,
    maxLength: 30,
    readOnly: true,
    hide: true,
    role: roleIds.TENANT_ADMIN
  },
  {
    id: "emailAddress",
    label: "Email Address",
    pattern: /^[-a-zA-Z0-9_.*$]{2,64}[@]{1}[a-zA-Z0-9]{2,20}[.]{1}[a-zA-Z.]{2,240}$/,
    type: "text",
    required: true,
    readOnly: true
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    pattern: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
    maxLength: 10,
    type: "text",
    required: true,
    readOnly: true,
    hide: true,
    role: roleIds.TENANT_ADMIN
  },
  {
    id: "alternatePhoneNumber",
    label: "Home Phone Number",
    pattern: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
    // pattern: /^[0-9]{10}$/,
    maxLength: 10,
    type: "text",
    required: false,
    readOnly: true,
    hide: true,
    role: roleIds.TENANT_ADMIN
  },

  {
    id: "contractDate",
    label: "Contract Date",
    type: "date",
    required: true,
    model: "tenant",
    readOnly: true
  },

  {
    id: "joiningDate",
    label: "Joining Date",
    type: "date",
    required: false,
    model: "tenant user",
    readOnly: true
  },

  // {
  //   id: "streetAddress",
  //   label: "Street Address",
  //   required: false,
  //   type: "text",
  //   pattern: /^[A-Za-z0-9,. /-]+$/,
  //   readOnly: true
  // },
  {
    id: "location",
    label: "City/State/Country",
    type: "select",
    required: true,
    readOnly: true,
    disabled: true,
    role: roleIds.TENANT_ADMIN
  },
  {
    id: "zipCode",
    label: "Zip Code",
    pattern: /^[0-9]{5}$/,
    maxLength: 5,
    type: "text",
    required: true,
    readOnly: true
  }
];

export const patientObj = {
  insurenceObj: [
    {
      id: "insuranceDetails[index].insuranceId",
      label: "Insurance Name",
      name: "insuranceId",
      type: "select",
      required: true
    },
    {
      id: "insuranceDetails[index].policyHolderName",
      label: "Policy Holder Name",
      name: "policyHolderName",
      pattern: /^[a-zA-Z\s.\-]+$/,
      type: "text",
      required: true,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].policyNumber",
      label: "Policy Number",
      name: "policyNumber",
      pattern: /^[0-9a-zA-Z\s.,\-]+$/,
      type: "text",
      required: true,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].groupNumber",
      label: "Group Number",
      name: "groupNumber",
      pattern: /^[0-9a-zA-Z\s.\-]+$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].networkCommunication",
      label: "Network Communication",
      name: "networkCommunication",
      pattern: /^[a-zA-Z0-9]+$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].insuranceIssueDate",
      label: "Issued Date",
      name: "insuranceIssueDate",
      type: "date",
      required: false,
      model: "tenant",
      readOnly: true
    },
    {
      id: "insuranceDetails[index].insuranceExpiryDate",
      label: "Expiry Date",
      name: "insuranceExpiryDate",
      type: "date",
      required: false,
      model: "tenant",
      readOnly: true
    },
    {
      id: "insuranceDetails[index].deductableAmount",
      label: "Deductible Amount",
      name: "deductableAmount",
      pattern: /^[0-9]+$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].coPayment",
      label: "Co-Payment",
      name: "coPayment",
      pattern: /^[0-9$]+$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].coInsurancePercentage",
      label: "Co-Insurance",
      name: "coInsurancePercentage",
      pattern: /^[0-9]+$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].coveredIndividuals",
      label: "Covered Individuals",
      name: "coveredIndividuals",
      pattern: /^[a-zA-Z0-9]+$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index].planType",
      label: "Plan Type",
      name: "planType",
      pattern: /^[a-zA-Z0-9\s\W]+$/,
      type: "select",
      required: false,
      maxLength: 30
    },
    // {
    //   id: "insuranceDetails[index].address",
    //   // label: "Street Address",
    //   name: "address"
    //   // pattern: /^[A-Z a-z0-9,/-]+$/,
    //   // type: "text",
    //   // required: true,
    //   // maxLength: 30
    // },
    {
      id: "insuranceDetails[index].city",
      label: "City/State/Country",
      name: "city",
      type: "select",
      required: false
    },
    {
      id: "insuranceDetails[index].zipCode",
      label: "Zip code",
      name: "zipCode",
      pattern: /^[0-9]+$/,
      type: "text",
      required: false,
      maxLength: 5,
      minLength: 5
    },
    {
      id: "insuranceDetails[index].emergencyContactNumber",
      label: "Mobile Phone Number",
      name: "emergencyContactNumber",
      pattern: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
      maxLength: 10,
      type: "text",
      required: false
    }
    // {
    //   id: "insuranceDetails[index].insuranceEligibilityStatus",
    //   label: "Insurance Eligibility Check",
    //   name: "eligibilityCheck",
    //   type: "select",
    //   required: true
    // }
  ],
  guarantorObj: [
    {
      id: "insuranceDetails[index][gurantorDetails].firstName",
      label: "First Name",
      name: "firstName",
      pattern: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
      type: "text",
      required: true,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index][gurantorDetails].middleName",
      label: "Middle Name",
      name: "middleName",
      pattern: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index][gurantorDetails].gurantorLastName",
      label: "Last Name",
      name: "gurantorLastName",
      pattern: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
      type: "text",
      required: true,
      maxLength: 30
    },
    {
      id: "insuranceDetails[index][gurantorDetails].gurantorGenderId",
      label: "Gender",
      name: "gurantorGenderId",
      type: "select",
      required: false
    },
    {
      id: "insuranceDetails[index][gurantorDetails].relationId",
      label: "Relation",
      name: "relationId",
      type: "select",
      required: false
    },
    {
      id: "insuranceDetails[index][gurantorDetails].birthDate",
      label: "Date of Birth",
      name: "birthDate",
      type: "date",
      required: true,
      model: "tenant user",
      readOnly: true
    },
    {
      id: "insuranceDetails[index][gurantorDetails].gurantorEmail",
      label: "Email Address",
      name: "gurantorEmail",
      pattern: /^[-a-zA-Z0-9_.*$]{2,64}[@]{1}[a-zA-Z0-9]{2,20}[.]{1}[a-zA-Z.]{2,240}$/,
      type: "text",
      required: false,
      readOnly: true
    },
    {
      id: "insuranceDetails[index][gurantorDetails].employerName",
      label: "Employer Name",
      name: "employerName",
      pattern: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    // {
    //   id: "insuranceDetails[index][gurantorDetails].gurantorAddress",
    //   label: "Street Address",
    // name: "gurantorAddress",
    //   pattern: /^[A-Z a-z0-9,/-]+$/,
    //   type: "text",
    //   required: true,
    //   maxLength: 30
    // },
    {
      id: "insuranceDetails[index][gurantorDetails].gurantorCity",
      label: "City/State/Country",
      name: "gurantorCity",
      type: "select",
      required: false
    },
    {
      id: "insuranceDetails[index][gurantorDetails].gurantorZipCode",
      label: "Zip code",
      name: "gurantorZipCode",
      pattern: /^[0-9]+$/,
      type: "text",
      required: false,
      maxLength: 5,
      minLength: 5
    },
    {
      id: "insuranceDetails[index][gurantorDetails].phoneNumber",
      label: "Home Phone Number",
      name: "phoneNumber",
      pattern: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
      maxLength: 10,
      type: "text",
      required: false
    },
    {
      id: "insuranceDetails[index][gurantorDetails].gurantorAlternatePhoneNumber",
      label: "Mobile Phone Number",
      name: "gurantorAlternatePhoneNumber",
      pattern: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
      maxLength: 10,
      type: "text",
      required: false
    }
  ],
  careGiverObj: [
    {
      id: "careGiverDetails[index].relation",
      label: "Relation to Patient",
      type: "select",
      required: false,
      name: "relation"
    },
    {
      id: "careGiverDetails[index].firstName",
      name: "firstName",
      label: "First Name",
      pattern: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "careGiverDetails[index].middleName",
      label: "Middle Name",
      name: "middleName",
      pattern: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "careGiverDetails[index].lastName",
      label: "Last Name",
      name: "lastName",
      pattern: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
      type: "text",
      required: false,
      maxLength: 30
    },
    {
      id: "careGiverDetails[index].email",
      label: "Email Address",
      name: "email",
      pattern: /^[-a-zA-Z0-9_.*$]{2,64}[@]{1}[a-zA-Z0-9]{2,20}[.]{1}[a-zA-Z.]{2,240}$/,
      type: "text",
      required: false,
      readOnly: true
    },
    {
      id: "careGiverDetails[index].userPhoneNo",
      label: "Phone No.",
      name: "userPhoneNo",
      pattern: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
      maxLength: 10,
      type: "text",
      required: false
    },
    // {
    //   id: "careGiverDetails[index].careGiverAddress",
    //   label: "Street Address",
    //   name: "careGiverAddress",
    //   required: false,
    //   type: "text",
    //   pattern: /^[A-Z a-z0-9,/-]+$/
    // },
    {
      id: "careGiverDetails[index].careGiverCity",
      label: "City/State/Country",
      name: "careGiverCity",
      type: "select",
      required: false
    },
    {
      id: "careGiverDetails[index].careGiverZipCode",
      label: "Zip code",
      name: "careGiverZipCode",
      pattern: /^[0-9]+$/,
      type: "text",
      required: false,
      maxLength: 5
    }
  ]
};

export const profiles = {
  PATIENT: "patient",
  SUPER_ADMIN: "super admin",
  TENANT_ADMIN: "tenant admin",
  CLIENT_ADMIN: "client admin",
  PROVIDER: "provider"
};

export const userFields = [
  {
    id: "userRole",
    label: "User Role",
    required: true,
    options: [
      {
        id: 1,
        name: "Provider"
      },
      {
        id: 2,
        name: "Client"
      }
    ]
  },
  {
    id: "labId",
    label: "Lab ID",
    required: true,
    pattern: /^[A-Z a-z0-9-]+$/
  },
  {
    id: "labName",
    label: "Lab Name",
    required: true,
    pattern: /^[A-Z a-z0-9]+$/
  }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

export const broadCastOptions = [
  { id: 1, name: "Oliver Hansen" },
  { id: 2, name: "Van Henry" },
  { id: 3, name: "April Tucker" },
  { id: 4, name: "Ralph Hubbard" },
  { id: 5, name: "Omar Alexander" }
];
export const PatientTabLabels = ["General Details", "Insurance Details", "Caregiver Details", "Order History"];
export const OrderReportsTabLabels = ["Order Details", "Insurance Details"];

export const statusIds = {
  ACTIVE: 1,
  IN_ACTIVE: 2,
  PENDING: 3,
  SCHEDULED: 4,
  IN_PROGRESS: 5,
  ON_HOLD: 6,
  DRAFT: 7,
  REJECTED: 8,
  COMPLETED: 9,
  COMPLETED_IN_PROGRESS_ORDER: 10,
  COMPLETED_CORRECTED_ORDER: 11,
  CANCELLED: 12,
  ERRORED: 13,
  YetToBeSubmitted: 14
};

export const STATUS_OPTIONS = [
  { id: 1, title: "Active" },
  { id: 2, title: "In Active" },
  { id: 3, title: "Pending" },
  { id: 4, title: "Scheduled" },
  { id: 5, title: "In Progress" },
  { id: 6, title: "On Hold" },
  { id: 7, title: "Draft" },
  { id: 8, title: "Rejected" },
  { id: 9, title: "Completed" },
  { id: 10, title: "Completed In Progress Order" },
  { id: 11, title: "Completed corrected order" },
  { id: 12, title: "Cancelled" },
  { id: 13, title: "Errored" }
];

export const STATUS_OPTIONS_FACILITIES = [
  { id: 1, title: "Active" },
  { id: 2, title: "In Active" }
];
export const STATUS_OPTIONS_ORDERTAB = [
  { id: 7, title: "Draft" },
  { id: 5, title: "Submitted" },
  { id: 6, title: "On Hold" },
  { id: 8, title: "Rejected" },
  { id: 12, title: "Cancelled" },
  { id: 9, title: "Resulted" }
];
export const ORDER_REPORTS_STATUS = [
  { id: 5, title: "Submitted" },
  // { id: 6, title: "On Hold" },
  { id: 7, title: "Draft" },
  { id: 8, title: "Rejected" },
  { id: 9, title: "Resulted" },
  { id: 12, title: "Cancelled" }
  // { id: 14, title: "Yet To be Submitted" }
  // { id: 13, title: "Errored" }
];

export const USER_STATUS_OPTIONS = [
  { id: 1, title: "Active" },
  { id: 2, title: "In Active" }
  // { id: 3, title: "Pending" }
];

export const LABS_STATUS_OPTIONS = [
  { id: 1, title: "Active" },
  { id: 2, title: "In Active" }
];
export const RECONCILIATION_STATUS_OPTIONS = [
  { id: 5, title: "In-Progress" },
  { id: 9, title: "Completed" },
  { id: 13, title: "Errored" }
];
export const DATE_RANGE_OPTIONS = [
  { id: "1", title: "Month to date" },
  { id: "2", title: "Last 7 days" },
  { id: "3", title: "Last 15 days" },
  { id: "4", title: "Year to date" },
  { id: "5", title: "Custom Date range" }
];
export const Years = [
  { id: "1", title: "2024" },
  { id: "2", title: "2023" },
  { id: "3", title: "2022" },
  { id: "4", title: "2021" },
  { id: "5", title: "2020" },
  { id: "6", title: "2019" },
  { id: "7", title: "2018" }
];
export const features = JSON?.parse(sessionStorage?.getItem("features"));
export const Master = features?.find((s) => s?.featureName === "Master Data");
export const Broadcast = features?.find((s) => s?.featureName === "Broadcast");
export const Provider = features?.find((s) => s?.featureName === "Provider");
export const Facility = features?.find((s) => s?.featureName === "Facility");
export const Client = features?.find((s) => s?.featureName === "Client Admin");
export const Lab = features?.find((s) => s?.featureName === "Lab");
export const Payer = features?.find((s) => s?.featureName === "Payer Compendium");
export const Test = features?.find((s) => s?.featureName === "Test Compendium");
export const Patient = features?.find((s) => s?.featureName === "Patient");
export const Reports = features?.find((s) => s?.featureName === "Reports");
export const Order = features?.find((s) => s?.featureName === "Order");
export const Collection = features?.find((s) => s?.featureName === "Add Collection Details");
export const Status = [
  { id: "2", title: "In-Progress" },
  { id: "3", title: "Completed" },
  { id: "4", title: "Rejected" }
];
export const ROLE_OPTIONS = [
  { id: "3", title: "Client Admin" },
  { id: "4", title: "Provider" },
  { id: "5", title: "Patients" }
];

export const ORDER_STATUS = [
  { id: "5", title: "Submitted" },
  { id: "6", title: "On-Hold" },
  { id: "7", title: "Draft" },
  { id: "8", title: "Rejected" },
  { id: "9", title: "Resulted" },
  { id: "12", title: "Cancelled" }
];

export const ORDER_TYPES = [
  { id: "2", title: "One-Time" },
  { id: "1", title: "Standard" },
  { id: "3", title: "Recurring" }
];
export const ORDERREPORT_TYPES = [
  { id: "1", title: "One-Time" },
  { id: "2", title: "Standard" },
  { id: "3", title: "Recurring" }
];

export const ORDER_PRIORITIES = [
  { id: "1", title: "Stat" },
  { id: "2", title: "Routine" }
];
export const Speciemen = [
  { id: 1, description: "Refrigerated" },
  { id: 2, description: "Room Temperature" },
  { id: 3, description: "Frozen" }
];

export const patientpersonalDetails = [
  {
    id: "firstName",
    name: "First Name",
    type: "text",
    required: true
  },
  {
    id: "middleName",
    name: "Middle Name",
    type: "text"
  },
  {
    id: "lastName",
    name: "Last Name",
    type: "text",
    required: true
  },
  {
    id: "race",
    name: "Race",
    type: "select",
    required: true
  },
  {
    id: "gender",
    name: "Gender",
    type: "select",
    required: true
  },
  {
    id: "ethnicGroup",
    name: "Ethnic Group",
    type: "select",
    required: true
  },
  {
    id: "permanentAddr",
    name: "Permanent Address",
    type: "text"
  },
  {
    id: "permanentLocation",
    name: "City/State/Country",
    type: "location"
  },
  {
    id: "communicationAddr",
    name: "Communication Address",
    type: "text",
    required: false
  },
  {
    id: "communicationLocation",
    name: "City/State/Country",
    type: "location",
    required: true
  }
];

export const patientIdentityDetails = [
  {
    id: "drivingLicense",
    name: "Driving License",
    type: "upload"
  },
  {
    id: "stateId",
    name: "State ID",
    type: "upload"
  },
  {
    id: "insuranceId",
    name: "Insurance ID",
    type: "upload",
    required: true
  },
  {
    id: "ssnId",
    name: "SSN ID",
    type: "text"
  },
  {
    id: "emailAddress",
    name: "Email Address",
    type: "text",
    required: true
  }
];

export const docIds = {
  abnDocID: 5,
  providerSignDocId: 6,
  requisitionForm: 7,
  sysGenReqFormdocumentId: 8,
  abnuploadDoc: 9,
  codeMap: 10
};

export const patientIdentityDetailsforBE = {
  dL: 2,
  stateId: 3,
  insuranceId: 4
};
export const idFields = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    required: true
  },
  {
    id: "middleName",
    label: "Middle Name",
    type: "text",
    required: false
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    required: true
  },
  {
    id: "identityNumber",
    label: "DLN No",
    type: "text",
    required: false,
    driving: true
  },
  {
    id: "identityNumber",
    label: "Identification No",
    type: "text",
    required: false,
    stateId: true
  },
  {
    id: "birthDate",
    label: "Date of Birth",
    type: "date",
    required: true
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    required: true
  },
  {
    id: "identityIssueDate",
    label: "Issue Date",
    type: "date",
    required: false
  },
  {
    id: "identityExpiryDate",
    label: "Expiry Date",
    type: "date",
    required: false
  },
  {
    id: "identityIssueState",
    label: "Issuing State",
    type: "text",
    required: false,
    stateId: true
  },
  {
    id: "identityClass",
    label: "Class",
    type: "text",
    required: false,
    driving: true
  },
  {
    id: "identityRestriction",
    label: "Restrictions",
    type: "text",
    required: false
  },
  {
    id: "endorsment",
    label: "Endorsement",
    type: "text",
    required: false,
    driving: true
  },
  {
    id: "height",
    label: "Height",
    type: "text",
    required: false
  },
  {
    id: "eyeColour",
    label: "Eye Color",
    type: "text",
    required: false
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    required: true
  },
  {
    id: "organDonor",
    label: "Organ Doner",
    type: "text",
    required: false
  },
  {
    id: "identityIssueOfAuthority",
    label: "Issue Authority",
    type: "text",
    required: false
  }
];
export const CALLTYPES = {
  Add: "add",
  Edit: "edit",
  Update: "Update",
  Publish: "Publish",
  Created: "Created",
  Updated: "Updated",
  Notification: "notification",
  UpdateBroadcast: "Update Broadcast",
  CreateBroadcast: "Create Broadcast",
  UpdateRequest: "Update Request",
  SendRequest: "Send Request",
  Save: "Save",
  Created: "Created",
  clearUsers: "clearUsers",
  Create: "Create"
};
