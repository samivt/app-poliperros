import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/ContactPage.css"; // Archivo CSS para los estilos

const ContactPage = () => {
  const whatsappNumber = "593983023135"; // Número con código de país
  const whatsappLink = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text&type=phone_number&app_absent=0`;

  const email = "poliperros@epn.edu.ec"; // Cambia al correo que quieras usar
  const phone = "0983023135";
  const address = "https://maps.app.goo.gl/myhAriRGshFiAkz97"; // Enlace de Google Maps

  return (
    <>
      <Navbar />

      {/* Página de Contacto */}
      <Container className="contact-page">
        {/* Título */}
        <h2 className="contact-title">Contáctanos</h2>

        <Row className="contact-page">
          <Col>
            <img
              src={require("../../assets/images/logo_poliperros.png")}
              alt="Imagen de contacto"
              className="contact-header-image"
            />
          </Col>
        </Row>
        <Row className="text-center">
          {/* Correo Electrónico */}
          <Col md={4} className="contact-item">
            <i className="fas fa-envelope text-primary mb-2 contact-icon"></i>
            <p>
              <a href={`mailto:${email}`} className="contact-link">
                {email}
              </a>
            </p>
          </Col>

          {/* Teléfono/WhatsApp */}
          <Col md={4} className="contact-item">
            <i className="fas fa-phone text-primary mb-2 contact-icon"></i>
            <p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {phone}
              </a>
            </p>
          </Col>

          {/* Dirección (enlace a Google Maps) */}
          <Col md={4} className="contact-item">
            <i className="fas fa-map-marker-alt text-primary mb-2 contact-icon"></i>
            <p>
              <a
                href={address}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Escuela Politécnica Nacional
              </a>
            </p>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default ContactPage;
