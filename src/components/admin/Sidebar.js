import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../../assets/styles/admin/Sidebar.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "show" : ""}`}>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/admin/poliperros"
          className="sidebar-link"
          onClick={toggleSidebar}
        >
          <i className="fas fa-dog sidebar-icon"></i> Registrar perro
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/adopcion"
          className="sidebar-link"
          onClick={toggleSidebar}
        >
          <i className="fas fa-paw sidebar-icon"></i> Perros en Adopción
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/seguimiento"
          className="sidebar-link"
          onClick={toggleSidebar}
        >
          <i className="fas fa-clipboard-list sidebar-icon"></i> Seguimiento
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
