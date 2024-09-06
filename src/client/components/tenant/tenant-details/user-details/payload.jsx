import { getLoggedInUserRoleId } from "../../../../utils/common";

export const initialPayload = (userId) => {
  const payload = {
    pagination: {
      pageNo: 0,
      pageSize: 10
    },
    sortKey: "lastModifiedDate",
    sortOrder: "DESC",
    searchValue: "",
    statusId: [],
    tenantId: "",
    role: getLoggedInUserRoleId(),
    startDate: "",
    endDate: ""
  };

  if (userId) {
    payload.userId = [userId];
  }

  return payload;
};
