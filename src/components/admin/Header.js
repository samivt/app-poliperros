import React from "react";

const Header = ({ toggleSidebar, onLogout }) => {
  return (
    <header className="header">
      {/* Botón de Toggle (solo visible en pantallas pequeñas) */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Título del Panel */}
      <h1 className="header-title">Administración PoliPerros</h1>

      {/* Botón de Cerrar Sesión */}
      <button className="logout-button" onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
      </button>
    </header>
  );
};

export default Header;
