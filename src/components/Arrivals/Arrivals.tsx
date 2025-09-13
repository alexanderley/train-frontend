import React from "react";
import type { Train } from "../../types/trainTypes";
import TrainTables from "../ui/TrainTables";

interface ArrivalsProps {
  trainData: Train[];
  isLoading: boolean;
}

const Arrivals: React.FC<ArrivalsProps> = ({ trainData, isLoading }) => {
  return (
    <div>
      <h2>Ankünfte</h2>
      {isLoading ? (
        <div className="spinner">
          <div className="loader"></div>
          Loading arrivals…
        </div>
      ) : (
        <TrainTables trainData={trainData} trainType="arrival" />
      )}
    </div>
  );
};

export default Arrivals;
