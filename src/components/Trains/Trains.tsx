import React from "react";
import styles from "./Train.module.scss";
import Arrivals from "../Arrivals/Arrivals";
import Departures from "../Departures/Departures";
import SearchStaion from "../SearchStation/SearchStaion";

const Trains: React.FC = () => {
  return (
    <div className={styles.trainWrapper}>
      <SearchStaion />
      <Arrivals />
      <Departures />
    </div>
  );
};

export default Trains;
