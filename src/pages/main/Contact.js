import React, { useEffect, useState } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/styles/main/Contact.css"; // Personaliza este CSS según tu diseño

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Datos enviados:", formData);
    try {
      const response = await fetch("http://tu-servidor.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Formulario enviado exitosamente");
      } else {
        console.error("Error al enviar el formulario:", response.status);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    // Cargar el script de TikTok para activar el video embebido
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="custom-form-container form-container mx-auto col-md-6">
        <h2 className="my-4 text-center form-title">Contáctanos</h2>
        <Form className="custom-form" onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Nombre:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Email:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Teléfono:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3} className="custom-label">
              Mensaje:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" className="custom-button">
              Enviar
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
