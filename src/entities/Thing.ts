import uuid from 'uuid';

export enum ThingState {
  Warehouse = "Warehouse",
  Transporting = "Transporting",
  Client = "Client"
}

export interface Thing {
  id: string;
  state: ThingState;
  amortization: number;
  stolenDate?: Date;
  clientId?: string;
}

export type ThingMap = Record<string, Thing>;

export function thingArrayToMap(things: Thing[]): ThingMap {
  return things.reduce((acc, val) => ({ ...acc, [val.id]: val }), {});
}

export function randomThing(): Thing {
  return {
    amortization: 0,
    id: uuid.v4(),
    state: ThingState.Warehouse
  };
}
