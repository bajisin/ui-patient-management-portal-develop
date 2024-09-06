import React, { useEffect } from "react";
import CommonGroupTable from "./common/common-table-component";
import { useDispatch } from "react-redux";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";

export default function PerformingDepartmentTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.departmentList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Performing Department"
        apis={[
          COMMON_MASTER_DATA_APIS.departmentSave(),
          COMMON_MASTER_DATA_APIS.departmentSaveAll(),
          COMMON_MASTER_DATA_APIS.departmentDelete(),
          COMMON_MASTER_DATA_APIS.departmentList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
