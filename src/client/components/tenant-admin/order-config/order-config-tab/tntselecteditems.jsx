import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getIdvTestList, getOrderTemplateById, getPanelList, getTestList } from "@redux/slices/ordertemplateSlice";
import { getLoggedInUserRoleId, getTenantId, paginationPayload } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import CreateOrderTemplate from "./createOrderTemplate";
import { IdvTestDropDown } from "./ind-test-dropdown";
import { OrderConfigTable } from "./table";
import { PanelDropDown } from "./panel-dropdown";
import { useLocation } from "react-router-dom";

export default function Tntselecteditems({
  panels,
  tests,
  setPanels,
  setTests,
  updateSearch,
  updateSort,
  updatePagination,
  filteredData,
  setFilteredData
}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [title, setTitle] = useState("");
  const location = useLocation();
  const { search } = location;
  const templateId = search.split("=")[1];
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = dispatch(
      getTestList({
        ...paginationPayload({ pagination: { pageIndex: 0, pageSize: 99999 } }),

        roleId: 2,
        tenantId: "LIF000001",
        testIds: [],
        panelIds: [],
        testCategoryType: ""
      })
    );
    dispatch(
      getPanelList({
        ...payload.arg,

        testCategoryId: [2]
      })
    );

    dispatch(
      getIdvTestList({
        ...payload.arg,
        testCategoryId: [1]
      })
    );
  }, []);
  const { ordertestTemplate } = useSelector((state) => state.orders);

  useEffect(() => {
    if (templateId) {
      dispatch(
        getOrderTemplateById({
          tenantId: getTenantId(),
          roleId: getLoggedInUserRoleId(),
          orderTemplateId: templateId
        })
      );
    }
  }, [templateId]);

  useEffect(() => {
    if (params.size === 0) {
      setTitle("Create");
    } else {
      setTitle("Edit");
    }
  }, [params]);

  useEffect(() => {
    if (Object.keys(ordertestTemplate)?.length > 0 && ordertestTemplate?.orderTemplateDetails?.length > 0) {
      setPanels(ordertestTemplate?.orderTemplateDetails?.filter((test) => test.panelId !== 0));
      setTests(ordertestTemplate?.orderTemplateDetails?.filter((test) => test.panelId === 0));
    }
  }, [ordertestTemplate]);

  return (
    <div className="child__order_config_tab child-order-tab-selected">
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
        {/* {panels?.length > 0 && ( */}
        <Grid item xs={12} sm={12} md={6} lg={6} className="panel_test ">
          <Typography variant="label" component="label" className="add__label">
            Panel Test
          </Typography>
          <PanelDropDown setPanels={setPanels} panels={panels} />
        </Grid>
        {/* )} */}
        <Grid item xs={12} sm={12} md={6} lg={6} className="individual_test">
          <Typography variant="label" component="label" className="add__label">
            Individual Tests
          </Typography>
          <IdvTestDropDown setTests={setTests} tests={tests} />
        </Grid>
      </Grid>
      {(panels?.length > 0 || tests?.length > 0) && (
        <>
          <Box className="title__wrapper m-3">
            <Box className="title__wrapper--left">
              <Typography variant="label" component="label" className="add__label">
                Selected Tests {filteredData.length}
              </Typography>
            </Box>
            <Box className="title__wrapper--right">
              <Button
                variant="contained"
                className="primary-outline-btn"
                onClick={() => setOpen(true)}
                disabled={disable}
              >
                {title} Order Template
              </Button>
            </Box>
          </Box>
          <OrderConfigTable
            setSelectedTests={setData}
            updatePagination={updatePagination}
            updateSort={updateSort}
            updateSearch={updateSearch}
            filteredData={filteredData}
            selectedTests={data}
            disable={disable}
            setDisable={setDisable}
            setFilteredData={setFilteredData}
          />
        </>
      )}
      {open && <CreateOrderTemplate data={data} setOpen={setOpen} open={open} templateId={templateId} title={title} />}
    </div>
  );
}
