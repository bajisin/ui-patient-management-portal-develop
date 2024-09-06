import React from "react";

const PatientTable = ({ data, close }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td className="columnsSpacing">
            <table>
              <thead>
                <tr>
                  <th>Content</th>
                  <th>Section</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{value?.value}</td>
                  </tr>
                ))}
                {/* {Object.entries(data).map(([key, value], index) => {
                  if (value?.value === "selected") {
                    return (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{value?.value}</td>
                      </tr>
                    );
                  }
                  return null; // If not selected, return null to skip rendering
                })} */}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PatientTable;
