import React from "react";
import styles from "./Train.module.scss";
import Arrivals from "../Arrivals/Arrivals";
import Departures from "../Departures/Departures";

const Trains: React.FC = () => {
  return (
    <div className={styles.trainWrapper}>
      <Arrivals />
      <Departures />
    </div>
  );
};

export default Trains;
