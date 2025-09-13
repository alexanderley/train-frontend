import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { TrainStation } from "../types/trainTypes";

type TrainContextType = {
  selectedStation: TrainStation | null;
  setSelectedStation: (station: TrainStation | null) => void;
};

export const TrainContext = createContext<TrainContextType | undefined>(
  undefined
);

export const TrainProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStation, setSelectedStation] = useState<TrainStation | null>(
    {id: "", name:""}
  );

  return (
    <TrainContext.Provider value={{ selectedStation, setSelectedStation }}>
      {children}
    </TrainContext.Provider>
  );
};
