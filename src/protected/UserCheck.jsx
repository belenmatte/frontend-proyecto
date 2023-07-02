import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import VITE_BACKEND_URL from "../config.js";

const UserCheck = () => { 
  const { token } = useContext(AuthContext)
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log(token);
    axios({
      method: 'get',
      url: `${VITE_BACKEND_URL}/scope/protecteduser`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("Enviaste yn token bueno");
        console.log(response);
        setMsg(response.data.message);
      })
      .catch(error => {
        console.log("Error");
        console.log(error);
        setMsg(error.message);
      });
  }, []);


  return (
    <h1>
      {msg}
    </h1>
  );
}

export default UserCheck;