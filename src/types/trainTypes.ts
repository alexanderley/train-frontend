export type Line = {
  name: string;
  product: string;
  productName: string;
};

export type Arrival = {
  provenance: string;
  when: string;
  delay: number | null;
  line: Line;
  platform: string;
};

// #Todo maybe change this later. Its a string when no matching station could be found

export type TrainStation = {
  id: string;
  name: string;
};
