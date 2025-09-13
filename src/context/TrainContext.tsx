import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { TrainStation } from "../types/trainTypes";

type TrainContextType = {
  selectedStation: TrainStation | null;
  setSelectedStation: (station: TrainStation | null) => void;
  minutes: number;
  setMinutes: (min: number) => void;
};

export const TrainContext = createContext<TrainContextType | undefined>(
  undefined
);

export const TrainProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStation, setSelectedStation] = useState<TrainStation | null>({
    id: "",
    name: "",
  });
  const [minutes, setMinutes] = useState<number>(60);

  useEffect(() => {
    console.log("Context Selected Minutes: ", minutes);
  }, [minutes]);

  useEffect(() => {
    console.log("Train Station: ", selectedStation);
  });

  return (
    <TrainContext.Provider
      value={{ selectedStation, setSelectedStation, minutes, setMinutes }}
    >
      {children}
    </TrainContext.Provider>
  );
};
