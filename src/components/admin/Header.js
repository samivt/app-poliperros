import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "../../assets/styles/admin/Header.css";

const Header = ({ toggleSidebar }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="header">
      <Button variant="primary" className="d-lg-none" onClick={toggleSidebar}>
        <i class="fa-solid fa-bars"></i>
      </Button>
      <Navbar.Brand href="/admin" className="header-title">
        Administración
      </Navbar.Brand>
      <Nav className="ml-auto d-flex align-items-center">
        <Nav.Link href="/" className="nav-item">
          <i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
