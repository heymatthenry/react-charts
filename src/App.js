import React, { useState, useEffect } from 'react';
import './App.css';
import { BarChart } from './components/BarChart'
import { RadialChart } from './components/RadialChart'
import { LineChart } from './components/LineChart'

function App() {
  const [data, setData] = useState([]);
  const [loc, setLoc] = useState("sf");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/${loc}.json`);
      const json = await resp.json();
      setData(() => [...json]);
    }

    fetchData();
  }, [loc]);

  const handleCityChange = (e) => {
    setLoc(e.target.value)
  }

  return (
    <div className="App">
      <select defaultValue="sf" onChange={handleCityChange}>
        <option value="sf">San Francisco</option>
        <option value="ny">New York</option>
      </select>
      <BarChart data={data} canvas={{ width: 600, height: 400 }} />
      <RadialChart data={data} canvas={{ width: 600, height: 600 }} />
      <LineChart data={data} canvas={{ width: 600, height: 400 }} />
    </div>
  );
}

export default App;
