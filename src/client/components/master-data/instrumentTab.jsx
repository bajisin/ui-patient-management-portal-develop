import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function InstrumentTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.InstrumentList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Instrument"
        apis={[
          COMMON_MASTER_DATA_APIS.InstrumentSave(),
          COMMON_MASTER_DATA_APIS.InstrumentSaveAll(),
          COMMON_MASTER_DATA_APIS.InstrumentDelete(),
          COMMON_MASTER_DATA_APIS.InstrumentList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
