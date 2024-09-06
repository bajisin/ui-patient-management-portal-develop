import { Box, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";

function Policy({ openPolicy, setOpenPolicy }) {
  const storedData = JSON.parse(sessionStorage.getItem("tntAssetDetails"));

  const cleanData = {
    ...storedData,
    tenantAbtUsPlcyAndTrmsCondsResponseDTO: {
      ...storedData?.tenantAbtUsPlcyAndTrmsCondsResponseDTO,
      abtUsdiscription: storedData?.tenantAbtUsPlcyAndTrmsCondsResponseDTO?.abtUsdiscription,
      pvtPlcydiscription: storedData?.tenantAbtUsPlcyAndTrmsCondsResponseDTO?.pvtPlcydiscription
    }
  };

  const handleClose = () => {
    setOpenPolicy(false); // Set openAboutUs to false to close the dialog
  };
  return (
    <Dialog
      aria-labelledby="Terms Conditions"
      open={openPolicy}
      enableResize={true}
      className="commonModal__wrapper terms-conditions-dailog"
    >
      <Box className="commonModal__wrapper--dialog terms-conditions-dailog-box">
        <DialogTitle>Privacy Policy</DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <DialogContent>
          <Typography variant="h5" component="h5" className="subtitle_terms_condition">
            {cleanData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.pvtPlcy}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.pvtPlcydiscription }}
          ></div>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default Policy;
