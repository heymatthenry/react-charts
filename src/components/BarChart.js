import React from 'react';
import * as d3 from 'd3';

export const BarChart = ({ data, canvas }) => {
  const [h, w] = [canvas.height, canvas.width]

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([0, w]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.high)])
    .range([h, 0]);

  const [minAvg, maxAvg] = d3.extent(data, d => d.avg);
  const colorScale = d3.scaleSequential(d3.interpolateSpectral)
    .domain([maxAvg, minAvg]);

  const bars = data.map((d, i) => (
    <rect x={xScale(new Date(d.date))}
      key={`bar-${i}`}
      y={yScale(+d.high)}
      height={yScale(+d.low) - yScale(+d.high)}
      width={w / data.length}
      fill={colorScale(+d.avg)}
    />
  ))

  return (
    <svg height={h} width={w}>
      {bars}
    </svg>
  )
}
