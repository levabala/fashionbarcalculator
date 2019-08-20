import { Thing, thingArrayToMap, ThingMap } from './Thing';

export interface Warehouse {
  things: ThingMap;
  sendingCost: number;
  maxThingsPerClient: number;
}

export function addThing(warehouse: Warehouse, thing: Thing): Warehouse {
  return {
    ...warehouse,
    things: { ...warehouse.things, [thing.id]: thing }
  };
}

export function addThings(warehouse: Warehouse, things: Thing[]): Warehouse {
  return {
    ...warehouse,
    things: { ...warehouse.things, ...thingArrayToMap(things) }
  };
}
