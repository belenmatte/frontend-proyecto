import React, { useState, useEffect } from "react";
import "./instructions.css";

function Instructions() {
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);
  const [showText5, setShowText5] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showAttackPopup, setShowAttackPopup] = useState(false);
  const [showTimerPopup, setShowTimerPopup] = useState(false);
  const [showFullScreenPopup, setShowFullScreenPopup] = useState(false);
  const [showButtons, setShowButtons] = useState(false);


  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShowText2(true);
    }, 3000);

    const timeout2 = setTimeout(() => {
      setShowText3(true);
    }, 6000);

    const timeout3 = setTimeout(() => {
      setShowText4(true);
    }, 9000);

    const timeout4 = setTimeout(() => {
      setShowText5(true);
      setShowButtons(true)
    }, 12000);


    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(10);
    }
    return () => clearInterval(interval);
  }, [timer]);


  const handleAttackClick = () => {
    setShowFullScreenPopup(true);
    setShowAttackPopup(true);
  };

  const handleTimerClick = () => {
    setShowFullScreenPopup(true);
    setShowTimerPopup(true);
  };

  const handleClosePopup = () => {
    setShowFullScreenPopup(false);
    setShowAttackPopup(false);
    setShowTimerPopup(false);
  };

  return (
    <main className="content">
      <div className="bg-container"></div>
      <div className="content">
            <h1>¿CÓMO <span className="name">JUGAR</span>?</h1>
            <br></br>
          <div className="steps"> 
            <h4>1. En primer lugar, debes elegir el tema de las tarjetas a adivinar, pudiendo ser animales, personas, u objetos, entre otros.</h4>


            {showText2 && <h4>2. Las tarjetas se mostrarán por un lapso de tiempo y luego se voltearán.</h4>}


            {showText3 && <h4>3. Tu misión es encontrar la mayor cantidad de pares de tarjetas iguales.</h4>}


            {showText4 && <h4>4. Si el par que seleccionas es correcto, tienes más tiempo para buscar otro, hasta equivocarte.</h4>}


            {showText5 && <h4>5. Puedes seleccionar dos tipos de partida: </h4>}
          </div>
          <br></br>
          {showButtons && (
          <section>
            <div className="container-au">
              <div className="mode-button" onClick={handleTimerClick}>
                MODO CONTRARELOJ
              </div>
              <div className="mode-button" onClick={handleAttackClick}>
                MODO ATAQUE
              </div>
            </div>
          </section>
          )}

          {showFullScreenPopup && (
            <div className="fullscreen-popup" onClick={handleClosePopup}>
              {showAttackPopup && (
              <div className="popup">
                <div className="popup-close" onClick={handleClosePopup}> X</div>

                  <div class="card rounded" className= {`attack-card ${timer % 2 == 0 ? 'yes' :  timer % 2 != 0? 'no' : 'red'}`}>
                    <img src="public/brain.png" alt="LOGO" className="card-img"></img>
                  </div>
                  <br>
                  </br>
                  <div className="popup-title">
                    <h2>ATAQUE</h2>
                  </div>  
                  <div className="popup-content">
                  <p>
                    En esta modalidad, jugarás contra un oponente al otro lado de la pantalla, cada uno en su respectivo turno. 
                  </p>
                  <p>
                    Cuando el oponente seleccione dos tarjetas, aparecerán iluminadas en tu pantalla, como muestra la figura. 
                  </p>
                  <p>
                    El jugador/a que más pares de tarjetas obtenga, ganará la partida.
                  </p>
                  <br>
                  </br>
                </div>
              </div>  
              )}


              {showTimerPopup && (
                <div className="popup">
                  <div className="popup-close" onClick={handleClosePopup}> X</div>
                  <div className="popup-title">
                    <h2>CONTRARELOJ</h2>
                  </div>  
                  <div className="popup-content">
                    <div className= {`circle ${timer >= 7 ? 'green' : timer >= 4 ? 'yellow' : 'red'}`} align-items:center>
                      <p>{timer}</p>
                    </div>
                    <br>
                    </br>
                    <p>En este modo, tendrás un tiempo limitado para completar el juego.</p>
                    <p>Una vez que el reloj llega a 0, se acabó tu oportunidad y es hora de contar los puntos.</p>
                    <p>Mientras más parejas hayas juntado, mayor será la cantidad de puntos.</p>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </main>
  );
}

export default Instructions;