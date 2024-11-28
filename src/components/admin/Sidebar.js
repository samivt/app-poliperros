import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/admin/AdminPanel.css";
import { getUserRole } from "../../services/auth-service";
import { rolePermissions } from "../../config/roles";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const userRole = getUserRole(); // Obtiene el rol del usuario
  const links = rolePermissions[userRole] || []; // Obtiene las opciones según el rol

  return (
    <div className={`sidebar ${isSidebarOpen ? "show" : ""}`}>
      <Nav className="flex-column">
        {/* Opción para ir al Welcome */}
        <Nav.Link
          as={Link}
          to="/admin/welcome"
          className="sidebar-link"
          onClick={toggleSidebar}
        >
          <i className="fas fa-home sidebar-icon"></i> Inicio
        </Nav.Link>

        {/* Opciones dinámicas según el rol */}
        {links.map((link) => (
          <Nav.Link
            key={link.path}
            as={Link}
            to={`/admin/${link.path}`}
            className="sidebar-link"
            onClick={toggleSidebar}
          >
            <i className={`${link.icon} sidebar-icon`}></i> {link.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
