import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { TrainContext } from "../../context/TrainContext";
import type { TrainStation } from "../../types/trainTypes";

export default function SearchStation() {
  const [stations, setStations] = useState<TrainStation[]>([]);
  const [loading, setLoading] = useState(false);
  const trainContext = useContext(TrainContext);
  if (!trainContext) {
    throw new Error("SearchStation must be used within a TrainProvider");
  }
  const { selectedStation, setSelectedStation } = trainContext;

  useEffect(() => {
    console.log("selected: ", selectedStation);
  }, [selectedStation]);

  const handleInputChange = async (_: any, value: string) => {
    if (!value || value.length < 2) {
      return setStations([]);
    }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5005/api/getStations?query=${encodeURIComponent(
          value
        )}`
      );
      const data = await res.json();
      setStations(data.stations || []);
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
        setSelectedStation(value);
      }}
      onInputChange={handleInputChange}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Suche nach Station"
          variant="outlined"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
