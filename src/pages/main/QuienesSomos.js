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
            vulnerabilidad dentro de la universidad. A través de proyectos de
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
              description="Somos miembros de la comunidad politécnica dedicados a la protección y aseguramiento del bienestar de la fauna urbana que habita dentro de la Escuela Politécnica Nacional,
               con especial énfasis en los perros comunitarios del campus. El trabajo autogestionario y el compromiso de nuestros voluntarios son las piezas fundamentales a través de la cual este proyecto busca la construcción de espacios armónicos de convivencia humano-naturaleza."
              icon="mision"
            />
            <InfoCard
              title="Visión"
              description="Seremos el organismo oficial de bienestar animal 
              dentro de la EPN, y uno de los principales referentes para otras Instituciones de Educación Superior. A través de la autogestión, la dedicación, y el apoyo institucional y de voluntarios lograremos velar por el bienestar y calidad de vida de los animales de compañía permanentes y temporales del campus 
              y fomentar el respeto hacia otros seres no humanos."
              icon="vision"
            />
          </div>
        </section>
        <section className="qs-values">
          <h2 className="qs-subtitle">Nuestros Valores</h2>
          <div className="qs-values-container">
            <div className="qs-value-item">
              <i className="fas fa-handshake"></i>
              <h3>Respeto</h3>
            </div>
            <div className="qs-value-item">
              <i className="fas fa-users"></i>
              <h3>Solidaridad</h3>
            </div>
            <div className="qs-value-item">
              <i className="fas fa-users-cog"></i>
              <h3>Confianza</h3>
            </div>
            <div className="qs-value-item">
              <i className="fas fa-flag-checkered"></i>
              <h3>Compromiso</h3>
            </div>
            <div className="qs-value-item">
              <i className="fas fa-equals"></i>
              <h3>Igualdad</h3>
            </div>
            <div className="qs-value-item">
              <i className="fas fa-heart"></i>
              <h3>Empatía</h3>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuienesSomos;
