import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function ManagementgroupTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.ManagementgroupList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Management Group"
        apis={[
          COMMON_MASTER_DATA_APIS.ManagementgroupSave(),
          COMMON_MASTER_DATA_APIS.ManagementgroupSaveAll(),
          COMMON_MASTER_DATA_APIS.ManagementgroupDelete(),
          COMMON_MASTER_DATA_APIS.ManagementgroupList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
