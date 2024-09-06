import { getLoggedInUserRoleId, getLoggedInUserId } from "@utils/common";
// export const getOrderDetailsPayload = ({ tenantIds, startDate, endDate }) => {
//   return {
//     pageNo: 0,
//     pageSize: 5,
//     sortOrder: "DESC",
//     searchValue: "",
//     searchKeys: [],
//     sortKey: "creationDate",
//     orderStatus: [],
//     orderType: [],
//     priorityType: [],
//     roleId: getLoggedInUserRoleId(),
//     startDate,
//     endDate,
//     tenantIds
//   };
// };
export const getOrderDetailsPayload = (startDate, endDate, selectedTenants) => ({
  pageNo: 0,
  pageSize: 5,
  sortOrder: "DESC",
  searchValue: "",
  searchKeys: [],
  sortKey: "creationDate",
  orderStatus: [],
  orderType: [],
  priorityType: [],
  roleId: getLoggedInUserRoleId(), // Assuming getLoggedInUserRoleId is defined in your utils/common file
  startDate,
  endDate,
  tenantIds: selectedTenants?.map((t) => t?.tenantId),
  userId: getLoggedInUserId()
});
