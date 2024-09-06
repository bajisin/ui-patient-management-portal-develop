import { Box, Chip } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";

import AddNewFacilities from "@pages/tenant-admin/addNewFacilities";
import Loader from "../../../utils/Loader";
import { MaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CALLTYPES } from "../../../_helpers/constants";

const FacilitiesDetailsTable = ({ searchValue, updateSort, updatePagination }) => {
  const statusCell = (value) => {
    if (value === "Active") return <Chip className="chip__btn chip__btn--green" label={value} />;
    else if (value === "Inactive") return <Chip className="chip__btn chip__btn--red" label={value} />;
  };
  const renderCellValue = (value) => {
    if (value?.length >= 0) return <span>{value?.map((val, i) => val?.serviceMaster?.description).join(", ")}</span>;
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "facilityName", // simple recommended way to define a column
        header: "Name",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "managementGroupDesc", // simple recommended way to define a column
        header: "Management Group",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "address", // simple recommended way to define a column
        header: "Address",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "phoneNumber", // simple recommended way to define a column
        header: "Contact Number",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "emailAddress", // simple recommended way to define a column
        header: "Email",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "facilityTypeDesc", // simple recommended way to define a column
        header: "Facility Type",
        Cell: ({ cell }) => <span>{cell.getValue()}</span> // optional custom cell render
      },
      {
        accessorKey: "facilityServices", // simple recommended way to define a column
        header: "Services",
        Cell: ({ cell }) => (
          <span>
            {
              renderCellValue(cell.getValue()) // Display a fallback text when 'defaultLab' is null
            }
          </span>
        ) // optional custom cell render
      },
      {
        accessorKey: "statusMaster.statussDescription", // simple recommended way to define a column
        header: "Status",
        Cell: ({ cell }) => statusCell(cell.getValue())
      }
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const tableInstanceRef = useRef(null);
  const [sorting, setSorting] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFacility, setEditedFacility] = useState(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10 // customize the default page size
  });
  const [pagenationUpdated, setPaginationUpdated] = useState(false);

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
  const { facilitiesOrders: data, loading, totalCount } = useSelector((state) => state.facilities);

  const navigate = useNavigate();
  if (Object.keys(rowSelection).length > 0) {
    navigate(`/facilities/facilities-parent-Order-Tab/${data?.data[Object.keys(rowSelection)[0]]?.facilityId}`);
  }
  const filteredData = useMemo(() => {
    if (!searchValue) {
      return data?.data || [];
    }

    const lowerSearchValue = searchValue.toLowerCase();

    return (data?.data || []).filter((item) => {
      return (
        item.facilityName.toLowerCase().includes(lowerSearchValue) ||
        item.emailAddress.toLowerCase().includes(lowerSearchValue) ||
        item.managementGroupDesc.toLowerCase().includes(lowerSearchValue)
      );
    });
  }, [data?.data, searchValue]);
  return (
    <>
      <Box className="table__wrapper">
        {loading ? (
          <Loader />
        ) : (
          <MaterialReactTable
            columns={columns}
            data={filteredData}
            enableColumnOrdering // enable some features
            enableMultiRowSelection={false}
            enableRowSelection={false}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableFilters={false}
            enableRowActions={false}
            positionActionsColumn="last"
            enablePagination={true} // disable a default feature
            manualPagination={true}
            manualSorting={true}
            onSortingChange={setSorting}
            rowCount={totalCount}
            onRowSelectionChange={setRowSelection} // hoist internal state to your own state (optional)
            state={{ rowSelection, pagination, sorting }} // manage your own state, pass it back to the table (optional)
            tableInstanceRef={tableInstanceRef} // get a reference to the underlying table instance (optional)
            muiTablePaginationProps={{
              rowsPerPageOptions: [10],
              showFirstButton: true,
              showLastButton: true
            }}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () =>
                setRowSelection((prev) => ({
                  ...prev,
                  [row.id]: !prev[row.id]
                })),
              selected: rowSelection[row.id],
              sx: {
                cursor: "pointer"
              }
            })}
            onPaginationChange={setPagination}
          />
        )}
      </Box>
      {isEditing && (
        <AddNewFacilities
          isEditing={isEditing}
          open={isEditing}
          setOpen={setIsEditing}
          setEditedFacility={setEditedFacility}
          updateFormValue={editedFacility}
          callType={CALLTYPES.Edit}
        />
      )}
    </>
  );
};
export default FacilitiesDetailsTable;
