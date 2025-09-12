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

export type TrainStation =
  | {
      id: string;
      name: string;
    }
  | string;
