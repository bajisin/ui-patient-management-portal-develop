import React, { useEffect } from "react";
import OrderGroupTable from "./order/order-table-component";
import { useDispatch } from "react-redux";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";

export default function OrderTypeTabContent({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.orderList()));
  }, []);
  return (
    <>
      <OrderGroupTable
        title="Order Type"
        apis={[
          COMMON_MASTER_DATA_APIS.orderSave(),
          COMMON_MASTER_DATA_APIS.orderSaveAll(),
          COMMON_MASTER_DATA_APIS.orderDelete(),
          COMMON_MASTER_DATA_APIS.orderList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
