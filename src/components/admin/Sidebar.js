import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/admin/Sidebar.css";
import { getUserRole } from "../../services/authService";
import { rolePermissions } from "../../config/roles";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const userRole = getUserRole();
  const links = rolePermissions[userRole] || [];
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const categories = {
    personal: links.filter((link) => link.category === "personal"),
    dogs: links.filter((link) => link.category === "dogs"),
    visits: links.filter((link) => link.category === "visits"),
    users: links.filter((link) => link.category === "users"),
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "show" : ""}`}>
      {/* Botón de cierre */}
      <button className="sidebar-close-btn" onClick={toggleSidebar}>
        <i className="fas fa-times"></i>
      </button>

      <Nav className="flex-column">
        {/* Inicio */}
        <Nav.Link
          as={Link}
          to="/admin/welcome"
          className="sidebar-link"
          onClick={toggleSidebar}
        >
          <i className="fas fa-home sidebar-icon"></i> Inicio
        </Nav.Link>

        {/* Configuración Personal */}
        <div className="sidebar-category">
          <div
            className="category-title"
            onClick={() => toggleCategory("personal")}
          >
            <i className="fas fa-user-cog category-icon"></i>
            Configuración Personal
            <i
              className={`fas ${
                expandedCategory === "personal"
                  ? "fa-chevron-up"
                  : "fa-chevron-down"
              } chevron-icon`}
            ></i>
          </div>
          {expandedCategory === "personal" &&
            categories.personal.map((link) => (
              <Nav.Link
                key={link.path}
                as={Link}
                to={`/admin/${link.path}`}
                className="sidebar-sublink"
                onClick={toggleSidebar}
              >
                <i className={`${link.icon} sidebar-icon`}></i> {link.label}
              </Nav.Link>
            ))}
        </div>

        {/* Gestión de Perros */}
        <div className="sidebar-category">
          <div
            className="category-title"
            onClick={() => toggleCategory("dogs")}
          >
            <i className="fas fa-dog category-icon"></i>
            Gestión de Perros
            <i
              className={`fas ${
                expandedCategory === "dogs"
                  ? "fa-chevron-up"
                  : "fa-chevron-down"
              } chevron-icon`}
            ></i>
          </div>
          {expandedCategory === "dogs" &&
            categories.dogs.map((link) => (
              <Nav.Link
                key={link.path}
                as={Link}
                to={`/admin/${link.path}`}
                className="sidebar-sublink"
                onClick={toggleSidebar}
              >
                <i className={`${link.icon} sidebar-icon`}></i> {link.label}
              </Nav.Link>
            ))}
        </div>

        {/* Visitas y Seguimiento */}
        <div className="sidebar-category">
          <div
            className="category-title"
            onClick={() => toggleCategory("visits")}
          >
            <i className="fas fa-clipboard-list category-icon"></i>
            Visitas y Seguimiento
            <i
              className={`fas ${
                expandedCategory === "visits"
                  ? "fa-chevron-up"
                  : "fa-chevron-down"
              } chevron-icon`}
            ></i>
          </div>
          {expandedCategory === "visits" &&
            categories.visits.map((link) => (
              <Nav.Link
                key={link.path}
                as={Link}
                to={`/admin/${link.path}`}
                className="sidebar-sublink"
                onClick={toggleSidebar}
              >
                <i className={`${link.icon} sidebar-icon`}></i> {link.label}
              </Nav.Link>
            ))}
        </div>

        {/* Gestión de Usuarios */}
        {userRole === "admin" && (
          <div className="sidebar-category">
            <div
              className="category-title"
              onClick={() => toggleCategory("users")}
            >
              <i className="fas fa-users category-icon"></i>
              Gestión de Usuarios
              <i
                className={`fas ${
                  expandedCategory === "users"
                    ? "fa-chevron-up"
                    : "fa-chevron-down"
                } chevron-icon`}
              ></i>
            </div>
            {expandedCategory === "users" &&
              categories.users.map((link) => (
                <Nav.Link
                  key={link.path}
                  as={Link}
                  to={`/admin/${link.path}`}
                  className="sidebar-sublink"
                  onClick={toggleSidebar}
                >
                  <i className={`${link.icon} sidebar-icon`}></i> {link.label}
                </Nav.Link>
              ))}
          </div>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
