import React from "react";
import "../assets/styles/DogCard.css";
import { Link } from "react-router-dom";

const DogCard = ({ title, image, link }) => {
  return (
    <div className="dog-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <Link to={link}>
        <button>Ver más</button>
      </Link>
    </div>
  );
};
export default DogCard;
