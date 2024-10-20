import React from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ViewDogs.css";
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
        <h2>Poli Perros</h2>
        <div className="view-container">
          <ViewDogs
            imageDog={require("../../assets/images/max.jpg")}
            nameDog="Max"
            link="/info-permanent-dogs"
          />
          <ViewDogs
            imageDog={require("../../assets/images/max.jpg")}
            nameDog="Asiri"
            link="/info-permanent-dogs"
          />
          <ViewDogs
            imageDog={require("../../assets/images/max.jpg")}
            nameDog="Bruna"
            link="/info-permanent-dogs"
          />
          <ViewDogs
            imageDog={require("../../assets/images/max.jpg")}
            nameDog="Franzua"
            link="/info-permanent-dogs"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Dogs;
