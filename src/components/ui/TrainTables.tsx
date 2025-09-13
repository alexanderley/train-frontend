import React from "react";
import styles from "./TrainTables.module.scss";
import type { Train } from "../../types/trainTypes";

type TrainTablesProps = {
  trainData: Train[];
  trainType: "arrival" | "departure";
};

const TrainTables: React.FC<TrainTablesProps> = ({ trainData, trainType }) => {
  return (
    <table className={styles.trainTable}>
      <thead>
        <tr>
          <th>Geplant</th>
          <th className={styles.notOnMobile}>Neue Zeit</th>
          {trainType === "arrival" ? <th>Von</th> : <th>Nach</th>}
          <th>Zug/Linie</th>
          <th>Gleis</th>
          <th className={styles.notOnMobile}>Betreiber</th>
          <th>Verspätung</th>
        </tr>
      </thead>
      <tbody>
        {trainData.map((train, i) => (
          <tr key={i}>
            <td className={styles.minWidth}>
              {new Date(train.plannedWhen).toLocaleDateString("de-DE")} <br />
              um{" "}
              {new Date(train.plannedWhen).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              Uhr
            </td>
            <td className={`${styles.minWidth} ${styles.notOnMobile}`}>
              {new Date(train.when).toLocaleDateString("de-DE")} <br />
              um{" "}
              {new Date(train.when).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              Uhr
            </td>
            {trainType === "arrival" ? (
              <td className={styles.mobileMaxWidth}>{train.provenance}</td>
            ) : (
              <td className={styles.mobileMaxWidth}>
                {train.direction ? train.direction : "*keine Angabe"}
              </td>
            )}
            <td>
              <strong>{train.line.name}</strong>
            </td>
            <td>
              <strong>{train.platform}</strong>
            </td>
            <td className={styles.notOnMobile}>
              {train.stop.transitAuthority}
            </td>
            <td
              className={
                train.delay && train.delay > 0 ? styles.delay : styles.onTime
              }
            >
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
