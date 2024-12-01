import React from "react";
import { Carousel } from "react-bootstrap";
import "../../assets/styles/main/Slider.css";

const Slider = () => {
  return (
    <Carousel interval={3000} fade>
      <Carousel.Item>
        <img
          className="slider-image d-block w-100"
          src={require("../../assets/images/slide1.jpg")}
          alt="Imagen 1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="slider-image d-block w-100"
          src={require("../../assets/images/slide2.png")}
          alt="Imagen 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="slider-image d-block w-100"
          src={require("../../assets/images/slide3.jpg")}
          alt="Imagen 3"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
