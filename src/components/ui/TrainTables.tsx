import React from "react";
import styles from "./TrainTables.module.scss";
import type { Arrival } from "../../types/trainTypes";

type TrainTablesProps = {
  trainData: Arrival[];
  trainType: "arrival" | "departure";
};

const TrainTables: React.FC<TrainTablesProps> = ({ trainData, trainType }) => {
  return (
    <table className={styles.trainTable}>
      <thead>
        <tr>
          <th>Zeit</th>

          {trainType === "arrival" ? <th>Von</th> : ""}
          <th>Zug/Linie</th>
          <th>Gleis</th>
          <th>Betreiber</th>
          <th>Verspätung</th>
        </tr>
      </thead>
      <tbody>
        {trainData.map((train, i) => (
          <tr key={i}>
            <td>
              {new Date(train.when).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            {trainType === "arrival" ? <td>{train.provenance}</td> : ""}
            <td>{train.line.name}</td>
            <td>{train.platform}</td>
            <td>{train.line.productName}</td>

            <td className={train.delay && train.delay > 0 ? styles.delay : ""}>
              {train.delay && train.delay > 0
                ? `+${Math.floor(train.delay / 60)} min`
                : "pünktlich"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrainTables;
