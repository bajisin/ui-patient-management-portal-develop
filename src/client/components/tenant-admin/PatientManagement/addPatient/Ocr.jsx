import { Button, Modal } from "@mui/material";

import PatientTable from "./PatientTable";
import React from "react";

const Popup = ({ isOpen, onClose, data }) => {
  const modalContentStyle = {
    backgroundColor: "#fefefe",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxHeight: "80%", // Set maximum height for the content
    overflowY: "auto", // Enable vertical scroll if content exceeds maxHeight
    width: "80%"
  };
  const popupStyle = {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)" /* Black with opacity */,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isOpen && (
          <div style={popupStyle}>
            <div style={modalContentStyle}>
              <Button className="close-btn" onClick={onClose}>
                Close
              </Button>
              <h2>Test List</h2>
              <PatientTable data={data} close={onClose} isOpen={isOpen} />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Popup;
