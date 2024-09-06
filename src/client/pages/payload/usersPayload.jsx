import { getLoggedInUserRoleId, getTenantId, paginationPayload, getLoggedInUserId } from "@utils/common";

export const TenantUserDataPayload = ({ pagination, sortOrder, sortKey, searchVal, tenantId, roles }) => {
  // dispatch an action for getusertenants
  return {
    ...paginationPayload({ sortOrder, sortKey, searchVal }),
    tenantId,
    roleId: roles,
    role: getLoggedInUserRoleId()
  };
};
export const orderDetailsPayload = ({
  pagination,
  sortOrder,
  sortKey,
  searchVal,
  searchKeys,
  selectedOrderType,
  selectedPriorityType,
  startDate,
  endDate,
  status,
  mergedStatus,
  priorityType,
  orderType,
  recurring,
  patientId
}) => {
  let filteredPriority = [];
  let filteredOrderType = [];
  if (typeof selectedPriorityType === "object" || typeof selectedOrderType === "object") {
    // eslint-disable-next-line no-const-assign
    filteredPriority = selectedPriorityType?.map((t) => t?.id);
    filteredOrderType = selectedOrderType?.map((t) => t?.id);
  }
  // dispatch an action for getusertenants
  return {
    ...paginationPayload({ pagination, sortOrder, sortKey, searchVal }),
    searchKeys,
    sortBy: "",
    orderStatus: status || mergedStatus,
    orderType: filteredOrderType?.length > 0 ? filteredOrderType : orderType || selectedOrderType,
    priorityType: filteredPriority?.length > 0 ? filteredPriority : priorityType || selectedPriorityType,
    roleId: getLoggedInUserRoleId(),
    startDate,
    endDate,
    isRecurringOrder: recurring,
    tenantId: getTenantId(),
    userId: getLoggedInUserId(),
    patientId
  };
};
