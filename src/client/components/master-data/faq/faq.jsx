import "react-quill/dist/quill.snow.css";

import { Grid, TextField, Typography } from "@mui/material";
import { Master, formats, modules } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";

export default function FAQ({ faq, questionIndex, setQsn, setAns, edit }) {
  const [qsn, setQsnLocal] = useState("");
  const [ans, setAnsLocal] = useState("");

  const handleAnsChange = (value) => {
    setAnsLocal(value);
    setAns(value.toString("html"));
  };

  useEffect(() => {
    setQsnLocal(faq?.faqQuestion || "");
    if (faq?.faqAnswer) {
      setAnsLocal(faq?.faqAnswer);
    } else {
      setAnsLocal("");
    }
  }, [faq]);

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="label" component="label" className="add__label">
          Add Question {questionIndex}.
        </Typography>
        <TextField
          className="add__input"
          value={qsn}
          fullWidth
          onChange={(e) => {
            setQsnLocal(e.target.value);
            setQsn(e.target.value);
          }}
          disabled={!edit && Master && Master?.createInd === false}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className="mt-1">
        <Typography variant="label" component="label" className="add__label">
          Description
        </Typography>
        <Typography variant="div" component="div" className="description__wrapper p-0">
          <ReactQuill
            value={ans}
            onChange={handleAnsChange}
            modules={modules}
            placeholder={"description"}
            formats={formats}
            readOnly={!edit}
          />
        </Typography>
      </Grid>
    </>
  );
}
