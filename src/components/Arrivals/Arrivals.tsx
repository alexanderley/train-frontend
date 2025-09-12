import React, { useContext, useEffect, useState } from "react";
import type { Arrival } from "../../types/trainTypes";
import { fetchTrains } from "../../utils/trainFunctions";
import TrainTables from "../ui/TrainTables";
import { TrainContext } from "../../context/TrainContext";

const Arrivals: React.FC = () => {
  const [arrivals, setArrivals] = useState<Arrival[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const trainContext = useContext(TrainContext);

  if (!trainContext) {
    throw new Error("Traincontet is not available");
  }
  const { selectedStation } = trainContext;

  useEffect(() => {
    console.log("station in arrivals ", selectedStation);
  });

  useEffect(() => {
    if (selectedStation) {
      const fetchData = async () => {
        setIsLoading(true);
        const trains = await fetchTrains("arrivals", selectedStation.id);
        setArrivals(trains || []);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [selectedStation]);

  return (
    <div>
      <h2>Ankünfte</h2>

      {isLoading ? (
        <div className="spinner">
          <div className="loader"></div>
          Loading arrivals…
        </div>
      ) : (
        <TrainTables trainData={arrivals} trainType="arrival" />
      )}
    </div>
  );
};

export default Arrivals;
