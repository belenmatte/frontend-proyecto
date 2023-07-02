import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './login.css';
import Login from './Login';
import VITE_BACKEND_URL from "../../config.js";


function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const [msg_error, setMsg_error] = useState("");
    const [redirectLogin, setLogin] = useState(false);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        axios.post(`${VITE_BACKEND_URL}/signup`, {
            username: username,
            email: email,
            password: password
          })
          .then((response) => {
            console.log('Registro exitoso! Ahora inicia sesión');
            setError(false);
            setMsg('Registro exitoso! Ahora inicia sesión');
            setLogin(true);
          })
          .catch((error) => {   
            setError(true);
            setMsg('');
            console.log("Error entrada");
            if (error.response && error.response.data.exists) {
              setMsg_error('Ya existe un usuario con ese email.');
            } else {
              setMsg_error("Ya existe un usuario con ese username.");
            };
          });
        }

        if (redirectLogin) {
            return <Login />;
        }

  return (
    <main className="content">
        <div className="bg-container"></div>
        <div className="content">
            <h1> Registrar <span className="name">Usuario</span>  </h1>

            <form onSubmit={handleSubmit}>
                <label>
                  Username:
                  <input 
                      type="username" 
                      name="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                  />
                </label>
                <label>
                  Email:
                  <input 
                      type="email" 
                      name="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                  />
                  </label>
                  <label>
                  Password:
                  <input 
                      type="password" 
                      name="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                  />
                  </label>
                  <input type="submit" value="Enviar" />
            </form>
        </div>
    </main>
  )
}

export default Signup;