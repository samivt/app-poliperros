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
