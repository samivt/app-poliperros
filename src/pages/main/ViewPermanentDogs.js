import React, { useState } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ViewPermanentDogs.css";

const ViewDogs = ({ nameDog, imageDog, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`view-dog ${isExpanded ? "expanded" : ""}`}>
      <img src={imageDog} alt={nameDog} />
      <p id="nameDog">{nameDog}</p>
      {isExpanded && (
        <div className="dog-description">
          <p>{description}</p>
        </div>
      )}
      <button onClick={handleToggleExpand}>
        {isExpanded ? "Ver menos" : "Ver más"}
      </button>
    </div>
  );
};

const Dogs = () => {
  return (
    <div>
      <Navbar />
      <section className="view-info">
        <h2>Poli Perros</h2>
        <div className="view-container">
          <ViewDogs
            imageDog={require("../../assets/images/Max.jpg")}
            nameDog="Max"
            description="Max es un querido perro comunitario de la Escuela Politécnica Nacional. 
            A sus 14 años, es un mestizo de pelaje marrón claro con manchas blancas. Su personalidad tranquila y cariñosa lo convierte en el favorito de estudiantes y profesores. A menudo lo verás descansando bajo una sombra, 
            disfrutando de la compañía y el cariño de la comunidad que lo adora."
          />
          <ViewDogs
            imageDog={require("../../assets/images/Asiri.jpg")}
            nameDog="Asiri"
            description="Asiri es un encantador perro comunitario de 8 años que vive en la Escuela Politécnica Nacional. 
            Con su pelaje suave y brillante, de color negro y marrón, se ha ganado el cariño de todos. Su personalidad juguetona y amigable lo convierte en el compañero perfecto para los estudiantes. A menudo lo verás correteando por el campus, siempre listo para jugar o recibir un poco de atención y cariño. Asiri es un símbolo de alegría y comunidad en la escuela.

"
          />
          <ViewDogs
            imageDog={require("../../assets/images/Bruna.jpg")}
            nameDog="Bruna"
            description="Bruna es una energética perrita de 5 años que forma parte de la comunidad de la Escuela Politécnica Nacional. Con su pelaje corto y oscuro, y ojos vivaces, Bruna es conocida por su curiosidad y su amor por explorar cada rincón del campus. Su carácter juguetón y afectuoso la hace popular entre los estudiantes, 
            quienes la buscan para compartir momentos de alegría. Siempre está lista para recibir una caricia o un juego rápido.."
          />
          <ViewDogs
            imageDog={require("../../assets/images/Franzua.jpg")}
            nameDog="Franzúa"
            description="Franzua es un alegre perro de 4 años que se ha convertido en parte integral de la vida en la Escuela Politécnica Nacional. Su pelaje de color blanco y manchas negras, junto con su energía inagotable, lo hacen inconfundible. Siempre está dispuesto a correr y jugar con los estudiantes, irradiando entusiasmo y vitalidad. Franzua es conocido 
            por su actitud amigable y su amor por la compañía, lo que lo convierte en un querido amigo de la comunidad."
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dogs;
