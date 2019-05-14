import React from 'react';
const d3 = require('d3');

export const RadialChart = ({ data, canvas }) => {
  const [w, h] = [canvas.width, canvas.height];

  const radiusScale = d3.scaleLinear()
    .domain([d3.min(data, d => +d.low), d3.max(data, d => +d.high)])
    .range([0, w / 2]);

  const [minAvg, maxAvg] = d3.extent(data, d => d.avg);
  const colorScale = d3.scaleSequential(d3.interpolateSpectral)
    .domain([maxAvg, minAvg]);

  const arc = d3.arc()
  const anglePerSlice = 2 * Math.PI / data.length;

  const radialChartData = data.map((d, i) => ({
    fill: colorScale(+d.avg),
    path: arc({
      startAngle: i * anglePerSlice,
      endAngle: (i + 1) * anglePerSlice,
      innerRadius: radiusScale(+d.low),
      outerRadius: radiusScale(+d.high),
    })
  }))

  const slices = radialChartData.map((d, i) => (
    <path d={d.path}
      fill={d.fill}
      key={`slice-${i}`}
    />))

  return (
    <svg height={h} width={w}>
      <g transform={`translate(${w / 2}, ${w / 2})`}>
        {slices}
      </g>
    </svg>
  )
}
