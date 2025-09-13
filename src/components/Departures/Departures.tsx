import React from "react";
import type { Train } from "../../types/trainTypes";
import TrainTables from "../ui/TrainTables";

interface DeparturesProps {
  trainData: Train[];
  isLoading: boolean;
}

const Departures: React.FC<DeparturesProps> = ({ trainData, isLoading }) => {
  return (
    <div>
      <h2>Abfahrten</h2>
      {isLoading ? (
        <div className="spinner">
          <div className="loader"></div>
          Loading departures…
        </div>
      ) : (
        <TrainTables trainData={trainData} trainType="departure" />
      )}
    </div>
  );
};

export default Departures;
