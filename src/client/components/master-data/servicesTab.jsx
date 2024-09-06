import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function FacilityTypeTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.serviceList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Services"
        apis={[
          COMMON_MASTER_DATA_APIS.serviceSave(),
          COMMON_MASTER_DATA_APIS.servicerSaveAll(),
          COMMON_MASTER_DATA_APIS.serviceDelete(),
          COMMON_MASTER_DATA_APIS.serviceList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
