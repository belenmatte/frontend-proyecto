import React, { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import './tablero.css';
import audioFile from '/public/celebration.mp3';
import { Link } from 'react-router-dom'; 
import VITE_BACKEND_URL from "../../config.js";

let id_juego;


function Juego() {
  const { id, username} = useContext(AuthContext);
  const [tablero, setTablero] = useState(false);
  const [cards, setCards] = useState({});

  let [user1, setUser1] = useState('');
  let [user2, setUser2] = useState('');
  let [user3, setUser3] = useState('');
  let [current, setCurrent] = useState('');
  let [p1, setP1] = useState(0);
  let [p2, setP2] = useState(0);
  let [p3, setP3] = useState(0);
  let [winner, setWinner] = useState('');

//llamando a start

  useEffect(() => {
    axios.post(`${VITE_BACKEND_URL}/start`, {
      id_user: parseInt(id)
    })
    .then((response) => {
      id_juego = response.data.id_juego;
      if (!response.data.jugando){
        setTablero(false);
      } else {
        setTablero(true);
        
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

//llamando a update

  useEffect(() => {
    const interval2 = setInterval(() => {
      axios.get(`${VITE_BACKEND_URL}/update/${id_juego}`)
      .then((response) => {
        setTablero(response.data.jugando);

        if (response.data.jugando){
          //nombre jugadores
          setUser1(response.data.nombre1);
          setUser2(response.data.nombre2);
          setUser3(response.data.nombre3);

          setP1(response.data.p1);
          setP2(response.data.p2);
          setP3(response.data.p3);

          setWinner(response.data.winner);
          console.log(response.data.winner);

          console.log(response.data.p1);
          console.log(response.data.p2);
          console.log(response.data.p3);

          //nombre jugador de turno
          setCurrent(response.data.current);

        }
      })
      .catch((error) => {
        console.log(error);
      })
    }, 1000);
  
  return () => {
    clearInterval(interval2);
  };
  }, []);

  useEffect(() => {
    axios.get(`${VITE_BACKEND_URL}/board/boardData`)
    .then((response) => {
       const data = response.data[0];

       const cards = {};
       data.Cards.map((card) => {
        cards[card.id] = card;
       });

       setCards(cards);

    })
    .catch((error) => {
      console.log(error);
    })
  })

  const colors = ["#D91A3D", "#1C3640", "#04B2D9"];
  const [selectedCards, setSelectedCards] = useState([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  function togglePlay() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  const toggleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  }



  // Función para obtener un color de fondo aleatorio de la lista
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [flippedCards, setFlippedCards] = useState([]);
  const [cardColors, setCardColors] = useState({});

  const handleCardClick = (index, card) => {
    if (current === username) {
      if (flippedCards.includes(index)) {
        // Card is already flipped, flip it back
        const newFlippedCards = flippedCards.filter((cardIndex) => cardIndex !== index);
        setFlippedCards(newFlippedCards);
      } else {

        // Generate a new color for the clicked card
        const newCardColors = { ...cardColors };
        newCardColors[index] = getRandomColor();
        setCardColors(newCardColors);

        if (selectedCards.length < 2) {
          console.log("son menos de 2");
          // Card is not flipped and less than 2 cards are selected, flip it and add to selectedCards
          const newFlippedCards = [...flippedCards, index];
          setFlippedCards(newFlippedCards);
          setSelectedCards([...selectedCards, card]);

          console.log(selectedCards);
    
          if (selectedCards.length === 1) {
            console.log("dos seleccionadas");
    
            // Aquí puedes realizar la solicitud Axios al backend con los IDs de las dos cartas
            console.log(selectedCards[0].id,);
            console.log(card.id);
            axios.post(`${VITE_BACKEND_URL}/turno`, {
              idCarta1: parseInt(selectedCards[0].id),
              idCarta2: parseInt(card.id)
            })
            .then((response) => {
              setCurrent(response.data.siguiente_username);

              if (response.data.adivino === false || response.data.adivino === "false") {
                setTimeout(() => {
                  const newFlippedCards = flippedCards.filter((cardIndex) =>
                    cardIndex !== selectedCards[0].id && cardIndex !== card.id
                  );
                  setFlippedCards(newFlippedCards);
                }, 1000);
              } else {
                setTimeout(() => {}, 1000);
              }
              
            })
            .catch((error) => {
              console.log(error);
            });
    
            // Limpiar las cartas seleccionadas después de enviar la información al backend
            setSelectedCards([]);
          }
        }
      }
    }
  }

  return (

    
    <main className="contentx">

      {((tablero === "false" || tablero === false) && (winner === '')) && 
      
      <div className = "esperando">

        <h3 className = "locas">Esperando a otros jugadores </h3>
        <img src="/gif.gif" alt="GIF animado" />
      
      </div>}

      {(tablero === "true" || tablero === true && (winner === '')) &&
      <div className="container-tablero">
        <div className="column-left">

          <div className="content1">
            <h1 className= "estadisticas">THIS <span className="name"> GAME </span></h1>
            <br></br>

            <div className= "content2">
              <div className="info">
              <div className="info-row">
                  <h3 className= "puntaje">PUNTAJES</h3>
                  <br></br>
                  <h3 className= "info"> {user1}: {p1}</h3>
                  <h3 className= "info"> {user2}: {p2}</h3>
                  <h3 className= "info"> {user3}: {p3}</h3>

                </div>
                <div className="info-row">
                  <br>
                  </br>
                  <h3 className="puntaje">TURNO DE: </h3>
                  <br></br>
                  <h3 className= "info2"> {current} </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column-right">
          <div className="content">
            <section className="card-section">
              <div className="board-container">

                {Object.values(cards).map((card) => (
                  <div
                    key={card.id}
                    className={`card rounded ${flippedCards.includes(card.id) ? 'flipped' : ''}`}
                    onClick={() => handleCardClick(card.id, card)}
                  >

                    {(card.is_hidden === false) &&
                    <div className="card-inner">
                      <div className="card-front" style={{ backgroundColor: cardColors[card.id]}}>
                        <div className="card-img">
                          <img src="/cerebro.png" alt="Front" />
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="card-img">
                          <img src={card.image} alt="Back" />
                        </div>
                      </div>
                    </div>}

                  </div>
                ))}

              </div>
            </section>
          </div>
        </div>
      </div>}

      {(winner !== '') &&

        <div className = "ganador">
        <img src="/feliz.gif" alt="GIF animado" />
        <h1> El juego <span className="name">ha terminado</span>  </h1>
        <h2> {winner}, ¡Que buena memoria! </h2>
        <br></br>
        <Link className="contact-button" to="/mainpage">
          Volver a jugar
        </Link>
        <audio ref={audioRef} src={audioFile} autoPlay loop />
        </div>
      }

      
    </main>
  );
}


export default Juego;