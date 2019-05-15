import React, { useState, useEffect } from 'react';
import './App.css';
import { BarChart } from './components/BarChart'
import { RadialChart } from './components/RadialChart'
import { LineChart } from './components/LineChart'

function App() {
  const [data, setData] = useState({
    sf: [],
    ny: []
  });
  const [loc, setLoc] = useState("sf");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    Promise.all([
      fetch(`https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/ny.json`),
      fetch(`https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json`)
    ]).then(resps => Promise.all(resps.map(resp => resp.json())))
      .then(([ny, sf]) => {
        console.log(ny)
        setData((prevState) => Object.assign(prevState, { sf: [...sf], ny: [...ny] }));
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    setLoc("sf")
  }, [data])

  const handleCityChange = (e) => {
    setLoc(e.target.value)
  }

  return (
    <div className="App">
      <select defaultValue="sf" onChange={handleCityChange}>
        <option value="sf">San Francisco</option>
        <option value="ny">New York</option>
      </select>
      {isLoading ? <p>Loading…</p> :
        <div>
          <BarChart data={data[loc]} canvas={{ width: 600, height: 400 }} />
          <RadialChart data={data[loc]} canvas={{ width: 600, height: 600 }} />
          <LineChart data={data[loc]} canvas={{ width: 600, height: 400 }} />
        </div>
      }
    </div>
  );
}

export default App;
