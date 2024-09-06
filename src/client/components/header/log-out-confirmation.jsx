import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import React from "react";
import warningIcon from "@assets/images/svg/warningDeactivate.svg";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutDialog = ({ open, setOpen }) => {
  const { logout } = useAuth0();
  const callLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin }
    });
    sessionStorage.clear();
    localStorage.clear();
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="logout" className="logout__wrapper">
      <DialogContent>
        <img className="warningImg" src={warningIcon} />
        <Typography component="h6" variant="h6">
          Are you sure you want to sign-out of the application?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" gap={2}>
          <Button className="primary-btn" component="button" variant="contained" autoFocus onClick={() => callLogout()}>
            Yes
          </Button>
          <Button
            className="primary-outline-btn"
            component="button"
            variant="outlined"
            onClick={() => setOpen(false)}
            autoFocus
          >
            No
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
