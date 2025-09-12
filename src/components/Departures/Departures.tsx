import React, { useContext, useEffect, useState } from "react";
import type { Arrival } from "../../types/trainTypes";
import { fetchTrains } from "../../utils/trainFunctions";

import TrainTables from "../ui/TrainTables";
import { TrainContext } from "../../context/TrainContext";

const Departures: React.FC = () => {
  const [departures, setDepartures] = useState<Arrival[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const trainContext = useContext(TrainContext);
  if (!trainContext) {
    throw new Error("Traincontext is not available");
  }
  const { selectedStation } = trainContext;

  useEffect(() => {
    if (selectedStation) {
      const fetchData = async () => {
        const trains = await fetchTrains("departures", selectedStation.id);
        setDepartures(trains || []);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [selectedStation]);

  return (
    <div>
      <h2>Abfahrten</h2>
      {isLoading ? (
        <div className="spiner">
          <div className="loader"></div>
          Loading arrivals...
        </div>
      ) : (
        <TrainTables trainData={departures} trainType="departure" />
      )}
    </div>
  );
};

export default Departures;
