import React from "react";
import TextField from "@mui/material/TextField";

const MinutesInput: React.FC = () => {
  return (
    <div>
      <TextField fullWidth label="Minuten" variant="outlined" size="medium" />
    </div>
  );
};

export default MinutesInput;
