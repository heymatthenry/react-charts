import React from 'react';
const d3 = require('d3');

export const LineChart = ({ data, canvas }) => {
  const [w, h] = [canvas.width, canvas.height];

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => new Date(d.date)))
    .range([0, w]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(data, d => +d.low), d3.max(data, d => +d.high)])
    .range([h, 0]);

  const highLine = d3.line()
    .x(d => xScale(new Date(d.date)))
    .y(d => yScale(+d.high))

  const lowLine = d3.line()
    .x(d => xScale(new Date(d.date)))
    .y(d => yScale(+d.low))

  return (
    <svg height={h} width={w}>
      <path d={highLine(data)} stroke="#eb6a5b" strokeWidth="2" fill="none" />
      <path d={lowLine(data)} stroke="#52b6ca" strokeWidth="2" fill="none" />
    </svg>
  )
}
