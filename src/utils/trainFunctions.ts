import type { Arrival } from "../types/trainTypes";
import { API_URL } from "../apiRoutes";

type FetchType = "arrivals" | "departures";

export const fetchTrains = async (
  type: FetchType,
  stationId: string
): Promise<Arrival[]> => {
  try {
    const res = await fetch(`${API_URL}/api/${type}/${stationId}`);
    const json = await res.json();

    const allTrains: Arrival[] = json.data[type][type];

    const trainsOnly = allTrains.filter((t: Arrival) => {
      const product = t?.line?.product;
      return (
        product === "nationalExpress" || // ICE
        product === "national" || // IC/EC
        product === "regionalExpress" || // RE
        product === "regional" // RB/IRE
      );
    });

    return trainsOnly || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
