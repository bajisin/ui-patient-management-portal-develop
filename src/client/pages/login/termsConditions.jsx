import { Box, Button, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { acceptTerms } from "../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserRoleId } from "../../utils/common";
import { roleIds } from "../../_helpers/constants";

function TermsConditions({ openTermsCondition, setOpenTermsCondition }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedinId = getLoggedInUserRoleId();
  const handleOpen = () => {
    dispatch(
      acceptTerms({
        userEmail: sessionStorage.getItem("userDetails")
          ? JSON.parse(sessionStorage.getItem("userDetails"))?.email
          : "",
        termsAccepted: true
      })
    );
    if (loggedinId === roleIds.SUPER_ADMIN) {
      navigate("/dashboard");
    } else if (loggedinId === roleIds.TENANT_ADMIN) {
      navigate("/tenantDashboard");
    } else if (loggedinId === roleIds.CLIENT_ADMIN) {
      navigate("/clientDashboard");
    } else if (loggedinId === roleIds.PROVIDER) {
      navigate("/providerDashboard");
    } else if (loggedinId === roleIds.PATIENT) {
      navigate("/home");
    }
  };

  // const handleClose = () => {
  //   setOpenTermsCondition(false);
  // };
  const tntTermsPdfPath = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantAbtUsPlcyAndTrmsCondsResponseDTO
    ?.termsCondsFilePath;
  return (
    <Dialog
      aria-labelledby="Terms Conditions"
      open={openTermsCondition}
      enableResize={true}
      className="commonModal__wrapper terms-conditions-dailog"
    >
      <Box className="commonModal__wrapper--dialog terms-conditions-dailog-box">
        <DialogTitle>
          Terms and Conditions
          {/* <IconButton aria-label="close" onClick={handleClose} className="modalClose">
             <CloseIcon />
          </IconButton> */}
        </DialogTitle>
        {/* <DialogContent>
          <Typography variant="h5" component="h5" className="subtitle_terms_condition">
            Last updated: June 23, 2023
          </Typography>
          <Typography variant="h5" component="h5" className="terms_conditions">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Id volutpat lacus laoreet non curabitur gravida. Enim blandit volutpat maecenas
            volutpat blandit. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu dictum varius
            duis at consectetur lorem. Maecenas pharetra convallis posuere morbi leo urna. Mauris nunc congue nisi vitae
            suscipit tellus mauris a. Euismod quis viverra nibh cras pulvinar mattis. In egestas erat imperdiet sed
            euismod nisi porta. Sit amet risus nullam eget felis eget nunc lobortis mattis.
          </Typography>
          <Typography variant="h5" component="h5" className="terms_conditions">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Id volutpat lacus laoreet non curabitur gravida. Enim blandit volutpat maecenas
            volutpat blandit. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu dictum varius
            duis at consectetur lorem. Maecenas pharetra convallis posuere morbi leo urna. Mauris nunc congue nisi vitae
            suscipit tellus mauris a. Euismod quis viverra nibh cras pulvinar mattis. In egestas erat imperdiet sed
            euismod nisi porta. Sit amet risus nullam eget felis eget nunc lobortis mattis.
          </Typography>
          <Typography variant="h5" component="h5" className="terms_conditions">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Id volutpat lacus laoreet non curabitur gravida. Enim blandit volutpat maecenas
            volutpat blandit. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu dictum varius
            duis at consectetur lorem. Maecenas pharetra convallis posuere morbi leo urna. Mauris nunc congue nisi vitae
            suscipit tellus mauris a. Euismod quis viverra nibh cras pulvinar mattis. In egestas erat imperdiet sed
            euismod nisi porta. Sit amet risus nullam eget felis eget nunc lobortis mattis.
          </Typography>
        </DialogContent> */}
        <DialogContent>
          <iframe className="iframe-element" src={tntTermsPdfPath}></iframe>
        </DialogContent>

        <DialogActions>
          <Button autoFocus type="submit" className="primary-btn" onClick={handleOpen}>
            Accept
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default TermsConditions;
