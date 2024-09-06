import React, { useEffect } from "react";

import { COMMON_MASTER_DATA_APIS } from "../../../../config/api-config";
import CommonGroupTable from "./common/common-table-component";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

export default function FacilityTypeTab({ tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.facilityList()));
  }, []);
  return (
    <>
      <CommonGroupTable
        title="Facility Type"
        apis={[
          COMMON_MASTER_DATA_APIS.facilitySave(),
          COMMON_MASTER_DATA_APIS.facilitySaveAll(),
          COMMON_MASTER_DATA_APIS.facilityDelete(),
          COMMON_MASTER_DATA_APIS.facilityList()
        ]}
        tabName={tabName}
      />
    </>
  );
}
