import { Box, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";

// function AboutUs({ openAboutUs, setOpenAboutUs }) {
//   //   const handleClose = () => {
//   //     setOpenAboutUs(false);
//   //   };
//   const storedData = JSON.parse(sessionStorage.getItem("tntAssetDetails"));
//   function stripHtmlTags(html) {
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;

//     // Remove <h1> tags
//     const h1Tags = tempDiv.getElementsByTagName("h1");
//     for (let i = h1Tags.length - 1; i >= 0; i--) {
//       h1Tags[i].parentNode.removeChild(h1Tags[i]);
//     }

//     // Remove <br> tags
//     const brTags = tempDiv.getElementsByTagName("br");
//     for (let i = brTags.length - 1; i >= 0; i--) {
//       brTags[i].parentNode.removeChild(brTags[i]);
//     }

//     return tempDiv.textContent || tempDiv.innerText || "";
//   }

//   const cleanData = {
//     ...storedData,
//     tenantAbtUsPlcyAndTrmsCondsResponseDTO: {
//       ...storedData.tenantAbtUsPlcyAndTrmsCondsResponseDTO,
//       abtUsdiscription: stripHtmlTags(storedData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.abtUsdiscription),
//       pvtPlcydiscription: stripHtmlTags(storedData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.pvtPlcydiscription)
//     }
//   };
//   return (
//     <Dialog
//       aria-labelledby="Terms Conditions"
//       open={openAboutUs}
//       enableResize={true}
//       className="commonModal__wrapper terms-conditions-dailog"
//     >
//       <Box className="commonModal__wrapper--dialog terms-conditions-dailog-box">
//         <DialogTitle>
//           {storedData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.aboutUs}
//           {/* <IconButton aria-label="close" onClick={handleClose} className="modalClose">
//              <CloseIcon />
//           </IconButton> */}
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="h5" component="h5" className="subtitle_terms_condition">
//             {storedData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.abtUsdiscription}
//           </Typography>
//           <Typography variant="h5" component="h5" className="terms_conditions">
//             {storedData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.abtUsdiscription}
//           </Typography>
//           {/* <Typography variant="h5" component="h5" className="terms_conditions">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//             dolore magna aliqua. Id volutpat lacus laoreet non curabitur gravida. Enim blandit volutpat maecenas
//             volutpat blandit. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu dictum varius
//             duis at consectetur lorem. Maecenas pharetra convallis posuere morbi leo urna. Mauris nunc congue nisi vitae
//             suscipit tellus mauris a. Euismod quis viverra nibh cras pulvinar mattis. In egestas erat imperdiet sed
//             euismod nisi porta. Sit amet risus nullam eget felis eget nunc lobortis mattis.
//           </Typography>
//           <Typography variant="h5" component="h5" className="terms_conditions">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
//             dolore magna aliqua. Id volutpat lacus laoreet non curabitur gravida. Enim blandit volutpat maecenas
//             volutpat blandit. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Arcu dictum varius
//             duis at consectetur lorem. Maecenas pharetra convallis posuere morbi leo urna. Mauris nunc congue nisi vitae
//             suscipit tellus mauris a. Euismod quis viverra nibh cras pulvinar mattis. In egestas erat imperdiet sed
//             euismod nisi porta. Sit amet risus nullam eget felis eget nunc lobortis mattis.
//           </Typography> */}
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus type="submit" className="primary-btn">
//             Accept
//           </Button>
//         </DialogActions>
//       </Box>
//     </Dialog>
//   );
// }

// export default AboutUs;
// ... (import statements and other code) ...

function AboutUs({ openAboutUs, setOpenAboutUs }) {
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
    setOpenAboutUs(false); // Set openAboutUs to false to close the dialog
  };
  return (
    <Dialog
      aria-labelledby="Terms Conditions"
      open={openAboutUs}
      enableResize={true}
      className="commonModal__wrapper terms-conditions-dailog"
    >
      <Box className="commonModal__wrapper--dialog terms-conditions-dailog-box">
        <DialogTitle>About Us</DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} className="modalClose" data-cy="closeIcon">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <DialogContent>
          <Typography variant="h5" component="h5" className="subtitle_terms_condition">
            {cleanData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.aboutUs}
          </Typography>
          {/* <Typography variant="h5" component="h5" className="terms_conditions">
            {cleanData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.abtUsdiscription}
          </Typography> */}
          <div
            dangerouslySetInnerHTML={{ __html: cleanData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.abtUsdiscription }}
          ></div>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default AboutUs;
