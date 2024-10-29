import React from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ViewAdoptionDogs.css";
import { Link } from "react-router-dom";

const ViewDogs = ({ nameDog, imageDog, link }) => {
  return (
    <div className="view-dog">
      <img src={imageDog} alt={nameDog} />
      <p id="nameDog">{nameDog}</p>
      <Link to={link}>
        <button>Ver más</button>
      </Link>
    </div>
  );
};

const Dogs = () => {
  return (
    <div>
      <Navbar />
      <section className="view-info">
        <h2>Perros en adopción</h2>
        <div className="view-container">
          <ViewDogs
            imageDog={require("../../assets/images/Kira.png")}
            nameDog="Kira"
            link="/info-adoption-dogs"
          />
          <ViewDogs
            imageDog={require("../../assets/images/Kira.png")}
            nameDog="Kira"
            link="/info-adoption-dogs"
          />
          <ViewDogs
            imageDog={require("../../assets/images/Kira.png")}
            nameDog="Bruna"
            link="/info-adoption-dogs"
          />
          <ViewDogs
            imageDog={require("../../assets/images/Kira.png")}
            nameDog="Franzua"
            link="/info-adoption-dogs"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Dogs;
