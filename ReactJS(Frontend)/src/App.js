import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
const apiUrl = 'http://localhost:8080';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/players/1824t39y2`).then(res => {
      if (res.status === 200 && res.data && res.data.playerList && res.data.playerList.length) {
        setData(res.data.playerList);
      }
    })
  }, [])

  return (
    <div className="App">
  {JSON.stringify(data)}
    </div>
  );
}

export default App;
