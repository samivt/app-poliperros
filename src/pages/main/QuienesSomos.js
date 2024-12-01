import React from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import InfoCard from "../../components/main/InfoCard";
import "../../assets/styles/main/QuienesSomos.css";

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-page">
      <Navbar />
      <header className="qs-header">
        <div className="qs-header-overlay">
          <h1 className="qs-title">¿Quiénes Somos?</h1>
        </div>
      </header>
      <main className="qs-content">
        <section className="qs-intro">
          <h2 className="qs-subtitle">Nuestro Propósito</h2>
          <p className="qs-description">
            Somos el Club de Bienestar Animal Poli Perros de la Escuela
            Politécnica Nacional, un grupo de estudiantes comprometidos con la
            protección y bienestar de los animales. Nos dedicamos a mejorar las
            condiciones de vida de los perros en situación de calle o
            vulnerabilidad dentro y fuera del campus. A través de proyectos de
            adopción, voluntariado y educación, trabajamos para generar una
            comunidad más empática y responsable con nuestros amigos de cuatro
            patas.
          </p>
        </section>
        <section className="qs-culture">
          <h2 className="qs-subtitle">Nuestra Cultura</h2>
          <div className="qs-culture-cards">
            <InfoCard
              title="Misión"
              description="Promover el bienestar animal en la Escuela Politécnica Nacional y la comunidad aledaña mediante la adopción 
              responsable, la protección de los perros en situación de vulnerabilidad, y la sensibilización sobre el respeto y el cuidado
              animal. Nos enfocamos en generar un impacto positivo a través de acciones que fomenten la empatía y la responsabilidad 
              hacia los animales."
              icon="mision"
            />
            <InfoCard
              title="Visión"
              description="Ser reconocidos como un referente en bienestar animal a nivel universitario, creando un entorno 
              donde los derechos de los animales sean respetados y donde cada perro vulnerable encuentre un hogar seguro y amoroso. 
              Aspiramos a construir una cultura universitaria de respeto, responsabilidad y cuidado hacia los animales, promoviendo 
              la adopción y la tenencia responsable."
              icon="vision"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuienesSomos;
