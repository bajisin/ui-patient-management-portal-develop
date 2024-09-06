import React, { useEffect } from "react";
import CommonGroupTable from "./common/common-table-component";
import { useDispatch } from "react-redux";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";

export default function ContainerDescriptionTab() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientsByGroupId("Container Description"));
  }, []);
  return (
    <>
      <CommonGroupTable title="Container Description" />
    </>
  );
}
