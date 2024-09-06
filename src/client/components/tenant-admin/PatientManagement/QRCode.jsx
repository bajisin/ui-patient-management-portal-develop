import React from "react";
import QRCode from "react-qr-code";
import { Box, Typography, Modal } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

const QRCodeGeneration = ({ setOpenQrCode, openQRCode, path, fileName }) => {
  return (
    <Modal
      open={openQRCode}
      setOpen={setOpenQrCode}
      onClose={() => setOpenQrCode(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="success_modal">
        <Typography className="modal-buttons-wrapper"></Typography>
        <QRCode className="qrCode" value={`${window.location.origin}/${path}`} />
      </Box>
    </Modal>
  );
};
export default QRCodeGeneration;
