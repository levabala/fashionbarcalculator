import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const Plots = () => {
  return (
    <VictoryChart theme={VictoryTheme.grayscale}>
      <VictoryLine
        samples={15}
        y={d => Math.sin(5 * Math.PI * d.x)}
        interpolation="basis"
      />

      <VictoryLine
        samples={15}
        y={d => Math.cos(5 * Math.PI * d.x)}
        interpolation="linear"
        style={{ data: { stroke: "red" } }}
      />
    </VictoryChart>
  );
};

export default Plots;
