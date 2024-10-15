import React from "react";
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src={require("../assets/images/logo_poliperros.png")}
          alt="Logo Poli Perros"
        />
      </div>
      <div className="contat-info">
        <p>Escuela Politécnica Nacional</p>
        <p>09999999</p>
        <p>poliperros@epn.edu.ec</p>
      </div>
      <div className="social-media">
        <a href="https://www.facebook.com/poliperros">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/poliperros/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/@poliperros?is_from_webapp=1&sender_device=pc">
          <i className="fab fa-tiktok"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
