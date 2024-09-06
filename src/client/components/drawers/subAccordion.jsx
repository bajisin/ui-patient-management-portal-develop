import * as React from "react";

import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import PdfDialog from "@components/drawers/pdfDialog";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

export default function SubAccordion({ panel1, indTest, orderDocs }) {
  const [expanded, setExpanded] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [filePath, setFilePath] = React.useState();
  const handleaccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleClose = () => {
    setPreview(false);
  };
  const handleFilePreview = (doc) => {
    setPreview(true);
    setFilePath(doc?.docURL);
  };
  const handleFileDownload = (doc) => {
    const url = doc?.docURL; // Replace with the actual file URL
    const link = document.createElement("a");
    link.href = url;
    link.download = doc?.fileName; // Set the desired filename for download
    link.target = "_blank";
    link.click();
  };
  return (
    <>
      <AccordionDetails className="basic__drawer--header p-0">
        <Box className="accordion__wrapper mt-3">
          {panel1?.map((panel) => (
            <>
            {panel?.length > 0 &&
              <Accordion expanded={expanded === "subpanel1"} onChange={handleaccordionChange("subpanel1")}>
                <AccordionSummary
                  expandIcon={
                    <Typography
                      variant="span"
                      component="span"
                      className="ls-rightarrow ls-outlined-down-arrow"
                    ></Typography>
                  }
                  aria-controls="subpanel1bh-content"
                  id="subpanel1bh-header"
                >
                  <Typography>{panel?.map((pane) => pane?.panelName)}</Typography>
                </AccordionSummary>

                {panel?.length > 0 &&
                <AccordionDetails className="basic__drawer--header">
                  <Box className="test-performed">
                    <Typography component="h6" variant="h6" className="underlined-title mt-2">
                      Tests Performed
                    </Typography>
                    <ol>
                      {panel?.map((panetes) =>
                        panetes?.panelTest?.map((test, i) => <li key={i}>{test?.testDescription}</li>)
                      )}
                    </ol>
                  </Box>
                </AccordionDetails>
                 }
              </Accordion>
            }
            </>
          ))}
          {indTest && (
            <Accordion expanded={expanded === "subpanel4"} onChange={handleaccordionChange("subpanel4")}>
              <AccordionSummary
                expandIcon={
                  <Typography
                    variant="span"
                    component="span"
                    className="ls-rightarrow ls-outlined-down-arrow"
                  ></Typography>
                }
                aria-controls="subpanel4bh-content"
                id="subpanel4bh-header"
              >
                <Typography>Individual Tests</Typography>
              </AccordionSummary>
              <AccordionDetails className="basic__drawer--header">
                <Box className="test-performed">
                  <Typography component="h6" variant="h6" className="underlined-title mt-2">
                    Tests Performed
                  </Typography>
                  <ol>
                    {indTest?.map((test, i) => test?.map((tests, i) => <li key={i}>{tests?.testDescription}</li>))}
                  </ol>
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
          <Grid container rowSpacing={2} columnSpacing={2} className="pdf__wrapper">
            {orderDocs?.drivingIdProof && (
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="mini__card position-relative">
                  <>
                    <CardContent>
                      <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                      <Typography component="label" variant="label">
                        {orderDocs?.drivingIdProof?.fileName}
                        <br />
                      </Typography>
                    </CardContent>
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="delete">
                        <VisibilityOutlinedIcon
                          className="viewIcon"
                          onClick={() => handleFilePreview(orderDocs?.drivingIdProof)}
                        />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <SaveAltOutlinedIcon
                          className="downloadIcon"
                          onClick={() => handleFileDownload(orderDocs?.drivingIdProof)}
                        />
                      </IconButton>
                    </Stack>
                  </>
                </Card>
              </Grid>
            )}
            {orderDocs?.insuranceIdProof && (
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="mini__card position-relative">
                  <>
                    <CardContent>
                      <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                      <Typography component="label" variant="label">
                        {orderDocs?.insuranceIdProof?.fileName}
                        <br />
                      </Typography>
                    </CardContent>
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="delete">
                        <VisibilityOutlinedIcon
                          className="viewIcon"
                          onClick={() => handleFilePreview(orderDocs?.insuranceIdProof)}
                        />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <SaveAltOutlinedIcon
                          className="downloadIcon"
                          onClick={() => handleFileDownload(orderDocs?.insuranceIdProof)}
                        />
                      </IconButton>
                    </Stack>
                  </>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </AccordionDetails>
      {preview && <PdfDialog open={open} url={filePath} handleClose={handleClose} />}
    </>
  );
}
