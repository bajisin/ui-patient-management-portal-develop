import {
  AccordionDetails,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import SearchComponent from "@components/search";
import { getICD10Codes } from "@redux/slices/order-slice";

/**
 * @author
 * @function AccordionTable
 **/

export const AccordionTable = ({
  // selectedPanels,
  selectedTests,
  setSelectedTests,
  selectedDiagnosisCodes,
  setSelectedDiagnosisCodes,
  fastingRequired,
  setFastingRequired,
  orderTestList,
  newErrors,
  displayOptions
}) => {
  const { icd10 } = useSelector((state) => state.createOrder);
  const dispatch = useDispatch();

  const [searchInputs, setSearchInputs] = useState([]);
  const { orderDetailsById } = useSelector((state) => state.tenants);
  const searchParams = new URLSearchParams(location?.search);
  const param = searchParams.get("param");

  const fomattedCodes = (diagnosticCodes, diagnosticCodeDescriptions) => {
    const diagnosticCodesArray = diagnosticCodes ? diagnosticCodes?.split(",") : [];
    const diagnosticCodeDescriptionsArray = diagnosticCodeDescriptions ? diagnosticCodeDescriptions.split(",") : [];
    return diagnosticCodesArray.map((code, index) => ({
      diagnosticCode: code,
      diagnosticDesc: diagnosticCodeDescriptionsArray[index] || ""
    }));
  };
  useEffect(() => {
    if (orderDetailsById && Object.keys(orderDetailsById).length > 0) {
      setSelectedDiagnosisCodes((prevData) => {
        return prevData.map((ele) => {
          const newData = {
            ...ele
          };
          if (ele?.panelTest?.length) {
            newData["dgnstcCodes"] = fomattedCodes(
              ele.panelTest[0].diagnosticCode,
              ele.panelTest[0].diagnosticCodeDescription
            );
          }
          if (ele?.diagnosticCode) {
            newData["dgnstcCodes"] = fomattedCodes(ele.diagnosticCode, ele.diagnosticCodeDescription);
          }
          return newData;
        });
      });
    }
  }, [orderDetailsById]);

  useEffect(() => {
    setSearchInputs(new Array(selectedTests.length).fill(""));
  }, [selectedTests]);

  // Function to update the search input for a specific row
  const updateSearch = (value, rowIndex) => {
    setSearchInputs((prevSearchInputs) => {
      const updatedSearchInputs = [...prevSearchInputs];
      updatedSearchInputs[rowIndex] = value;
      return updatedSearchInputs;
    });
    if (value) dispatch(getICD10Codes(value));
  };
  const handleDiagnosisCodeChange = (rowIndex, value) => {
    const diagnosticCode = value.split(" - ")[0];
    const diagnosticCodeDescription = value.split(" - ")[1];

    setSelectedDiagnosisCodes((prevSelectedDiagnosisCodes) => {
      // Create a copy of the current selectedDiagnosisCodes array
      const updatedSelectedDiagnosisCodes = [...prevSelectedDiagnosisCodes];

      const selectedRow = updatedSelectedDiagnosisCodes[rowIndex];
      const selectedRowStructure = selectedTests[rowIndex];
      const updatedRow = {
        ...selectedRow,
        ...selectedRowStructure,
        dgnstcCodes: [
          ...(selectedRow?.dgnstcCodes || []), // Ensure dgnstcCodes is an array
          { diagnosticCode, diagnosticDesc: diagnosticCodeDescription }
        ]
      };

      updatedSelectedDiagnosisCodes[rowIndex] = updatedRow;
      setSearchInputs("");
      // Return the updated array
      return updatedSelectedDiagnosisCodes;
    });
  };

  //  const handleDiagnosisCodeChange = (rowIndex, value) => {
  //   setSelectedDiagnosisCodes((prevSelectedDiagnosisCodes) => {
  //     const updatedSelectedDiagnosisCodes = [...prevSelectedDiagnosisCodes].map((innerArray, index) => {
  //       const updatedInnerArray = [...(innerArray || [])];
  //       if (index === rowIndex) {
  //         updatedInnerArray.splice(index, 0, value);
  //       }
  //       return updatedInnerArray;
  //     });

  //     if (!updatedSelectedDiagnosisCodes[rowIndex] || !updatedSelectedDiagnosisCodes[rowIndex].length) {
  //       updatedSelectedDiagnosisCodes[rowIndex] = [value];
  //     }
  //     return updatedSelectedDiagnosisCodes;
  //   });

  //   updateSearch(null, rowIndex); // This is commented out in your code.
  // };
  const applyDiagnosisCodeToAllRows = (value) => {
    const updatedSelectedDiagnosisCodes = [];
    const rowSelectedCodes = value?.dgnstcCodes?.length ? value.dgnstcCodes : []; // Clone the array to avoid referencing the same array
    for (let i = 0; i < selectedTests?.length; i++) {
      const currentObj = { ...selectedTests[i] };
      currentObj.dgnstcCodes = rowSelectedCodes;
      updatedSelectedDiagnosisCodes.push(currentObj);

      // updatedSelectedDiagnosisCodes.push({ rowSelectedCodes });
    }

    setSelectedDiagnosisCodes(updatedSelectedDiagnosisCodes);
    setSelectedTests(updatedSelectedDiagnosisCodes);
  };

  const handleDeleteRow = (value) => {
    if (value?.panelId) {
      setSelectedTests((prevPanels) => prevPanels.filter((panel) => panel.panelId !== value.panelId));
    }
    if (value?.testId) {
      setSelectedTests((prevTests) => prevTests.filter((test) => test.testId !== value.testId));
    }
  };
  useEffect(() => {
    setSelectedTests(selectedDiagnosisCodes);
  }, [selectedDiagnosisCodes]);

  // useEffect(() => {
  //   if (selectedTests.length > 0) {
      // setSelectedDiagnosisCodes(selectedTests);
      // setSelectedDiagnosisCodes((prevData) => {
      //   return prevData.map((ele) => {
      //     const newData = {
      //       ...ele
      //     };
      //     if (ele?.panelTest?.length) {
      //       newData["dgnstcCodes"] = fomattedCodes(
      //         ele.panelTest[0].diagnosticCode,
      //         ele.panelTest[0].diagnosticCodeDescription
      //       );
      //     }
      //     if (ele?.diagnosticCode) {
      //       newData["dgnstcCodes"] = fomattedCodes(ele.diagnosticCode, ele.diagnosticCodeDescription);
      //     }
      //     return newData;
      //   });
      // });
  //   }
  // }, [selectedTests]);
  const removeSelectedOption = (rowIndex, valueIndex, value) => {
    setSelectedDiagnosisCodes((prevSelectedDiagnosisCodes) => {
      let updatedSelectedDiagnosisCodes = [...prevSelectedDiagnosisCodes];
      const rowCodes = { ...updatedSelectedDiagnosisCodes[rowIndex] };

      if (Array.isArray(rowCodes?.dgnstcCodes)) {
        // updatedSelectedDiagnosisCodes[rowIndex]?.dgnstcCodes?.splice(valueIndex, 1);

        rowCodes.dgnstcCodes = rowCodes?.dgnstcCodes?.filter((code, index) => index !== valueIndex);
        updatedSelectedDiagnosisCodes[rowIndex] = rowCodes;
      }
      return updatedSelectedDiagnosisCodes;
    });
  };

  const handleCheckboxSpecimen = (event, index) => {
    const newValue = event.target.checked;
    setFastingRequired((prevState) => {
      const updatedArray = [...(prevState || [])];
      updatedArray[index] = newValue;
      return updatedArray;
    });
  };
  return (
    <AccordionDetails className="p-0">
      <TableContainer className="table__wrapper create__order-tests-table">
        <Table className="table_section table_section--selectedTests">
          <TableHead>
            <TableRow>
              <TableCell>
                {/* <Checkbox style={{ padding: 1, marginRight: 8 }} /> Test Name */}
                Test Name
              </TableCell>
              {/* <TableCell className="text-center">Specimen Frozen</TableCell> */}
              <TableCell>Search Diagnosis Code</TableCell>
              <TableCell>Selected Diagnosis Code</TableCell>
              <TableCell className="text-center">Apply this Code to all Tests</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedTests?.length > 0 &&
              selectedTests?.map((test, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <IconButton className="p-0 pe-1">
                      <IndeterminateCheckBoxOutlinedIcon
                        className="deleteSquareIcon"
                        onClick={() => handleDeleteRow(test)}
                      />
                    </IconButton>
                    {displayOptions(test)}
                  </TableCell>
                  {/* <TableCell className="text-center">
                    <Checkbox
                      checked={fastingRequired?.length ? fastingRequired[i] : false}
                      onChange={(e) => {
                        handleCheckboxSpecimen(e, i);
                      }}
                    />{" "}
                  </TableCell> */}
                  <TableCell>
                    <FormControl className="search_width">
                      <SearchComponent updateSearch={(value) => updateSearch(value, i)} selectedTests={selectedTests} index = {i} />
                      {searchInputs[i] && (
                        <Paper>
                          <MenuList>
                            {icd10?.map((code, j) => {
                              return (
                                <MenuItem
                                  key={j}
                                  onClick={() => handleDiagnosisCodeChange(i, `${code[0]} - ${code[1]}`)}
                                >{`${code[0]} - ${code[1]}`}</MenuItem>
                              );
                            })}
                          </MenuList>
                        </Paper>
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {selectedDiagnosisCodes[i]?.dgnstcCodes?.map((codeObj, j) => (
                      <div className="text-styles" key={j}>
                        <span className="text-width">{`${codeObj?.diagnosticCode} - ${codeObj?.diagnosticDesc}`}</span>
                        <IconButton aria-label="clear" onClick={() => removeSelectedOption(i, j, codeObj)}>
                          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
                        </IconButton>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      className="primary-outline-btn background-unset"
                      variant="outlined"
                      onClick={() => applyDiagnosisCodeToAllRows(selectedDiagnosisCodes[i])}
                    >
                      Apply All
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography className="errorInfo p-3">
        {newErrors.includes("false") ? "Selecting at least one diagnosis code for each test is mandatory" : ""}
      </Typography>
    </AccordionDetails>
  );
};
