import { Box, Button, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FileUpload } from "./fileUpload";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { docIds } from "../../_helpers/constants";
import { getAbn } from "@redux/slices/masterDataSlice";
import noData from "@assets/images/svg/noDataFound.svg";

export default function CodeMap() {
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAbn(docIds.codeMap));
        const data = response.payload;
        setFileName(data?.data?.fileName || "NA");
        setFilePath(data?.data?.filePath || "");
        setDate(data?.data?.creationDate || "");
        setStatus(data?.data?.status || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // const handleFileDownload = () => {
  //   const url = filePath; // Replace with the actual file URL
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = fileName; // Set the desired filename for download
  //   document.body.appendChild(link); // Append the link to the document body
  //   link.click();
  //   document.body.removeChild(link); // Remove the link from the document body
  // };
  const handleFileDownload = () => {
    const url = filePath;
    const link = document.createElement("a");
    link.download = fileName;

    link.href = url;

    link.click();
  };
  return (
    <>
      <Box className="list__header p-3">
        <Typography component="h5" variant="h5">
          Update Code Map
        </Typography>
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
                  <CardContent className="dflex align-items-center">
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
              {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card>
                  <iframe src={filePath} title="PDF Preview" width="800" height="600" />
                </Card>
              </Grid> */}
              <Typography component="h6" className="pe-3">
                {status === "completed" ? "" : "Please check after some time."}
              </Typography>
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
      {open && <FileUpload open={open} setOpen={setOpen} />}
    </>
  );
}
