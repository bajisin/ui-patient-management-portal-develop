import { Box, Button, Card, CardContent, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FileUploadforABN } from "./fileuploadabn";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { docIds } from "../../_helpers/constants";
import { getAbn } from "@redux/slices/masterDataSlice";
import noData from "@assets/images/svg/noDataFound.svg";

export default function ABN() {
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAbn(docIds.abnuploadDoc));
        const data = response.payload;
        if (data) {
          setDate(data?.data?.creationDate);
          setFileName(data?.data?.fileName || "NA");
          setFilePath(data?.data?.filePath || "NA");
          setStatus(data?.data?.status || "NA");
          setAcceptMsg(data?.data?.abnRequiredMessage || "NA");
          setReasonForReject(data?.data?.abnNotRequiredMessage || "NA");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [reasonForReject, setReasonForReject] = useState("");
  const [acceptMsg, setAcceptMsg] = useState("");
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
          Update ABN
        </Typography>
        {/* <Typography component="h5" variant="h5">
          ABN Code Map
        </Typography> */}

        <Stack direction="row" gap={2} className="header__wrapper--actions">
          {/* {fileName && Master?.updateInd === true && ( */}
          <Button className="bordered-icon-btn edit" onClick={() => setOpen(true)}>
            <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
          </Button>
          {/* )} */}
          {!fileName && (
            <Button className="primary-outline-btn" onClick={() => setOpen(true)}>
              Upload
            </Button>
          )}
        </Stack>
      </Box>
      <Box className="formcontrol__wrapper px-2 pb-3">
        <Grid container spacing={1} className="pdf__wrapper m-0 justify-content-between align-items-center">
          {fileName ? (
            <>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="mini__card position-relative">
                  <CardContent className="d-flex align-items-center">
                    <Typography component="div" variant="div" className="dflex">
                      <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                      <Typography component="label" variant="label">
                        {fileName}
                        <br />
                        {date}
                        <Typography component="span" variant="span"></Typography>
                      </Typography>
                    </Typography>
                    {fileName !== "NA" && (
                      <Stack direction="row" spacing={1} className="pdfButton__wrapper">
                        <IconButton aria-label="delete">
                          <SaveAltOutlinedIcon onClick={handleFileDownload} />
                        </IconButton>
                      </Stack>
                    )}{" "}
                  </CardContent>
                </Card>
              </Grid>

              <Typography component="h6" className="pe-3">
                {status === "completed" ? "" : "Please check after some time."}
              </Typography>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className=" d-flex align-items-center add__label">
                  ABN Required Text
                </Typography>
                <div>
                  <textarea
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                    // maxLength={maxLength}
                    onChange={(e) => setAcceptMsg(e.target.value)}
                    value={acceptMsg}
                  ></textarea>
                  {/* {error && <p style={{ color: "red" }}>Maximum length exceeded</p>} */}
                </div>
                {/* <TextField
                  className="add__input"
                  value={"title"}
                  fullWidth
                  onChange={"updateTitle"}
                  disabled={"edit"}
                /> */}
                {/* {errorMessage && <p className="error-message">{errorMessage}</p>}
              </Grid>
              {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <iframe src={filePath} title="PDF Preview" width="800" height="600" />
                </Card>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className=" d-flex align-items-center add__label">
                  ABN is Not Required Text
                </Typography>
                <div>
                  <textarea
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                    // maxLength={maxLength}
                    onChange={(e) => setReasonForReject(e.target.value)}
                    value={reasonForReject}
                  ></textarea>
                  {/* {error && <p style={{ color: "red" }}>Maximum length exceeded</p>} */}
                </div>
                {/* <TextField
                  className="add__input"
                  value={"title"}
                  fullWidth
                  onChange={"updateTitle"}
                  disabled={"edit"}
                /> */}
                {/* {errorMessage && <p className="error-message">{errorMessage}</p>}
              </Grid>
              {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <iframe src={filePath} title="PDF Preview" width="800" height="600" />
                </Card>*/}
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
      {open && (
        <FileUploadforABN open={open} setOpen={setOpen} acceptMsg={acceptMsg} reasonForReject={reasonForReject} />
      )}
    </>
  );
}
