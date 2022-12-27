import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const apiBaseURL = 'http://localhost:8080';

function App() {

  const [userList, setUserList] = useState([]);

  const skip = useRef(0);
  const limit = useRef(1);
  const [player, setPlayer] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    //with access_token in response    
    // if (localStorage.getItem('access_token')) {
    //   setIsLoggedIn(true);
    //   getUserList();
    // } else {
    //   setIsLoggedIn(false);
    // }

    //with access_token in cookie
    if (localStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(true);
      // getUserList();
      getPlayerList();
    } else {
      setIsLoggedIn(false);
    }
  }, [])

  const getUserList = () => {
    axios.get(`${apiBaseURL}/users`, {
      // headers: {
      // authorization: localStorage.getItem('access_token')
      // }
      withCredentials: true
    }).then(res => {
      if (res.status === 200 && res.data && res.data.userList) {
        setUserList(res.data.userList);
      }
    }).catch(err => {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        // setIsLoggedIn(false);
        // localStorage.removeItem('isLoggedIn');
        axios.get(`${apiBaseURL}/auth/refresh`, { withCredentials: true }).then(res => {
          if (res.status === 200) {
            getUserList();
          }
        }).catch(err => {
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
          }
        })
      }
    });
  }

  const getPlayerList = () => {
    axios.get(`${apiBaseURL}/players?skip=${skip.current}&limit=${limit.current}`, { withCredentials: true }).then(res => {
      if (res.status === 200 && res.data && res.data.playerList && res.data.playerList.length) {
        const fetchedPlayer = res.data.playerList[0];
        fetchedPlayer.totalRecords = res.data.totalRecords ? res.data.totalRecords : null;
        setPlayer(fetchedPlayer);
      }
    })
  }

  const handleLogin = () => {
    // Username: a@b.com
    // Password: Welcome@123
    if (userName && password) {
      axios.post(`${apiBaseURL}/auth/login`, {
        "userName": userName,
        "password": password
      }, { withCredentials: true }).then(res => {
        //with access_token in response
        // if (res && res.data && res.status === 200 && res.data.access_token) {

        //with access_token in cookie
        if (res && res.data && res.status === 200) {
          //with access_token in response
          // localStorage.setItem('access_token', res.data.access_token);

          //with access_token in cookie
          localStorage.setItem('isLoggedIn', true);
          setIsLoggedIn(true);
          setTimeout(() => {
            // getUserList();
            getPlayerList();
          }, 100);
        }
      });
    } else {
      alert('Username and Password are required');
    }
  }

  return (
    <>
      {isLoggedIn ? <div>
        <div>
          {/* User List
          {JSON.stringify(userList)} */}

          <br />

          <h1>Player List</h1>
          <hr />
          {Object.keys(player).length
            ?
            <>
              <h3>Name: {player.name}</h3>
              <h3>Sports: {player.sports}</h3>
              <h3>Country: {player.country}</h3>
              <h3>Club: {player.club}</h3>
              <h3>Total Records: {player.totalRecords}</h3>
              <img src={`${apiBaseURL}/public/images/players/${player.image}`} alt='player_image'></img>
              <br />
              <button disabled={skip.current === 0 ? true : false} onClick={() => {
                skip.current = skip.current - 1;
                getPlayerList();
              }}>{'<Previous'}</button>&nbsp;&nbsp;&nbsp;
              <button disabled={skip.current + 1 === player.totalRecords} onClick={() => {
                skip.current = skip.current + 1;
                getPlayerList();
              }}>{'Next>'}</button>
            </>
            : ''}
        </div>
      </div> :
        <div>
          Login
          Username: <input onChange={(e) => {
            setUserName(e.target.value);
          }} />
          Password: <input type="password" onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <button onClick={handleLogin}>Login</button>
        </div>
      }
    </>
  );
}

export default App;
