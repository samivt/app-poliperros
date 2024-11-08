import React from "react";
import "../../assets/styles/main/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src={require("../../assets/images/logo_poliperros.png")}
          alt="Logo Poli Perros"
        />
      </div>
      <div className="contact-info">
        <div className="info-i">
          <p>
            <i className="fa-solid fa-location-dot"></i>
            Escuela Politécnica Nacional
          </p>
          <p>
            <i className="fa-solid fa-phone"></i>
            0983023135
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>
            poliperros@epn.edu.ec
          </p>
        </div>
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
