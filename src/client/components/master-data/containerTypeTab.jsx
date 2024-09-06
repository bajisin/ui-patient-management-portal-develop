import React, { useEffect } from "react";
import ContainerGroupTable from "./container/container-table-component";
import { useDispatch } from "react-redux";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
export default function ContainerTypeTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.containerlistAll()));
  }, []);
  return (
    <>
      <ContainerGroupTable
        title="Container Type"
        apis={[
          COMMON_MASTER_DATA_APIS.containerSave(),
          COMMON_MASTER_DATA_APIS.containerSaveAll(),
          COMMON_MASTER_DATA_APIS.containerDelete(),
          COMMON_MASTER_DATA_APIS.containerlistAll()
        ]}
        tabName={tabName}
      />
    </>
  );
}
