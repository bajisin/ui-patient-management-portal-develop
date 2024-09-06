import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function GuarantorTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.guarantorList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Guarantor"
        relationType={1}
        apis={[
          COMMON_MASTER_DATA_APIS.guarantorSave(),
          COMMON_MASTER_DATA_APIS.guarantorSaveAll(),
          COMMON_MASTER_DATA_APIS.guarantorDelete(),
          COMMON_MASTER_DATA_APIS.guarantorList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
