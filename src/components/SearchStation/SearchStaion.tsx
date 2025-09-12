import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

type TrainStation = {
  id: string;
  name: string;
};

export default function SearchStation() {
  const [stations, setStations] = useState<TrainStation[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState<
    TrainStation | null | string
  >(null);

  useEffect(() => {
    console.log("selected Station: ", selectedStation);
  });

  // alternative zu debouce
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
      style={{ width: 500 }}
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
