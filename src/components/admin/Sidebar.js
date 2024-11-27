import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/admin/AdminPanel.css";
import { getUserRole } from "../../services/auth-service";
import { rolePermissions } from "../../config/roles";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const userRole = getUserRole();
  const links = rolePermissions[userRole] || [];

  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (path) => {
    setActiveLink((prevActive) => (prevActive === path ? null : path));
  };

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

        {/* Otras opciones dinámicas */}
        {links.map((link) => (
          <div key={link.path}>
            <Nav.Link
              as="div"
              onClick={() => handleLinkClick(link.path)}
              className={`sidebar-link ${
                activeLink === link.path ? "active" : ""
              }`}
            >
              <i className={`${link.icon} sidebar-icon`}></i> {link.label}
            </Nav.Link>
            {link.subOptions &&
              activeLink === link.path &&
              link.subOptions.map((subLink) => (
                <Nav.Link
                  key={subLink.path}
                  as={Link}
                  to={`/admin/${link.path}/${subLink.path}`}
                  className="sidebar-sublink"
                  onClick={toggleSidebar}
                >
                  <i className={`${subLink.icon} sidebar-icon`}></i>{" "}
                  {subLink.label}
                </Nav.Link>
              ))}
          </div>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
