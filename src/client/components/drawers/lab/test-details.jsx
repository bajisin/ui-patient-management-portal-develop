import { Box, Typography } from "@mui/material";

import React from "react";

const TestDetails = ({ testDetails }) => {
  return (
    <Box className="test-details-labs">
      <Box className="test-performed test-details">
        <Typography component="h6" variant="h6" className="underlined-title mt-3">
          Tests Associated with the Lab
        </Typography>
        <ol>
          {testDetails?.map((test, i) => (
            <li key={i}>{test?.testDescription}</li>
          ))}
        </ol>
      </Box>
    </Box>
  );
};

export default TestDetails;
