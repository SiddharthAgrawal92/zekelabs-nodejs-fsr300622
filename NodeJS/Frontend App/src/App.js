import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const apiBaseURL = 'http://localhost:8080';

function App() {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseURL}/users`).then(res => {
      if (res.status === 200 && res.data && res.data.userList) {
        setUserList(res.data.userList);
      }
    })
  }, [])
  return (
    <div>
      User List
      {JSON.stringify(userList)}
    </div>
  );
}

export default App;
