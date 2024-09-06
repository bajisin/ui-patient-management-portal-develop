import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function WorkGroupTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.workList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Work Group"
        apis={[
          COMMON_MASTER_DATA_APIS.workSave(),
          COMMON_MASTER_DATA_APIS.workSaveAll(),
          COMMON_MASTER_DATA_APIS.workDelete(),
          COMMON_MASTER_DATA_APIS.workList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
