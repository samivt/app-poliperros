import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/main/DogCard.css";

const DogCard = ({ title, image, link }) => {
  return (
    <div className="card dog-card shadow">
      <img src={image} alt={title} className="card-img-top" />
      <div className="card-body text-center">
        <h3 className="card-title">{title}</h3>
        <Link to={link}>
          <button className="btn dog-card-button mt-3">Ver más</button>
        </Link>
      </div>
    </div>
  );
};

export default DogCard;
