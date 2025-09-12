import { createContext, useState } from "react";

import type { ReactNode } from "react";

import type { TrainStation } from "../types/trainTypes";

type TrainContextType = {
  selectedStation: TrainStation | string | null;
  setSelectedStation: (station: TrainStation | string | null) => void;
};

export const TrainContext = createContext<TrainContextType | undefined>(
  undefined
);

export const TrainProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStation, setSelectedStation] = useState<
    TrainStation | string | null
  >(null);

  return (
    <TrainContext.Provider value={{ selectedStation, setSelectedStation }}>
      {children}
    </TrainContext.Provider>
  );
};
