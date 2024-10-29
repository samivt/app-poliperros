import React from "react";
import "../../assets/styles/main/Navbar.css";
import logo from "../../assets/images/logo_poliperros.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Poliperros Logo" className="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <a className="nav-link" href="/quienes-somos">
                Poli Perros
              </a>
            </li>

            <li className="nav-item me-4">
              <a className="nav-link" href="/view-adoption-dogs">
                Perros en adopción
              </a>
            </li>
            <li className="nav-item me-4">
              <a className="nav-link" href="/quienes-somos">
                Seguimiento
              </a>
            </li>
          </ul>
        </div>
        <Link to="/login">
          <button className="btn login-btn ms-auto">
            <i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
