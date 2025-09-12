import React, { useEffect, useState } from "react";
import type { Arrival } from "../../types/trainTypes";
import { fetchTrains } from "../../utils/trainFunctions";
import TrainTables from "../ui/TrainTables";

const Arrivals: React.FC = () => {
  const [arrivals, setArrivals] = useState<Arrival[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const trains = await fetchTrains("arrivals");
      setArrivals(trains || []);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
