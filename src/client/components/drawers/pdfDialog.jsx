import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { DialogContent, Grid, Card, Typography } from "@mui/material";

const PdfDialog = (props) => {
  const { open, url, handleClose } = props;
  return (
    <>
      <Dialog aria-labelledby="Add Tenants" open={open} enableResize={true} className="commonModal__wrapper">
        <DialogTitle>
          {"File Preview"}
          <IconButton aria-label="close" className="modalClose" onClick={handleClose}>
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Grid>
            <Card>
              <iframe src={url} title="PDF Preview" width="800" height="600" />
            </Card>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PdfDialog;
