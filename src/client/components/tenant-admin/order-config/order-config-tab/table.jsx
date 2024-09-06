import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

/**
 * @author
 * @function OrderConfigTable
 **/

export const OrderConfigTable = ({
  setSelectedTests,
  updateSearch,
  setDisable,
  updateSort,
  updatePagination,
  filteredData,
  selectedTests
}) => {
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "testName", // simple recommended way to define a column
        header: "Test Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "panelName", // simple recommended way to define a column
        header: "Panel Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      }
    ],
    []
  );

  // const [rowSelection, setRowSelection] = useState({});
  // const tableInstanceRef = useRef(null);
  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [pagenationUpdated, setPaginationUpdated] = useState(false);
  // const [rowCount, setRowCount] = useState(0);
  useEffect(() => {
    // do something when the pagination state changes
    if (pagination.pageSize !== 10) {
      setPaginationUpdated(true);
    }
    if (pagination.pageIndex > 0) {
      updatePagination(pagination);
      setPaginationUpdated(true);
    }
    if (pagenationUpdated) {
      updatePagination(pagination);
    }

    if (sorting.length > 0) {
      updateSort(sorting ?? []);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  useEffect(() => {
    // Update the data with the checked property based on defaultSelectedRows

    const updatedOrderTestList = filteredData.map((test) => ({
      ...test,
      status: true
    }));

    setSelectedTests(updatedOrderTestList);
    setData(updatedOrderTestList);
  }, [filteredData]);

  const handleChange = (e) => {
    const { id, checked } = e.target;

    if (id === "checkAll") {
      const tempData = data.map((item) => {
        return { ...item, status: checked };
      });
      setSelectedTests(tempData);
      setData(tempData);
    } else {
      const tempData = data.map((item) =>
        (item.panelId === 0 ? item.testId === parseInt(id) : item.panelId === parseInt(id))
          ? { ...item, status: checked }
          : item
      );
      const checkedTests = tempData.filter((item) => item.status);
      setSelectedTests(checkedTests);
      setData(tempData);
    }
  };
  useEffect(() => {
    if (selectedTests?.find((s) => s.status === true)) {
      setDisable(false);
    } else setDisable(true);
  }, [selectedTests]);

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, pageIndex: newPage });
  };

  return (
    // <Box className="table__wrapper">
    //   <MaterialReactTable
    //     columns={columns}
    //     data={data}
    //     enableColumnOrdering // enable some features
    //     enableRowSelection={true}
    //     enableFullScreenToggle={false}
    //     enableDensityToggle={false}
    //     // enableColumnFilters={false}
    //     enableFilters={false}
    //     enablePagination={true} // disable a default feature
    //     onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
    //     state={{ rowSelection, pagination, sorting }} // manage your own state, pass it back to the table (optional)
    //     tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
    //     enableRowActions={false}
    //     muiTablePaginationProps={{
    //       rowsPerPageOptions: [10],
    //       showFirstButton: true,
    //       showLastButton: true
    //     }}
    //     options={{
    //       selection: true
    //     }}
    //     manualPagination={true}
    //     manualSorting={true}
    //     onSortingChange={setSorting}
    //     onPaginationChange={setPagination}
    //     rowCount={totalCount}
    //     renderTopToolbarCustomActions={handleSelectedRows}
    //   />
    // </Box>
    <TableContainer className="table__wrapper" component={Paper}>
      <Table className="table_section">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                className="py-0"
                color="secondary"
                id="checkAll"
                onChange={handleChange}
                checked={data?.filter((item) => item?.status !== true).length < 1}
              />
            </TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>Panel Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {addRow && (
            <NewRow
              name={title}
              deleteRow={deleteTempRow}
              saveRowUpdate={saveSuccessUpdate}
              apis={apis}
              setAddRow={setAddRow}
              tabName={tabName}
              relationType={relationType}
            />
          )} */}
          {data?.length > 0 &&
            data
              .slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize)
              .map((d, index) => {
                {
                  /* {data?.length > 0 &&
            data?.map((d, index) => { */
                }
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        color="secondary"
                        id={d?.panelId === 0 ? d?.testId : d?.panelId}
                        onChange={handleChange}
                        checked={d?.status}
                      />
                    </TableCell>
                    <TableCell>{d?.testName}</TableCell>
                    <TableCell>{d?.panelName}</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={selectedTests?.length}
        page={pagination.pageIndex}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.pageSize}
      />
    </TableContainer>
  );
};
