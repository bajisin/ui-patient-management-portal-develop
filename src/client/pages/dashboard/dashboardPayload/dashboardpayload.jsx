import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getTenants } from "../../../redux/slices/tenantsSlice";
import { paginationPayload } from "@utils/common";
const dispatch = useDispatch();
export const fetchgetAllTenants = ({
  pagination,
  sortKey,
  sortOrder,
  searchValue,
  status,
  tenantIds,
  tenantStatus,
  startDate,
  endDate,
  role
}) => {
  dispatch(
    getTenants({
      ...paginationPayload({ pagination, sortKey, sortOrder }),
      status: status || "All",
      searchValue: searchValue || "",
      tenantIds: tenantIds || [],
      tenantStatus: tenantStatus || [],
      startDate: (startDate && moment(startDate).format("YYYY-MM-DD")) || "",
      endDate: (endDate && moment(endDate).format("YYYY-MM-DD")) || "",
      role
    })
  );
};
