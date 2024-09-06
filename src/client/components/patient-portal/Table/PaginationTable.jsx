import { Box, Pagination } from "@mui/material";
import React from "react";

export default function PaginationTable() {
  return (
    <Box className="pagination__wrapper">
      <Pagination count={3} />
    </Box>
  );
}
