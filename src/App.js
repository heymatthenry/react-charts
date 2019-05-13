import React, { useState, useEffect } from 'react';
import './App.css';
import { BarChart } from './components/BarChart'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json');
      const json = await resp.json();
      setData((prevState) => [...prevState, ...json]);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <BarChart data={data} canvas={{ width: 600, height: 400 }} />
    </div>
  );
}

export default App;
