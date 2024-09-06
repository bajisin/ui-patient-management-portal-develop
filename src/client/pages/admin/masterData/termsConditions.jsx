import * as React from "react";

import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";

import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import pdf from "@assets/images/ls_svg/patient-management/pdf.svg";

export default function TermsCondition() {
  return (
    <Box className="formcontrol__wrapper">
      <Grid container spacing={1} className="pdf__wrapper">
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Card className="mini__card position-relative">
            <CardContent className="dflex align-items-center">
              <Typography component="div" variant="div" className="dflex">
                <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                <Typography component="label" variant="label">
                  Unilab terms and conditions.pdf
                  <br />
                  <Typography component="span" variant="span">
                    Thursday 10/02/2023 60mb
                  </Typography>
                </Typography>
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete">
                  <VisibilityOutlinedIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <SaveAltOutlinedIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
