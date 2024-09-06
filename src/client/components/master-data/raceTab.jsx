import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function RaceTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.raceList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Race"
        apis={[
          COMMON_MASTER_DATA_APIS.raceSave(),
          COMMON_MASTER_DATA_APIS.raceSaveAll(),
          COMMON_MASTER_DATA_APIS.raceDelete(),
          COMMON_MASTER_DATA_APIS.raceList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
