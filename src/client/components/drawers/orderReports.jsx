import { Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import { Order, roleIds, statusIds } from "../../_helpers/constants";

import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import OrderReportsTabComponent from "./orderReportsTab";
import React from "react";
import { getLoggedInUserRoleId } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "@utils/Loader";

const OrderReports = ({ isOpen, toggleDrawer, setIsOpenOrderDetails, loader }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    toggleDrawer(false)();
    setIsOpenOrderDetails(false);
  };

  const handleEditClick = () => {
    navigate(`/edit-order/${orderDetailsById?.patientId}/${orderDetailsById?.orderId}`);
  };

  const { orderDetailsById } = useSelector((state) => state.tenants);
  let statusChip;
  switch (orderDetailsById?.status?.statusId) {
    case statusIds.IN_PROGRESS:
      statusChip = <Chip className="chip__btn chip__btn--yellow" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.DRAFT:
      statusChip = <Chip className="chip__btn chip__btn--orange" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.ON_HOLD:
      statusChip = <Chip className="chip__btn chip__btn--red" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.COMPLETED:
      statusChip = <Chip className="chip__btn chip__btn--green" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.CANCELLED:
      statusChip = <Chip className="chip__btn chip__btn--red" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.COMPLETED_IN_PROGRESS_ORDER:
      statusChip = <Chip className="chip__btn chip__btn--yellow" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.COMPLETED_CORRECTED_ORDER:
      statusChip = <Chip className="chip__btn chip__btn--green" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.REJECTED:
      statusChip = <Chip className="chip__btn chip__btn--red" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.IN_ACTIVE:
      statusChip = <Chip className="chip__btn chip__btn--yellow" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.ACTIVE:
      statusChip = <Chip className="chip__btn chip__btn--green" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.ERRORED:
      statusChip = <Chip className="chip__btn chip__btn--red" label={orderDetailsById?.status?.statusDesc} />;
      break;
    case statusIds.YetToBeSubmitted:
      statusChip = <Chip className="chip__btn chip__btn--red" label={orderDetailsById?.status?.statusDesc} />;
      break;
    default:
      statusChip = null;
  }
  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      {loader && <Loader />}
      <Box className="basic__drawer">
        <IconButton className="close-drawer">
          <CloseIcon onClick={handleBack}></CloseIcon>
        </IconButton>
        <Typography component="div" variant="div" className="common__layout--drawer">
          <Typography component="div" variant="div" className="basic__drawer--header">
            <Box className="drawer--title orderDetailsTitle">
              <Typography component="div" variant="div" className="profilePic">
                <Typography component="h6" variant="h6">
                  {orderDetailsById?.firstName?.charAt(0)}
                  {orderDetailsById?.lastName?.charAt(0)}
                </Typography>
              </Typography>
              <Typography component="div" variant="div" className="profileData profileDataPatient">
                <Box className="d-flex align-items-center justify-content-between mb-2">
                  <Typography component="h5" variant="h5">
                    {`${orderDetailsById?.firstName} ${orderDetailsById?.lastName} `}
                  </Typography>
                  <Stack direction="row" spacing={1} className="mt-0">
                    {getLoggedInUserRoleId() !== roleIds.SUPER_ADMIN &&
                      orderDetailsById?.hl7queueIndicator === false &&
                      Order &&
                      Order?.updateInd === true && (
                        <Button
                          component="button"
                          variant="outlined"
                          className="primary-outline-btn edit-button"
                          onClick={handleEditClick}
                        >
                          Edit Order
                        </Button>
                      )}
                    {statusChip}
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Typography component="p" variant="p">
                    <Typography
                      variant="span"
                      component="span"
                      className="ls-mail secondaryIcon fs-16 me-1"
                    ></Typography>
                    Email
                    <Typography component="span" variant="span">
                      {orderDetailsById?.emailAddress}
                    </Typography>
                  </Typography>
                  <Typography component="p" variant="p">
                    {/* <Typography
                      component="span"
                      variant="span"
                      className="ls-edit secondaryIcon me-1 fs-16"
                    ></Typography> */}
                    <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                    Phone Number
                    <Typography component="span" variant="span">
                      {orderDetailsById?.phoneNumber}
                    </Typography>
                  </Typography>
                </Stack>
              </Typography>
            </Box>
          </Typography>
          <OrderReportsTabComponent
            orderDetailsById={orderDetailsById}
            testDetails={orderDetailsById?.panel}
            indTest={orderDetailsById?.individual}
            orderDocs={orderDetailsById?.orderDocument}
            insuranceDetails={orderDetailsById?.insuranceDetailsViewDTO}
          />
        </Typography>
        {orderDetailsById?.status?.statusId === statusIds.ERRORED && (
          <Typography>{`Error reason : ${orderDetailsById?.hl7StatusReasonMessage}`}</Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default OrderReports;
