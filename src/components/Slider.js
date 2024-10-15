import React from "react";
import "../assets/styles/Slider.css";

const Slider = () => {
  return (
    <div className="slider">
      <div className="slide">
        <img
          src={require("../assets/images/slide1.jpg")}
          alt="Perros descansando"
        />
      </div>
    </div>
  );
};

export default Slider;
