import { Box, Button, DialogActions, DialogContent, Grid, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CreateOrderTemplateTable from "../order-config-tab/createOrderTemplateTable";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Loader from "@utils/Loader";
import SearchComponent from "../../../search";
import { getOrderTemplateById } from "@redux/slices/ordertemplateSlice";

export default function OrderTemplateTab({ setValue, updatePagination, updateSearch }) {
  const [open, setOpen] = React.useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const handleClickOpen = (templateId) => {
    setOpen(true);
    setSelectedTemplateId(templateId);
    dispatch(
      getOrderTemplateById({
        tenantId: getTenantId(),
        roleId: getLoggedInUserRoleId(),
        orderTemplateId: templateId
      })
    );
  };
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12 // customize the default page size
  });
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  // const [rowCount, setRowCount] = useState(0);
  useEffect(() => {
    // do something when the pagination state changes
    if (pagination.pageSize !== 12) {
      setPaginationUpdated(true);
    }
    if (pagination.pageIndex > 0) {
      updatePagination(pagination);
      setPaginationUpdated(true);
    }
    if (pagenationUpdated) {
      updatePagination(pagination);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, pageIndex: newPage });
  };

  searchParams.set("templateId", selectedTemplateId);
  const updatedSearchString = searchParams.toString();
  const updatedUrl = `/order-config/order-configuration?${updatedSearchString}`;

  const handleEdit = () => {
    setOpen(false);
    navigate(updatedUrl);
    setValue(0);
  };
  const { ordertestTemplateList, ordertestTemplate, loading, totalCount } = useSelector((state) => state.orders);

  return (
    <Box className="order__template">
      {/* <Box className="table__wrapper positioned-search">
        <Box className="list__header px-3 position-relative order-report-title list__header--height">
          <Typography component="h5" variant="h5">
            {ordertestTemplateList.length} Templates found
          </Typography>
          <Box className="icons-separted">
            <SearchComponent updateSearch={updateSearch} />
          </Box>
        </Box>
      </Box> */}
      <Box className="title__wrapper mb-3">
        <Box className="list__header title__wrapper--left">
          <Typography component="h5" variant="h5" className="section_title">
            {ordertestTemplateList.length} Templates Found
          </Typography>
        </Box>
        <Box className="title__wrapper--right">
          <SearchComponent updateSearch={updateSearch} />
        </Box>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            {ordertestTemplateList.map((template) => (
              <Grid item xs={12} sm={12} md={3} lg={3} key={template.orderTemplateId}>
                <Button
                  component="button"
                  variant="contained"
                  className="template_btn"
                  onClick={() => handleClickOpen(template?.orderTemplateId)}
                >
                  {template.orderTemplateName}
                </Button>
              </Grid>
            ))}
          </Grid>
          <TablePagination
            component="div"
            count={totalCount}
            page={pagination.pageIndex}
            onPageChange={handleChangePage}
            rowsPerPage={pagination.pageSize}
          />

          {selectedTemplateId !== null && (
            <Dialog
              aria-labelledby="Order Templates"
              open={open}
              enableResize={true}
              className="commonModal__wrapper createOrder__template"
            >
              <Box className="commonModal__wrapper--dialog">
                <IconButton aria-label="close" onClick={handleClose} className="modalClose">
                  <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
                </IconButton>
                <DialogTitle className="mb-0">{ordertestTemplate?.orderTemplateName}</DialogTitle>

                <DialogContent>
                  {ordertestTemplate?.orderTemplateDetails?.length > 0 && (
                    <CreateOrderTemplateTable data={ordertestTemplate.orderTemplateDetails} />
                  )}
                </DialogContent>
                <DialogActions>
                  <Button type="submit" autoFocus className="primary-btn" onClick={() => handleEdit()}>
                    Edit
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
          )}
        </>
      )}
    </Box>
  );
}
