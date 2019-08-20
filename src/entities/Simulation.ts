import uuid from 'uuid';

import { Client } from './Client';
import { ClientRegisterEvent, Event } from './Event';
import { EventChain } from './EventChain';
import { appendItemToList, initList } from './LinkedList';
import { Warehouse } from './Warehouse';

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
