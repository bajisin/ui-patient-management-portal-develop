// import * as React ,{useMemo}from "react";

import { Box, Button, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";

import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import lifescanLogo from "@assets/images/ls_svg/Lifescan_Logo.svg";
import { statusIds } from "../../../_helpers/constants";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1)
}));

const GridList = ({ filteredData }) => {
  const statusCell = (value, statusDescription) => {
    if (value === statusIds.IN_PROGRESS)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.DRAFT)
      return <Chip className="chip__btn chip__btn--orange" label={statusDescription} />;
    else if (value === statusIds.ON_HOLD)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.COMPLETED)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.CANCELLED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
    else if (value === statusIds.COMPLETED_IN_PROGRESS_ORDER)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.COMPLETED_CORRECTED_ORDER)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.REJECTED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
    else if (value === statusIds.IN_ACTIVE)
      return <Chip className="chip__btn chip__btn--yellow" label={statusDescription} />;
    else if (value === statusIds.ACTIVE)
      return <Chip className="chip__btn chip__btn--green" label={statusDescription} />;
    else if (value === statusIds.ERRORED)
      return <Chip className="chip__btn chip__btn--red" label={statusDescription} />;
  };
  const filteredOrders = useMemo(() => {
    if (!filteredData) return [];
    return filteredData.filter((order) => order.statusDescription !== "Draft");
  }, [filteredData]);

  return (
    <>
      <Box className="w-100">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
          {filteredOrders?.map((o, i) => {
            return (
              <Grid key={i} item lg={4} md={6} sm={6} xs={12}>
                <Item className="gridList__wrapper--card">
                  <Box className="basic__drawer--header">
                    <Typography component="div" variant="div" className="gridList__header">
                      <img src={lifescanLogo} alt="Logo" className="logo" />
                      {statusCell(o?.statusId, o?.statusDescription)}
                      <Stack direction="row" spacing={1} className="mt-1">
                        <Typography component="p" variant="p">
                          Order Date
                          <Typography component="span" variant="span">
                            11/2/2023
                          </Typography>
                        </Typography>
                      </Stack>
                    </Typography>
                    <Typography component="div" variant="div" className="test-performed mt-2">
                      <Typography component="h6" variant="h6" className="title mb-2">
                        Test Name
                      </Typography>
                      Albumin
                    </Typography>
                  </Box>
                  {o?.statusId === statusIds.COMPLETED ? (
                    <Button component="button" variant="text" className="downloadBtn-text float-end">
                      <SaveAltOutlinedIcon />
                      Download Reports
                    </Button>
                  ) : (
                    <div className="float-end">{"-"}</div>
                  )}
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default GridList;
