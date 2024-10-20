import React from "react";
import "../../assets/styles/main/Navbar.css";
import logo from "../../assets/images/logo_poliperros.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Poliperros Logo" />
      </div>
      <ul className="nav-links" role="navigation">
        <li>
          <a href="#">Perros</a>
        </li>
        <li>
          <a href="#">Historial</a>
        </li>
        <li>
          <a href="#">Adopción</a>
        </li>
      </ul>
      <button className="login-btn">
        <i className="fas fa-user"></i>Iniciar Sesión
      </button>
    </nav>
  );
};
export default Navbar;
