import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
// import SearchComponent from "../../../components/search";
import { useDispatch } from "react-redux";
import { getTenants } from "@redux/slices/tenantsSlice";
import MasterOverviewTable from "./masterOverviewTable";
import SearchComponent from "@components/search";

const MasterData = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const dispatch = useDispatch();
  const fetchData = (data) => {
    // dispatch an action for gettenants
    dispatch(getTenants(data));
  };
  useEffect(() => {
    fetchData({ pagination, ...{ status: "All" }, sortKey, sortOrder, searchValue });
  }, [pagination, sortKey, sortOrder, searchValue]);

  const updatePagination = (paginationProp) => {
    setPagination(paginationProp);
    fetchData({ paginationProp });
  };

  const updateSearch = (val) => {
    setSearchValue(val);
  };
  const updateSort = (val) => {
    if (val[0] !== "tenantLogo") {
      setSortKey(val[0].id);
      setSortOrder(val[0].desc ? "DESC" : "ASC");
    }
  };

  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Manage Master Data <br />
            <Typography component="span" variant="span">
              Get an overview of master data
            </Typography>
          </Typography>
        </Typography>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__header px-3 pb-3 position-relative">
              <Typography component="h5" variant="h5">
                Overview
              </Typography>
              <SearchComponent updateSearch={updateSearch} />
            </Box>
            <Box className="list__view">
              <MasterOverviewTable updatePagination={updatePagination} updateSort={updateSort} />
            </Box>
            {/* <Box className="list__header px-3 pb-3">
              <Typography component="h5" variant="h5">
                Overview
              </Typography>
              <SearchComponent />
            </Box>
            <Box className="list__view">
              <MasterOverviewTable />
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MasterData;
