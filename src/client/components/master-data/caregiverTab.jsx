import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function CareGiverRelationsTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.careGiverList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Caregiver"
        relationType={2}
        apis={[
          COMMON_MASTER_DATA_APIS.careGiverSave(),
          COMMON_MASTER_DATA_APIS.careGiverSaveAll(),
          COMMON_MASTER_DATA_APIS.careGiverDelete(),
          COMMON_MASTER_DATA_APIS.careGiverList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
