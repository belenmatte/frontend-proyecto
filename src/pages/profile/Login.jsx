import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';
import './login.css';
import MainPage from '../MainPage/MainPage';


function Login() {
    const { token, setToken, id, setId, username, setUsername} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const [redirectToMainPage, setRedirectToMainPage] = useState(false);

    useEffect(() =>{
        if (token != null && token != "null") {
            setMsg(`¡Hola ${username}!`);
        } else {
            setMsg("");
        }
    }, [token]);
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email: email,
                password: password
            }).then((response) => {
                console.log(`LA respuesta es ${response.data.username}`);
                console.log('Login successful');
                setError(false);
                setId(parseInt(response.data.id));
                setUsername(response.data.username);
                localStorage.setItem('id', id);
                localStorage.setItem('username', username);
                // Recibimos el token y lo procesamos
                const access_token = response.data.access_token;
                setToken(access_token);
                console.log("Se seteo el token: ", token);

                setRedirectToMainPage(true);
                
            }).catch((error) => {
                console.error('An error occurred while trying to login:', error);
                setError(true);// aquí puede haber más lógica para tratar los errores
            })

        };

        if (redirectToMainPage) {
            return <MainPage />;
        }

  return (
    <main className="content">
        <div className="bg-container"></div>
        <div className="content">
            <h1> Inicia <span className="name">Sesión</span>  </h1>

            {(token != "null" && token != null) && <h2> {msg} </h2>}

            {error && <div className="error">No se pudo iniciar sesión, intenta de nuevo.</div>}
            {(token === "null" || token === null) && 
              <form onSubmit={handleSubmit}>
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
              </form>}
        </div>
    </main>
  )
}

export default Login;