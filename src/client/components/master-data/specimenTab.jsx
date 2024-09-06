import React, { useEffect } from "react";
import CommonGroupTable from "./common/common-table-component";
import { useDispatch } from "react-redux";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
export default function SpecimenTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.specimenList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Specimen Type"
        apis={[
          COMMON_MASTER_DATA_APIS.specimenSave(),
          COMMON_MASTER_DATA_APIS.specimenSaveAll(),
          COMMON_MASTER_DATA_APIS.specimenDelete(),
          COMMON_MASTER_DATA_APIS.specimenList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
