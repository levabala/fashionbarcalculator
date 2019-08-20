import uuid from 'uuid';

import { Subscription } from './Subscription';
import { ThingMap } from './Thing';

export interface Client {
  id: string;
  entryDate: Date;
  subscription: Subscription;
  thingsIsUse: ThingMap;
}

export function randomClient({
  daysBack,
  daysForward,
  subscriptionCost
}: {
  daysBack?: number;
  daysForward?: number;
  subscriptionCost?: number;
} = {}): Client {
  const dayMultiplier = 1000 * 60 * 60 * 24;
  const end = new Date(
    Date.now() + Math.random() * (daysForward || 5) * dayMultiplier
  );
  const entryDate = new Date(
    Date.now() - Math.random() * (daysBack || 15) * dayMultiplier
  );
  return {
    entryDate,
    id: uuid.v4(),
    subscription: {
      cost: subscriptionCost || 12,
      end,
      start: new Date(
        Date.now() - (Date.now() - entryDate.valueOf()) * Math.random() * 0.7
      )
    },
    thingsIsUse: {}
  };
}
