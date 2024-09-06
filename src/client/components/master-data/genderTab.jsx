import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function GenderTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.genderList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Gender"
        apis={[
          COMMON_MASTER_DATA_APIS.genderSave(),
          COMMON_MASTER_DATA_APIS.genderSaveAll(),
          COMMON_MASTER_DATA_APIS.genderDelete(),
          COMMON_MASTER_DATA_APIS.genderList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
