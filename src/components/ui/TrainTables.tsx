import React from "react";
import styles from "./TrainTables.module.scss";
import type { Train } from "../../types/trainTypes";

import { formatDateTime } from "../../utils/formatFunctions";

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
          <th>{trainType === "arrival" ? "Von" : "Nach"}</th>
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
              {formatDateTime(train.plannedWhen)}
            </td>
            <td className={`${styles.minWidth} ${styles.notOnMobile}`}>
              {formatDateTime(train.when)}
            </td>

            <td className={styles.mobileMaxWidth}>
              {trainType === "arrival"
                ? train.provenance ?? ""
                : train.direction ?? "*keine Angabe"}
            </td>

            <td>
              <strong>{train.line?.name ?? ""}</strong>
            </td>

            <td>
              <strong>{train.platform ?? "-"}</strong>
            </td>

            <td className={styles.notOnMobile}>
              {train.stop?.transitAuthority ?? ""}
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
