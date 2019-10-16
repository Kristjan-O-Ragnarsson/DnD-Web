import React, {Component, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// Fetching data with react hooks: https://www.robinwieruch.de/react-hooks-fetch-data

function App() {
  const [data, setData] = useState({hits: []});
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.open5e.com/classes/");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
