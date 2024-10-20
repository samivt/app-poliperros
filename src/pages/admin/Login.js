import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../assets/styles/admin/Login.css";

const FormDogs = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dogData = {
      ...formData,
    };
    console.log(dogData);
    try {
      const response = await fetch(
        "http://192.168.100.88:8000/dog/static_dog/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dogData),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Inicio sesión:", result);
      } else {
        console.error("Error al ingresar al sistema:", response.status);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img
            src={require("../../assets/images/logo_poliperros.png")}
            alt="PoliPerros Logo"
          />
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="email">Correo:</Form.Label>
            <Col>
              <Form.Control
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label htmlFor="password">Contraseña:</Form.Label>
            <Col>
              <Form.Control
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <div className="forgot-password">
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <Button variant="warning" type="submit" className="login-button">
            Ingresar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FormDogs;
