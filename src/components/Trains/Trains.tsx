import React, { useContext, useState } from "react";
import styles from "./Trains.module.scss";
import Arrivals from "../Arrivals/Arrivals";
import Departures from "../Departures/Departures";
import SearchStation from "../SearchStation/SearchStation";
import MinutesInput from "../MinutesInput/MinutesInput";
import { TrainContext } from "../../context/TrainContext";
import { fetchTrains } from "../../utils/trainFunctions";
import type { Train } from "../../types/trainTypes";

const Trains: React.FC = () => {
  const trainContext = useContext(TrainContext);
  if (!trainContext) throw new Error("TrainContext not available");

  const { selectedStation, minutes } = trainContext;

  const [departures, setDepartures] = useState<Train[]>([]);
  const [arrivals, setArrivals] = useState<Train[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStation) return;
    setIsLoading(true);

    const [fetchedDepartures, fetchedArrivals] = await Promise.all([
      fetchTrains("departures", selectedStation.id, minutes),
      fetchTrains("arrivals", selectedStation.id, minutes),
    ]);

    setDepartures(fetchedDepartures || []);
    setArrivals(fetchedArrivals || []);
    setIsLoading(false);
  };

  return (
    <div className={styles.trainWrapper}>
      <h2 className={styles.appHeading}>
        Suche nach Bahnhöfen <br />& Verbindungen
      </h2>
      <form className={styles.inputContainer} onSubmit={handleSearch}>
        <SearchStation />
        <MinutesInput />
        <button className={styles.searchButton} type="submit">
          Suchen
        </button>
      </form>

      <Arrivals trainData={arrivals} isLoading={isLoading} />
      <Departures trainData={departures} isLoading={isLoading} />
    </div>
  );
};

export default Trains;
