import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { CALLTYPES, Facility, roleIds, statusIds } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";
import {
  clientListByFacilityId,
  getFacilitiesById,
  orderListByFacilityId,
  patientListByFacilityId
} from "../../../redux/slices/facilitiesSlice";
import { getDaysLab, getFacilityList, getManagementGrpData, getServiceList } from "@redux/slices/commonAdminApiSlice";
import { useDispatch, useSelector } from "react-redux";

import AddNewFacilities from "../../../pages/tenant-admin/addNewFacilities";
import FacilitiesChildOrderTab from "./facilitieschildOrderTab";
import FacilitiesOrderDetailsTable from "./facilitiesOrderDetails";
import FacilitiespatientDetailsTable from "./facilitiesPatientDetails";
import LabDetailsDrawer from "../../drawers/lab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PropTypes from "prop-types";
import SuccessPopup from "@components/master-data/sucesspopup";
import UpdateStatusDialog from "../../tenant/tenant-details/updateStatusDialog";
import { getTenantUsers } from "@redux/slices/tenantsSlice";
import { useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orderConfig-tabpanel-${index}`}
      aria-labelledby={`orderConfig-tab-${index}`}
      {...other}
    >
      {value === index && <Box> {children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `orderConfig-${index}`,
    "aria-controls": `orderConfig-tabpanel-${index}`
  };
}

export default function FacilitiesParentOrderTab() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState([statusIds.ACTIVE, statusIds.IN_ACTIVE]);
  const [isActive, setIsActive] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const facilitiesById = useSelector((state) => state.facilities.facilitiesById);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [editedFacility, setEditedFacility] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const tenantId = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const [showActiveSuccessPopup, setShowActiveSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const facilityId = pathname.split("/")[3];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tenant = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  const openEditModal = () => {
    setEditedFacility(facilitiesById);
    setIsEditing(true);
    dispatch(getManagementGrpData());
    dispatch(getServiceList());
    dispatch(getFacilityList());
    dispatch(getDaysLab());
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: 0,
          pageSize: 99999
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        searchValue: "",
        tenantId,
        roleId: [roleIds.CLIENT_ADMIN],
        role: loggedInUserRole
      })
    );
    dispatch(getFacilitiesById(facilitiesById?.facilityId));
  };
  useEffect(() => {
    dispatch(getFacilitiesById(facilityId));
  }, []);

  const updateSort = (val) => {
    setSortKey(val[0].id);
    setSortOrder(val[0].desc ? "desc" : "asc");
  };
  useEffect(() => {
    if (facilitiesById?.statusId === 2) setIsActive(true);
  }, [facilitiesById]);

  const fetchClientList = () => {
    dispatch(
      clientListByFacilityId({
        facilityId,
        statusId: status,
        pagination: {
          pageNo: 0,
          pageSize: 99999
        },
        searchValue: searchVal,
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );
  };

  const fetchPatientData = () => {
    dispatch(
      patientListByFacilityId({
        pageNo: pagination.pageIndex,
        facilityId,
        pageSize: pagination.pageSize,
        searchValue: searchVal,
        patientId: [],
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );
  };

  const fetchOrderDetailsData = () => {
    dispatch(
      orderListByFacilityId({
        pageNo: pagination.pageIndex,
        facilityId,
        pageSize: pagination.pageSize,
        searchValue: searchVal,
        patientId: [],
        orderId: [],
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );
  };
  const handleToggle = async () => {
    setStatusTitle(`Do you want to update the status to ${isActive ? "Active" : "Inactive"}`);
    setOpenDialog(true);
  };
  const handleDialogConfirm = () => {
    // Close the dialog
    setIsActive(!isActive);
    setOpenDialog(false);
  };

  useEffect(() => {
    if (value === 0) {
      fetchClientList();
    }
    if (value === 1) {
      fetchPatientData();
    }
    if (value === 2) {
      fetchOrderDetailsData();
    }
  }, [value, searchVal, pagination, sortKey, sortOrder, status]);
  const updateSearch = (value) => {
    setSearchVal(value);
  };
  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
  };

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(open);
  };

  return (
    <>
      <Box className="content__wrapper">
        {openDrawer && (
          <LabDetailsDrawer
            isOpen={openDrawer}
            toggleDrawer={toggleDrawer}
            type={"facility"}
            facilitiesById={facilitiesById}
          />
        )}
        <Paper elevation={2} className="header__wrapper--content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={tenant?.tenantLogo} />
              </Typography>
              <Typography component="h5" variant="h5">
                {facilitiesById?.facilityName}
                <Stack spacing={2}>
                  <Breadcrumbs aria-label="breadcrumb" className="breadcrumb__wrapper">
                    <Link href={"/facilities"}>Facilities</Link>
                    <Typography key="2">Facilities Details</Typography>
                  </Breadcrumbs>
                </Stack>
              </Typography>
            </Typography>
            <Stack direction="row" gap={2} className="header__wrapper--actions">
              {Facility && Facility?.updateInd === true && (
                <Button className="bordered-icon-btn edit" onClick={openEditModal}>
                  <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                </Button>
              )}
            </Stack>
          </Typography>
          <Divider className="w-100" />
          <Typography component="div" variant="div" className="header__wrapper--bottom">
            <List>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                  Email
                </ListItemIcon>
                <ListItemText>{facilitiesById?.emailAddress}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                  Phone Number
                </ListItemIcon>
                {facilitiesById?.alternativePhoneNumber ? (
                  <ListItemText>
                    {facilitiesById?.phoneNumber} | {facilitiesById?.alternativePhoneNumber}
                  </ListItemText>
                ) : (
                  <ListItemText>{facilitiesById?.phoneNumber}</ListItemText>
                )}
              </ListItem>
              <ListItem>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                  className="breadcrumb__wrapper"
                >
                  {Facility && Facility?.readInd === true && (
                    <Link key="1" onClick={() => setOpenDrawer(true)} className="view-details__right-drawer">
                      View Details
                      <Typography
                        component="span"
                        variant="span"
                        className="ls-viewDetails-arrow primaryIcon ms-1"
                      ></Typography>
                    </Link>
                  )}
                </Breadcrumbs>
              </ListItem>
            </List>
            <Stack direction="row" spacing={1} alignItems="center" className="switch-status">
              <>
                <Typography component="label" className="switch theme-switch" for="checkbox">
                  <input type="checkbox" id="checkbox" checked={!isActive} onClick={handleToggle} />
                  <Typography component="div" className="slider round"></Typography>
                </Typography>
                <Typography>{isActive ? "Inactive" : "Active"}</Typography>
              </>
            </Stack>
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <Box className="tab__wrapper parent-tab">
                <Tabs value={value} onChange={handleChange} aria-label="Tenant Details Tab" className="tabs_sections">
                  <Tab label="Client Details" {...a11yProps(0)} />
                  <Tab label="Patient Details" {...a11yProps(1)} />
                  <Tab label="Order Details" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <FacilitiesChildOrderTab
                  updateSearch={updateSearch}
                  updatePagination={updatePagination}
                  updateSort={updateSort}
                  setStatus={setStatus}
                  pagination={pagination}
                  sortOrder={sortOrder}
                  sortKey={sortKey}
                  facilityId={facilityId}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <FacilitiespatientDetailsTable
                  updateSearch={updateSearch}
                  updatePagination={updatePagination}
                  updateSort={updateSort}
                  dataType="lab"
                  pagination={pagination}
                  sortOrder={sortOrder}
                  sortKey={sortKey}
                  facilityId={facilityId}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <FacilitiesOrderDetailsTable
                  updateSearch={updateSearch}
                  updatePagination={updatePagination}
                  updateSort={updateSort}
                  dataType="lab"
                  pagination={pagination}
                  sortOrder={sortOrder}
                  sortKey={sortKey}
                  facilityId={facilityId}
                />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <AddNewFacilities
          updateFormValue={editedFacility}
          setOpen={setOpen}
          open={open}
          callType={CALLTYPES.Add}
          title="AddNew"
        />
      )}
      {isEditing && (
        <AddNewFacilities
          isEditing={isEditing}
          open={isEditing}
          setOpen={setIsEditing}
          updateFormValue={editedFacility}
          callType={CALLTYPES.Edit}
          title="AddNew"
        />
      )}
      {openDialog && (
        <UpdateStatusDialog
          open={openDialog}
          setOpen={setOpenDialog}
          handleStatusUpdate={handleDialogConfirm}
          isActive={UpdateStatusDialog}
          title={statusTitle}
          onClick={handleToggle}
          status={facilitiesById?.status?.statusId}
          id={facilitiesById?.facilityId}
          call="facility"
          setShowActiveSuccessPopup={setShowActiveSuccessPopup}
          showActiveSuccessPopup={showActiveSuccessPopup}
          setSuccessMessage={setSuccessMessage}
        />
      )}
      {showActiveSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setOpenDialog(false);
            setShowActiveSuccessPopup(false);
            window.location.reload();
          }}
          successMessage={successMessage}
          call="facility"
        />
      )}
    </>
  );
}
