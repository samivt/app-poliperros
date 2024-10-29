import React from "react";
import Navbar from "../../components/main/Navbar";
import InfoDogs from "../../components/main/InfoDogs";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/InfoAdoptionDogs.css";

const InfoPermanentDogs = () => {
  return (
    <div>
      <Navbar />
      <section className="info-dog-section">
        <h2>Perros en adopción</h2>
        <div className="container">
          <InfoDogs
            image={require("../../assets/images/Kira.png")}
            name="Kira"
            age="3 años"
            sex="Hembra"
            about="Kira es una dulce perrita de 3 años que ha encontrado su hogar en la Escuela Politécnica Nacional.
             Con su pelaje marrón claro y ojos expresivos, es conocida por su naturaleza curiosa y cariñosa. Siempre 
             dispuesta a seguir a los estudiantes en sus recorridos por el campus, Kira es la compañera perfecta para
              quienes buscan un momento de calma y ternura en su día. Su lealtad y afecto la hacen una querida integrante 
              de la comunidad."
            available={false}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InfoPermanentDogs;
