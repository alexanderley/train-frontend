import React from "react";
import styles from "./Train.module.scss";
import Arrivals from "../Arrivals/Arrivals";
import Departures from "../Departures/Departures";
import SearchStation from "../SearchStation/SearchStation";

const Trains: React.FC = () => {
  return (
    <div className={styles.trainWrapper}>
      <SearchStation />
      <Arrivals />
      <Departures />
    </div>
  );
};

export default Trains;
