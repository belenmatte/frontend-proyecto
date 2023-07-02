import React from "react";
import './mainpage.css';
import { Link } from 'react-router-dom'; 

function MainPage() {
  return (
    <main className="content">

        <div className="content">
          
          <div className="container1">

            <h1 className="titulo1">¿ Qué es <span className="name">Memory Challenge</span> ?</h1>

            <p> Memory Challenge es un juego de memorice online en el que debes encontrar la mayor cantidad de parejas de cartas iguales para ganar. Se compite contra dos contrincantes, los que por turnos escogeran cartas para encontrar las parejas. También puedes aumentar la dificultad jugando con un mayor número de cartas.</p>
            <br></br>
            <br></br>
            <img src="/fight.png" />
            <br></br>
            <Link className="contact-button" to="/tablero">
              COMENZAR PARTIDA
            </Link>
            <br></br>

          </div>


        </div>
    </main>
  )
}

export default MainPage;