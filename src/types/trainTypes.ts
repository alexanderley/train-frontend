export type Line = {
  name: string;
  product: string;
  productName: string;
};

export type Stop = {
  id: string;
  name: string;
  transitAuthority: string;
};

export type Arrival = {
  provenance: string;
  when: string;
  plannedWhen: string;
  delay: number | null;
  line: Line;
  platform: string;
  stop: Stop;
};

// #Todo maybe change this later. Its a string when no matching station could be found
export type TrainStation = {
  id: string;
  name: string;
};
