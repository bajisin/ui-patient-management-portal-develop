import { Box, Chip, Modal, Typography } from "@mui/material";
import React, { useRef } from "react";

import BarcodeScan from "../tenant-admin/PatientManagement/create-order/barcodeScanner";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ReactToPrint from "react-to-print";
import dayjs from "dayjs";

const Label = ({ open, close, orderDetailsById }) => {
  let componentRef = useRef();

  // const individual = orderDetailsById?.individual && orderDetailsById?.individual?.map((s) => s?.specimenFrozen);
  // const panel =
  //   orderDetailsById?.panel &&
  //   orderDetailsById?.panel?.flatMap((panel) => panel?.panelTest?.map((test) => test?.specimenFrozen));
  // const allSpecimenFrozenStatuses = [...panel, ...individual];

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
      }}
      aria-describedby="modal-modal-description"
    >
      <Box className="success_modal">
        <Typography component="div" variant="div" className="modalDialogSm">
          <IconButton
            aria-label="close"
            className="modalClose"
            onClick={() => {
              close(false);
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-description" className="modal-modal-description barcodeLabel">
            <Box className="w-100 d-flex align-items-center justify-content-between barCodeModal">
              <Typography component="div" className="text-start">
                <Typography component="label" className="printLabelText">
                  {orderDetailsById?.firstName} {orderDetailsById?.lastName}
                </Typography>
                <Typography component="h5">{dayjs(orderDetailsById?.birthDate).format("MM/DD/YYYY")}</Typography>
                {/* <Typography component="h5">{allSpecimenFrozenStatuses.includes(true) ? "Frozen" : ""}</Typography> */}
              </Typography>
              <Typography component="div" className="text-end">
                <Typography component="label">
                  <Chip
                    className="chip__btn chip__btn--grey float-end"
                    label={orderDetailsById?.orderPriorityDto?.orderPriorityDescription === "Routine" ? "R" : "S"}
                  />
                </Typography>
                <Typography component="h5">
                  {orderDetailsById?.panel?.length > 0 ? orderDetailsById?.panel[0]?.panelName : ""}
                </Typography>
                <Typography component="h5">
                  {orderDetailsById && orderDetailsById?.collectionTime?.length > 0
                    ? dayjs(orderDetailsById?.collectionTime).format("MM-DD-YYYY")
                    : ""}
                </Typography>
                <Typography component="h6">Client ID</Typography>
              </Typography>
            </Box>
            <BarcodeScan id={orderDetailsById?.orderId} />
          </Typography>
          <ReactToPrint
            trigger={() => (
              <button type="submit" className="primary-btn">
                Print File{" "}
              </button>
            )}
            content={() => componentRef}
          />
          <div style={{ display: "none" }}>
            <ComponentToPrint orderDetailsById={orderDetailsById} ref={(el) => (componentRef = el)} />
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default Label;

class ComponentToPrint extends React.Component {
  render() {
    const { orderDetailsById } = this.props;
    return (
      <Typography component="div" variant="div" className="modalDialogSm p-1 printable-label-wrapper">
        <style>
          {`
          @media print {
            @page {
              size: 50mm 20mm;
              margin: 1mm;
            }
          }
        `}
        </style>
        <Typography id="modal-modal-description" className="modal-modal-description barcodeLabel m-0 text-center">
          <Box className="w-100 d-flex align-items-center justify-content-between">
            <Typography component="div" className="text-start barcodeLabel--left">
              <Typography component="label" className="printLabelText">
                {orderDetailsById?.firstName} {orderDetailsById?.lastName}
              </Typography>
              <Typography component="h5">{dayjs(orderDetailsById?.birthDate).format("MM/DD/YYYY")}</Typography>
            </Typography>
            <Typography component="div" className="text-end barcodeLabel--right">
              <Chip
                className="chip__btn chip__btn--grey"
                label={orderDetailsById?.orderPriorityDto?.orderPriorityDescription === "Routine" ? "R" : "S"}
              />
              {/* <Typography component="h5">
                {orderDetailsById?.panel?.length > 0 ? orderDetailsById?.panel[0]?.panelName : ""}
              </Typography> */}
              <Typography component="h5">
                {orderDetailsById?.collectionTime?.length > 0
                  ? dayjs(orderDetailsById?.collectionTime).format("MM/DD/YYYY HH:MM A")
                  : ""}
              </Typography>
              {/* <Typography component="h6">Client ID</Typography> */}
            </Typography>
          </Box>
          <BarcodeScan id={orderDetailsById?.orderId} />
        </Typography>
      </Typography>
    );
  }
}
