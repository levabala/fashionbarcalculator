import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { randomClient } from './entities/Client';
import { extractItemData, listToArray } from './entities/LinkedList';
import { addClient, eventToString, initSimulation, requestThing } from './entities/Simulation';
import { randomThing, thingArrayToMap } from './entities/Thing';

const GlobalStyle = createGlobalStyle`
	body {  
		color: whitesmoke;
	}
`;

const MainWrapper = styled.div`
  background: darkgreen;
`;

const simulation = initSimulation(
  {
    amortizationPerUsing: 1,
    maxThingsPerClient: 2,
    sendingCost: 6,
    sendings: {},
    things: thingArrayToMap(new Array(5).fill(null).map(() => randomThing()))
  },
  new Array(2).fill(null).map(() => randomClient())
);

const s1 = addClient(simulation, randomClient(), new Date());
const s2 = addClient(s1, randomClient(), new Date());

const thingRequestingId = Object.values(s2.warehouse.things)[0].id;
const clientRequestingId = s2.clients[0].id;
const s3 = requestThing({
  clientId: clientRequestingId,
  date: new Date(),
  simulation: s2,
  thingId: thingRequestingId
});

const allEvents = listToArray(s3.eventChain).map(eventItem =>
  extractItemData(eventItem)
);
const s = allEvents
  .map(event => eventToString(event))
  .map((eventString, i) => `${i}\n${eventString}`)
  .join("\n\n");
console.log(s);

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <MainWrapper />
    </>
  );
};

export default App;
