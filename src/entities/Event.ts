export interface RootEvent {
  date: Date;
  id: string;
}

export interface ClientRegisterEvent extends RootEvent {
  clientId: string;
  kind: "ClientRegisterEvent";
}

export interface ThingLostEvent extends RootEvent {
  losterId: string;
  kind: "ThingLostEvent";
}

export interface ThingRequestedEvent extends RootEvent {
  clientId: string;
  thingId: string;
  kind: "ThingRequestedEvent";
}

export interface ThingReturnedEvent extends RootEvent {
  returnerId: string;
  thingId: string;
  kind: "ThingReturnedEvent";
}

export type Event =
  | ClientRegisterEvent
  | ThingRequestedEvent
  | ThingReturnedEvent
  | ThingLostEvent
  | RootEvent;

export type RegularEvent =
  | ClientRegisterEvent
  | ThingRequestedEvent
  | ThingReturnedEvent
  | ThingLostEvent;

export function isRootEvent(event: Event): event is RootEvent {
  return !("kind" in event);
}
