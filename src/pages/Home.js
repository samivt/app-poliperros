import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import DogCard from "../components/DogCard";
import Footer from "../components/Footer";
import "../assets/styles/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <section className="dog-section">
        <h2>Nuestros Peluditos</h2>
        <div className="dog-card-container">
          <DogCard
            title="Perros Permanentes"
            image={require("../assets/images/perros_permanentes.jpg")}
            link="/permanent-dogs"
          />
          <DogCard
            title="Perros en Adopción"
            image={require("../assets/images/perros_temporales.jpg")}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
