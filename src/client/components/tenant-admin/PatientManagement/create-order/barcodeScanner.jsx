import Barcode from "react-barcode";
import React from "react";

const BarcodeScan = ({ id }) => {
  return <Barcode value={id} />;
};

export default BarcodeScan;
