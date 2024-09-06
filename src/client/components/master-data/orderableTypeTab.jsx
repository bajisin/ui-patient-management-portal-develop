import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function OrderableTypeTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.OrderableList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Orderable Type"
        apis={[
          COMMON_MASTER_DATA_APIS.OrderableSave(),
          COMMON_MASTER_DATA_APIS.OrderableSaveAll(),
          COMMON_MASTER_DATA_APIS.OrderableDelete(),
          COMMON_MASTER_DATA_APIS.OrderableList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
