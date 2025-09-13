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

export type TrainStation = {
  id: string;
  name: string;
};
