import React from "react";
import Navbar from "../../components/main/Navbar";
import Slider from "../../components/main/Slider";
import DogCard from "../../components/main/DogCard";
import Footer from "../../components/main/Footer";
import DonationCard from "../../components/main/DonationCard";
import "../../assets/styles/main/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <section className="dog-card-container text-center my-5">
        <h2 className="section-title">Conoce a Nuestros Peluditos</h2>
        <p className="section-description">
          Descubre a nuestros amigos permanentes y aquellos que están en busca
          de un hogar amoroso.
        </p>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <DogCard
              title="Poli Perros"
              image={require("../../assets/images/perros_permanentes.jpg")}
              link="/view-permanent-dogs"
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <DogCard
              title="Perros en Adopción"
              image={require("../../assets/images/perros_temporales.jpg")}
              link="/view-adoption-dogs"
            />
          </div>
        </div>
      </section>

      {/* Nueva sección de donaciones */}
      <section className="donation-section text-center my-5">
        <h2 className="section-title">Donaciones</h2>
        <p className="section-description">
          Apoya nuestra misión eligiendo una de nuestras opciones de donación.
        </p>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <DonationCard
              title="Transferencias"
              logo={require("../../assets/images/Banco_Pichincha.png")}
              content={
                <>
                  Tipo de cuenta: Ahorros
                  <br />
                  Nº de cuenta: 2206486051
                  <br />
                  Castro Vásquez Andrea Jahaira
                  <br />
                  Nº cédula: 1725615613
                </>
              }
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <DonationCard
              title="PayPal"
              logo={require("../../assets/images/Paypal_logo.png")}
              content={
                <a
                  href="https://paypal.me/poliperros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donation-link"
                >
                  Donar con PayPal
                </a>
              }
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <DonationCard
              title="DeUna"
              logo={require("../../assets/images/qr_deuna.png")}
              content={<p></p>}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
