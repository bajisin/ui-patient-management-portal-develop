import { Box, Button, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Master } from "../../_helpers/constants";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { TermsAndCondFileUpload } from "./terms-and-conditions-upload";
import noData from "@assets/images/svg/noDataFound.svg";
import { useSelector } from "react-redux";

export default function TermsCondition() {
  const { aboutUsData: data, status } = useSelector((state) => state.masterData);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (status === "loaded") {
      setFileName(data?.termsCondsFileName);
      setFilePath(data?.termsCondsFilePath);
    }
  }, [status]);

  const handleFileDownload = () => {
    const url = filePath; // Replace with the actual file URL
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName; // Set the desired filename for download
    link.click();
  };

  return (
    <>
      <Box className="list__header p-3">
        <Typography component="h5" variant="h5">
          Update Terms & Conditions
        </Typography>
        <Stack direction="row" gap={2} className="header__wrapper--actions">
          {fileName && Master?.updateInd === true && (
            <Button className="bordered-icon-btn edit" onClick={() => setOpen(true)}>
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
          )}
          {!fileName && (
            <Button className="primary-outline-btn" onClick={() => setOpen(true)}>
              Upload
            </Button>
          )}
        </Stack>
      </Box>
      <Box className="formcontrol__wrapper px-2 pb-3">
        <Grid container spacing={1} className="pdf__wrapper m-0">
          {fileName ? (
            <>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="mini__card position-relative">
                  <CardContent className="dflex align-items-center">
                    <Typography component="div" variant="div" className="dflex">
                      <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                      <Typography component="label" variant="label">
                        {fileName}
                        <br />
                        <Typography component="span" variant="span"></Typography>
                      </Typography>
                    </Typography>
                    <Stack direction="row" spacing={1} className="pdfButton__wrapper">
                      <IconButton aria-label="delete">
                        <SaveAltOutlinedIcon onClick={handleFileDownload} />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <iframe src={filePath} title="PDF Preview" width="800" height="600" />
                </Card>
              </Grid>
            </>
          ) : (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box className="noDataAvailable">
                <img src={noData} alt="No Data Available" className="mt-3" />
                <Typography component="h4" variant="h4" className="my-3">
                  No Data Available
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      {open && <TermsAndCondFileUpload open={open} setOpen={setOpen} />}
    </>
  );
}
