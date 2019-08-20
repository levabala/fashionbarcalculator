import { Thing } from './Thing';

export interface Sending {
  thing: Thing;
  dispatch: Date;
  arrive?: Date;
  cost: number;
  targetId: string;
}
