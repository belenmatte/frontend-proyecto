import React , { useState, useRef } from "react";
import './about-us.css'
import audioFile from '/public/Flowers.mp3';



function AboutUs() {

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

  return (
    <main className="content">
      <div className="bg-container"></div>
      <div className="content">
        <div className="titulo">
          <h1> Nuestro <span className="name">Equipo</span>  </h1>
        </div>
        
        <div className="container-au">
          <div className="box">
            <h3>Belén Matte Subercaseaux</h3>
            <img src="belen.png" alt="Imagen 1" />
            <br></br>
            <h4>Estudiante de 4° año de Ingeniería de la UC.</h4>


            <h4>Tiene major en ingeniería de software. Se encarga de la lógica del juego.</h4>

            <br></br>
            <div className="contact-button">
              Contactar
            </div>
            
          </div>
          <div className="box">
            <h3>Amelia Iacobelli Ovalle</h3>
            <img src="amelia.png" alt="Imagen 1" />
            <br></br>
            <h4>Estudiante de 4° año de Ingeniería de la UC.</h4>


            <h4>Tiene major en ingeniería de software. Se encarga de la gráfica del juego.</h4>

            <br></br>
            <div className="contact-button">
              Contactar
            </div>
          </div>

        </div>

        <br></br>

        <div>
          <audio ref={audioRef} src={audioFile} autoPlay loop />
          <button className= "sonido" onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>

      </div>
    </main>
  )
}

export default AboutUs;