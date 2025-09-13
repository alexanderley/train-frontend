import { useState, useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { TrainContext } from "../../context/TrainContext";
import type { TrainStation } from "../../types/trainTypes";
import { fetchStations } from "../../utils/trainFunctions";

export default function SearchStation() {
  const [stations, setStations] = useState<TrainStation[]>([]);
  const [loading, setLoading] = useState(false);
  const trainContext = useContext(TrainContext);

  if (!trainContext) {
    throw new Error("SearchStation must be used within a TrainProvider");
  }

  const { setSelectedStation } = trainContext;

  const handleInputChange = async (_: any, value: string) => {
    if (!value || value.length < 2) {
      return setStations([]);
    }
    setLoading(true);
    try {
      const stationsData = await fetchStations(value);
      setStations(stationsData);
    } catch (err) {
      console.error("Error fetching stations:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      fullWidth
      freeSolo
      options={stations}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      onChange={(_, value) => {
        if (typeof value === "string") {
          setSelectedStation({ id: "", name: value });
        } else {
          setSelectedStation(value);
        }
      }}
      onInputChange={handleInputChange}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Suche nach Stationen"
          variant="outlined"
          required
          slotProps={{
            htmlInput: params.inputProps,
          }}
        />
      )}
    />
  );
}
