import React from "react";
import "../../assets/styles/main/InfoDogs.css";

const InfoDogs = ({ image, name, age, sex, about, available }) => {
  return (
    <div className="info-dog">
      <div id="info-dog">
        <h3 id="name-dog">{name}</h3>
        <p>
          <strong>Edad:</strong> {age}
        </p>
        <p>
          <strong>Sexo:</strong> {sex}
        </p>
        <p>{about}</p>
      </div>

      <img src={image} alt={name} className="img-fluid" />
    </div>
  );
};

export default InfoDogs;
