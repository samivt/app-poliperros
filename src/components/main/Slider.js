import React from "react";
import { Carousel } from "react-bootstrap";
import "../../assets/styles/main/Slider.css";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/slide1.jpg")}
          alt="Perros descansando"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/slide2.png")}
          alt="Perro jugando"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/slide1.jpg")}
          alt="Perro entrenando"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
