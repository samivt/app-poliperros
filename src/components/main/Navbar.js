import React from "react";
import "../../assets/styles/main/Navbar.css";
import logo from "../../assets/images/Logo.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-custom">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="Poliperros Logo" className="logo" />
        </NavLink>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-icon"></div>
        </button>

        {/* Contenido colapsable */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/quienes-somos"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Quiénes somos
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/view-permanent-dogs"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                PoliPerros
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/view-adoption-dogs"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Adopciones
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/courses-view"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Cursos
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Botón de inicio de sesión */}
        <NavLink to="/login">
          <button className="btn login-btn ms-auto">
            <i className="fas fa-user"></i> <span>Iniciar Sesión</span>
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
