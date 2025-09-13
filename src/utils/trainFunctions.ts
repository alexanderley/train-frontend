import type { Arrival, TrainStation } from "../types/trainTypes";
import { API_URL } from "../apiRoutes";

type FetchType = "arrivals" | "departures";

export const fetchTrains = async (
  type: FetchType,
  stationId: string,
  minutes?: number
): Promise<Arrival[]> => {
  try {
    const res = await fetch(`${API_URL}/api/${type}/${stationId}`);
    const json = await res.json();
    const allTrains: Arrival[] = json.data[type][type];

    // Filter only relevant products
    let trainsOnly = allTrains.filter((t: Arrival) => {
      const product = t?.line?.product;
      return (
        product === "nationalExpress" || // ICE
        product === "national" || // IC/EC
        product === "regionalExpress" || // RE
        product === "regional" // RB/IRE
      );
    });

    if (minutes !== undefined) {
      const now = new Date();
      trainsOnly = trainsOnly.filter((t: Arrival) => {
        if (!t.plannedWhen) return false;
        const plannedTime = new Date(t.plannedWhen);
        const diffMinutes = (plannedTime.getTime() - now.getTime()) / 60000;
        return diffMinutes >= 0 && diffMinutes <= minutes;
      });
    }

    // Sort by plannedWhen ascending
    trainsOnly.sort((a, b) => {
      const timeA = new Date(a.plannedWhen).getTime();
      const timeB = new Date(b.plannedWhen).getTime();
      return timeA - timeB;
    });

    return trainsOnly || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchStations = async (query: string): Promise<TrainStation[]> => {
  try {
    // const res = await fetch(
    //   `${API_URL}/api/getStations?query=${encodeURIComponent(query)}`
    // );
    const res = await fetch(`${API_URL}/api/getStations/${query}`);
    const data = await res.json();
    return data.stations || [];
  } catch (err) {
    console.error("Error fetching stations:", err);
    return [];
  }
};
