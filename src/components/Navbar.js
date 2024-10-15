import React from "react";
import "../assets/styles/Navbar.css";
import logo from "../assets/images/logo_poliperros.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Poliperros Logo" />
      </div>
      <ul className="nav-links" role="navigation">
        <li>
          <a href="#">Quiénes somos</a>
        </li>
        <li>
          <a href="#">Donaciones</a>
        </li>
        <li>
          <a href="#">Adopción</a>
        </li>
        <li>
          <a href="#">Inscripciones</a>
        </li>
        <li>
          <a href="#">Contacto</a>
        </li>
      </ul>
      <button className="login-btn">
        <i class="fas fa-user"></i>Iniciar Sesión
      </button>
    </nav>
  );
};
export default Navbar;
