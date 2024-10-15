import React from "react";

import "../assets/styles/InfoDogs.css";

const InfoDogs = ({ name, age, about, image, available }) => {
  return (
    <div className="info-dog">
      <img src={image} alt={name} />
      <p id="name-dog">{name}</p>
      <p id="info">{age}</p>
      <p id="info">{about}</p>
      {available && <button className="adopt-button">Adoptar</button>}
    </div>
  );
};
export default InfoDogs;
