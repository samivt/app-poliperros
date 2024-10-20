import React from "react";
import Navbar from "../../components/main/Navbar";
import Slider from "../../components/main/Slider";
import DogCard from "../../components/main/DogCard";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <section className="dog-section text-center my-5">
        <h2>Nuestros Peluditos</h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <DogCard
                title="Perros Permanentes"
                image={require("../../assets/images/perros_permanentes.jpg")}
                link="/permanent-dogs"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <DogCard
                title="Perros en Adopción"
                image={require("../../assets/images/perros_temporales.jpg")}
                link="/adoption-dogs"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
