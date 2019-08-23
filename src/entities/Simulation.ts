import uuid from 'uuid';

import { Client } from './Client';
import { ClientRegisterEvent, Event, ThingRequestedEvent } from './Event';
import { EventChain } from './EventChain';
import { appendItemToList, initList } from './LinkedList';
import { sendThing, Warehouse } from './Warehouse';

export interface Simulation {
  warehouse: Warehouse;
  clients: Client[];
  eventChain: EventChain;
}

export function initSimulation(
  warehouse: Warehouse,
  clients: Client[] = []
): Simulation {
  return {
    clients,
    eventChain: initList<Event>({ date: new Date(), id: uuid.v4() }),
    warehouse
  };
}

export function addClient(
  simulation: Simulation,
  client: Client,
  date: Date
): Simulation {
  const appendClientEvent: ClientRegisterEvent = {
    clientId: client.id,
    date,
    id: uuid.v4(),
    kind: "ClientRegisterEvent"
  };

  return {
    clients: [...simulation.clients, client],
    eventChain: appendItemToList(simulation.eventChain, appendClientEvent),
    warehouse: simulation.warehouse
  };
}

export function requestThing({
  simulation,
  clientId,
  thingId,
  date
}: {
  simulation: Simulation;
  clientId: string;
  thingId: string;
  date: Date;
}): Simulation {
  const { warehouse } = simulation;
  const newWarehouse = sendThing({
    clientId,
    date,
    thingId,
    warehouse
  });

  const requestThingEvent: ThingRequestedEvent = {
    clientId,
    date,
    id: uuid.v4(),
    kind: "ThingRequestedEvent",
    thingId
  };

  return {
    ...simulation,
    eventChain: appendItemToList(simulation.eventChain, requestThingEvent),
    warehouse: newWarehouse
  };
}

export function eventToString(event: Event): string {
  // function printRegularEvent(regularEvent: RegularEvent) : void {
  //   switch(regularEvent.kind) {
  //     case "ClientRegisterEvent":
  //       const {clientId} = regularEvent;
  //       console.log({})
  //   }
  // }

  // const rootEvent = isRootEvent(event);
  const entities = Object.entries(event);
  const s = entities.map(([key, value]) => `${key}: ${value}`).join("\n");
  return s;
}
