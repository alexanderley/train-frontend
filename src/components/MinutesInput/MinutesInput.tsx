import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { TrainContext } from "../../context/TrainContext";

const MinutesInput: React.FC = () => {
  const context = useContext(TrainContext);

  if (!context) {
    throw new Error("MinutesInput must be used within a TrainProvider");
  }

  const { minutes, setMinutes } = context;

  useEffect(() => {
    console.log("train minutes", minutes);
  }, [minutes]);

  const numberInputHandler = (numberInput: string) => {
    let num = numberInput.replace(/\D/g, "");
    const convertedNum = Number(num);

    if (convertedNum >= 0 && convertedNum <= 60) {
      setMinutes(convertedNum);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="In Minuten"
        placeholder="Minuten"
        variant="outlined"
        size="medium"
        type="text"
        value={minutes}
        onChange={(e) => numberInputHandler(e.target.value)}
      />
    </div>
  );
};

export default MinutesInput;
