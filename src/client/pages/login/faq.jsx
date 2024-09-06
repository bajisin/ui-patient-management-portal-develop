import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";

function FAQ({ openFAQ, setOpenFAQ, hadleOpenForFAQ }) {
  const handleClose = () => {
    setOpenFAQ(false);
  };
  const storedData = JSON.parse(sessionStorage.getItem("tntAssetDetails"));

  return (
    <Dialog
      aria-labelledby="Terms Conditions"
      open={openFAQ}
      enableResize={true}
      className="commonModal__wrapper terms-conditions-dailog"
    >
      <Box className="commonModal__wrapper--dialog terms-conditions-dailog-box">
        <DialogTitle>
          FAQs
          {/* {storedData.faqDetails.faqQuestion} */}
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <DialogContent>
          {storedData?.faqDetails?.map((item) => (
            <Typography variant="div" component="div" key={item.faqId} className="faq-wrapper">
              <Typography variant="h6" component="h6" className="faq-question">
                {/* {item.faqAnswer},ans */}
                {item.faqQuestion}
              </Typography>
              <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.faqAnswer }}></div>
            </Typography>
          ))}
          {/* <Typography variant="h5" component="h5" className="subtitle_terms_condition"> */}
          {/* {storedData.forEach((item) => {
              console.log("Question:", item.faqQuestion);
              console.log("Answer:", item.faqAnswer);
            })} */}
          {/* </Typography>
          <Typography variant="h5" component="h5" className="terms_conditions"> */}
          {/* {storedData.tenantAbtUsPlcyAndTrmsCondsResponseDTO.abtUsdiscription}
            fghjkl */}
          {/* </Typography> */}
          {/* <Typography variant="h5" component="h5" className="terms_conditions">
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
          </Typography> */}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus type="submit" className="primary-btn">
            Accept
          </Button>
        </DialogActions> */}
      </Box>
    </Dialog>
  );
}

export default FAQ;
