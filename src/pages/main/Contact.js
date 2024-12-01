import React, { useState } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import { Form, Button } from "react-bootstrap";
import "../../assets/styles/main/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Validaciones por campo
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(value)) {
          error = "Solo se permiten letras.";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Correo electrónico inválido.";
        }
        break;
      case "phone":
        if (!/^\d{0,10}$/.test(value)) {
          error = "Solo se permiten números (máximo 10 dígitos).";
        }
        break;
      case "message":
        if (value.length < 10) {
          error = "El mensaje debe contener al menos 10 caracteres.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });

    if (!error) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar todo el formulario
    const formErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const emailData = {
      to: "poliperros@epn.edu.ec",
      subject: formData.subject,
      text: `Mensaje: ${formData.message}\n\nNombre: ${formData.firstName} ${formData.lastName}\nTeléfono: ${formData.phone}\nEmail: ${formData.email}`,
    };

    try {
      const response = await fetch("http://tu-servidor.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        alert("¡Formulario enviado exitosamente!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        console.error("Error al enviar el formulario:", response.status);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact-form-container mx-auto">
        <h2 className="contact-title">Contáctanos</h2>
        <p className="contact-description">
          ¿Tienes dudas o quieres colaborar con PoliPerros? Envíanos tu mensaje
          y te responderemos lo antes posible.
        </p>
        <Form onSubmit={handleSubmit} className="custom-contact-form">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            {errors.firstName && (
              <small className="error-text">{errors.firstName}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            {errors.lastName && (
              <small className="error-text">{errors.lastName}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && (
              <small className="error-text">{errors.email}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Asunto"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              placeholder="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            {errors.phone && (
              <small className="error-text">{errors.phone}</small>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              placeholder="Escribe tu mensaje aquí"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            {errors.message && (
              <small className="error-text">{errors.message}</small>
            )}
          </Form.Group>
          <div className="text-center">
            <Button type="submit" className="contact-submit-btn">
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
