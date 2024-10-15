import React from "react";
import Navbar from "../components/Navbar";
import InfoDogs from "../components/InfoDogs";
import Footer from "../components/Footer";
import "../assets/styles/PermanentDogs.css";

const PermanentDogs = () => {
  return (
    <div>
      <Navbar />
      <section className="info-dog-section">
        <h2>Perros Permanentes</h2>
        <div className="info-dog-container">
          <InfoDogs
            image={require("../assets/images/max.jpg")}
            name="Max"
            age="14 años"
            about="Max es un querido perro comunitario de la Escuela Politécnica Nacional. 
            A sus 14 años, es un mestizo de pelaje marrón claro con manchas blancas. Su personalidad tranquila y cariñosa lo convierte en el favorito de estudiantes y profesores. A menudo lo verás descansando bajo una sombra, disfrutando de la compañía y el cariño de la comunidad que lo adora."
            available={false}
          />
          <InfoDogs
            image={require("../assets/images/max.jpg")}
            name="Asiri"
            age="8 años"
            about="Asiri es un encantador perro comunitario
             de 8 años que vive en la Escuela Politécnica Nacional. Con su pelaje suave y brillante, de color negro y marrón, se ha ganado el cariño de todos. Su personalidad juguetona y amigable lo convierte en el compañero perfecto para los estudiantes. A menudo lo verás correteando por el campus, siempre listo para jugar o recibir un poco de atención y cariño. 
             Asiri es un símbolo de alegría y comunidad en la escuela."
            available={false}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default PermanentDogs;
