export interface Sending {
  id: string;
  thingId: string;
  dispatch: Date;
  arrive?: Date;
  cost: number;
  targetId: string;
}
