import React, { useEffect, useState } from "react";
import type { Arrival } from "../../types/trainTypes";
import { fetchTrains } from "../../utils/trainFunctions";

import TrainTables from "../ui/TrainTables";

const Departures: React.FC = () => {
  const [departures, setDepartures] = useState<Arrival[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const trains = await fetchTrains("departures");
      setDepartures(trains || []);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
