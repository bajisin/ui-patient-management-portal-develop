import { Box, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import Policy from "../../pages/login/privacypolicy";

const Footer = () => {
  const [isFAQOpen, setIsFAQOpen] = useState(false); // State to track FAQ component visibility
  const year = new Date().getFullYear();
  const handleClick = () => {
    setIsFAQOpen(true); // Open the FAQ component
  };

  const handleCloseFAQ = () => {
    setIsFAQOpen(false); // Close the FAQ component
  };

  return (
    <Box className="footer__wrapper">
      <Typography variant="p" component="p">
        Copyright &#169; {year} Qlear Health. All Rights Reserved.
      </Typography>
      <Stack direction="row" spacing={2} className="footer-links">
        <Link className="cursor-pointer" onClick={handleClick} underline="none">
          {"Privacy Policy"}
        </Link>
      </Stack>
      {isFAQOpen && <Policy openPolicy={isFAQOpen} setOpenPolicy={setIsFAQOpen} onClose={handleCloseFAQ} />}
    </Box>
  );
};

export default Footer;
