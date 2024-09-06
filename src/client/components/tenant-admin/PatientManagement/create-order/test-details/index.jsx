import {
  Accordion,
  AccordionSummary,
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "../../../../../utils/common";
import { getOrderTypes, getPaymentTypes } from "@redux/slices/order-slice";
import { useDispatch, useSelector } from "react-redux";

import { AccordionTable } from "./table";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { CollectionDetails } from "./collection-details";
import Loader from "@utils/Loader";
import { OrderDetails } from "./order-details";
import { OrderHistory } from "./order-history";
import { getTestList } from "../../../../../redux/slices/ordertemplateSlice";

/**
 * @author
 * @function TestDetails
 **/

export const TestDetails = ({
  setrecurringEventRepeats,
  selectedObjects,
  recurringEventRepeats,
  alignment,
  handleChange,
  recurring,
  setrecurring,
  priorityCode,
  setPriorityCode,
  template,
  setTemplate,
  labDays,
  setLabDays,
  setRecurringOrder,
  // selectedPanels,
  // setSelectedPanels,
  selectedTests,
  setSelectedTests,
  selectedDiagnosisCodes,
  setSelectedDiagnosisCodes,
  recurranceRequestsFor,
  setRecurranceRequestsFor,
  orderType,
  setOrderType,
  recurringStartDate,
  recurringEndDate,
  setrecurringStartDate,
  setrecurringEndDate,
  collectedBy,
  collectionDate,
  toggleCollection,
  setCollectedBy,
  setCollectionDate,
  setToggleCollection,
  collectedTime,
  setCollectedTime,
  fastingRequired,
  newErrors,
  setFastingRequired,
  setStep2Complete,
  oneTimeOrderDate,
  oneTimeOrderTime,
  setOneTimeOrderDate,
  setOneTimeOrderTime,
  type,
  setOrderCheck,
  bill,
  setBill
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [searchVal, setSearchVal] = useState();
  const [toggleAccordian, setToggleAccordian] = useState(true);
  const [searchTests, setSearchTests] = useState("");

  const { templates, panelList, paymentTypes } = useSelector((state) => state.createOrder);
  const { orderTestList } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [templateSelected, setTemplateSelected] = useState(false);
  const [loader, setLoader] = useState(false);

  const updateSearch = (value) => {
    setSearchVal(value);
  };

  const [filteredSelectedObj, setFilteredSelectedObj] = useState([]);

  // useEffect(() => {
  //   if (selectedObjects.length > 0) {
  //     const objects = orderTestList.filter((selected) =>
  //       selectedObjects.some((item) => item.key === selected.testName)
  //     );
  //     setFilteredSelectedObj(objects);
  //     // setSelectedTests(objects);
  //   }
  // }, [selectedObjects]);

  useEffect(() => {
    if (selectedTests && selectedTests?.length < 1 && template && searchTests < 1) {
      dispatch(
        getTestList({
          pageNo: 0,
          pageSize: 99999,
          sortOrder: "DESC",
          sortKey: "lastModifiedDate",
          searchValue: searchTests || "",
          roleId: getLoggedInUserRoleId(),
          tenantId: getTenantId(),
          testIds: [],
          panelIds: [],
          testCategoryType: "",
          orderTemplateId: template?.orderTemplateId || 0
        })
      );
    }
    // else if (template) {
    //   dispatch(
    //     getTestList({
    //       pageNo: 0,
    //       pageSize: 99999,
    //       sortOrder: "DESC",
    //       sortKey: "lastModifiedDate",
    //       searchValue: searchTests,
    //       roleId: getLoggedInUserRoleId(),
    //       tenantId: getTenantId(),
    //       testIds: [],
    //       panelIds: [],
    //       testCategoryType: "",
    //       orderTemplateId: (!searchTests && template?.orderTemplateId) || 0
    //     })
    //   );
    //   // .then((r) => {
    //   //   setFilteredSelectedObj(r?.payload?.data);
    //   // });
    // }
  }, [template, selectedTests]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          getTestList({
            pageNo: 0,
            pageSize: 99999,
            sortOrder: "DESC",
            sortKey: "lastModifiedDate",
            searchValue: searchTests,
            roleId: getLoggedInUserRoleId(),
            tenantId: getTenantId(),
            testIds: [],
            panelIds: [],
            testCategoryType: "",
            orderTemplateId: 0
          })
        );
      } catch (error) {
        console.error("Failed to fetch test list:", error);
      }
    };

    if (template && searchTests !== "") {
      fetchData();
    } else if (searchTests?.length >= 3) {
      fetchData();
    }
    // alert("ji");
  }, [searchTests, template, dispatch]);
  const [flag, setFlag] = useState("");
  useEffect(() => {
    if (template) {
      if (templateSelected) {
        setFilteredSelectedObj(orderTestList);
      }
      // if ((!searchTests || searchTests.length < 0) && selectedTests?.length < 1) {
      //   setFilteredSelectedObj(orderTestList);
      //   // setSelectedTests();
      // } else
      if (selectedTests?.length > 0 && flag?.length < 1) {
        const filteredData = selectedTests
          ?.map((item) => {
            if (item.panelTest) {
              const filteredPanelTests = item?.panelTest?.filter((test) => test?.recDelInd === false);
              return { ...item, panelTest: filteredPanelTests };
            } else {
              if (item?.recDelInd === false) {
                return item;
              }
              return null; // Or handle accordingly if you want to exclude items without recDelInd: false
            }
          })
          .filter((item) => item !== null); // Remove null items if any

        setFilteredSelectedObj(type === "edit-order" ? filteredData : orderTestList);
        setFlag("checked");
      }
    }
  }, [template, orderTestList]);
  useEffect(() => {
    if (type === "create-order" || type === "edit-order") {
      dispatch(getOrderTypes());
      dispatch(getPaymentTypes());
      dispatch(
        getTestList({
          pageNo: 0,
          pageSize: 99999,
          sortOrder: "DESC",
          sortKey: "lastModifiedDate",
          searchValue: searchTests || "",
          roleId: getLoggedInUserRoleId(),
          tenantId: getTenantId(),
          testIds: [],
          panelIds: [],
          testCategoryType: "",
          orderTemplateId: template?.orderTemplateId || 0
        })
      );
    }
  }, []);
  const displayOptions = (option) => {
    if (option?.panelId) {
      return option?.panelName + " - " + option?.testCode;
    }
    if (option?.testId) {
      return option?.testName + " - " + option?.testCode;
    }
  };
  useEffect(() => {
    if (type === "edit-order") {
      // setSelectedTests(orderTestList);
      setFilteredSelectedObj(orderTestList);
    }
  }, [type]);
  const [filteredTestData, setFilteredTestData] = useState([]);

  useEffect(() => {
    setOpen(false);
    if (searchTests?.length >= 3) {
      setLoader(true);

      const filteredData = orderTestList.reduce((acc, current) => {
        if (current.panelId === 0) {
          acc.push(current);
        } else {
          const existingItem = acc.find(
            (item) =>
              item.panelId !== null &&
              item.panelId === current.panelId &&
              item.testCategoryId === current.testCategoryId
          );
          if (!existingItem) {
            acc.push(current);
          }
        }
        return acc;
      }, []);

      setFilteredTestData(filteredData);
      setTimeout(() => {
        setOpen(true);
        setLoader(false);
      }, 10);
    }
  }, [orderTestList, searchVal]);

  useEffect(() => {
    if (selectedTests?.length > 0) {
      setStep2Complete(true);
    } else {
      setStep2Complete(false);
    }
  }, [selectedTests]);
  // const filteredTestData =
  useEffect(() => {
    setFilteredTestData(
      orderTestList.reduce((acc, current) => {
        if (current.panelId === 0) {
          acc.push(current);
        } else {
          const existingItem = acc.find(
            (item) =>
              item.panelId !== null &&
              item.panelId === current.panelId &&
              item.testCategoryId === current.testCategoryId
          );
          if (!existingItem) {
            acc.push(current);
          }
        }
        return acc;
      }, [])
    );
  }, [orderTestList]);

  const [open, setOpen] = useState(false);
  return (
    <Typography variant="div" component="div" className="createOrder__wrapper--content pt-0">
      {loader && <Loader />}
      <Grid container spacing={3} className="mt-0">
        <Grid item xs={12} sm={12} md={6} lg={7} className="position-relative">
          <Divider orientation="vertical" variant="middle" flexItem className="vertical--divider" />
          <Typography variant="h6" component="h6">
            Select Test
          </Typography>
          <Grid container spacing={2} className="mt-0">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography component="label" variant="label" className="add__label">
                Order Templates
              </Typography>
              <FormControl className="w-100">
                {/* <Autocomplete
                  className="customAutocomplete__input"
                  id="patientNameSearch"
                  disableClearable
                  options={templates}
                  value={template}
                  onChange={(e, newVal) => {
                    setTemplate(newVal);
                    if (searchTests !== "") setSearchTests("");
                    setSelectedTests([]);
                  }}
                  getOptionLabel={(option) => option?.orderTemplateName || ""} // Define how to display option labels
                  renderOption={(props, option, { selected }) => <li {...props}>{option?.orderTemplateName}</li>}
                  renderInput={(params) => <TextField {...params} label="" />}
                /> */}
                <Autocomplete
                  className="customAutocomplete__input"
                  id="patientNameSearch"
                  disableClearable
                  options={templates}
                  value={template}
                  onChange={(e, newVal) => {
                    setTemplate(newVal);
                    setOrderCheck(newVal?.orderTemplateId);
                    // if (searchTests !== "") setSearchTests("");
                    setSelectedTests([]);
                    setFilteredSelectedObj([]);
                    setTemplateSelected(true);
                  }}
                  getOptionLabel={(option) => option?.orderTemplateName || ""}
                  renderOption={(props, option, { selected }) => <li {...props}>{option?.orderTemplateName}</li>}
                  renderInput={(params) => <TextField {...params} label="" />}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="mt-0">
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Box className="secondary__card">
                <Typography component="div" variant="div" className="d-flex justify-content-between p-2">
                  <Typography component="b" variant="b" className="subHead add__label required">
                    Select Tests
                  </Typography>
                </Typography>
                <FormControl className="w-100 px-2 pb-3 common_checkbox_selection">
                  <Autocomplete
                    className="permissions--tag"
                    multiple
                    limitTags={5}
                    id="panelIndividualTest"
                    open={open}
                    onClose={() => setOpen(false)}
                    options={filteredTestData?.length > 0 ? filteredTestData : []}
                    disableCloseOnSelect
                    getOptionLabel={(option) => displayOptions(option)}
                    value={filteredSelectedObj}
                    onChange={(event, newValue) => {
                      setFilteredSelectedObj(newValue);
                      setSelectedTests(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                      setSearchTests(newInputValue); // Update the searchTests state with the typed value
                      setTemplateSelected(false);
                    }}
                    renderOption={(props, option, { selected }) => {
                      return (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={
                              option?.panelId
                                ? { padding: 1, marginRight: 8, color: "red" }
                                : { padding: 1, marginRight: 8, color: "blue" }
                            }
                            checked={selected}
                            onClick={() => {
                              const newValue = selected
                                ? filteredSelectedObj.filter(
                                    (e) => e.testName !== option.testName && e.panelName !== option.panelName
                                  )
                                : [...filteredSelectedObj, option];
                              setFilteredSelectedObj(newValue);
                              setSelectedTests(newValue);
                            }}
                          />
                          {displayOptions(option)}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder={filteredSelectedObj.length > 0 ? "" : "Tests"}
                        onClick={() => setOpen(true)}
                      />
                    )}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <Typography variant="h6" component="h6" className="w-100">
            Order history
          </Typography>
          <OrderHistory />
        </Grid>
      </Grid>
      {filteredSelectedObj?.length > 0 && (
        <Accordion expanded={toggleAccordian} className="stepper__accordion mt-3 stepper__accordion--testDetails">
          <AccordionSummary
            expandIcon={
              <Typography variant="span" component="span" className="ls-rightarrow ls-outlined-down-arrow"></Typography>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => setToggleAccordian(!toggleAccordian)}
          >
            <Typography>
              Test Selected {filteredSelectedObj?.length}
              <br />
              <Typography variant="span" component="span" className="defaultText">
                {"first diagnosis code selected is the primary diagnosis code."}
              </Typography>
            </Typography>
          </AccordionSummary>
          <AccordionTable
            // selectedPanels={selectedPanels}
            selectedTests={filteredSelectedObj}
            orderTestList={orderTestList}
            newErrors={newErrors}
            // setSelectedPanels={setSelectedPanels}
            setSelectedTests={setSelectedTests}
            selectedDiagnosisCodes={selectedDiagnosisCodes}
            setSelectedDiagnosisCodes={setSelectedDiagnosisCodes}
            fastingRequired={fastingRequired}
            setFastingRequired={setFastingRequired}
            updateSearch={updateSearch}
            displayOptions={displayOptions}
          />
        </Accordion>
      )}

      <Divider className="fullWidthDivider" />
      <Typography variant="h6" component="h6" className="w-100 mt-3">
        Order Details
      </Typography>
      <OrderDetails
        priorityCode={priorityCode}
        setPriorityCode={setPriorityCode}
        alignment={alignment}
        handleChange={handleChange}
        recurring={recurring}
        setrecurring={setrecurring}
        labDays={labDays}
        setLabDays={setLabDays}
        setRecurringOrder={setRecurringOrder}
        setrecurringEventRepeats={setrecurringEventRepeats}
        recurringEventRepeats={recurringEventRepeats}
        recurranceRequestsFor={recurranceRequestsFor}
        setRecurranceRequestsFor={setRecurranceRequestsFor}
        orderType={orderType}
        setOrderType={setOrderType}
        recurringStartDate={recurringStartDate}
        setrecurringStartDate={setrecurringStartDate}
        recurringEndDate={recurringEndDate}
        setrecurringEndDate={setrecurringEndDate}
        oneTimeOrderDate={oneTimeOrderDate}
        oneTimeOrderTime={oneTimeOrderTime}
        setOneTimeOrderDate={setOneTimeOrderDate}
        setOneTimeOrderTime={setOneTimeOrderTime}
      />
      <Divider className="fullWidthDivider" />
      <CollectionDetails
        collectedBy={collectedBy}
        toggleCollection={toggleCollection}
        collectionDate={collectionDate}
        setCollectedBy={setCollectedBy}
        setToggleCollection={setToggleCollection}
        setCollectionDate={setCollectionDate}
        collectedTime={collectedTime}
        setCollectedTime={setCollectedTime}
        bill={bill}
        setBill={setBill}
        paymentTypes={paymentTypes}
      />
    </Typography>
  );
};
