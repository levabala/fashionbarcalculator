import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { randomClient } from './entities/Client';
import { listToArray } from './entities/LinkedList';
import { addClient, initSimulation } from './entities/Simulation';
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
    maxThingsPerClient: 2,
    sendingCost: 6,
    things: thingArrayToMap(new Array(5).fill(null).map(() => randomThing()))
  },
  new Array(2).fill(null).map(() => randomClient())
);

const s1 = addClient(simulation, randomClient(), new Date());
const s2 = addClient(s1, randomClient(), new Date());

console.log(listToArray(s2.eventChain));

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <MainWrapper />
    </>
  );
};

export default App;
