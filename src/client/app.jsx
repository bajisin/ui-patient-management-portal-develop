import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import ErrorIcon from "@mui/icons-material/Error";
import { IdleTimerProvider } from "react-idle-timer";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

// const App = () => {
//   return (
//     <>
//       {/* <ThemeProvider> */}
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//       <Routes />
//       {/* </ThemeProvider> */}
//     </>
//   );
// };
// export default App;

const App = () => {
  const [isIdle, setIsIdle] = useState(false);

  const handleOnIdle = () => {
    if(routeLcn !== ('/' || '/login')){
      callLogout()
      setIsIdle(true);
      sessionStorage.setItem("isIdle", true);
    } else {
      setIsIdle(false);
      sessionStorage.setItem("isIdle", false);
    }
  };

  const handleClosePopup = () => {
    setIsIdle(false);
  };
  const { logout } = useAuth0();
  const callLogout = () => {
    logout({
      logoutParams: { returnTo: window.location.origin }
    });
    sessionStorage.setItem("isIdle", false);
    sessionStorage.clear();
    localStorage.clear();
  };
  const events = ["mousemove", "keydown", "wheel", "touchstart","keyup"];
  const inActiveTrigger = sessionStorage.getItem("isIdle");
  // setIsIdle(sessionStorage.getItem("isIdle"));
  useEffect(() => {
    if (inActiveTrigger === 'true') {
      setIsIdle(true);
    } else {
      setIsIdle(false);
    }
  }, [])
  const routeLcn = window.location.pathname;

  return (
    <>
        <IdleTimerProvider
          // timeout={1000 * 10} // 10sec
          timeout={1000 * 60 * 30} // 30 minutes
          onIdle={handleOnIdle}
          // onActive={handleOnActive}
          // onAction={handleOnAction}
          events={events}
        >
          <>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <>
              <Routes />
            </>
          </>
        </IdleTimerProvider>
      {isIdle && inActiveTrigger === "true" && (
        <Modal
          open={isIdle}
          onClose={handleClosePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="sm-popup success_modal">
            <ErrorIcon className="deleteRedIcon" />
            <Typography id="modal-modal-description" className="modal-modal-description">
              You have been inactive for more than 30 minutes, Please login again to continue using the app
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleOnIdle}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default App;
