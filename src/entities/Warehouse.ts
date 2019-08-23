import uuid from 'uuid';

import { throwNoSuchThingError } from './Errors';
import { Sending } from './Sending';
import { Thing, thingArrayToMap, ThingMap, ThingState } from './Thing';

export interface Warehouse {
  things: ThingMap;
  sendings: Record<string, Sending>;
  sendingCost: number;
  maxThingsPerClient: number;
  amortizationPerUsing: number;
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

export function sendThing({
  warehouse,
  thingId,
  clientId,
  date
}: {
  warehouse: Warehouse;
  thingId: string;
  clientId: string;
  date: Date;
}): Warehouse {
  const thing = warehouse.things[thingId] || throwNoSuchThingError();
  const sending: Sending = {
    cost: warehouse.sendingCost,
    dispatch: date,
    id: uuid.v4(),
    targetId: clientId,
    thingId: thing.id
  };

  const newThing: Thing = {
    ...thing,
    amortization: thing.amortization + warehouse.amortizationPerUsing,
    clientId,
    state: ThingState.Transporting
  };

  return {
    ...warehouse,
    sendings: { ...warehouse.sendings, [sending.id]: sending },
    things: { ...warehouse.things, [thing.id]: newThing }
  };
}
