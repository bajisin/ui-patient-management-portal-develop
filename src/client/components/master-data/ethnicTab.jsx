import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function EthnicTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.ethinicList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Ethnic Group"
        apis={[
          COMMON_MASTER_DATA_APIS.ethnicSave(),
          COMMON_MASTER_DATA_APIS.ethnicSaveAll(),
          COMMON_MASTER_DATA_APIS.ethnicDelete(),
          COMMON_MASTER_DATA_APIS.ethinicList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
