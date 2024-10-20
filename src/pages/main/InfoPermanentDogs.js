import React from "react";
import Navbar from "../../components/main/Navbar";
import InfoDogs from "../../components/main/InfoDogs";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/InfoPermanentDogs.css";

const InfoPermanentDogs = () => {
  return (
    <div>
      <Navbar />
      <section className="info-dog-section">
        <h2>Poli Perros</h2>
        <div className="container">
          <InfoDogs
            image={require("../../assets/images/max.jpg")}
            name="Max"
            age="14 años"
            sex="Macho"
            about="Max es un querido perro comunitario de la Escuela Politécnica Nacional. 
            A sus 14 años, es un mestizo de pelaje marrón claro con manchas blancas. Su personalidad tranquila y cariñosa lo convierte en el favorito de estudiantes y profesores. A menudo lo verás descansando bajo una sombra, disfrutando de la compañía y el cariño de la comunidad que lo adora."
            available={false}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InfoPermanentDogs;
