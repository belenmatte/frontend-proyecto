import React from "react";
import { Link } from "react-router-dom";
import './landing.css'

function LandingPage() {
  return (
    <main className="content">
        <div className="bg-container"></div>
        <div className="content">
            <div className="image-block">
                <img src="/logo.png" />
            </div>
            <h2> ¡Pon a prueba tu memoria y concentración y conviertete en el ganador!</h2>
            <p>Juega memorice contra un contrincante, junta la mayor cantidad de pares y gana.</p>
            <Link className="play-button" to="/login">
              Inicia Sesión
            </Link>
        </div>
    </main>
  )
}

export default LandingPage;